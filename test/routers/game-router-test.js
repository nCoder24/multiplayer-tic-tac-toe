const request = require("supertest");
const { describe, it, beforeEach } = require("node:test");
const { createGameRouter } = require("../../src/routers/game-router");
const { createApp } = require("../../src/routers/app");
const Playground = require("../../src/models/playground");

describe("Game API", () => {
  let gameRouter, app, context, playground, idGenerator;

  beforeEach(() => {
    playground = new Playground();
    idGenerator = {
      i: 1,
      new() {
        return `${this.i++}`;
      },
    };

    context = { playground, idGenerator };
    gameRouter = createGameRouter(context);
    app = createApp(gameRouter);
  });

  describe("POST /room", () => {
    it("should create a new room for game", (_, done) => {
      request(app)
        .post("/room")
        .expect(201)
        .expect({ id: "1" })
        .end(done);
    });
  });

  describe("GET /room/:id", () => {
    it("should join a room", (_, done) => {
      request(app)
        .get("/room/1")
        .expect(200)
        .end(done);
    });
  });
});
