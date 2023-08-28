const getPlayerList = () => document.querySelector("#players");
const getPlayButton = () => document.querySelector("#play-btn");
const getBoard = () => document.querySelector("#board");
const getGameOverDialog = () => document.querySelector("#game-over-dialog");

const getRoomStatus = () => {
  return fetch(resolveURL("status")).then((res) => res.json());
};

const startGame = () => {
  return fetch(resolveURL("play"), { method: "POST" });
};

const makeMove = (position) => {
  return fetch(resolveURL("move"), {
    method: "POST",
    body: JSON.stringify({ position }),
    headers: { "content-type": "application/json" },
  });
};

const renderPlayerCard = (card, member, game) => {
  if (!member) return;
  // TODO: remove if else
  if (member.username === game?.currentPlayer.username) {
    card.classList.add("current");
  } else {
    card.classList.remove("current");
  }

  card.querySelector(".username").innerText = member.username;
  card.querySelector(".symbol").innerText = member.symbol;
};

const renderPlayerCards = ({ members, game }) => {
  const playerList = getPlayerList();

  renderPlayerCard(playerList.children[0], members[0], game);
  renderPlayerCard(playerList.children[1], members[1], game);
};

const renderBoard = ({ game }) => {
  if (!game) return;

  const symbols = new Map(game.moves);
  const board = getBoard();

  board.querySelectorAll(".cell").forEach((cell, pos) => {
    const symbol = symbols.get(pos + 1);
    // TODO: remove if else
    if (symbol) {
      cell.innerText = symbol;
      cell.classList.add("marked");
    } else {
      cell.innerText = "";
      cell.classList.remove("marked");
    }
  });
};

const displayGameOverDialog = ({ game }) => {
  const gameOverDialog = getGameOverDialog();
  gameOverDialog.close();

  if (game.isOver) {
    gameOverDialog.showModal();
  }
};

const renderAll = (status) => {
  renderPlayerCards(status);
  displayGameOverDialog(status);
  renderBoard(status);
};

const update = () => {
  getRoomStatus().then(renderAll);
};

const keepUpdating = () => {
  setInterval(update, 2000);
  update();
};

const attachListeners = () => {
  const playBtn = getPlayButton();
  const board = getBoard();

  playBtn.onclick = () => {
    startGame();
    update();
  };

  board.querySelectorAll(".cell").forEach((cell, pos) => {
    cell.onclick = () => {
      if (cell.classList.contains("marked")) return;
      makeMove(pos + 1);
      update();
    };
  });
};

const main = () => {
  attachListeners();
  keepUpdating();
};

window.onload = main;
