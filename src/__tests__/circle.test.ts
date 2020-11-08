import { Circle } from "../Circle/index";
describe("Circle instance", () => {
  it("should have a token getter", () => {
    const token = "asdf1234";
    const circle = Circle.init({ token, orgName: "my-org" });
    expect(circle.token).toEqual(token);
  });
  it("should have a setter", () => {
    const token = "asdf1234";
    const circle = Circle.init({ token, orgName: "my-org" });
    expect(circle.token).toEqual(token);
    circle.token = "foobar";
    expect(circle.token).toEqual("foobar");
  });
});
