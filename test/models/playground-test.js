const assert = require("node:assert");
const { describe, it } = require("node:test");
const Playground = require("../../src/models/playground");

describe("Playground", () => {
  describe("createRoom", () => {
    it("should create a new room with new id", () => {
      const playground = new Playground();
      const id = "room";
      playground.createRoom(id);
      assert.deepStrictEqual(playground.room(id), { users: [] });
    });
  });
});
