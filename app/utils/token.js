const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "5d" },
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
