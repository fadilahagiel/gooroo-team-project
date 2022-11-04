const { Teacher, Student } = require("../models");

const AuthStudent = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role != "student") {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

const AuthTeacher = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role != "teacher") {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { AuthStudent, AuthTeacher };
