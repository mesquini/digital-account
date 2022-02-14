import 'dotenv/config';
import request from 'supertest';

import App from '@shared/infra/http/App';

const app = new App();

describe('Integration Test of Get Contract Info', () => {
  it('Should return Health: True if application is running', async done => {
    await request(app.getApp())
      .get('/health')
      .expect(function (res) {
        expect(res.body).toMatchObject({ health: 'True' });
      })
      .expect(200);

    done();
  });
});
