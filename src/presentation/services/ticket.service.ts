import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket";
import { WssService } from "./wss.service";

export class TicketService {
    constructor(
        private readonly wssService = WssService.instance
    ) {}

    public tickets: Ticket[] = [
        {id: UuidAdapter.v4(), number: 1, createdAt: new Date, isDone: false },
        {id: UuidAdapter.v4(), number: 2, createdAt: new Date, isDone: false },
        {id: UuidAdapter.v4(), number: 3, createdAt: new Date, isDone: false },
        {id: UuidAdapter.v4(), number: 4, createdAt: new Date, isDone: false },
        {id: UuidAdapter.v4(), number: 5, createdAt: new Date, isDone: false },
        {id: UuidAdapter.v4(), number: 6, createdAt: new Date, isDone: false },
    ];

    private readonly workingOnTickets: Ticket[] = [];

    public get  actualTickets():Ticket[] {
        return this.workingOnTickets.slice(0, 4)
    }

    public get pendingTickets(): Ticket[] {
        return this.tickets.filter(ticket => !ticket.handledAtDesk)
    }

    public get lastTicketNumber() {
        return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
    }

    public createTicket () {
        const ticket: Ticket = {
            id: UuidAdapter.v4(),
            number: this.lastTicketNumber + 1,
            createdAt: new Date(),
            isDone: false
        }
        this.tickets.push(ticket);

        //TODO: WEBSOCKET
        this.onTicketNumberChanged();

        return ticket;
    }

    public drawTicket(desk: string) {
        const ticket = this.tickets.find(ticket => !ticket.handledAt)
        if (!ticket) return {status: 'error', message: 'No pending tickets available'}
        ticket.handledAtDesk = desk;
        ticket.handledAt = new Date();

        this.workingOnTickets.unshift({...ticket});
        //TODO: WEBSOCKET
        this.onTicketNumberChanged();
        this.onWorkingChanged();

        return {status: 'ok', ticket}
    }

    public onFinishedTicket(id: string) {
        const ticket = this.tickets.find(ticket => ticket.id === id);
        if (!ticket) return {status: 'error', message: 'Ticket not found'};

        this.tickets.map(ticket => {
            if (ticket.id === id) {
                ticket.isDone = true;
            }
            return ticket
        });

        return {status: 'ok'}
    }

    private onTicketNumberChanged() {
        this.wssService.sendMessage('on-ticket-count-changed', this.pendingTickets.length);
    }

    private onWorkingChanged() {
        this.wssService.sendMessage('on-working-changed', this.actualTickets);
    }
}