const User = require("../models/userModel");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentsModel");

const getBlog = async (req, res) => {
  let userId = req.id;
  try {
    let user = await User.findOne({ _id: userId });
    if (user) {
      return res.render("blog", { user });
    }
    return res.redirect("/user/sign-in");
  } catch (e) {
    console.log(e.message);
    return res.redirect("/user/sign-in");
  }
};

const addBlog = async (req, res) => {
  let userId = req.id;
  const { title, body } = req.body;
  try {
    await Blog.create({
      title,
      body,
      createdBy: userId,
      coverImageUrl: `/uploads/${req.file.filename}`,
    });
    return res.redirect("/");
  } catch (e) {
    console.log(e.message);
  }
};

const blogDetails = async (req, res) => {
  let userId = req.id;
  let blogId = req.params.id;
  try {
    let user = await User.findOne({ _id: userId });
    let blog = await Blog.findOne({ _id: blogId }).populate("createdBy");
    let comments = await Comment.find({ blogId }).populate("author");
    if (!user) {
      return res.render("blogDetails", { blog, comments });
    }
    return res.render("blogDetails", { user, blog, comments });
  } catch (e) {
    console.log(e.message);
  }
};
module.exports = { getBlog, addBlog, blogDetails };
