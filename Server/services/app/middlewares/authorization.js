const { Teacher, Student, Class } = require("../models");

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
    const { ClassId } = req.params;
    const classFound = await Class.findOne({ where: { id: ClassId } });
    if (!classFound) {
      throw { name: "class not found" };
    }
    const { id } = req.user;
    const teacher = await Teacher.findOne({ where: { UserId: id } });
    const { role } = req.user;
    if (role != "teacher" || classFound.TeacherId !== teacher.id) {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { AuthStudent, AuthTeacher };
