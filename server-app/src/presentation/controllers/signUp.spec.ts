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
  it("Should return status 500 if AddAccount throws", () => {
    const { sut, addAccountStub } = makeSut();
    const spy = vi.spyOn(addAccountStub, "add").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        username: "any_username",
        password: "any_pwd",
        confirmPassword: "any_pwd",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });
  it("Should return status 200 if valid data is provided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        username: "valid_username",
        password: "valid_pwd",
        confirmPassword: "valid_pwd",
      },
    };

    const httpRespose = sut.handle(httpRequest);
    expect(httpRespose.statusCode).toBe(200);
    expect(httpRespose.body).toEqual({
      id: "valid_id",
      username: "valid_username",
      password: "valid_password",
    });
  });
});
