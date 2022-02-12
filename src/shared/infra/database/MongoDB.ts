import 'dotenv/config';
import { createConnection, getConnectionManager } from 'typeorm';
import path from 'path';
import { IDbRepository } from '@shared/repositories/IDbRepository';

const environment = process.env.ENVIRONMENT;

export default class MongoDB implements IDbRepository {
  public async connect(): Promise<void> {
    let entitiesMONGO = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'modules',
      '**',
      'infra',
      'typeorm',
      'schema',
      '*.ts',
    );

    if (environment !== 'dev' && environment !== 'test')
      entitiesMONGO = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'modules',
        '**',
        'infra',
        'typeorm',
        'schema',
        '*.js',
      );

    let url = process.env.MONGO_URI;

    if (environment === 'test') url = process.env.MONGO_URL;

    await createConnection({
      name: 'default',
      type: 'mongodb',
      url,
      entities: [entitiesMONGO],
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      logging: true,
    });
  }

  public async disconnect(): Promise<void> {
    await getConnectionManager().connections[0].close();
  }
}
