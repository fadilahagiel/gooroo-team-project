"use strict";

const { getDB } = require("../config/mongodb");

class Chat {
  static userCollection() {
    const collection = getDB().collection("ChatRooms");
    return collection;
  }

  static async createChatRoom(roomId) {
    try {
      const collection = this.userCollection();
      const data = {
        roomId,
        chatLogs: [],
      };
      await collection.insertOne({
        roomId,
        chatLogs: [],
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  static async findChatRoom(roomId) {
    try {
      const collection = this.userCollection();
      const chatRoom = await collection.findOne({ roomId });
      return chatRoom.chatLogs;
    } catch (error) {
      return error;
    }
  }

  static async updateChat(roomId, user, text, createdAt, _id) {
    try {
      const collection = this.userCollection();
      console.log(user);
      const test = await collection.updateOne(
        { roomId },
        { $push: { chatLogs: { _id, user, text, createdAt } } }
      );
    } catch (error) {
      return error;
    }
  }
}

module.exports = Chat;
