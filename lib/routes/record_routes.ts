import { Application, Request, Response } from 'express';
import { RecordController } from '../controllers/recordController';

export class RecordRoutes {

    private controller: RecordController = new RecordController();

    public route(app: Application) {
        
        app.post('/api/records', (req: Request, res: Response) => {
            this.controller.add_record(req, res);
        });

        app.get('/api/records', (req: Request, res: Response) => {
            this.controller.find_records(req, res);
        });
    }
}
