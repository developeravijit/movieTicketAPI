const Movie = require("../model/movie");
const Theater = require("../model/theater");
const httpCodes = require("../utils/httpCodes");
const {
  createMovie,
  createTheater,
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

      const { theaterName, location, totalScreen } = value;

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

      const theaterData = new Theater({
        adminId: admin,
        theaterName,
        location,
        totalScreen,
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
        theaterId,
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

      const theaters = await Theater.find({
        _id: { $in: theaterId },
        adminId: admin,
      });

      if (theaters.length !== theaterId.length) {
        return res.status(httpCodes.bad_request).json({
          success: false,
          message: "Theater ids are invalid",
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
        theaterId,
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
}

module.exports = new moviesController();
