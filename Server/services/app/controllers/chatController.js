const { Class, Transaction, Student, Teacher, User } = require("../models");
const axios = require("axios");
const getImage = require("../helpers/getImage");

const CHAT_API = "https://130c-2001-448a-2042-93b9-550a-2fa5-c341-8c0f.ap.ngrok.io";

class ChatController {
  static async findAllContacts(req, res, next) {
    try {
      const userId = req.user.id;
      const userImage = await ChatController.getImage(
        req.user.role,
        req.user.id
      );
      const payload = {
        username: req.user.username,
        role: req.user.role,
        userImage,
      };
      const response = await axios({
        url: `${CHAT_API}/${userId}`,
        method: "get",
        headers: payload,
      });
      const contacts = response.data;
      res.status(200).send(contacts);
    } catch (error) {
      next(error);
    }
  }

  static async chatLogs(req, res, next) {
    try {
      const roomId = req.headers.roomid;
      const response = await axios({
        url: `${CHAT_API}/chatlogs`,
        method: "get",
        headers: { roomId },
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
      const contactImage = await getImage(
        contactDetail.role,
        contactId
      );
      const userImage = await getImage(
        req.user.role,
        req.user.id
      );
      const user = {
        userId: req.user.id,
        username: req.user.username,
        role: req.user.role,
        userImage,
      };
      const contact = {
        contactId: contactDetail.id,
        contactName: contactDetail.username,
        contactRole: contactDetail.role,
        contactImage,
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
      next(error);
    }
  }
}

module.exports = ChatController;
