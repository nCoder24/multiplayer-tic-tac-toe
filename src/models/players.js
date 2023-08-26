class Players {
  #players;

  constructor(player1, player2) {
    this.#players = [player1, player2];
  }

  switchTurn() {
    this.#players.reverse();
  }

  get current() {
    return this.#players[0];
  }
}

module.exports = Players;
