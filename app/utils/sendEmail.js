const transporter = require("../config/transporter");
const OTP = require("../model/otp");
const { verifyEmailTemplate, loginOTPTemplate } = require("./html");
const logger = require("./logger");

const verifyEmail = async (user, verifyLink) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Verify user",
      html: verifyEmailTemplate(user, verifyLink),
    });
  } catch (error) {
    logger.error(error.message);
  }
};

const otpEmail = async (user) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    await OTP.create({
      userId: user._id,
      otp,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Login OTP",
      html: loginOTPTemplate(user, otp),
    });
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = {
  verifyEmail,
  otpEmail,
};
