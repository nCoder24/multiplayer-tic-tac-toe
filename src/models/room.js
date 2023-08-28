const Game = require("./game");
const Player = require("./player");
const Players = require("./players");

class Room {
  #size;
  #members;
  #game;

  constructor(size) {
    this.#size = size;
    this.#members = [];
  }

  isFull() {
    return this.#members.length >= this.#size;
  }

  has(username) {
    return this.#members.map((user) => user.username).includes(username);
  }

  add(user) {
    if (this.has(user.username)) return; // TODO: handle with middleware
    this.#members.push(user);
  }

  startGame() {
    if (!this.isFull()) return; // TODO: handle with middleware

    const players = this.#members.map(
      ({ username, symbol }) => new Player(username, symbol)
    );

    this.#game = new Game(new Players(...players));
  }

  makeMove(position) {
    this.#game.makeMove(position);
  }

  status() {
    return {
      members: [...this.#members],
      game: this.#game?.status(),
      isFull: this.isFull(),
    };
  }
}

module.exports = Room;
