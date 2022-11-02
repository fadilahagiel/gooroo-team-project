const errorHandlers = async (err, req, res, next) => {
<<<<<<< HEAD
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
  }
  res.status(code).json({ error: true, message });
};
=======
    let code = 500
    let message = "Internal Server Error"
    if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
        code = 400
        message = err.errors[0].message
    } else if (err.name == 'reponse_required') {
        code = 400
        message = 'testimoni & rating are required'
    } else if (err.name == 'error_login') {
        code = 401
        message = "invalid email/password"
    } else if (err.name == "invalid_token" || err.name == 'JsonWebTokenError') {
        code = 401
        message = "invalid_token"
    } else if (err.name == "invalid_credentials") {
        code = 404
        message = "error not found"
    } else if (err.name == "forbidden") {
        code = 403
        message = "forbidden"
    }
    res.status(code).json({ error: true, message })
}
>>>>>>> e9fb868d591a564d73dbba174b1f4e068e744c70

module.exports = errorHandlers;
