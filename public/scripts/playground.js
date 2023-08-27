const getJoinRoomForm = () => document.querySelector("#join-room-form");
const getCreateRoomBtn = () => document.querySelector("#create-room");

const resolveURL = (url) => {
  return url.startsWith("/") ? url : `${window.location.href}/${url}`;
};

const redirect = (url) => {
  window.location.replace(resolveURL(url));
};

const createFormSubmitter = (handler) => {
  return (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = Object.fromEntries(new FormData(form));
    handler(formData);
  };
};

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
