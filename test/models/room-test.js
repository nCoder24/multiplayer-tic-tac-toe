const assert = require("node:assert");
const { describe, it, beforeEach } = require("node:test");
const Room = require("../../src/models/room");

describe("Room", () => {
  const user = "user1";
  const otherUser = "user2";
  const firstSymbol = "X";
  const secondSymbol = "O";
  let room;

  beforeEach(() => {
    room = new Room(2);
  });

  describe("add", () => {
    it("should add a member for the first time", () => {
      room.add(user);
      assert.deepStrictEqual(room.status(), {
        members: [user],
        game: undefined,
        isFull: false,
      });
    });

    it("should add a member after the existing members", () => {
      room.add(user);
      room.add(otherUser);

      assert.deepStrictEqual(room.status(), {
        members: [user, otherUser],
        game: undefined,
        isFull: true,
      });
    });

    it("should not add duplicate members", () => {
      room.add(user);
      room.add(user);

      assert.deepStrictEqual(room.status(), {
        members: [user],
        game: undefined,
        isFull: false,
      });
    });
  });

  describe("isFull", () => {
    it("should be false if room is empty", () => {
      assert.ok(!room.isFull());
    });

    it("should be false if number of members is less than the size", () => {
      room.add(user);
      assert.ok(!room.isFull());
    });

    it("should be true if number of members hit the room size", () => {
      room.add(user);
      room.add(otherUser);
      assert.ok(room.isFull());
    });
  });

  describe("startGame", () => {
    it("should start a game", () => {
      room.add(user);
      room.add(otherUser);
      room.startGame();

      assert.deepStrictEqual(room.status(), {
        members: [user, otherUser],
        game: {
          currentPlayer: { username: user, symbol: firstSymbol },
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
    it("should make move in ongoing game", () => {
      const position = 1;

      room.add(user);
      room.add(otherUser);
      room.startGame();
      room.makeMove(position);

      assert.deepStrictEqual(room.status(), {
        members: [user, otherUser],
        game: {
          currentPlayer: { username: otherUser, symbol: secondSymbol },
          moves: [[position, firstSymbol]],
          isOver: false,
          winner: null,
          isTie: false,
        },
        isFull: true,
      });
    });
  });
});
