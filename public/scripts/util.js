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
