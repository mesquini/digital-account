import ICreateTransferValueDTO from '@modules/digital-account/dtos/ICreateTransferValueDTO';
import ITransferValueDTO from '@modules/digital-account/dtos/ITransferValueDTO';
import Transfer from '@modules/digital-account/infra/db/entities/Transfer';
import ITransferRepository from '@modules/digital-account/repositories/ITransferRepository';
import AppError from '@shared/utils/AppError';
import {
  FakeTransferValue1,
  FakeTransferValue2,
} from '../utils/FakeTransferValue';

export default class FakeTransferRepository implements ITransferRepository {
  private transfers: Transfer[] = [];

  constructor() {
    this.transfers.push(FakeTransferValue1);
    this.transfers.push(FakeTransferValue2);
  }

  async create({
    receiverDocument,
    senderDocument,
    availableValue,
    transferredValue,
  }: ICreateTransferValueDTO): Promise<Transfer> {
    try {
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
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async getByDocument(document: string): Promise<Transfer[]> {
    try {
      return this.transfers.filter(
        transfer =>
          transfer.senderDocument === document ||
          transfer.receiverDocument === document,
      );
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async findByTransferValue({
    receiverDocument,
    senderDocument,
    transferredValue,
  }: ITransferValueDTO): Promise<Transfer | null> {
    try {
      const findTransfer = this.transfers.find(
        transfer =>
          transfer.receiverDocument === receiverDocument &&
          transfer.senderDocument === senderDocument &&
          transfer.transferredValue === transferredValue,
      );

      return findTransfer || null;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}
