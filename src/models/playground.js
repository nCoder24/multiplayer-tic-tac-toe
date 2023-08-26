class Playground {
  #rooms;

  constructor() {
    this.#rooms = new Map();
  }

  createRoom(id) {
    this.#rooms.set(id, {users: []});
  }

  room(id) {
    return this.#rooms.get(id);
  }
}

module.exports = Playground;
