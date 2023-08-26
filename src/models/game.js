class Game {
  #players;
  #status;

  constructor(players) {
    this.#players = players;
    this.#status = {};
  }

  #isTie() {
    return this.#players.moves().length === 9;
  }

  #updateStatus() {
    this.#status.currentPlayer = this.#players.current();
    this.#status.moves = this.#players.moves();
    this.#status.isOver = this.#isTie();
    this.#status.winner = null;
  }

  makeMove(position) {
    this.#players.recordMove(position);
    this.#players.switchTurn();
  }

  // TODO: change it to getter (maybe)
  status() {
    this.#updateStatus();
    return this.#status;
  }
}

module.exports = Game;
