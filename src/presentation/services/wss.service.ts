
import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws'

interface Options {
    server: Server;
    path?: string; //Path to the ws server
}

export class WssService {
    //Instance of the class for singleton
    private static _instance: WssService;
    private wss: WebSocketServer;

    private constructor (options: Options) {
        const { server, path = '/ws' } = options; //localhost:3000/ws
        this.wss = new WebSocketServer({server, path});
        this.start();
    }

    static initWss (options: Options) {
        WssService._instance = new WssService(options);
    }

    static get instance(): WssService {
        if (!WssService._instance) {
            throw new Error('WssService not initialized');
        }
        return WssService._instance;
    }

    public sendMessage(type:string, payload: Object) {
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({type, payload}));
            }
        })
    }

    public start () {
        this.wss.on('connection', (ws: WebSocket) => {
            console.log('Client Connected');
        })
        this.wss.on('close', () => console.log('Client disconnected'));
    }
}