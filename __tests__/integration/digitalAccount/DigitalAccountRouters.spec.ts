import 'dotenv/config';
import request from 'supertest';

import App from '@shared/infra/http/App';
import faker from '@faker-js/faker';
import { cpf } from 'cpf-cnpj-validator';

const app = new App();

describe('DigitalAccountRouters', () => {
  it('Should create one digital account', async done => {
    const data = {
      name: faker.name.findName(),
      document: cpf.format(cpf.generate()),
      availableValue: 1000,
    };

    await request(app.getApp())
      .post('/digital-account')
      .send(data)
      .expect(res => {
        expect(res.body).toMatchObject(data);
        expect(res.body).toHaveProperty('id');
      })
      .expect(201);

    done();
  });

  it('Should not create one digital account when name is empty', async done => {
    const data = {
      document: cpf.format(cpf.generate()),
      availableValue: 1000,
    };

    await request(app.getApp())
      .post('/digital-account')
      .send(data)
      .expect(res => {
        expect(res.body).toMatchObject({
          message: 'name is a required field.',
        });
        expect(res.body).toHaveProperty('message');
      })
      .expect(400);

    done();
  });

  it('Should not create one digital account when document is empty', async done => {
    const data = {
      name: faker.name.findName(),
      availableValue: 1000,
    };

    await request(app.getApp())
      .post('/digital-account')
      .send(data)
      .expect(res => {
        expect(res.body).toMatchObject({
          message: 'document is a required field.',
        });
        expect(res.body).toHaveProperty('message');
      })
      .expect(400);

    done();
  });

  it('Should not create one digital account when available value is empty', async done => {
    const data = {
      name: faker.name.findName(),
      document: cpf.format(cpf.generate()),
    };

    await request(app.getApp())
      .post('/digital-account')
      .send(data)
      .expect(res => {
        expect(res.body).toMatchObject({
          message: 'availableValue is a required field.',
        });
        expect(res.body).toHaveProperty('message');
      })
      .expect(400);

    done();
  });
});
