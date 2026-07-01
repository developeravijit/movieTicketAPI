const express = require("express");
const authCheck = require("../middleware/authMiddleware");
const secretKeyCheck = require("../middleware/secretKeyMiddleware");
const theaterController = require("../controller/theaterController");

const theater = express.Router();

// Create Theater
/**
 * @swagger
 * tags:
 *   name: Theater
 *   description: Theater Management APIs
 */

/**
 * @swagger
 * /api/theater/create:
 *   post:
 *     summary: Create a new theater
 *     tags: [Theater]
 *     security:
 *       - bearerAuth: []
 *       - secretKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - theaterName
 *               - location
 *               - totalScreen
 *             properties:
 *               theaterName:
 *                 type: string
 *                 example: PVR Cinemas
 *               location:
 *                 type: string
 *                 example: Kolkata
 *               totalScreen:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Theater created successfully
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
 *                   example: Theater created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6863f65f4a6f58b8df125678
 *                     adminId:
 *                       type: string
 *                       example: 6863f65f4a6f58b8df123456
 *                     theaterName:
 *                       type: string
 *                       example: PVR Cinemas
 *                     location:
 *                       type: string
 *                       example: Kolkata
 *                     totalScreen:
 *                       type: integer
 *                       example: 5
 *
 *       400:
 *         description: Validation error or theater already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: You have already created PVR Cinemas theater
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
theater.post(
  "/create",
  authCheck,
  secretKeyCheck,
  theaterController.createTheater,
);

module.exports = theater;
