import CreateDigitalAccountService from '@modules/digital-account/services/CreateDigitalAccountService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DigitalAccountController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createDigitalAccountService = container.resolve(
      CreateDigitalAccountService,
    );

    const digitalAccount = await createDigitalAccountService.run(req.body);

    return res.status(201).json(digitalAccount);
  }
}

export default new DigitalAccountController();
