const getPlayerList = () => document.querySelector("#players");

const getRoomStatus = () => {
  const url = resolveURL("status");
  return fetch(url, { method: "GET" }).then((res) => res.json());
};

const displayPlayerCard = (card, { username, symbol }) => {
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

const displayPlayerCards = (members) => {
  const playerList = getPlayerList();

  // TODO: handle it in backend
  const player1 = createPlayer(menubars[0], "X");
  const player2 = createPlayer(menubars[1], "O");

  displayPlayerCard(playerList.children[0], player1);
  displayPlayerCard(playerList.children[1], player2);
};

const renderRoom = ({ members }) => {
  displayPlayerCards(members);
};

const main = () => {
  getRoomStatus().then(renderRoom);
};

window.onload = main;
