import AppError from '@shared/utils/AppError';
import { inject, injectable } from 'tsyringe';
import { cpf } from 'cpf-cnpj-validator';

import Transfer from '../infra/db/entities/Transfer';
import ITransferRepository from '../repositories/ITransferRepository';
import IDigitalAccountRepository from '../repositories/IDigitalAccountRepository';

@injectable()
export default class HistoryTransferService {
  constructor(
    @inject('TransferRepository')
    private transferRepository: ITransferRepository,
    @inject('DigitalAccountRepository')
    private digitalAccountRepository: IDigitalAccountRepository,
  ) {}

  public async run(document: string): Promise<Transfer[]> {
    if (!cpf.isValid(document))
      throw new AppError(`Document is not valid ${document}`);

    const cpfFormated = cpf.format(document);

    const digitalAccount = await this.digitalAccountRepository.getAccountByDocument(
      cpfFormated,
    );

    if (!digitalAccount)
      throw new AppError(
        `Account not initialized with document ${cpfFormated}`,
      );

    const transfers = await this.transferRepository.getByDocument(cpfFormated);

    return transfers;
  }
}
