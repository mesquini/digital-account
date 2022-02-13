import { Request, Response } from 'express';
import { container } from 'tsyringe';

import HistoryTransferService from '@modules/digital-account/services/HistoryTransferService';
import TransferValueService from '@modules/digital-account/services/TransferValueService';

class TransferController {
  public async transferValue(req: Request, res: Response): Promise<Response> {
    const transferValueService = container.resolve(TransferValueService);

    const data = {
      ...req.body,
      transferredValue: req.body.value,
    };

    const transfer = await transferValueService.run(data);

    return res.status(201).json(transfer);
  }

  public async historyTransfer(req: Request, res: Response): Promise<Response> {
    const historyTransferService = container.resolve(HistoryTransferService);

    const transfers = await historyTransferService.run(req.params.document);

    return res.status(200).json(transfers);
  }
}

export default new TransferController();
