const { Router } = require("express");
const redirectIfAuthenticate = require("../middlewares/redirectIfAuthenticated");
const { signup, signin, signout } = require("../controllers/userController");

const userRouter = Router();

userRouter.route("/sign-up").get(redirectIfAuthenticate, (req, res) => {
  res.render("signup");
});

userRouter.route("/sign-up").post(signup);

userRouter.route("/sign-in").get(redirectIfAuthenticate, (req, res) => {
  res.render("login");
});

userRouter.route("/sign-in").post(signin);

userRouter.route("/sign-out").get(signout);

module.exports = userRouter;
