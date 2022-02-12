import Health from '../entities/Health';

class GetHealth {
  public async execute(): Promise<Health> {
    const healthStatus = new Health();

    healthStatus.health = 'True';
    healthStatus.version = '1.0.0';

    return healthStatus;
  }
}

export default new GetHealth();
