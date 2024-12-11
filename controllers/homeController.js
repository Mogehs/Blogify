const User = require("../models/userModel");
const Blog = require("../models/blogModel");

const homePage = async (req, res) => {
  let user = await User.findOne({ _id: req.id });
  let blogs = await Blog.find({});
  if (!user) {
    return res.render("home", { blogs });
  }
  return res.render("home", { user, blogs });
};

module.exports = homePage;
