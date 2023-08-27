const { createApp } = require("./src/routers/app");
const { createPlaygroundRouter } = require("./src/routers/game-router");

const main = () => {
  const port = 8080;
  const playgroundRouter = createPlaygroundRouter();
  const app = createApp(playgroundRouter);

  app.listen(port, () => {
    console.log("listening on:", port);
  });
};

main();
