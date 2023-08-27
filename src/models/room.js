const Game = require("./game");
const Player = require("./player");
const Players = require("./players");

class Room {
  #size;
  #members;
  #game;

  constructor(size) {
    this.#size = size;
    this.#members = new Set();
  }

  isFull() {
    return this.#members.size >= this.#size;
  }

  add(user) {
    this.#members.add(user);
  }

  startGame() {
    const members = [...this.#members];
    const player1 = new Player(members[0], "X");
    const player2 = new Player(members[1], "O");
    const players = new Players(player1, player2);

    this.#game = new Game(players);
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
