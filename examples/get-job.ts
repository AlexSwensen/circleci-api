import Circle from "@alexswensen/circleci-api";

const circle = Circle.init({ token: "foobar" });
const job = circle.job();

console.log(job);
