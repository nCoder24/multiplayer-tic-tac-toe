const assert = require("node:assert");
const { describe, it, beforeEach } = require("node:test");
const Playground = require("../../src/models/playground");

/* eslint-disable max-statements */
describe("Playground", () => {
  let playground;
  const id = "room";
  const user = "user";
  const otherUser = "user";
  const firstSymbol = "X";
  const secondSymbol = "O";

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
          currentPlayer: { username: user, symbol: firstSymbol },
          moves: [],
        },
      });
    });
  });

  describe("makeMove", () => {
    it("should make a move on the current game", () => {
      const position = 1;

      playground.createRoom(id);
      playground.joinRoom(id, user);
      playground.joinRoom(id, otherUser);
      playground.startGame(id);

      playground.makeMove(id, position);

      assert.deepStrictEqual(playground.roomStatus(id), {
        members: [user, otherUser],
        game: {
          currentPlayer: { username: otherUser, symbol: secondSymbol },
          moves: [[position, firstSymbol]],
        },
      });
    });
  });
});
