import ICreateDigitalAccountDTO from "../dtos/ICreateDigitalAccountDTO";
import ITransferValueDTO from "../dtos/ITransferValueDTO";
import DigitalAccount from "../infra/db/entities/DigitalAccount";

export default interface IDigitalAccountRepository {
  createAccount(data: ICreateDigitalAccountDTO): Promise<DigitalAccount>;
  updateAccount(data: DigitalAccount): Promise<DigitalAccount>;
  getAccountById(id: string): Promise<DigitalAccount | null>;
  getAccountByDocument(document: string): Promise<DigitalAccount | null>;
}