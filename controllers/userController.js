const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    res.redirect("/user/sign-in");
  } catch (e) {
    console.log(e.message);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.render("login", {
        error: "User not found. Please check your email.",
      });
    }
    let matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.render("login", {
        error: "Incorrect password. Please try again.",
      });
    }
    let payload = {
      _id: user._id,
    };
    let secret = process.env.JWT_SECRET || "defaultSecret";
    let token = jwt.sign(payload, secret, { expiresIn: "1h" });
    res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "None",
        maxAge: 3600000,
      })
      .redirect("/");
  } catch (e) {
    return res.render("login", {
      error: "Incorrect email or password",
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: false,
    sameSite: "None",
  });

  res.redirect("/");
};

module.exports = {
  signup,
  signin,
  signout,
};
