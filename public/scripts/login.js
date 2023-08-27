const getLoginFrom = () => document.querySelector("#login-form");

const loginUser = ({ username }) => {
  fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username }),
    headers: { "content-type": "application/json" },
  }).then(() => redirect("/playground"));
};

const main = () => {
  const loginForm = getLoginFrom();
  loginForm.onsubmit = createFormSubmitter(loginUser);
};

window.onload = main;
