const { SaldoHistory } = require("../models");
class Controller {
  static async getHistory(req, res, next) {
    try {
      const UserId = req.user.id;
      const findHistory = await SaldoHistory.findAll({ where: { UserId } });
      res.status(200).json(findHistory);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
