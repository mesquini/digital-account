import 'reflect-metadata';
import 'dotenv/config';

import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import log4js from 'log4js';

import { IDbRepository } from '@shared/repositories/IDbRepository';
import { errors } from 'celebrate';
import mainRoute from './routes/index';
import healthRoutes from './routes/health';
import error from './middlewares/error';

import '@shared/container';

class App {
  private expressApp: Express;

  private logger: log4js.Logger;

  private dbConnection: IDbRepository;

  constructor(dbCon?: IDbRepository) {
    this.logger = log4js.getLogger('app');
    this.logger.info('Start App Configuration...');

    if (dbCon) {
      this.dbConnection = dbCon;
    }
    
    this.expressApp = express();

    this.routes();
    this.middlewares();
  }

  private async middlewares() {
    this.expressApp.use(helmet());
    this.expressApp.use(cors());
    this.expressApp.use(morgan('dev'));
    this.expressApp.use(error);
    this.expressApp.use(errors({ statusCode: 400 }));
  }

  private routes() {
    this.expressApp.use(express.json());

    this.expressApp.use(healthRoutes);
    this.expressApp.use(mainRoute);
  }

  public async startApp(port?: string): Promise<void> {
    if (this.dbConnection) await this.startDB();

    this.expressApp.listen(port, () => {
      this.logger.info(`Server is running... at ${port}`);
    });
  }

  public async startDB(): Promise<void> {
    await this.dbConnection.connect();
  }

  public async stopDB(): Promise<void> {
    await this.dbConnection.disconnect();
  }

  public stopApp(): void {
    this.expressApp.listen().close();
  }

  public getApp(): Express {
    return this.expressApp;
  }
}

export default App;
