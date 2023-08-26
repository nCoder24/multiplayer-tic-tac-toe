class Game {
  #players;

  constructor(players) {
    this.#players = players;
  }

  makeMove(position) {
    this.#players.recordMove(position);
    this.#players.switchTurn();
  }

  status() {
    return {
      currentPlayer: this.#players.current(),
      moves: this.#players.moves(),
    };
  }
}

module.exports = Game;
