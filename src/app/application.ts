import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logger from './util/logger';
import { applicationRouter } from './routes';

export class Application {
  private _server: Express;

  constructor() {
    this._server = express();
    this._server.set('host', process.env.HOST || 'localhost');
    this._server.set('port', process.env.PORT || 3000);
    this._server.use(bodyParser.json());
    this._server.use(bodyParser.urlencoded({ extended: true }));
    this._server.use(cors());
    this._server.use(this.logRequest);
    this._server.use(applicationRouter);
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    const db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function () {
      logger.info('Connected to mongod server');
    });

    mongoose.set('strictQuery', true);
    // mongoose.connect(process.env.DB_URL || `localhost:27017/test`);
    mongoose.connect(process.env.DB_URL || 'mongodb://localhost/myapp');
  }

  private logRequest(req: Request, res: Response, next: NextFunction) {
    logger.info(`Request URL: ${req.originalUrl} Method: ${req.method}`);
    next();
  }

  public startServer(): void {
    const host: string = this._server.get('host');
    const port: number = this._server.get('port');
    this._server.listen(port, () => {
      logger.info(`Server started at http://${host}:${port}`);
    });
  }
}
