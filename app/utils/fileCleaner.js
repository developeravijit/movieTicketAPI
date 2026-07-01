const cloudinary = require("../config/cloudinary");
const logger = require("./logger");

const fileCleaner = async (file) => {
  if (file?.filename) {
    try {
      await cloudinary.uploader.destroy(file.filename);
    } catch (error) {
      logger.error(error.message);
    }
  }
};

module.exports = fileCleaner;
