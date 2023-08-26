const assert = require("node:assert");
const { describe, it, beforeEach } = require("node:test");
const Player = require("../../src/models/player");
const Players = require("../../src/models/players");

describe("Players", () => {
  const player1 = new Player("player1", "X");
  const player2 = new Player("player2", "O");
  let players;

  beforeEach(() => {
    players = new Players(player1, player2);
  });

  describe("switchTurn", () => {
    it("should get the first player if not switched turn", () => {
      const { username, symbol } = player1;
      assert.deepStrictEqual(players.current, { username, symbol });
    });

    it("should select the next player on switch turn", () => {
      const { username, symbol } = player2;
      players.switchTurn();
      assert.deepStrictEqual(players.current, { username, symbol });
    });

    it("should alter between players on switch turn", () => {
      const { username, symbol } = player1;
      players.switchTurn();
      players.switchTurn();
      assert.deepStrictEqual(players.current, { username, symbol });
    });
  });

  describe("recordMove", () => {
    it("should record the move for current player", () => {
      const position = 1;
      players.recordMove(position);
      assert.deepStrictEqual(
        [...players.moves],
        [[position, players.current.symbol]]
      );
    });
  });
});
