import 'dotenv/config';
import request from 'supertest';

import App from '@shared/infra/http/App';
import {
  FakeDigitalAccount1,
  FakeDigitalAccount2,
  FakeDigitalAccount3,
} from '../../unit/modules/digital-account/utils/FakeDigitalAccount';

const app = new App();

describe('TransferRouters', () => {
  it('Should create one transfer', async done => {
    const data = {
      senderDocument: FakeDigitalAccount1.document,
      receiverDocument: FakeDigitalAccount2.document,
      value: 10,
    };

    await request(app.getApp()).post('/digital-account').send({
      name: 'Joana Bárbara Caldeira',
      document: '452.475.668-07',
      availableValue: 100,
    });

    await request(app.getApp()).post('/digital-account').send({
      name: 'Neymar Jr',
      document: '458.363.878-77',
      availableValue: 1000,
    });

    const responseData = {
      senderDocument: FakeDigitalAccount1.document,
      receiverDocument: FakeDigitalAccount2.document,
      availableValue: 90,
      transferredValue: 10,
    };

    await request(app.getApp())
      .post('/transfer')
      .send(data)
      .expect(res => {
        expect(res.body).toMatchObject(responseData);
        expect(res.body).toHaveProperty('id');
      })
      .expect(201);

    done();
  });

  it('Should not create one transfer when sender document is empty', async done => {
    const data = {
      receiverDocument: FakeDigitalAccount2.document,
      value: 10,
    };

    await request(app.getApp())
      .post('/transfer')
      .send(data)
      .expect(res => {
        expect(res.body).toMatchObject({
          message: 'senderDocument is a required field.',
        });
        expect(res.body).toHaveProperty('message');
      })
      .expect(400);

    done();
  });

  it('Should not create one transfer when receiver document is empty', async done => {
    const data = {
      senderDocument: FakeDigitalAccount1.document,
      value: 10,
    };

    await request(app.getApp())
      .post('/transfer')
      .send(data)
      .expect(res => {
        expect(res.body).toMatchObject({
          message: 'receiverDocument is a required field.',
        });
        expect(res.body).toHaveProperty('message');
      })
      .expect(400);

    done();
  });

  it('Should not create one transfer when transferred value is empty', async done => {
    const data = {
      senderDocument: FakeDigitalAccount1.document,
      receiverDocument: FakeDigitalAccount2.document,
    };

    await request(app.getApp())
      .post('/transfer')
      .send(data)
      .expect(res => {
        expect(res.body).toMatchObject({
          message: 'value is a required field.',
        });
        expect(res.body).toHaveProperty('message');
      })
      .expect(400);

    done();
  });

  it('Should show history transfer by document', async done => {
    await request(app.getApp())
      .get(`/transfer/history/${FakeDigitalAccount2.document}`)
      .expect(res => {
        expect(res.body.length).toEqual(1);
      })
      .expect(200);

    done();
  });
});
