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
        isTie: false,
      });
    });

    it("should record the move for the current player and alter turn", () => {
      game.makeMove(position);
      assert.deepStrictEqual(game.status(), {
        moves: players.moves(),
        currentPlayer: players.current(),
        isOver: false,
        winner: null,
        isTie: false,
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
        isTie: false,
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
        isTie: true,
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
        isTie: false,
      });
    });

    it("should should not be a tie if won", () => {
      const moves = [1, 2, 3, 7, 5, 6, 4, 8, 9];
      moves.forEach((pos) => game.makeMove(pos));

      assert.deepStrictEqual(game.status(), {
        moves: players.moves(),
        currentPlayer: players.current(),
        isOver: true,
        winner: { username: player1.username, symbol: player1.symbol },
        isTie: false,
      });
    });
  });

  describe("#checkWinner", () => {
    it("should be won if any winning combination is present in current player's moves", () => {
      const moveCombinations = [
        [1, 4, 2, 5, 3],
        [4, 1, 5, 2, 6],
        [7, 1, 8, 2, 9],
        [1, 2, 4, 3, 7],
        [2, 4, 5, 6, 8],
        [3, 1, 6, 2, 9],
        [1, 2, 5, 3, 9],
        [3, 1, 5, 2, 7],
        [5, 1, 3, 2, 7],
      ];

      moveCombinations.forEach((moves) => {
        player1 = new Player("player1", "X");
        player2 = new Player("player2", "O");
        players = new Players(player1, player2);
        game = new Game(players);

        moves.forEach((pos) => game.makeMove(pos));
        const { isOver, winner, isTie } = game.status();

        assert.ok(isOver);
        assert.ok(!isTie);
        assert.deepStrictEqual(winner, {
          username: player1.username,
          symbol: player1.symbol,
        });
      });
    });
  });
});
