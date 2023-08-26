const Room = require("./room");

class Playground {
  #rooms;

  constructor() {
    this.#rooms = new Map();
  }

  createRoom(id) {
    this.#rooms.set(id, new Room(2));
  }

  joinRoom(id) {
    this.#rooms.get(id)?.add(id);
  }

  getRoom(id) {
    return this.#rooms.get(id)?.details();
  }

}

module.exports = Playground;
