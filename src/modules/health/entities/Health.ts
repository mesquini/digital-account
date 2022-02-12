import IHealthDTO from '../dtos/IHealthDTO';

export default class Health implements IHealthDTO {
  public health: string;

  public version: string;

  constructor() {
    return {
      health: this.health,
      version: this.version,
    };
  }
}
