const CustomError = require("./../Utils/CustomError");

var sendError;
var message = "";

var ErrorController = function (error, req, res, next) {
  if (error.code == 11000) {
    sendError = duplicateError(error);
  } else if (error.message.includes("enum")) {
    sendError = enumError(error);
  } else if (error._message == "users validation failed") {
    sendError = validationError(error);
  } else if (error.name == "JsonWebTokenError") {
    sendError = IvalidJwtError(error);
  } else if (error.name == "TokenExpiredError") {
    sendError = TokenExpiredError(error);
  } else {
    sendError = error;
  }
  console.log(error);
  res.status(sendError.statusCode || 500).send({
    status: "fail",
    message: sendError.message,
    error,
  });
};

function duplicateError(error) {
  for (const key in error.keyValue) {
    message = `${key}: ${error.keyValue[key]} already exists`;
  }
  return new CustomError(message, 400);
}

function validationError(error) {
  for (const key in error.errors) {
    message = `${error.errors[key].message}. `;
    break;
  }
  return new CustomError(message, 400);
}

function enumError(error) {
  message = `Invalid value for ${error.message.split(":")[1].trim()}`;
  return new CustomError(message, 400);
}

function IvalidJwtError() {
  message = `Invalid token`;
  return new CustomError(message, 401);
}

function TokenExpiredError() {
  message = `Session expired, login again.`;
  return new CustomError(message, 401);
}

module.exports = ErrorController;
