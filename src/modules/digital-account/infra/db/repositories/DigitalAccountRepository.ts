import ICreateDigitalAccountDTO from "@modules/digital-account/dtos/ICreateDigitalAccountDTO";
import IDigitalAccountRepository from "@modules/digital-account/repositories/IDigitalAccountRepository";
import AppError from "@shared/utils/AppError";
import DigitalAccount from "../entities/DigitalAccount";

export default class DigitalAccountRepository implements IDigitalAccountRepository {
  private digitalAccounts: DigitalAccount[] = [];

  async createAccount(data: ICreateDigitalAccountDTO): Promise<DigitalAccount> {
    try {
      const digitalAccount = {
        id: new Date().getTime().toString(),
        ...data
      }

      this.digitalAccounts.push(digitalAccount);

      return digitalAccount;
    } catch (error: any) {
      throw new AppError(error.message)
    }
  }

  async updateAccount(data: DigitalAccount): Promise<DigitalAccount> {
    try {
      this.digitalAccounts.map(digitalAccount => {
        if(digitalAccount.id === data.id) return data;
        return digitalAccount;
      });

      return data;
    } catch (error: any) {
      throw new AppError(error.message)
    }
  }

  async getAccountById(id: string): Promise<DigitalAccount | null> {
     try {
      const digitalAccount = this.digitalAccounts.find(digitalAccount => digitalAccount.id === id);

      return digitalAccount || null;
    } catch (error: any) {
      throw new AppError(error.message)
    }
  }

  async getAccountByDocument(document: string): Promise<DigitalAccount | null> {
     try {
      const digitalAccount = this.digitalAccounts.find(digitalAccount => digitalAccount.document === document);

      return digitalAccount || null;
    } catch (error: any) {
      throw new AppError(error.message)
    }
  }  
}