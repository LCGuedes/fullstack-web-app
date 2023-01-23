import { AccountModel } from "../models/account";

export interface AddAccountModel {
  username: string;
  password: string;
}

export interface AddAccount {
  add(account: AddAccountModel): AccountModel;
}
