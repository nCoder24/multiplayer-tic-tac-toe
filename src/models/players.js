class Players {
  #players;

  constructor(player1, player2) {
    this.#players = [player1, player2];
  }

  switchTurn() {
    this.#players.reverse();
  }

  recordMove(position) {
    this.current.recordMove(position);
  }

  get moves() {
    return new Map(this.#players.flatMap((player) =>
      player.moves.map((pos) => [pos, player])
    ));
  }

  get current() {
    return this.#players[0];
  }
}

module.exports = Players;
