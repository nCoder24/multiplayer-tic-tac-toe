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
  const app = createApp(authRouter, playgroundRouter);
  const username = "user";

  describe("GET /auth/login", () => {
    it("should get login page", (_, done) => {
      request(app).get("/auth/login").expect(200).end(done);
    });

    it("should be redirected to home if already authenticated", (_, done) => {
      request(app)
        .get("/auth/login")
        .set("Cookie", `username=${username}`)
        .expect(302)
        .expect("location", "/")
        .end(done);
    });
  });

  describe("POST /auth/login", () => {
    it("should set an cookie on the user-agent", (_, done) => {
      request(app)
        .post("/auth/login")
        .send({ username })
        .expect(201)
        .expect("set-cookie", new RegExp(`username=${username}`))
        .end(done);
    });

    it("should be redirected to home if already authenticated", (_, done) => {
      request(app)
        .get("/auth/login")
        .set("Cookie", `username=${username}`)
        .expect(302)
        .expect("location", "/")
        .end(done);
    });
  });
});
