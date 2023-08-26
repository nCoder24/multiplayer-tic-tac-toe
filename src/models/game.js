class Game {
  #players;
  #isOver;
  #winner;

  constructor(players) {
    this.#players = players;
    this.#isOver = false;
    this.#winner = null;
  }

  makeMove(position) {
    this.#players.recordMove(position);
    this.#players.switchTurn();
  }

  status() {
    return {
      currentPlayer: this.#players.current(),
      moves: this.#players.moves(),
      isOver: this.#isOver,
      winner: this.#winner,
    };
  }
}

module.exports = Game;
