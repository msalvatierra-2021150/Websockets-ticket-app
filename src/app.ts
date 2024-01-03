import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';


(async()=> {
  main();
})();


function main() {
  /**Express Server */
  const server = new Server({
    port: envs.PORT
  });

  /**Main Nodejs Server */
  const httpServer = createServer(server.app);

  /**WebsocketService */
  WssService.initWss({server: httpServer})
  // Routes
  server.setRoutes(AppRoutes.routes);

  httpServer.listen(envs.PORT,() => {
    console.log(`Server listening on port ${envs.PORT}`);
  });
}