const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../../src/routers/app");
const Playground = require("../../src/models/playground");
const {
  createPlaygroundRouter,
} = require("../../src/routers/playground-router");
const { createAuthRouter } = require("../../src/routers/auth-router");

/* eslint-disable max-statements */
describe("Playground API", () => {
  const username = "user1";
  const otherUsername = "user2";
  const playground = new Playground();
  const idGenerator = {
    i: 1,
    new() {
      return `${this.i++}`;
    },
  };

  const context = { playground, idGenerator };
  const gameRouter = createPlaygroundRouter(context);
  const authRouter = createAuthRouter();
  const app = createApp(gameRouter, authRouter);

  describe("POST /room", () => {
    it("should create a new room for game", (_, done) => {
      request(app).post("/room").expect(201).expect({ id: "1" }).end(done);
    });
  });

  describe("GET /room/:id", () => {
    it("should join a room", (_, done) => {
      request(app)
        .get("/room/1")
        .set("Cookie", `username=${username}`)
        .expect(200)
        .end(done);
    });
  });

  describe("TRACE /room/:id", () => {
    it("should get the updated status", (_, done) => {
      const expectedBody = {
        members: [username],
        game: null,
      };

      request(app).trace("/room/1").expect(200).expect(expectedBody).end(done);
    });
  });

  describe("POST /room/:id/play", () => {
    it("should start the game with the current members", (_, done) => {
      request(app)
        .get("/room/1")
        .set("Cookie", `username=${otherUsername}`)
        .end(() => {
          request(app).post("/room/1/play").expect(204).end(done);
        });
    });
  });

  describe("POST /room/:id/move", () => {
    it("should start the game with the current members", (_, done) => {
      const position = 1;
      request(app)
        .post("/room/1/move")
        .send({ position })
        .expect(204)
        .end(done);
    });
  });
});
