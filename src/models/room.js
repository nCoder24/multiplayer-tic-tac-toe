class Room {
  #size;
  #members;

  constructor(size) {
    this.#size = size;
    this.#members = [];
  }

  isFull() {
    return this.#members.length >= this.#size;
  }

  add(user) {
    this.#members.push(user);
  }

  status() {
    return { members: [...this.#members] };
  }
}

module.exports = Room;
