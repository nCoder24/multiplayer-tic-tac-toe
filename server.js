const Playground = require("./src/models/playground");
const { createApp } = require("./src/routers/app");
const { createAuthRouter } = require("./src/routers/auth-router");
const { createPlaygroundRouter } = require("./src/routers/playground-router");

const idGenerator = {
  i: 1,
  new() {
    return `${this.i++}`;
  },
};

const main = () => {
  const port = 8080;
  const playground = new Playground();
  const context = { playground, idGenerator };
  
  const playgroundRouter = createPlaygroundRouter(context);
  const authRouter = createAuthRouter();
  const app = createApp(authRouter, playgroundRouter);

  app.listen(port, () => {
    console.log("listening on:", port);
    console.log("local:", `http://localhost:8080`);
  });
};

main();
