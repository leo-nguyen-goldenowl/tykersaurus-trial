const mongoose = require("mongoose");
const config = require("config");

const db = config.get("database");

const connectDB = async () => {
  try {
    await mongoose.connect(db.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);

    // Exit process with failure
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

module.exports = connectDB;
