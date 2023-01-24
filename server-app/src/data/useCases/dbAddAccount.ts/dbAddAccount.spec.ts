import { describe, expect, it, vi } from "vitest";
import { DbAddAccount } from "./dbAddAccount";

describe("DbAddAccount", () => {
  it("Should call Encrypter with correct password", async () => {
    class EncrypterStub {
      encrypt(password: string): Promise<string> {
        return new Promise((resolve) => resolve("hashed_password"));
      }
    }
    const encrypterStub = new EncrypterStub();
    const encryptSpy = vi.spyOn(encrypterStub, "encrypt");
    const sut = new DbAddAccount(encrypterStub);
    const accountData = {
      username: "valid_username",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
});
