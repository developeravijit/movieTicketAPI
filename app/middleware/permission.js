const httpCodes = require("../utils/httpCodes");

const permission = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(httpCodes.unauthorized).json({
        success: false,
        message: "Permission Denied",
      });
    }
    next();
  };
};

module.exports = permission;
