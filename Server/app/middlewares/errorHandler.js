const errorHandler = (error, req, res, next) => {
  let code = 500;
  let message = `Internal server error`;

  if (error.name == "class not found") {
    code = 404;
    message = `Class not found`;
  } else if (error.name == "already") {
    code = 400;
    message = "You already add this class to your wishlist";
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
