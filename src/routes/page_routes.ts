import {Application, Request, Response} from 'express';
import {PageController} from '../controllers/pageController';

export class PageRoutes {

    private pageController: PageController = new PageController();

    public route(app: Application) {

        app.get('/pages', (req: Request, res: Response) => {
            this.pageController.getPages(req, res);
        });
    }
}
