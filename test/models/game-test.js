const assert = require("node:assert");
const { describe, it, beforeEach } = require("node:test");
const Player = require("../../src/models/player");
const Players = require("../../src/models/players");
const Game = require("../../src/models/game");

describe("Game", () => {
  let player1, player2, players, game;

  beforeEach(() => {
    player1 = new Player("player1", "X");
    player2 = new Player("player2", "O");
    players = new Players(player1, player2);
    game = new Game(players);
  });

  describe("makeMove", () => {
    const position = 9;

    it("should record the move for the current player", () => {
      game.makeMove(position);
      assert.deepStrictEqual(game.status().moves, [[position, player1.symbol]]);
    });

    it("should switch the turn after made the move", () => {
      const { username, symbol } = player2;
      game.makeMove(position);
      assert.deepStrictEqual(game.status().currentPlayer, { username, symbol });
    });
  });
});
