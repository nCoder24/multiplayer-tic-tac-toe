const assert = require("node:assert");
const { describe, it } = require("node:test");
const Player = require("../../src/models/player");

describe("Player", () => {
  const username = "player1";
  const symbol = "X";
  const position = 3;
  const otherPosition = 4;

  describe("recordMove", () => {
    it("should record a move for the player", () => {
      const player = new Player(username, symbol);
      player.recordMove(position);
      assert.deepStrictEqual(player.moves, [position]);
    });

    it("should record a move after the existing moves", () => {
      const player = Player.fromJSON({ username, symbol, moves: [position] });
      player.recordMove(otherPosition);
      assert.deepStrictEqual(player.moves, [position, otherPosition]);
    });
  });
});
