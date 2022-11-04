const { Class, Transaction, Student, Teacher, Schedule } = require("../models");

class Controller {
  static async addSchedule(req, res, next) {
    try {
      const { ClassId } = req.params;
      const { startDate, endDate } = req.body;
      const findClass = await Class.findOne({
        where: {
          id: ClassId,
        },
      });
      if (!findClass) {
        throw { name: "class not found" };
      }
      await Schedule.create({ ClassId, startDate, endDate });
      res.status(201).json({ message: "Success add new schedule" });
    } catch (error) {
      next(error);
    }
  }

  static async updateSchedule(req, res, next) {
    try {
      const { ScheduleId } = req.params;
      const { startDate, endDate } = req.body;
      const findSchedule = await Schedule.findOne({
        where: {
          id: ScheduleId,
        },
      });
      if (!findSchedule) {
        throw { name: "schedule not found" };
      }
      await Schedule.update(
        { startDate, endDate },
        {
          where: {
            id: ScheduleId,
          },
        }
      );
      res.status(200).json({ message: `Schedule has been update` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
