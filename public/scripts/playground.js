const getJoinRoomForm = () => document.querySelector("#join-room-form");
const getCreateRoomBtn = () => document.querySelector("#create-room");

const createRoom = () => {
  fetch("", { method: "POST" })
    .then((res) => res.json())
    .then(({ id }) => redirect(id));
};

const joinRoom = ({ roomID }) => {
  redirect(roomID);
};

const main = () => {
  const createRoomBtn = getCreateRoomBtn();
  const joinRoomForm = getJoinRoomForm();

  createRoomBtn.onclick = createRoom;
  joinRoomForm.onsubmit = createFormSubmitter(joinRoom);
};

window.onload = main;
