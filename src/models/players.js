class Players {
  #players;

  constructor(player1, player2) {
    this.#players = [player1, player2];
  }

  #current() {
    return this.#players[0];
  }

  switchTurn() {
    this.#players.reverse();
  }

  recordMove(position) {
    this.#current().recordMove(position);
  }

  moves() {
    return this.#players.flatMap((player) =>
      player.moves.map((pos) => [pos, player.symbol])
    );
  }

  current() {
    const { username, symbol } = this.#current();
    return { username, symbol };
  }
}

module.exports = Players;
