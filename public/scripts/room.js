const getPlayerList = () => document.querySelector("#players");
const getPlayButton = () => document.querySelector("#play-btn");
const getBoard = () => document.querySelector("#board");

const getRoomStatus = () => {
  return fetch(resolveURL("status")).then((res) => res.json());
};

const play = () => {
  return fetch(resolveURL("play"), { method: "POST" });
};

const renderPlayerCard = (card, { username, symbol }) => {
  const userElement = document.createElement("p");
  userElement.innerText = username;

  const symbolElement = document.createElement("p");
  symbolElement.innerText = symbol;

  card.append(userElement, symbolElement);
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

const renderRoom = (status) => {
  renderPlayerCards(status);
  renderPlayButton(status);
};

const main = () => {
  const playBtn = getPlayButton();
  playBtn.onclick = play;
  getRoomStatus().then(renderRoom);
};

window.onload = main;
