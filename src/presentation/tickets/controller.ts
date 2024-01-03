import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";

export class TicketController {
    constructor(
        private readonly ticketService = new TicketService(),
    ) {}

    public getTickets = async (req: Request, res: Response) => {
        res.json(this.ticketService.tickets);
    }

    public getLastTicketNumber = async (req: Request, res: Response) => {
        res.json(this.ticketService.lastTicketNumber);
    }

    public getPendingTickets = async (req: Request, res: Response) => {
        res.json(this.ticketService.pendingTickets);
    }

    public createTicket = async (req: Request, res: Response) => {
        res.status(201).json(this.ticketService.createTicket());
    }

    public drawTicket = async (req: Request, res: Response) => {
        const { desk } = req.params;
        res.json(this.ticketService.drawTicket(desk));
    }

    public doneTicket = async (req: Request, res: Response) => {
        const { id } = req.params;
        res.json(this.ticketService.onFinishedTicket(id));
    }

    public getWorkingOnTickets = async (req: Request, res: Response) => {
        res.json(this.ticketService.actualTickets);
    }
}