import { VCSProvider } from "./vcs";

export interface ISlugParams {
  /**
   * vcs = Version Control System.
   * CircleCI supports both github and bitbucket.
   * defaults to github (`gh`) if done is defined.
   */
  vcs?: VCSProvider;
  orgName: string;
  repoName?: string;
}
/**
 * testing
 */
export class Slug {
  private _vcsProvider: VCSProvider;
  private orgName: string;
  private repoName?: string;
  constructor({
    vcs = VCSProvider.github,
    orgName,
    repoName = undefined,
  }: ISlugParams) {
    this._vcsProvider = vcs;
    this.orgName = orgName;
    if (repoName) {
      this.repoName = repoName;
    }
  }

  public get orgSlug(): string {
    return `${this._vcsProvider}/${this.orgName}`;
  }

  public get projectSlug(): string {
    return `${this.orgSlug}/${this.repoName}`;
  }
}
