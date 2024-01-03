async function loadCurrentTickets () {
    const tickets = await fetch('/api/ticket/working-on')
        .then(resp => resp.json());
    console.log(tickets);
    renderTickets(tickets);
}

function renderTickets(tickets = []) {
    for (let i = 0; i < tickets.length; i++) {
        if (i >= 4) break;
        const ticket = tickets[i];
        if(!ticket) continue;
        const ticketElement = document.querySelector(`#lbl-ticket-0${i+1}`)
        const lblDesk = document.querySelector(`#lbl-desk-0${i+1}`)
        ticketElement.innerText = `Ticket ${ticket.number}`;
        lblDesk.innerText = ticket.handledAtDesk;
    }
}

function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );

    socket.onmessage = ( event ) => {
      console.log(event.data);
      const {type, payload} = JSON.parse( event.data );
      if (type !== 'on-working-changed') return;
        renderTickets(payload);
    };

    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );

    };

    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };

}
connectToWebSockets();
loadCurrentTickets();
