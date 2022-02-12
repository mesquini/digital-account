import AppError from "@shared/utils/AppError";
import { inject, injectable } from "tsyringe";
import { cpf } from 'cpf-cnpj-validator'; 

import IDigitalAccountRepository from "../repositories/IDigitalAccountRepository";
import ITransferValueDTO from "../dtos/ITransferValueDTO";
import ITransferRepository from "../repositories/ITransferRepository";
import Transfer from "../infra/db/entities/Transfer";
import moment from "moment";

@injectable()
export default class TransferValueService {
  constructor(
    @inject('DigitalAccountRepository')
    private digitalAccountRepository: IDigitalAccountRepository,
    @inject('TransferRepository')
    private transferRepository: ITransferRepository,
  ) {}

  public async run(data: ITransferValueDTO): Promise<Transfer> {
    
    if(!cpf.isValid(data.senderDocument))
     throw new AppError('Sender Document is not valid');

    if(!cpf.isValid(data.receiverDocument))
     throw new AppError('Receiver Document is not valid');

    const receiverCpfFormated = cpf.format(data.receiverDocument);
    const receiverDigitalAccount = await this.digitalAccountRepository.getAccountByDocument(receiverCpfFormated);    
    
    if (!receiverDigitalAccount) 
      throw new AppError('There is no digital account with this document: ' + receiverCpfFormated)
    
    const senderCpfFormated = cpf.format(data.senderDocument);
    const senderDigitalAccount = await this.digitalAccountRepository.getAccountByDocument(senderCpfFormated);
    
    if (!senderDigitalAccount) 
      throw new AppError('There is no digital account with this document: ' + senderCpfFormated)

    if(senderDigitalAccount.availableValue < data.value)
      throw new AppError(`Unavailable value of ${data.value}. Only ${senderDigitalAccount.availableValue} is available`)

    const transfer = await this.transferRepository.findByTransferValue({
      receiverDocument: receiverCpfFormated,
      senderDocument: senderCpfFormated,
      value: data.value,
    });

    if (transfer) {
      const nowDate = new Date();

      var diffDate = moment(nowDate,"DD/MM/YYYY HH:mm:ss").diff(moment(transfer.dateTime,"DD/MM/YYYY HH:mm:ss"));
      var diffMinutes = moment.duration(diffDate).asMinutes();

      if(diffMinutes <= 2) throw new AppError('Transfer duplicated');
    }

    receiverDigitalAccount.availableValue += data.value;
    senderDigitalAccount.availableValue -= data.value;

    await this.digitalAccountRepository.updateAccount(receiverDigitalAccount);
    await this.digitalAccountRepository.updateAccount(senderDigitalAccount);

    return this.transferRepository.create({
      receiverDocument: receiverCpfFormated,
      senderDocument: senderCpfFormated,
      value: senderDigitalAccount.availableValue,
    });
  }
}