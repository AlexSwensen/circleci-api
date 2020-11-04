export class Circle {
  static init({ token }: { token: string }): Circle {
    return new Circle({ token });
  }

  private _token: string;
  constructor({ token }: { token: string }) {
    this._token = token;
  }

  get token(): string {
    return this._token;
  }

  set token(val: string) {
    this._token = val;
  }
}
