import ICreateDigitalAccountDTO from '../dtos/ICreateDigitalAccountDTO';
import DigitalAccount from '../infra/db/entities/DigitalAccount';

export default interface IDigitalAccountRepository {
  createAccount(data: ICreateDigitalAccountDTO): Promise<DigitalAccount>;
  updateAccount(data: DigitalAccount): Promise<DigitalAccount>;
  getAccountByDocument(document: string): Promise<DigitalAccount | null>;
}
