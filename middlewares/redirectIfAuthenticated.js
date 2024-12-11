const redirectIfAuthenticated = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (token) {
    return res.status(401).redirect("/");
  }
  try {
    next();
  } catch (e) {
    console.error("Authentication error:", e.message);
    return res.status(403).redirect("/user/sign-in");
  }
};

module.exports = redirectIfAuthenticated;
