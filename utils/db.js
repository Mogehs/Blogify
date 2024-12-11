const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connection established successfully");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = dbConnect;
