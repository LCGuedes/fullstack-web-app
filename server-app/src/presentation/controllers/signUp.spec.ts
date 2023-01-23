import { describe, expect, it, vi } from "vitest";
import { SignUpController } from "./signUp";
import { AddAccount, AddAccountModel } from "../../domain/useCases/addAccount";
import { AccountModel } from "../../domain/models/account";

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: "valid_id",
        username: "valid_username",
        password: "valid_password",
      };
      return fakeAccount;
    }
  }
  return new AddAccountStub();
};

const makeSut = () => {
  const addAccountStub = makeAddAccountStub();
  const sut = new SignUpController(addAccountStub);
  return { sut, addAccountStub };
};

describe("SignUp", () => {
  it("Should return status 400 if name is not provided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { password: "any_pwd", confirmPassword: "any_confirmPwd" },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  it("Should return status 400 if password is not provided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { username: "any_username", confirmPassword: "any_confirmPwd" },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  it("Should return status 400 if confirmPassword is not provided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { username: "any_username", password: "any_pwd" },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  it("Should return status 400 if confirmPassword fails", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        username: "any_username",
        password: "any_pwd",
        confirmPassword: "any_different_pwd",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  it("Should call AddAccount with correct values", () => {
    const { sut, addAccountStub } = makeSut();
    const spy = vi.spyOn(addAccountStub, "add");

    const httpRequest = {
      body: {
        username: "any_username",
        password: "any_pwd",
        confirmPassword: "any_pwd",
      },
    };

    sut.handle(httpRequest);

    expect(spy).toBeCalledWith({
      username: "any_username",
      password: "any_pwd",
    });
  });
});
