const request = require("supertest");
const assert = require("node:assert");

const { describe, it } = require("node:test");
const { createApp } = require("../../src/routers/app");
const Playground = require("../../src/models/playground");
const {
  createPlaygroundRouter,
} = require("../../src/routers/playground-router");
const { createAuthRouter } = require("../../src/routers/auth-router");

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
  const id = "1";

  describe("GET /playground", () => {
    it("should get the playground home", (_, done) => {
      request(app)
        .get("/playground")
        .set("Cookie", `username=${username}`)
        .expect(200)
        .end(done);
    });

    it("should be redirected to the playground home for root url", (_, done) => {
      request(app)
        .get("/")
        .set("Cookie", `username=${username}`)
        .expect(302)
        .expect("location", "/playground")
        .end(done);
    });

    it("should get access to playground pages if not authenticated", (_, done) => {
      request(app)
        .get("/playground")
        .expect(302)
        .expect("location", "/auth/login")
        .end(done);
    });
  });

  describe("POST /playground", () => {
    it("should create a new room for game", (_, done) => {
      request(app)
        .post("/playground")
        .set("Cookie", `username=${username}`)
        .expect(201)
        .expect({ id })
        .end(done);
    });
  });

  describe("GET /playground/:id", () => {
    it("should join a room", (_, done) => {
      request(app)
        .get(`/playground/${id}`)
        .set("Cookie", `username=${username}`)
        .expect(200)
        .end(done);
    });

    it("should send error for non existing room req", (_, done) => {
      request(app)
        .get(`/playground/${5}`)
        .set("Cookie", `username=${username}`)
        .expect(404)
        .end(done);
    });

    it("should start game if not started but has enough members", (_, done) => {
      request(app)
        .get(`/playground/${id}`)
        .set("Cookie", `username=${otherUsername}`)
        .expect(200)
        .end((err) => {
          assert.ok(playground.roomStatus(id).game);
          done(err);
        });
    });
  });

  describe("GET /playground/:id/status", () => {
    it("should get the updated status", (_, done) => {
      const expectedBody = {
        members: [
          { username, symbol: "X" },
          { username: otherUsername, symbol: "O" },
        ],
        game: {
          currentPlayer: { username: "user1", symbol: "X" },
          moves: [],
          isOver: false,
          winner: null,
          isTie: false,
        },
        isFull: true,
      };

      request(app)
        .get(`/playground/${id}/status`)
        .set("Cookie", `username=${username}`)
        .expect(200)
        .expect(expectedBody)
        .end(done);
    });

    it("should not send info to other than members", (_, done) => {
      request(app)
        .get(`/playground/${id}/status`)
        .set("Cookie", `username=something`)
        .expect(403)
        .end(done);
    });
  });

  describe("POST /playground/:id/play", () => {
    it("should start the game with the current members", (_, done) => {
      request(app)
        .post(`/playground/${id}/play`)
        .set("Cookie", `username=${username}`)
        .expect(204)
        .end(done);
    });
  });

  describe("POST /playground/:id/move", () => {
    it("should make move for the current player", (_, done) => {
      const position = 1;
      request(app)
        .post(`/playground/${id}/move`)
        .set("Cookie", `username=${username}`)
        .send({ position })
        .expect(204)
        .end(done);
    });

    it("should not make move for other than current player", (_, done) => {
      const position = 2;
      request(app)
        .post(`/playground/${id}/move`)
        .set("Cookie", `username=${username}`)
        .send({ position })
        .expect(403)
        .end(done);
    });
  });
});
