const mongoose = require("mongoose");
const logger = require("../utils/logger");
const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info(`Database Connected URI ${process.env.MONGODB_URI}`);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = DbConnect;
