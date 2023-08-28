const checkCurrentPlayer = (req, res, next) => {
  const id = req.params.id;
  const username = req.cookies.username;
  const playground = req.context.playground;
  const currentPlayerUsername =
    playground.roomStatus(id).game.currentPlayer.username;

  if (currentPlayerUsername !== username) {
    res.sendStatus(403);
    return;
  }

  next();
};

const checkRoomExists = (req, res, next) => {
  const id = req.params.id;
  const playground = req.context.playground;

  if (!playground.has(id)) {
    res.status(404).send("invalid room ID!");
    return;
  }

  next();
};

const checkRoomMember = (req, res, next) => {
  const id = req.params.id;
  const username = req.cookies.username;
  const playground = req.context.playground;
  const roomMember = playground
    .roomStatus(id)
    .members.find((member) => member.username === username);

  if (!roomMember) {
    res.sendStatus(403);
    return;
  }

  next();
};

module.exports = { checkCurrentPlayer, checkRoomExists, checkRoomMember };
