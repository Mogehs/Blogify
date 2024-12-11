const Comment = require("../models/commentsModel");

const add = async (req, res) => {
  try {
    const blogId = req.params.id;
    await Comment.create({
      content: req.body.content,
      blogId,
      author: req.id,
    });
    return res.redirect(`/blog/${blogId}`);
  } catch (e) {
    console.log("error in adding comment", e.message);
  }
};

module.exports = add;
