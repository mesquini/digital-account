import ICreateTransferValueDTO from '../dtos/ICreateTransferValueDTO';
import ITransferValueDTO from '../dtos/ITransferValueDTO';
import Transfer from '../infra/db/entities/Transfer';

export default interface ITransferRepository {
  create(data: ICreateTransferValueDTO): Promise<Transfer>;
  getByDocument(document: string): Promise<Transfer[]>;
  findByTransferValue(data: ITransferValueDTO): Promise<Transfer | null>;
}
