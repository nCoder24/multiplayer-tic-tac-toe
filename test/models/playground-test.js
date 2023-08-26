const assert = require("node:assert");
const { describe, it, beforeEach } = require("node:test");
const Playground = require("../../src/models/playground");

describe("Playground", () => {
  let playground;
  const id = "room";
  const user = "user";
  const otherUser = "user";

  beforeEach(() => {
    playground = new Playground();
  });

  describe("createRoom", () => {
    it("should create a new room with new id", () => {
      playground.createRoom(id);
      assert.deepStrictEqual(playground.roomStatus(id), {
        members: [],
        game: null,
      });
    });
  });

  describe("joinRoom", () => {
    it("should join an existing room", () => {
      playground.createRoom(id);
      playground.joinRoom(id, user);

      assert.deepStrictEqual(playground.roomStatus(id), {
        members: [user],
        game: null,
      });
    });
  });

  describe("startGame", () => {
    it("should start an game with current players", () => {
      playground.createRoom(id);
      playground.joinRoom(id, user);
      playground.joinRoom(id, otherUser);

      playground.startGame(id);

      assert.deepStrictEqual(playground.roomStatus(id), {
        members: [user, otherUser],
        game: {
          currentPlayer: { username: user, symbol: "X" },
          moves: [],
        },
      });
    });
  });
});
