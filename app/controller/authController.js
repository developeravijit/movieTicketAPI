const User = require("../model/user");
const httpCodes = require("../utils/httpCodes");
const bcrypt = require("bcrypt");
const fileCleaner = require("../utils/fileCleaner");
const crypto = require("crypto");
const Verify = require("../model/verification");
const { verifyEmail, otpEmail } = require("../utils/sendEmail");
const { Register, Login } = require("../validation/authValidation");
const OTP = require("../model/otp");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const jwt = require("jsonwebtoken");

class authController {
  // Register User/Admin
  async register(req, res) {
    try {
      const { error, value } = Register.validate(req.body);

      if (error) {
        fileCleaner(req.file);
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { name, email, password, phone } = value;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        fileCleaner(req.file);
        return res.status(httpCodes.bad_request).json({
          success: false,
          message:
            existingUser.role === "admin"
              ? "Admin already exist"
              : "User already exist",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        role: "user",
      });

      if (req.file) {
        userData.avatar = req.file.path;
        userData.public_id = req.file.filename;
      }

      const result = await userData.save();

      const data = result.toObject();

      delete data.password;
      delete data.refreshToken;

      const token = crypto.randomBytes(32).toString("hex");
      await Verify.create({
        userId: data._id,
        token: token,
      });

      const verifyLink = `${req.protocol}://${req.get("host")}/api/v1/auth/verify/${data._id}/${token}`;

      await verifyEmail(data, verifyLink);

      return res.status(httpCodes.created).json({
        success: true,
        message:
          data.role === "admin"
            ? "Admin created successfully and verification link sent to your email id"
            : "User created successfully and verification link sent to your email id",
        data,
      });
    } catch (error) {
      fileCleaner(req.file);
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Verify User/Admin
  async verify(req, res) {
    try {
      const { userId, token } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(httpCodes.not_found).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.isVerified) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "You already verified",
        });
      }

      const verify = await Verify.findOne({
        userId,
        token,
      });

      if (!verify) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Invalid or expired verification link",
        });
      }

      user.isVerified = true;
      await user.save();
      await verify.deleteOne();

      return res.status(httpCodes.ok).json({
        success: true,
        message:
          user.role === "admin"
            ? "Admin verified successfully"
            : "User verified successfully",
      });
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Resend Verification Link
  async resendVerifyLink(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Email id is required to resend verification link",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(httpCodes.not_found).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.isVerified) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "You already verified",
        });
      }

      await Verify.deleteMany({
        userId: user._id,
      });

      const token = crypto.randomBytes(32).toString("hex");

      await Verify.create({
        userId: user._id,
        token,
      });

      const verifyLink = `${req.protocol}://${req.get("host")}/api/v1/auth/verify/${user._id}/${token}`;

      await verifyEmail(user, verifyLink);

      return res.status(httpCodes.ok).json({
        success: true,
        message: "Verification link resent to your registered email id",
      });
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Send login otp
  async loginOTP(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Email is required",
        });
      }

      const data = await User.findOne({ email });

      if (!data) {
        return res.status(httpCodes.not_found).json({
          success: false,
          message: "Invalid email id",
        });
      }

      if (!data.isVerified) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Please verify your account first",
        });
      }

      await OTP.deleteMany({
        userId: data._id,
      });

      await otpEmail(data);

      return res.status(httpCodes.ok).json({
        success: true,
        message: "Login OTP sent successfully",
      });
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Login
  async loginWithOTP(req, res) {
    try {
      const { error, value } = Login.validate(req.body);

      if (error) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { email, otp } = value;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(httpCodes.not_found).json({
          success: false,
          message: "Invalid email id",
        });
      }

      if (!user.isVerified) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Access denied kindly verify your account",
        });
      }

      const userOTP = await OTP.findOne({
        userId: user._id,
        otp,
      });

      if (!userOTP) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      user.refreshToken = refreshToken;

      const result = await user.save();

      await OTP.deleteMany({
        userId: user._id,
      });

      const data = result.toObject();
      delete data.refreshToken;

      return res.status(httpCodes.ok).json({
        success: true,
        message:
          data.role === "admin"
            ? "Admin login successfully"
            : "User login successfully",
        data: {
          data,
          token: {
            accessToken,
            refreshToken,
          },
        },
      });
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }

  // New Access Token
  async newAccessToken(req, res) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Refreshtoken Required",
        });
      }

      const refreshToken = authHeader.split(" ")[1];
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const data = await User.findById(decoded.id);

      if (!data) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "User not found",
        });
      }

      if (data.refreshToken !== refreshToken) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Invalid token",
        });
      }

      const newAccessToken = generateAccessToken(data);

      return res.status(httpCodes.created).json({
        success: true,
        message: "New accesstoken created successfully",
        accessToken: newAccessToken,
      });
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Generate Screct Key
  async secretKey(req, res) {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(httpCodes.not_found).json({
          success: false,
          message: "User not found",
        });
      }

      const secretKey = crypto.randomBytes(32).toString("hex");

      user.secretKey = secretKey;

      await user.save();

      return res.status(httpCodes.ok).json({
        success: true,
        message: "Secret Key Generated Successfully",
        secretKey,
      });
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new authController();
