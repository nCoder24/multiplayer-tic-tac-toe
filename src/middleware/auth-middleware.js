const checkAuthenticated = (req, res, next) => {
  const username = req.cookies.username;

  if (!username) {
    res.redirect("/auth/login");
    return;
  }

  next();
};

const checkNotAuthenticated = (req, res, next) => {
  const username = req.cookies.username;

  if (username) {
    res.redirect("/");
    return;
  }

  next();
};

module.exports = { checkAuthenticated, checkNotAuthenticated };
