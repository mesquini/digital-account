import ITransferValueDTO from "../dtos/ITransferValueDTO";
import Transfer from "../infra/db/entities/Transfer";

export default interface ITransferRepository {
  create(data: ITransferValueDTO): Promise<Transfer>;
  getBySenderDocument(document: string): Promise<Transfer[]>;
  findByTransferValue(data: ITransferValueDTO): Promise<Transfer | null>;
}