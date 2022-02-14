import 'reflect-metadata';
import AppError from '@shared/utils/AppError';
import { inject, injectable } from 'tsyringe';
import { cpf } from 'cpf-cnpj-validator';

import moment from 'moment';
import IDigitalAccountRepository from '../repositories/IDigitalAccountRepository';
import ITransferValueDTO from '../dtos/ITransferValueDTO';
import ITransferRepository from '../repositories/ITransferRepository';
import Transfer from '../infra/db/entities/Transfer';

@injectable()
export default class TransferValueService {
  constructor(
    @inject('DigitalAccountRepository')
    private digitalAccountRepository: IDigitalAccountRepository,
    @inject('TransferRepository')
    private transferRepository: ITransferRepository,
  ) {}

  public async run(data: ITransferValueDTO): Promise<Transfer> {
    if (!cpf.isValid(data.senderDocument))
      throw new AppError(`Sender Document is not valid ${data.senderDocument}`);

    if (!cpf.isValid(data.receiverDocument))
      throw new AppError(
        `Receiver Document is not valid ${data.receiverDocument}`,
      );

    const receiverCpfFormated = cpf.format(data.receiverDocument);
    const receiverDigitalAccount =
      await this.digitalAccountRepository.getAccountByDocument(
        receiverCpfFormated,
      );

    if (!receiverDigitalAccount)
      throw new AppError(
        `There is no digital account with this document: ${receiverCpfFormated}`,
        404,
      );

    const senderCpfFormated = cpf.format(data.senderDocument);
    const senderDigitalAccount =
      await this.digitalAccountRepository.getAccountByDocument(
        senderCpfFormated,
      );

    if (!senderDigitalAccount)
      throw new AppError(
        `There is no digital account with this document: ${senderCpfFormated}`,
        404,
      );

    if (senderDigitalAccount.availableValue < data.transferredValue)
      throw new AppError(
        `Unavailable value of ${data.transferredValue}. Only ${senderDigitalAccount.availableValue} is available`,
      );

    const transfer = await this.transferRepository.findByTransferValue({
      receiverDocument: receiverCpfFormated,
      senderDocument: senderCpfFormated,
      transferredValue: data.transferredValue,
    });

    if (transfer) {
      const nowDate = new Date();

      const diffDate = moment(nowDate, 'DD/MM/YYYY HH:mm:ss').diff(
        moment(transfer.dateTime, 'DD/MM/YYYY HH:mm:ss'),
      );
      const diffMinutes = moment.duration(diffDate).asMinutes();

      if (diffMinutes <= 2) throw new AppError('Transfer duplicated');
    }

    receiverDigitalAccount.availableValue += data.transferredValue;
    senderDigitalAccount.availableValue -= data.transferredValue;

    await this.digitalAccountRepository.updateAccount(receiverDigitalAccount);
    await this.digitalAccountRepository.updateAccount(senderDigitalAccount);

    return this.transferRepository.create({
      receiverDocument: receiverCpfFormated,
      senderDocument: senderCpfFormated,
      availableValue: senderDigitalAccount.availableValue,
      transferredValue: data.transferredValue,
    });
  }
}
