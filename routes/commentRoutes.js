const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const add = require("../controllers/commentController");
const commentRouter = Router();

commentRouter.route("/add/:id").post(authenticate, add);

module.exports = commentRouter;
