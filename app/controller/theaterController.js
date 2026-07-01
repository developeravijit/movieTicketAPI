const Theater = require("../model/theater");
const httpCodes = require("../utils/httpCodes");
const { createTheater } = require("../validation/theaterValidation");

class theaterController {
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
}

module.exports = new theaterController();
