const { describe, it } = require("node:test");
const request = require("supertest");
const express = require("express");
const masterRouter = require("../../src/routers/master-router");

describe("Game API", () => {
  const app = express();
  app.use(masterRouter);

  describe("GET /game/random", () => {
    it("should create a new game request", (_, done) => {
      request(app).post("/game/random").expect(202).end(done);
    });
  });
});
