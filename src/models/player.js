class Player {
  #username;
  #symbol;
  #moves;

  constructor(username, symbol) {
    this.#username = username;
    this.#symbol = symbol;
    this.#moves = [];
  }

  recordMove(position) {
    this.#moves.push(position);
  }

  get moves() {
    return [...this.#moves];
  }

  get symbol() {
    return this.#symbol;
  }

  get username() {
    return this.#username;
  }

  static fromJSON({username, symbol, moves}) {
    const player = new Player(username, symbol);
    player.#moves = [...moves];
    return player;
  }
}

module.exports = Player;
