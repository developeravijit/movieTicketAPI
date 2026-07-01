const express = require("express");
const authCheck = require("../middleware/authMiddleware");
const secretKeyCheck = require("../middleware/secretKeyMiddleware");
const moviesController = require("../controller/moviesController");

const movie = express.Router();

/**
 * @swagger
 * tags:
 *   name: Theater
 *   description: Theater Management APIs
 */

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: Movie Management APIs
 */

// Create Theater
/**
 * @swagger
 * /api/v1/create/theater:
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
 *       400:
 *         description: Validation error or theater already exists
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
movie.post(
  "/create/theater",
  authCheck,
  secretKeyCheck,
  moviesController.createTheater,
);

// Create Movie
/**
 * @swagger
 * /api/v1/create/movie:
 *   post:
 *     summary: Create a new movie and assign it to theaters
 *     tags: [Movie]
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
 *               - movieName
 *               - genre
 *               - language
 *               - duration
 *               - cast
 *               - director
 *               - releaseDate
 *               - theaterId
 *             properties:
 *               movieName:
 *                 type: string
 *                 example: Avengers Endgame
 *               genre:
 *                 type: string
 *                 example: Action
 *               language:
 *                 type: string
 *                 example: English
 *               duration:
 *                 type: integer
 *                 example: 180
 *               cast:
 *                 type: string
 *                 example: Robert Downey Jr, Chris Evans
 *               director:
 *                 type: string
 *                 example: Anthony Russo
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-01
 *               theaterId:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: 6864f6a6c0b6f8a9b1234567
 *                 example:
 *                   - 6864f6a6c0b6f8a9b1234567
 *                   - 6864f6a6c0b6f8a9b1234568
 *     responses:
 *       200:
 *         description: Movie created and assigned to theaters successfully
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
 *                   example: Movie created and assigned to theaters successfully
 *                 data:
 *                   type: object
 *       400:
 *         description: Validation error, movie already exists, or invalid theater ids
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Theater ids are invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
movie.post(
  "/create/movie",
  authCheck,
  secretKeyCheck,
  moviesController.createMovie,
);

module.exports = movie;
