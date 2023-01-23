import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ["username", "password", "confirmPassword"];
    for (const field of requiredFields) {
      if (!httpRequest.body[field])
        return {
          statusCode: 400,
        };
    }
    const { password, confirmPassword } = httpRequest.body;
    if (password !== confirmPassword) return { statusCode: 400 };
    return { statusCode: 200 };
  }
}
