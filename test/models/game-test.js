const assert = require("node:assert");
const { describe, it, beforeEach } = require("node:test");
const Player = require("../../src/models/player");
const Players = require("../../src/models/players");
const Game = require("../../src/models/game");

describe("Game", () => {
  let player1, player2, players, game;
  // TODO: make both independent

  beforeEach(() => {
    player1 = new Player("player1", "X");
    player2 = new Player("player2", "O");
    players = new Players(player1, player2);
    game = new Game(players);
  });

  describe("makeMove", () => {
    const position = 9;

    it("should not be over and have no winner if no moves are made", () => {
      assert.deepStrictEqual(game.status(), {
        moves: players.moves(),
        currentPlayer: players.current(),
        isOver: false,
        winner: null,
      });
    });

    it("should record the move for the current player and alter turn", () => {
      game.makeMove(position);
      assert.deepStrictEqual(game.status(), {
        moves: players.moves(),
        currentPlayer: players.current(),
        isOver: false,
        winner: null,
      });
    });

    it("should switch the turn back to first player on even move", () => {
      game.makeMove(position);
      game.makeMove(position + 1);

      assert.deepStrictEqual(game.status(), {
        moves: players.moves(),
        currentPlayer: players.current(),
        isOver: false,
        winner: null,
      });
    });

    it("should be tie if maximum (9) moves are made", () => {
      const moves = [1, 2, 3, 7, 5, 6, 4, 9, 8];
      moves.forEach((pos) => game.makeMove(pos));

      assert.deepStrictEqual(game.status(), {
        moves: players.moves(),
        currentPlayer: players.current(),
        isOver: true,
        winner: null,
      });
    });

    it("should win if player moves match an winning combination", () => {
      const moves = [1, 4, 2, 5, 3];
      moves.forEach((pos) => game.makeMove(pos));

      assert.deepStrictEqual(game.status(), {
        moves: players.moves(),
        currentPlayer: players.current(),
        isOver: true,
        winner: { username: player1.username, symbol: player1.symbol },
      });
    });
  });
});
