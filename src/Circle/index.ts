import fetch from "cross-fetch";
import { Base64 } from "js-base64";
import { job } from "../job";
import { ISlugParams, Slug } from "../utils/Slug";
export interface ICircleParams extends ISlugParams {
  token: string;
  circleApiUrl?: string;
}
export class Circle {
  static init({
    token,
    vcs,
    orgName,
    repoName,
    circleApiUrl,
  }: ICircleParams): Circle {
    return new Circle({ token, vcs, orgName, repoName, circleApiUrl });
  }

  private _token: string;
  private _slug: Slug;
  private _circleApiUrl: string;

  constructor({
    token,
    vcs,
    orgName,
    repoName,
    circleApiUrl = "https://circleci.com/api/v2",
  }: ICircleParams) {
    this._token = token;
    this._slug = new Slug({ vcs, orgName, repoName });
    this._circleApiUrl = circleApiUrl;
  }

  private _apiFetch(url: string) {
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Base64.encode(`${this._token}:`)}`,
      },
    });
  }

  get token(): string {
    return this._token;
  }

  set token(val: string) {
    this._token = val;
  }

  public async me(): Promise<unknown> {
    const url = `${this._circleApiUrl}/me`;
    const resp = await this._apiFetch(url);
    return await resp.json();
  }

  public job = job;
}
