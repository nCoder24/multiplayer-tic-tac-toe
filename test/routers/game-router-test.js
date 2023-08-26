const request = require("supertest");
const { describe, it } = require("node:test");
const { createGameRouter } = require("../../src/routers/game-router");
const { createApp } = require("../../src/routers/app");

describe("Game API", () => {
  describe("POST /game/random", () => {
    it("should create a new game request", (_, done) => {
      const gameRouter = createGameRouter();
      const app = createApp(gameRouter);

      request(app).post("/game/random").expect(202).end(done);
    });
  });
});
