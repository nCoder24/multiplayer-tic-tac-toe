const getPlayerList = () => document.querySelector("#players");
const getPlayButton = () => document.querySelector("#play-btn");
const getBoard = () => document.querySelector("#board");

const getRoomStatus = () => {
  return fetch(resolveURL("status")).then((res) => res.json());
};

const startGame = () => {
  return fetch(resolveURL("play"), { method: "POST" });
};

const makeMove = ({ target }) => {
  const position = target.id.split("-")[1];

  return fetch(resolveURL("move"), {
    method: "POST",
    body: JSON.stringify({ position }),
    headers: { "content-type": "application/json" },
  });
};

const renderPlayerCard = (card, { username, symbol }) => {
  card.querySelector(".username").innerText = username;
  card.querySelector(".symbol").innerText = symbol;
};

const createPlayer = (member, symbol) => ({
  username: member || "",
  symbol: member ? symbol : "",
});

const renderPlayerCards = ({ members }) => {
  const playerList = getPlayerList();

  // TODO: handle it in backend
  const player1 = createPlayer(members[0], "X");
  const player2 = createPlayer(members[1], "O");

  renderPlayerCard(playerList.children[0], player1);
  renderPlayerCard(playerList.children[1], player2);
};

const renderPlayButton = ({ game, isFull }) => {
  const isReadyToPlay = () => isFull && (!game || game.isOver);
  const playBtn = getPlayButton();

  if (!isFull) {
    playBtn.disabled = true;
    return;
  }

  if (!isReadyToPlay()) {
    playBtn.hidden = true;
  }
};

const renderBoard = ({ game }) => {
  game.moves.forEach(([position, symbol]) => {
    board.querySelector(`#cell-${position}`).innerText = symbol;
  });
};

const renderAll = (status) => {
  renderPlayerCards(status);
  renderPlayButton(status);
  if(status.game) renderBoard(status);
};

const keepUpdating = () => {
  const update = () => getRoomStatus().then(renderAll);
  setInterval(update, 2000);
  update();
};

const main = () => {
  const playBtn = getPlayButton();
  const board = getBoard();

  playBtn.onclick = startGame;
  board.onclick = makeMove;

  keepUpdating();
};

window.onload = main;
