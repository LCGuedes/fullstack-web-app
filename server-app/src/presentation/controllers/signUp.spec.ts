import { describe, expect, it, vi } from "vitest";
import { SignUpController } from "./signUp";
import { AddAccount, AddAccountModel } from "../../domain/useCases/addAccount";
import { AccountModel } from "../../domain/models/account";

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: "valid_id",
        username: "valid_username",
        password: "valid_password",
      };
      return new Promise((resolve) => resolve(fakeAccount));
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
  it("Should return status 400 if name is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { password: "any_pwd", confirmPassword: "any_confirmPwd" },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it("Should return status 400 if password is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { username: "any_username", confirmPassword: "any_confirmPwd" },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it("Should return status 400 if confirmPassword is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { username: "any_username", password: "any_pwd" },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it("Should return status 400 if confirmPassword fails", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        username: "any_username",
        password: "any_pwd",
        confirmPassword: "any_different_pwd",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it("Should call AddAccount with correct values", async () => {
    const { sut, addAccountStub } = makeSut();
    const spy = vi.spyOn(addAccountStub, "add");

    const httpRequest = {
      body: {
        username: "any_username",
        password: "any_pwd",
        confirmPassword: "any_pwd",
      },
    };

    await sut.handle(httpRequest);

    expect(spy).toBeCalledWith({
      username: "any_username",
      password: "any_pwd",
    });
  });

  it("Should return status 500 if AddAccount throws", async () => {
    const { sut, addAccountStub } = makeSut();
    vi.spyOn(addAccountStub, "add").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        username: "any_username",
        password: "any_pwd",
        confirmPassword: "any_pwd",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });

  it("Should return status 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        username: "valid_username",
        password: "valid_pwd",
        confirmPassword: "valid_pwd",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "valid_id",
      username: "valid_username",
      password: "valid_password",
    });
  });
});
