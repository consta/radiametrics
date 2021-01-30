import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import { RecordRoutes } from "../routes/record_routes";
import { CommonRoutes} from "../routes/common_routes";

class App {
   public app: express.Application;
   private recordRoutes: RecordRoutes = new RecordRoutes();
   private commonRoutes: CommonRoutes = new CommonRoutes();
   public mongoUrl: string = 'mongodb://localhost/sensordata';

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
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
