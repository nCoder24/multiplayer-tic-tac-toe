const { createApp } = require("./src/routers/app");
const { createGameRouter } = require("./src/routers/game-router");

const main = () => {
  const port = 8080;
  const gameRouter = createGameRouter();
  const app = createApp(gameRouter);

  app.listen(port, () => {
    console.log("listening on:", port);
  });
};

main();
