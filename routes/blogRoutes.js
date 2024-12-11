const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  addBlog,
  getBlog,
  blogDetails,
} = require("../controllers/blogController");
const upload = require("../middlewares/upload");
const blogRouter = Router();

blogRouter.route("/add").get(authenticate, getBlog);
blogRouter
  .route("/add")
  .post(upload.single("coverphoto"), authenticate, addBlog);
blogRouter.route("/:id").get(authenticate, blogDetails);

module.exports = blogRouter;
