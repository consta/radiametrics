import { Application, Request, Response } from 'express';
import * as path from "path";
export class CommonRoutes {
   public route(app: Application) {
      app.get('/index.html', function(req, res) {
         res.sendFile('index.html', {root: './'});
      });
      // Mismatch URL
      app.all('*', function (req: Request, res: Response) {
         res.status(404).send({ error: true, message: 'Check your URL please' });
      });
   }
}
