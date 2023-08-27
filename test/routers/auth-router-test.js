const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../../src/routers/app");
const { createAuthRouter } = require("../../src/routers/auth-router");
const {
  createPlaygroundRouter,
} = require("../../src/routers/playground-router");

describe("AuthRouter", () => {
  const playgroundRouter = createPlaygroundRouter();
  const authRouter = createAuthRouter();
  const app = createApp(playgroundRouter, authRouter);
  const username = "user";

  describe("POST /auth/login", () => {
    it("should set an cookie on the user-agent", (_, done) => {
      request(app)
        .post("/auth/login")
        .send({ username })
        .expect(201)
        .expect("set-cookie", new RegExp(`username=${username}`))
        .end(done);
    });
  });
});
