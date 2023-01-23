import { describe, expect, it } from "vitest";
import { SignUpController } from "./signUp";

describe("SignUp", () => {
  it("Should return status 400 if name is not provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: { password: "any_pwd", confirmPassword: "any_confirmPwd" },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  it("Should return status 400 if password is not provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: { username: "any_username", confirmPassword: "any_confirmPwd" },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  it("Should return status 400 if confirmPassword is not provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: { username: "any_username", password: "any_pwd" },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  it("Should return status 400 if confirmPassword fails", () => {
    const sut = new SignUpController();
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
});
