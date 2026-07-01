const httpCodes = require("../utils/httpCodes");

class movieController {
  async createMovie(req, res) {
    try {
    } catch (error) {
      return res.status(httpCodes.server_error).json({
        success: false,
        message: error.message,
      });
    }
  }
}
