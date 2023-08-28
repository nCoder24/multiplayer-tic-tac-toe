const checkIfCurrentPlayer = (req, res, next) => {
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

module.exports = { checkIfCurrentPlayer };
