const errorHandlers = async (err, req, res, next) => {

  let code = 500;
  let message = "Internal Server Error";
  if (
    err.name == "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name == "reponse_required") {
    code = 400;
    message = "testimoni & raring are required";
  } else if (err.name == "invalid_login") {
    code = 401;
    message = "invalid email/password";
  } else if (err.name == "invalid_token" || err.name == "JsonWebTokenError") {
    code = 401;
    message = "invalid_token";
  } else if (err.name == "invalid_credentials") {
    code = 404;
    message = "error not found";
  } else if (err.name == "forbidden") {
    code = 403;
    message = "forbidden";
  } else if (err.name == "class not found") {
    code = 404;
    message = `Class not found`;
  } else if (err.name == "already") {
    code = 400;
    message = "You already add this class to your wishlist";
  } else if (err.name == "already collected") {
    code = 400;
    message = "You already collected this class's profit";
  } else if (err.name == "wishlist not found") {
    code = 404;
    message = `Wishlist not found`;
  } else if (err.name == "already") {
    code = 400;
    message = "You already add this class to your wishlist";
  }
  res.status(code).json({ message });
};

module.exports = errorHandlers;
