import { Request, Response } from 'express';

import GetHealth from '../../../services/GetHealth';

export default class GetHealthController {
  public async handle(_: Request, res: Response): Promise<Response> {
    const reqContract = await GetHealth.execute();

    return res.status(200).json(reqContract);
  }
}
