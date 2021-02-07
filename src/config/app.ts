import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import { RecordRoutes } from "../routes/record_routes";
import { CommonRoutes} from "../routes/common_routes";
import exphbs = require('express-handlebars')
import {PageRoutes} from "../routes/page_routes";
import * as path from "path";

class App {
   public app: express.Application;
   private recordRoutes: RecordRoutes = new RecordRoutes();
   private commonRoutes: CommonRoutes = new CommonRoutes();
   private pageRoutes: PageRoutes = new PageRoutes();

   public mongoUrl: string = 'mongodb://localhost/sensordata';

   constructor() {
      this.app = express();
      this.app.engine('handlebars', exphbs());
      this.app.set('view engine', 'handlebars');
      this.app.set('views', path.join(__dirname, '../views'));
      // this.app.engine('hbs', exphbs({
      //    defaultLayout: 'index',
      //    extname: 'hbs',
      //    layoutsDir: path.join(__dirname, 'views/layouts'),
      //    partialsDir: path.join(__dirname, 'views'),
      // }));
      this.config();
      this.mongoSetup();
      this.pageRoutes.route(this.app);
      this.recordRoutes.route(this.app);
      this.commonRoutes.route(this.app);
   }

private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }
}

export default new App().app;
