const Movie = require("../model/movie");
const Show = require("../model/show");
const Theater = require("../model/theater");
const httpCodes = require("../utils/httpCodes");
const {
  createMovie,
  createTheater,
  assignMovie,
} = require("../validation/moviesValidation");

class moviesController {
  // Create Theater
  async createTheater(req, res) {
    try {
      if (!req.user) {
        return res.status(httpCodes.unauthorized).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const { error, value } = createTheater.validate(req.body);

      if (error) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { theaterName, location, totalScreen, screens: screenData } = value;

      const admin = req.user.id;

      const existingTheater = await Theater.findOne({
        adminId: admin,
        theaterName,
      });

      if (existingTheater) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: `You have already created ${existingTheater.theaterName} theater`,
        });
      }

      if (
        !screenData ||
        !Array.isArray(screenData) ||
        screenData.length !== totalScreen
      ) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Invalid screen data",
        });
      }

      const screens = [];

      for (let i = 0; i < totalScreen; i++) {
        const currentScreen = screenData[i];

        if (
          !currentScreen.rows ||
          !Array.isArray(currentScreen.rows) ||
          currentScreen.rows.length === 0
        ) {
          return res.status(httpCodes.bad_request).json({
            success: false,
            message: `Screen ${i + 1} must have at least one row`,
          });
        }

        const seats = [];
        let totalSeats = 0;
        const usedRows = new Set();

        for (const rowData of currentScreen.rows) {
          const { row, totalSeats: rowSeats, seatType, price } = rowData;

          const rowName = row.toUpperCase();

          if (usedRows.has(rowName)) {
            return res.status(httpCodes.bad_request).json({
              success: false,
              message: `Duplicate row ${rowName} in Screen ${i + 1}`,
            });
          }

          if (rowSeats <= 0) {
            return res.status(httpCodes.bad_request).json({
              success: false,
              message: `Invalid seat count in row ${rowName}`,
            });
          }

          usedRows.add(rowName);
          totalSeats += rowSeats;

          for (let j = 1; j <= rowSeats; j++) {
            seats.push({
              seatNumber: `${rowName}${j}`,
              seatType,
              price,
            });
          }
        }

        screens.push({
          screenNumber: i + 1,
          name: `Screen ${i + 1}`,
          totalSeats,
          seats,
        });
      }

      const theaterData = new Theater({
        adminId: admin,
        theaterName,
        location,
        totalScreen,
        screen: screens,
      });

      const data = await theaterData.save();

      return res.status(httpCodes.created).json({
        success: true,
        message: "Theater created successfully",
        data,
      });
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Create Movie and assign to theaters
  async createMovie(req, res) {
    try {
      if (!req.user) {
        return res.status(httpCodes.unauthorized).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const { error, value } = createMovie.validate(req.body);

      if (error) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const {
        movieName,
        genre,
        language,
        duration,
        cast,
        director,
        releaseDate,
      } = value;

      const admin = req.user.id;

      const existingMovie = await Movie.findOne({
        adminId: admin,
        movieName,
      });

      if (existingMovie) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: `${existingMovie.movieName} movie is already created`,
        });
      }

      const movieData = new Movie({
        adminId: admin,
        movieName,
        genre,
        language,
        duration,
        cast,
        director,
        releaseDate,
      });

      const data = await movieData.save();

      return res.status(httpCodes.ok).json({
        success: true,
        message: "Movie created and assigned to theaters successfully",
        data,
      });
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Assign Movie to theater
  async assignMovie(req, res) {
    try {
      if (!req.user) {
        return res.status(httpCodes.unauthorized).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const { error, value } = assignMovie.validate(req.body);

      if (error) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { movieId, theaterId, screen, showDate, showTime, endTime } = value;

      const admin = req.user.body;

      const alreadyAssign = await Show.find({
        movieId,
        theaterId,
        screen,
      });

      if (alreadyAssign) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Movie already assigned",
        });
      }
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new moviesController();
