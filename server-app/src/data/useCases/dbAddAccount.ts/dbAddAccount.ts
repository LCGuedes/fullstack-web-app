import { AccountModel } from "../../../domain/models/account";
import {
  AddAccount,
  AddAccountModel,
} from "../../../domain/useCases/addAccount";
import { Encrypter } from "../../protocols/encrypter";
import { AddAccountRepository } from "../../protocols/addAccountRepository";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly addAccountRepository: AddAccountRepository;
  constructor(
    encrypter: Encrypter,
    addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password);
    const newAccount = {
      ...account,
      password: hashedPassword,
    };
    await this.addAccountRepository.add(newAccount);
    return new Promise((resolve) =>
      resolve({ id: "", username: "", password: "" })
    );
  }
}
