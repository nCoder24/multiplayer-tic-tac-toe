const assert = require("node:assert");
const { describe, it, beforeEach } = require("node:test");
const Room = require("../../src/models/room");

describe("Room", () => {
  const user = "user1";
  const otherUser = "user1";
  let room;

  beforeEach(() => {
    room = new Room(2);
  });

  describe("add", () => {
    it("should add a member for the first time", () => {
      room.add(user);
      assert.deepStrictEqual(room.status(), { members: [user] });
    });

    it("should add a member after the existing members", () => {
      room.add(user);
      room.add(otherUser);
      assert.deepStrictEqual(room.status(), { members: [user, otherUser] });
    });
  });

  describe("isFull", () => {
    it("should be false if room is empty", () => {
      assert.ok(!room.isFull());
    });

    it("should be false if number of members is less than the size", () => {
      room.add(user);
      assert.ok(!room.isFull());
    });

    it("should be true if number of members hit the room size", () => {
      room.add(user);
      room.add(otherUser);
      assert.ok(room.isFull());
    });
  });
});
