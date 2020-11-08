// eslint-disable-next-line @typescript-eslint/no-var-requires
const Circle = require("../dist/index").default;

const circle = Circle.init({
  token: "my-token", // https://app.circleci.com/settings/user/tokens
  repoName: "heythere",
});

async function main() {
  console.log(await circle.me());
}

main();
