import { AddAccount } from "../../domain/useCases/addAccount";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount;
  constructor(addAccount: AddAccount) {
    this.addAccount = addAccount;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["username", "password", "confirmPassword"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field])
          return {
            statusCode: 400,
          };
      }
      const { username, password, confirmPassword } = httpRequest.body;
      if (password !== confirmPassword) return { statusCode: 400 };
      const account = await this.addAccount.add({ username, password });
      return { statusCode: 200, body: account };
    } catch (error) {
      return { statusCode: 500 };
    }
  }
}
