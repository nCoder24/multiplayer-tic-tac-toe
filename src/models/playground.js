const Room = require("./room");

class Playground {
  #rooms;

  constructor() {
    this.#rooms = new Map();
  }

  #room(id) {
    return this.#rooms.get(id);
  }

  createRoom(id) {
    this.#rooms.set(id, new Room(2));
  }

  joinRoom(id, user) {
    this.#room(id).add(user);
  }

  startGame(id) {
    this.#room(id).startGame();
  }

  makeMove(id, position) {
    this.#room(id).makeMove(position);
  }

  roomStatus(id) {
    return this.#room(id).status();
  }

  has(id) {
    return this.#rooms.has(id);
  }
}

module.exports = Playground;
