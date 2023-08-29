const getJoinRoomForm = () => document.querySelector("#join-room-form");
const getCreateRoomBtn = () => document.querySelector("#create-room");
const getProfileSection = () => document.querySelector("#profile");

const createRoom = () => {
  fetch("", { method: "POST" })
    .then((res) => res.json())
    .then(({ id }) => redirect(id));
};

const joinRoom = ({ roomID }) => {
  redirect(roomID);
};

const setProfile = () => {
  const user = document.createElement("p");
  const link = document.createElement("a");
  const profileSection = getProfileSection();

  fetch("/auth/profile").then((res) => {
    if (!res.ok) {
      link.innerText = "Login";
      link.href = "/auth/login";
    }

    res.json().then(({ username }) => {
      user.innerText = username;
      link.href = "/auth/logout";
      link.innerText = "Logout";
    });
  });

  profileSection.append(user, link);
};

const main = () => {
  const createRoomBtn = getCreateRoomBtn();
  const joinRoomForm = getJoinRoomForm();

  createRoomBtn.onclick = createRoom;
  joinRoomForm.onsubmit = createFormSubmitter(joinRoom);

  setProfile();
};

window.onload = main;
