import GetHealth from '@modules/health/services/GetHealth';

describe('Get health information', () => {
  it('Should return Health: True if application is online', async done => {
    const healthGot = await GetHealth.execute();

    expect(healthGot).toBeDefined();
    expect(healthGot).toMatchObject({ health: 'True' });
    done();
  });
});
