const express = require("express");
const path = require("path");
const ejs = require("ejs");
require("dotenv").config();
const dbConnect = require("./utils/db");
const userRouter = require("./routes/userRoutes");
const homeRouter = require("./routes/homeRoutes");
const blogRouter = require("./routes/blogRoutes");
const commentRouter = require("./routes/commentRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve("./public")));

app.use(cookieParser());
app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

app.listen(PORT, "0.0.0.0", () => {
  dbConnect();
  console.log("Listening at PORT " + PORT);
});
