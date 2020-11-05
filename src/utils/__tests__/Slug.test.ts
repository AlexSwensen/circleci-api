import { Slug } from "../Slug";
import { VCSProvider } from "../vcs";
describe("Slug class instance", () => {
  it("should set default properties correctly", () => {
    const slug = new Slug({ orgName: "foobar" });

    expect(slug).toBeDefined();
    expect(slug.orgSlug).toEqual("gh/foobar");
    expect(slug.projectSlug).toEqual("gh/foobar/undefined");
  });
  it("should set values correctly when they are passed in", () => {
    const slug = new Slug({
      vcs: VCSProvider.bitbucket,
      orgName: "foobar",
      repoName: "my-project",
    });

    expect(slug).toBeDefined();
    expect(slug.orgSlug).toEqual("bb/foobar");
    expect(slug.projectSlug).toEqual("bb/foobar/my-project");
  });
});
