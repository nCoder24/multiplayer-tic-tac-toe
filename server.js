const express = require("express");
const masterRouter = require("./src/routers/master-router");

const main = () => {
  const port = 8080;
  const app = express();

  app.use(masterRouter);

  app.listen(port, () => {
    console.log("listening on:", port);
  });
};

main();
