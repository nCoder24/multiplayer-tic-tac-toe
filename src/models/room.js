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
    this.#game = null;
  }

  isFull() {
    return this.#members.length >= this.#size;
  }

  add(user) {
    this.#members.push(user);
  }

  startGame() {
    const player1 = new Player(this.#members[0], "X");
    const player2 = new Player(this.#members[1], "O");
    const players = new Players(player1, player2);

    this.#game = new Game(players);
  }

  status() {
    return { members: [...this.#members], game: this.#game?.status() || null };
  }
}

module.exports = Room;
