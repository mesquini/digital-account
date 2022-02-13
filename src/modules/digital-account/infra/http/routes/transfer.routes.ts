import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import TypeMessage from '../../../../../shared/utils/TypeMessage';
import TransferController from '../controllers/TransferController';

const transferRouters = Router();

transferRouters.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      receiverDocument: Joi.string()
        .required()
        .error(err => TypeMessage(err, 'receiverDocument')),
      senderDocument: Joi.string()
        .required()
        .error(err => TypeMessage(err, 'senderDocument')),
      value: Joi.number()
        .required()
        .error(err => TypeMessage(err, 'value')),
    },
  }),
  TransferController.transferValue,
);

transferRouters.get(
  '/history/:document',
  celebrate({
    [Segments.PARAMS]: {
      document: Joi.string()
        .required()
        .error(err => TypeMessage(err, 'document')),
    },
  }),
  TransferController.historyTransfer,
);

export default transferRouters;
