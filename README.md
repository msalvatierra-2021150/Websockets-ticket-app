# WebSocket Tickets App using Node.js WS

This project demonstrates a simple implementation of WebSocket communication between a Node.js backend using the `ws` library and a frontend built with pure HTML, CSS, and JS.

## Features

- Real-time bidirectional communication between server and client.
- Minimalistic frontend with HTML, CSS, and JavaScript.
- Basic example showcasing WebSocket functionality.

## Prerequisites

- Node.js installed on your machine.


## Setup Instructions

1. **Clone Environment Variables**: Clone the `.env.template` file to `.env` and configure the required environment variables.

   ```bash
   cp .env.template .env
   # Configure the variables in .env
    ```
2. Install Dependencies: Run the following command to install the required dependencies:

    ```bash
    npm install
    ```
3. Database Setup (if needed as the project uses an array to model a DB): If a database is required, configure the docker-compose.yml file accordingly and start the services by running:
    ```bash
    docker compose up -d
    ```

4. Run Development Server: Start the project in development mode:
    ```bash
    npm run dev
    ```

5. Access the Application: Open your web browser and navigate to index.html to access the application. (Using multiple tabs are recommended in order to see how the project works).