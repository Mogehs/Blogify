const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const homePage = require("../controllers/homeController");
const homeRouter = Router();

homeRouter.route("/").get(authenticate, homePage);

module.exports = homeRouter;
