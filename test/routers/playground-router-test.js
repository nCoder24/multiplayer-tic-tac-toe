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
  const playgroundRouter = createPlaygroundRouter(context);
  const authRouter = createAuthRouter();
  const app = createApp(authRouter, playgroundRouter);

  describe("GET /playground", () => {
    it("should get the playground home", (_, done) => {
      request(app).get("/playground").expect(200).end(done);
    });
  });

  describe("POST /playground", () => {
    it("should create a new room for game", (_, done) => {
      request(app)
        .post("/playground")
        .expect(201)
        .expect({ id: "1" })
        .end(done);
    });
  });

  describe("GET /playground/:id", () => {
    it("should join a room", (_, done) => {
      request(app)
        .get("/playground/1")
        .set("Cookie", `username=${username}`)
        .expect(200)
        .end(done);
    });
  });

  describe("GET /playground/:id", () => {
    it("should get the updated status", (_, done) => {
      const expectedBody = {
        members: [username],
        isFull: false,
      };

      request(app)
        .get("/playground/1/status")
        .expect(200)
        .expect(expectedBody)
        .end(done);
    });
  });

  describe("POST /playground/:id/play", () => {
    it("should start the game with the current members", (_, done) => {
      request(app)
        .get("/playground/1")
        .set("Cookie", `username=${otherUsername}`)
        .end(() => {
          request(app).post("/playground/1/play").expect(204).end(done);
        });
    });
  });

  describe("POST /playground/:id/move", () => {
    it("should start the game with the current members", (_, done) => {
      const position = 1;
      request(app)
        .post("/playground/1/move")
        .send({ position })
        .expect(204)
        .end(done);
    });
  });
});
