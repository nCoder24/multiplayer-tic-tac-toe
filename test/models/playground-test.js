const assert = require("node:assert");
const { describe, it, beforeEach } = require("node:test");
const Playground = require("../../src/models/playground");

describe("Playground", () => {
  let playground;
  const id = "room";
  const user = { username: "user1", symbol: "X" };
  const otherUser = { username: "user2", symbol: "O" };
  const firstSymbol = "X";

  beforeEach(() => {
    playground = new Playground();
  });

  describe("createRoom", () => {
    it("should create a new room with new id", () => {
      playground.createRoom(id);
      assert.deepStrictEqual(playground.roomStatus(id), {
        members: [],
        game: undefined,
        isFull: false,
      });
    });
  });

  describe("joinRoom", () => {
    it("should join an existing room", () => {
      playground.createRoom(id);
      playground.joinRoom(id, user);

      assert.deepStrictEqual(playground.roomStatus(id), {
        members: [user],
        game: undefined,
        isFull: false,
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
          currentPlayer: user,
          moves: [],
          isOver: false,
          winner: null,
          isTie: false,
        },
        isFull: true,
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
          currentPlayer: otherUser,
          moves: [[position, firstSymbol]],
          isOver: false,
          winner: null,
          isTie: false,
        },
        isFull: true,
      });
    });
  });

  describe("has", () => {
    it("should be true if room exists", () => {
      playground.createRoom(id);
      assert.ok(playground.has(id));
    });

    it("should be false if room does not exists", () => {
      assert.ok(!playground.has(id));
    });
  });
});
