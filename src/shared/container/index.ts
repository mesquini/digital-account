import { container } from 'tsyringe';

import DigitalAccountRepository from '@modules/digital-account/infra/db/repositories/DigitalAccountRepository';
import IDigitalAccountRepository from '@modules/digital-account/repositories/IDigitalAccountRepository';

container.registerSingleton<IDigitalAccountRepository>(
  'DigitalAccountRepository',
  DigitalAccountRepository,
);
