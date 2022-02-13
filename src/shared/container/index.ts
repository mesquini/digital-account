import { container } from 'tsyringe';

import DigitalAccountRepository from '@modules/digital-account/infra/db/repositories/DigitalAccountRepository';
import IDigitalAccountRepository from '@modules/digital-account/repositories/IDigitalAccountRepository';

import ITransferRepository from '@modules/digital-account/repositories/ITransferRepository';
import TransferRepository from '@modules/digital-account/infra/db/repositories/TransferRepository';

container.registerSingleton<IDigitalAccountRepository>(
  'DigitalAccountRepository',
  DigitalAccountRepository,
);

container.registerSingleton<ITransferRepository>(
  'TransferRepository',
  TransferRepository,
);
