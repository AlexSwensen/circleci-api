import Circle from "../index";
describe("Circle Class", () => {
  describe("init function", () => {
    it("should return a new instance of Circle Class", () => {
      const circleInstance = Circle.init({
        token: "my token",
        orgName: "my-org",
      });
      expect(circleInstance).toBeDefined();
      expect(circleInstance instanceof Circle).toBeTruthy();
    });
  });
});
