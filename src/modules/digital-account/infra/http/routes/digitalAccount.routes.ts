import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import TypeMessage from '../../../../../shared/utils/TypeMessage';
import DigitalAccountController from '../controllers/DigitalAccountController';

const digitalAccountRouters = Router();

digitalAccountRouters.post('/',celebrate({
    [Segments.BODY]: {
      name: Joi.string()
        .required()
        .error(err => TypeMessage(err, 'name')),
      document: Joi.string()
        .required()
        .error(err => TypeMessage(err, 'document')),
      availableValue: Joi.number()
        .required()
        .error(err => TypeMessage(err, 'availableValue')),
    },
  }), DigitalAccountController.create);

export default digitalAccountRouters;