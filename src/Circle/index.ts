import fetch, { Response } from "cross-fetch";
import { Base64 } from "js-base64";
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

  private _apiFetch(
    url: string,
    requestParams: RequestInit = {}
  ): Promise<Response> {
    const fetchParams: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Basic ${Base64.encode(`${this._token}:`)}`,
      },
    };
    return fetch(url, { ...fetchParams, ...requestParams });
  }

  private _validSlug(slug?: Slug): Slug {
    return slug || this._slug;
  }

  get token(): string {
    return this._token;
  }

  set token(val: string) {
    this._token = val;
  }

  /**
   * gets current user the token is associated with
   */
  public async me(): Promise<Response> {
    const url = `${this._circleApiUrl}/me`;
    const resp = await this._apiFetch(url);
    return resp;
  }

  /**
   * All job methods are in preview subject to change according to CircleCI's V2 API
   * https://circleci.com/docs/api/v2/#tag/Job
   *
   */
  public job = {
    get: async (jobNumber: number, projectSlug?: Slug): Promise<Response> => {
      const slug: string = this._validSlug(projectSlug).projectSlug;

      const resp = await this._apiFetch(
        `${this._circleApiUrl}/project/${slug}/job/${jobNumber}`
      );
      return resp;
    },
    /**
     * Cancels a job of a given number.
     * Cancels it for the given project if specified,
     * otherwise it will cancel the job number of the project the cli was initialized with.
     */
    cancel: async (
      jobNumber: number,
      projectSlug?: Slug
    ): Promise<Response> => {
      const slug: string = this._validSlug(projectSlug).projectSlug;

      const resp = await this._apiFetch(
        `${this._circleApiUrl}/project/${slug}/job/${jobNumber}`,
        { method: "POST" }
      );
      return resp;
    },
  };
}
