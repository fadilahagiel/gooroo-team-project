const errorHandlers = async (err, req, res, next) => {
<<<<<<< HEAD

=======
>>>>>>> 64366f568b7c55280ee505107e2ede44820a01c1
  console.log(err);
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
<<<<<<< HEAD
  } else if (error.name == "class not found") {
    code = 404;
    message = `Class not found`;
  } else if (error.name == "already") {
    code = 400;
    message = "You already add this class to your wishlist";
  } else if (error.name == "already collected") {
    code = 400;
    message = "You already collected this class's profit";
  }
  
  res.status(code).json({ message });
};

=======
  } else if (err.name == "class not found") {
    code = 404;
    message = `Class not found`;
  } else if (err.name == "already") {
    code = 400;
    message = "You already add this class to your wishlist";
  } else if (err.name == "already collected") {
    code = 400;
    message = "You already collected this class's profit";
  }

  res.status(code).json({ message });
};
>>>>>>> 64366f568b7c55280ee505107e2ede44820a01c1

module.exports = errorHandlers;
