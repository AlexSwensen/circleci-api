import { VCSProvider } from "../vcs";
describe("vcs enum", () => {
  it("should evaluate to the correct string", () => {
    expect(VCSProvider.github).toEqual("gh");
    expect(VCSProvider.bitbucket).toEqual("bb");
  });
});
