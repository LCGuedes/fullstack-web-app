export class SignUpController {
  handle(httpRequest: any): any {
    const { username, password } = httpRequest;
    if (!username) return { statusCode: 400 };
    if (!password) return { statusCode: 400 };
  }
}
