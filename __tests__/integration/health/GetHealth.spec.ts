import request from 'supertest';
import App from '@shared/infra/http/App';

describe('Verify status health connection', () => {
  it('Should return Health: True if application is running', async done => {
    const app = new App();
    await request(app.getApp())
      .get('/health')
      .expect(function response(res) {
        expect(res.body).toMatchObject({ health: 'True', version: '1.0.0' });
      })
      .expect(200);

    done();
  });
});
