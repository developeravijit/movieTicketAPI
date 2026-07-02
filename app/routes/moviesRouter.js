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
 *               - screens
 *             properties:
 *               theaterName:
 *                 type: string
 *                 example: PVR Cinemas
 *               location:
 *                 type: string
 *                 example: Kolkata
 *               totalScreen:
 *                 type: integer
 *                 example: 2
 *               screens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     rows:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           row:
 *                             type: string
 *                             example: A
 *                           totalSeats:
 *                             type: integer
 *                             example: 10
 *                           seatType:
 *                             type: string
 *                             example: Regular
 *                           price:
 *                             type: number
 *                             example: 150
 *     responses:
 *       201:
 *         description: Theater created successfully
 *       400:
 *         description: Validation error
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

/**
 * @swagger
 * /api/v1/create/movie:
 *   post:
 *     summary: Create a new movie
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
 *                 example: 181
 *               cast:
 *                 type: string
 *                 example: Robert Downey Jr., Chris Evans
 *               director:
 *                 type: string
 *                 example: Anthony Russo, Joe Russo
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 example: 2019-04-26
 *     responses:
 *       200:
 *         description: Movie created successfully
 *       400:
 *         description: Validation error or movie already exists
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

/**
 * @swagger
 * /api/v1/assign-movie:
 *   post:
 *     summary: Assign a movie to a theater screen
 *     tags: [Theater]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *               - theaterId
 *               - screen
 *               - showDate
 *               - showTime
 *               - endTime
 *             properties:
 *               movieId:
 *                 type: string
 *                 example: 6867ab12cd34ef56gh78ij90
 *               theaterId:
 *                 type: string
 *                 example: 6867ab12cd34ef56gh78ij91
 *               screen:
 *                 type: integer
 *                 example: 1
 *               showDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-03
 *               showTime:
 *                 type: string
 *                 example: 10:00 AM
 *               endTime:
 *                 type: string
 *                 example: 01:00 PM
 *     responses:
 *       200:
 *         description: Movie assigned successfully
 *       400:
 *         description: Validation error or show already exists
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie or theater not found
 *       500:
 *         description: Internal server error
 */
movie.post("/assign-movie", authCheck, moviesController.assignMovie);

/**
 * @swagger
 * /api/v1/assigned/movies:
 *   get:
 *     summary: Get all assigned movies
 *     tags: [Shows]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of assigned movies
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
 *                   example: All Assigned Movies
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       theaterName:
 *                         type: string
 *                         example: PVR Cinemas
 *                       location:
 *                         type: string
 *                         example: Kolkata
 *                       movieName:
 *                         type: string
 *                         example: Avengers Endgame
 *                       screen:
 *                         type: integer
 *                         example: 1
 *                       showDate:
 *                         type: string
 *                         example: 2026-07-03T00:00:00.000Z
 *                       showTime:
 *                         type: string
 *                         example: 10:00 AM
 *                       endTime:
 *                         type: string
 *                         example: 01:00 PM
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
movie.get("/assigned/movies", authCheck, moviesController.showAssignedMovies);

module.exports = movie;
