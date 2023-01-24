import { describe, expect, it, vi } from "vitest";
import { Encrypter } from "../../protocols/encrypter";
import { DbAddAccount } from "./dbAddAccount";

const makeEncrypterStub = () => {
  class EncrypterStub implements Encrypter {
    encrypt(password: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncrypterStub();
};

interface sutTypes {
  encrypterStub: Encrypter;
  sut: DbAddAccount;
}

const makeSut = (): sutTypes => {
  const encrypterStub = makeEncrypterStub();
  const sut = new DbAddAccount(encrypterStub);
  return { sut, encrypterStub };
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
});
