const { constants } = require("../constants.js");

const errorHandler = (err, req, res, next) => {
  const stat = res?.statusCode ? res?.statusCode : 500;

  // console.log(statusCode);

  switch (stat) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.NOT_FOUND:
      res.json({ title: "Not found", message: err.message, stackTrace: err.stackTrace });
      break;
    case constants.UNAUTHORIZED:
      res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stackTrace });
      break;
    case constants.FORBIDDEN:
      res.json({ title: "Forbidden", message: err.message, stackTrace: err.stackTrace });
      break;
    case constants.SERVER_ERROR:
      res.json({ title: "Server error", message: err.message, stackTrace: err.stackTrace });
      break;
    default:
      console.log("No errors!!");
      break;
  }

  // next();
};

module.exports = errorHandler;
