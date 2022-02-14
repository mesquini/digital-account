import ICreateTransferValueDTO from '@modules/digital-account/dtos/ICreateTransferValueDTO';
import ITransferValueDTO from '@modules/digital-account/dtos/ITransferValueDTO';
import ITransferRepository from '@modules/digital-account/repositories/ITransferRepository';
import AppError from '@shared/utils/AppError';
import Transfer from '../entities/Transfer';

export default class TransferRepository implements ITransferRepository {
  private transfers: Transfer[] = [];

  async create({
    receiverDocument,
    senderDocument,
    availableValue,
    transferredValue,
  }: ICreateTransferValueDTO): Promise<Transfer> {
    const transfer = {
      id: new Date().getTime().toString(),
      receiverDocument,
      senderDocument,
      availableValue,
      transferredValue,
      dateTime: new Date(),
    };

    this.transfers.push(transfer);

    return transfer;
  }

  async getByDocument(document: string): Promise<Transfer[]> {
    return this.transfers.filter(
      transfer =>
        transfer.senderDocument === document ||
        transfer.receiverDocument === document,
    );
  }

  async findByTransferValue({
    receiverDocument,
    senderDocument,
    transferredValue,
  }: ITransferValueDTO): Promise<Transfer | null> {
    const findTransfer = this.transfers.find(
      transfer =>
        transfer.receiverDocument === receiverDocument &&
        transfer.senderDocument === senderDocument &&
        transfer.transferredValue === transferredValue,
    );

    return findTransfer || null;
  }
}
