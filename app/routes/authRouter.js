const express = require("express");
const authController = require("../controller/authController");
const { imageUpload } = require("../middleware/imageUpload");
const authCheck = require("../middleware/authMiddleware");

const user = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

// Register
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: Avijit Roy
 *               email:
 *                 type: string
 *                 example: avijitroy0098@gmail.com
 *               password:
 *                 type: string
 *                 example: Name@123
 *               phone:
 *                 type: string
 *                 example: "8910806300"
 *               avatar:
 *                 type: string
 *                 format: binary
 */
user.post("/register", imageUpload.single("avatar"), authController.register);

// Verify
/**
 * @swagger
 * /api/v1/auth/verify/{userId}/{token}:
 *   get:
 *     summary: Verify user account
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 */
user.get("/verify/:userId/:token", authController.verify);

// Resend Verification Link
/**
 * @swagger
 * /api/v1/auth/verify/resend:
 *   post:
 *     summary: Resend verification link
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: avijitroy0098@gmail.com
 */
user.post("/verify/resend", authController.resendVerifyLink);

// Send Otp to login
/**
 * @swagger
 * /api/v1/auth/login/otp:
 *   post:
 *     summary: Send login OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: avijitroy0098@gmail.com
 */
user.post("/login/otp", authController.loginOTP);

// Login
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: avijitroy0098@gmail.com
 *               otp:
 *                 type: number
 *                 example: 123456
 */
user.post("/login", authController.loginWithOTP);

// New accessToken
/**
 * @swagger
 * /api/v1/auth/new/accessToken:
 *   post:
 *     summary: Generate new access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
user.post("/new/accessToken", authController.newAccessToken);

// Generate Secret Key
/**
 * @swagger
 * /api/v1/auth/secret-key:
 *   post:
 *     summary: Generate a secret key for the authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Secret key generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Secret key generated successfully
 *                 secretKey:
 *                   type: string
 *                   example: 8f2b5d9a7c4e1f6a3b8d2c9e7f1a4b6d
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
user.post("/secret-key", authCheck, authController.secretKey);

module.exports = user;
