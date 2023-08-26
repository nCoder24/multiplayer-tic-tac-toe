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
      assert.strictEqual(players.current, player1);
    });

    it("should select the next player on switch turn", () => {
      players.switchTurn();
      assert.strictEqual(players.current, player2);
    });

    it("should alter between players on switch turn", () => {
      players.switchTurn();
      players.switchTurn();
      assert.strictEqual(players.current, player1);
    });
  });
});
