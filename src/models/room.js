class Room {
  #size;
  #members;

  constructor(size) {
    this.#size = size;
    this.#members = [];
  }

  details() {
    return { members: [...this.#members] };
  }
}

module.exports = Room;
