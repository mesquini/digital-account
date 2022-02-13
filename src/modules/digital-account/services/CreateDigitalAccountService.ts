import AppError from '@shared/utils/AppError';
import { inject, injectable } from 'tsyringe';
import { cpf } from 'cpf-cnpj-validator';

import ICreateDigitalAccountDTO from '../dtos/ICreateDigitalAccountDTO';
import DigitalAccount from '../infra/db/entities/DigitalAccount';
import IDigitalAccountRepository from '../repositories/IDigitalAccountRepository';

@injectable()
export default class CreateDigitalAccountService {
  constructor(
    @inject('DigitalAccountRepository')
    private digitalAccountRepository: IDigitalAccountRepository,
  ) {}

  public async run(data: ICreateDigitalAccountDTO): Promise<DigitalAccount> {
    if (!cpf.isValid(data.document))
      throw new AppError('Document is not valid');

    const cpfFormated = cpf.format(data.document);

    const digitalAccount = await this.digitalAccountRepository.getAccountByDocument(
      cpfFormated,
    );

    if (digitalAccount)
      throw new AppError(
        'There is already a digital account with this document',
      );

    data.document = cpfFormated;

    return this.digitalAccountRepository.createAccount(data);
  }
}
