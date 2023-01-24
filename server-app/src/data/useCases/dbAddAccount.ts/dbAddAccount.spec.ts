import { describe, expect, it, vi } from "vitest";
import { AccountModel } from "../../../domain/models/account";
import { AddAccountModel } from "../../../domain/useCases/addAccount";
import { Encrypter } from "../../protocols/encrypter";
import { DbAddAccount } from "./dbAddAccount";

import { AddAccountRepository } from "../../protocols/addAccountRepository";

const makeAddAccountRepositoryStub = () => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: "valid_id",
        username: "valid_username",
        password: "hashed_password",
      };
      return new Promise((resolve) => resolve(fakeAccount));
    }
  }
  return new AddAccountRepositoryStub();
};

const makeEncrypterStub = () => {
  class EncrypterStub implements Encrypter {
    encrypt(password: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncrypterStub();
};

interface sutTypes {
  addAccountRepositoryStub: AddAccountRepository;
  encrypterStub: Encrypter;
  sut: DbAddAccount;
}

const makeSut = (): sutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepositoryStub();
  const encrypterStub = makeEncrypterStub();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return { sut, encrypterStub, addAccountRepositoryStub };
};

describe("DbAddAccount", () => {
  it("Should call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = vi.spyOn(encrypterStub, "encrypt");
    const accountData = {
      username: "valid_username",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });

  it("Should throws if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    vi.spyOn(encrypterStub, "encrypt").mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    );
    const accountData = {
      username: "valid_username",
      password: "valid_password",
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });

  it("Should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const addSpy = vi.spyOn(addAccountRepositoryStub, "add");

    const accountData = {
      username: "valid_username",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(addSpy).toBeCalledWith({
      username: "valid_username",
      password: "hashed_password",
    });
  });
});
