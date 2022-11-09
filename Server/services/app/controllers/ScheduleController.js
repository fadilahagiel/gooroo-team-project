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
      await Schedule.create({ ClassId, startDate, endDate });
      res.status(201).json({ message: "Success add new schedule" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteSchedule(req, res, next) {
    try {
      const { ScheduleId } = req.params;
      const {role} = req.user
      if (role !== 'teacher') {
        throw{name: "forbidden"}
      }
      const findSchedule = await Schedule.findOne({
        where: {
          id: ScheduleId,
        },
      });
      if (!findSchedule) {
        throw { name: "invalid_credentials" };
      }
      await Schedule.destroy({
        where: {
          id: ScheduleId,
        },
      });
      res.status(200).json({ message: `Success delete schedule` });
    } catch (error) {
      next(error);
    }
  }

  static async updateSchedule(req, res, next) {
    try {
      const { ScheduleId } = req.params;
      const { role } = req.user
      if (role !== 'teacher') {
        throw { name: "forbidden" }
      }
      const { startDate, endDate } = req.body;
      const findSchedule = await Schedule.findOne({
        where: {
          id: ScheduleId,
        },
      });
      if (!findSchedule) {
        throw { name: "invalid_credentials" };
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
      console.log(error);
      next(error);
    }
  }

  static async schedulesClass(req, res, next) {
    try {
      const { ClassId } = req.params
      const schedules = await Schedule.findAll({ where: { ClassId } })
      res.status(200).json(schedules)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;
