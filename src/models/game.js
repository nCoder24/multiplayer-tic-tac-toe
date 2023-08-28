const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

class Game {
  #players;
  #isOver;
  #hasWon;

  constructor(players) {
    this.#players = players;
    this.#isOver = false;
    this.#hasWon = false;
  }

  #checkIfWon() {
    const isCurrentPlayerMove = ([, symbol]) => {
      return symbol === this.#players.current().symbol;
    };

    const currentPlayerMoves = this.#players
      .moves()
      .filter(isCurrentPlayerMove)
      .map(([move]) => move);

    this.#hasWon = winningCombinations.some((combination) => {
      return combination.every((pos) => currentPlayerMoves.includes(pos));
    });
  }

  #checkIfOver() {
    this.#isOver = this.#players.moves().length === 9 || this.#hasWon;
  }

  makeMove(position) {
    this.#players.recordMove(position);

    this.#checkIfWon();
    this.#checkIfOver();

    if (!this.#isOver) {
      this.#players.switchTurn();
    }
  }

  status() {
    return {
      currentPlayer: this.#players.current(),
      moves: this.#players.moves(),
      isOver: this.#isOver,
      winner: this.#hasWon ? this.#players.current() : null,
      isTie: this.#isOver && !this.#hasWon,
    };
  }
}

module.exports = Game;
