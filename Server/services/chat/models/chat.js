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

  static async updateChat(roomId, user, msg) {
    try {
      const collection = this.userCollection();
      await collection.updateOne(
        { roomId },
        { $push: { chatLogs: { user, msg } } }
      );
    } catch (error) {
      return error;
    }
  }
}

module.exports = Chat;
