import ICreateDigitalAccountDTO from '@modules/digital-account/dtos/ICreateDigitalAccountDTO';
import DigitalAccount from '@modules/digital-account/infra/db/entities/DigitalAccount';
import IDigitalAccountRepository from '@modules/digital-account/repositories/IDigitalAccountRepository';
import AppError from '@shared/utils/AppError';
import {
  FakeDigitalAccount1,
  FakeDigitalAccount2,
} from '../utils/FakeDigitalAccount';

export default class FakeDigitalAccountRepository
  implements IDigitalAccountRepository
{
  private digitalAccounts: DigitalAccount[] = [];

  constructor() {
    this.digitalAccounts.push(FakeDigitalAccount1);
    this.digitalAccounts.push(FakeDigitalAccount2);
  }

  async createAccount(data: ICreateDigitalAccountDTO): Promise<DigitalAccount> {
    try {
      const digitalAccount = {
        id: new Date().getTime().toString(),
        ...data,
      };

      this.digitalAccounts.push(digitalAccount);

      return digitalAccount;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async updateAccount(data: DigitalAccount): Promise<DigitalAccount> {
    try {
      this.digitalAccounts.map(digitalAccount => {
        if (digitalAccount.id === data.id) return data;
        return digitalAccount;
      });

      return data;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async getAccountById(id: string): Promise<DigitalAccount | null> {
    try {
      const findDigitalAccount = this.digitalAccounts.find(
        digitalAccount => digitalAccount.id === id,
      );

      return findDigitalAccount || null;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async getAccountByDocument(document: string): Promise<DigitalAccount | null> {
    try {
      const findDigitalAccount = this.digitalAccounts.find(
        digitalAccount => digitalAccount.document === document,
      );

      return findDigitalAccount || null;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}
