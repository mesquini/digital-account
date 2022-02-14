import ICreateDigitalAccountDTO from '@modules/digital-account/dtos/ICreateDigitalAccountDTO';
import IDigitalAccountRepository from '@modules/digital-account/repositories/IDigitalAccountRepository';
import AppError from '@shared/utils/AppError';
import DigitalAccount from '../entities/DigitalAccount';

export default class DigitalAccountRepository
  implements IDigitalAccountRepository
{
  private digitalAccounts: DigitalAccount[] = [];

  async createAccount(data: ICreateDigitalAccountDTO): Promise<DigitalAccount> {
    const digitalAccount = {
      id: new Date().getTime().toString(),
      ...data,
    };

    this.digitalAccounts.push(digitalAccount);

    return digitalAccount;
  }

  async updateAccount(data: DigitalAccount): Promise<DigitalAccount> {
    this.digitalAccounts.map(digitalAccount => {
      if (digitalAccount.id === data.id) return data;
      return digitalAccount;
    });

    return data;
  }

  async getAccountByDocument(document: string): Promise<DigitalAccount | null> {
    const findDigitalAccount = this.digitalAccounts.find(
      digitalAccount => digitalAccount.document === document,
    );

    return findDigitalAccount || null;
  }
}
