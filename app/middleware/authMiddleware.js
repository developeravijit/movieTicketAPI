const jwt = require("jsonwebtoken");
const httpCodes = require("../utils/httpCodes");

const authCheck = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(httpCodes.unauthorized).json({
        success: false,
        message: "Required Access Token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(httpCodes.server_error).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authCheck;
