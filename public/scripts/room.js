const getPlayerList = () => document.querySelector("#players");
const getPlayButton = () => document.querySelector("#play-btn");
const getBoard = () => document.querySelector("#board");

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

const renderPlayerCard = (card, { username, symbol }, { currentPlayer }) => {
  if (username === currentPlayer?.username) {
    card.classList.add("current");
  } else {
    card.classList.remove("current");
  }

  card.querySelector(".username").innerText = username;
  card.querySelector(".symbol").innerText = symbol;
};

const createPlayer = (member, symbol) => ({
  username: member || "",
  symbol: member ? symbol : "",
});

const renderPlayerCards = ({ members, game }) => {
  const playerList = getPlayerList();

  // TODO: handle it in backend
  const player1 = createPlayer(members[0], "X");
  const player2 = createPlayer(members[1], "O");

  renderPlayerCard(playerList.children[0], player1, game);
  renderPlayerCard(playerList.children[1], player2, game);
};

const renderPlayButton = ({ game, isFull }) => {
  const playBtn = getPlayButton();

  playBtn.disabled = !isFull;
  playBtn.hidden = !(isFull && (!game || game.isOver));
};

const renderBoard = ({ game }) => {
  const symbols = new Map(game.moves);
  const board = getBoard();

  board.querySelectorAll(".cell").forEach((cell, pos) => {
    const symbol = symbols.get(pos + 1);
    if (symbol) {
      cell.innerText = symbol;
      cell.classList.add("marked");
    } else {
      cell.innerText = "";
      cell.classList.remove("marked");
    }
  });
};

const renderAll = (status) => {
  renderPlayerCards(status);
  renderPlayButton(status);
  if (status.game) renderBoard(status);
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
