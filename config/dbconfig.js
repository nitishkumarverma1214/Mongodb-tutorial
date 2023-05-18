const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // after the port we can mention the database name
    await mongoose.connect("mongodb://localhost:27017/Netflix");
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
