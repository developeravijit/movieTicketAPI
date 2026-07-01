const User = require("../model/user");
const httpCodes = require("../utils/httpCodes");

const secretKeyCheck = async (req, res, next) => {
  try {
    const secretKey = req.headers["x-api-key"];

    if (!secretKey) {
      return res.status(httpCodes.unauthorized).json({
        success: false,
        message: "Secret Key required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(httpCodes.not_found).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.secretKey !== secretKey) {
      return res.status(httpCodes.unauthorized).json({
        success: false,
        message: "Invalid Secret Key",
      });
    }

    next();
  } catch (error) {
    return res.status(httpCodes.server_error).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = secretKeyCheck;
