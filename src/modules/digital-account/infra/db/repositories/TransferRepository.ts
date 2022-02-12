import ITransferValueDTO from "@modules/digital-account/dtos/ITransferValueDTO";
import ITransferRepository from "@modules/digital-account/repositories/ITransferRepository";
import AppError from "@shared/utils/AppError";
import Transfer from "../entities/Transfer";

export default class TransferRepository implements ITransferRepository {  
  private transfers: Transfer[] = [];

  async create({ receiverDocument, senderDocument, value }: ITransferValueDTO): Promise<Transfer> {
    try {
      const transfer = {
        id: new Date().getTime().toString(),
        receiverDocument, 
        senderDocument,
        availableValue: value,
        dateTime: new Date(),
      }

      this.transfers.push(transfer);

      return transfer;
    } catch (error: any) {
      throw new AppError(error.message)
    }
  }

  async getBySenderDocument(document: string): Promise<Transfer[]> {
    try {
      return this.transfers.filter(transfer => transfer.senderDocument === document)
    } catch (error: any) {
      throw new AppError(error.message)
    }
  }

  async findByTransferValue({ receiverDocument, senderDocument, value }: ITransferValueDTO): Promise<Transfer | null> {
    try {
      const transfer = this.transfers.find(transfer => 
        transfer.receiverDocument === receiverDocument &&
        transfer.senderDocument === senderDocument &&
        transfer.availableValue === value);

      return transfer || null;
    } catch (error: any) {
      throw new AppError(error.message)
    }
  }
  
}