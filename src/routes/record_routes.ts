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

        app.get('/api/averages', (req: Request, res: Response) => {
            this.controller.get_averages(req, res);
        });

        app.get('/api/records/recent', (req: Request, res: Response) => {
            this.controller.getDateOfRecentRecord(req, res);
        });



        app.post('/api/sensors/', (req: Request, res: Response) => {
            this.controller.add_sensor_data(req, res);
        });
    }
}
