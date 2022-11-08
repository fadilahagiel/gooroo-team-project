const { Class, Transaction, Student, Teacher, User } = require("../models");
const axios = require("axios");

const CHAT_API = "http://localhost:3030";

class ChatController {
  static async findAllContacts(req, res, next) {
    try {
      const userId = req.user.id;
      const response = await axios({
        url: `${CHAT_API}/${userId}`,
        method: "get",
      });
      const contacts = response.data;
      res.status(200).send(contacts);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async chatLogs(req, res, next) {
    try {
      const { roomId } = req.body;
      const response = await axios({
        url: `${CHAT_API}/chatlogs`,
        method: "get",
        body: roomId,
      });
      const chatlogs = response.data;
      res.status(200).send(chatlogs);
    } catch (error) {
      next(error);
    }
  }

  static async addContact(req, res, next) {
    try {
      const { contactId } = req.params;
      const contactDetail = await User.findByPk(contactId);
      // console.log(contactDetail);
      const user = {
        userId: req.user.id,
        username: req.user.username,
        role: req.user.role,
      };
      const contact = {
        contactId: contactDetail.id,
        contactName: contactDetail.username,
        contactRole: contactDetail.role,
      };
      const payload = { user, contact };
      const response = await axios({
        url: `${CHAT_API}/add`,
        method: "post",
        data: payload,
      });
      const { roomId } = response.data;
      res.status(200).send({ roomId });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = ChatController;