const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB);
    console.log("DB connected: ", connect.connection.host, connect.connection.name);
  } catch (error) {
    console.log(`Connection to DB failed: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
