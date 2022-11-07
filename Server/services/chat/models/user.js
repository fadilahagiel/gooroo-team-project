"use strict";

const { getDB } = require("../config/mongodb");
const { v4: uuidv4 } = require("uuid");

class User {
  static userCollection() {
    const collection = getDB().collection("Users");
    return collection;
  }

  static async findContact(userId) {
    try {
      const collection = this.userCollection();
      const data = await collection.findOne({ userId });
      if (data) {
        return data.contacts;
      } else {
        await collection.insertOne({ userId, contacts: [] });
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  static async createChatRoom(user, contact, roomId) {
    try {
    } catch (error) {}
  }

  static async addContact(userData, contactData) {
    try {
      const collection = this.userCollection();
      const { username, role } = userData;
      const { contactName, contactRole } = contactData;
      const userId = String(userData.userId);
      const contactId = String(contactData.contactId);
      const user = {
        userId,
        username,
        role,
      };
      const contact = {
        contactId,
        contactName,
        contactRole,
      };
      const userContacts = await collection.findOne({ userId });
      const check = userContacts.contacts.find(
        (el) => el.contactId === contactId
      );
      if (check) {
        return { newContact: false, roomId: check.roomId };
      }

      const roomId = uuidv4();
      const newContact = {
        contactId: userId,
        contactName: username,
        contactRole: role,
      };
      await collection.updateOne(
        { userId },
        {
          $push: {
            contacts: { ...contact, roomId },
          },
        }
      );
      await collection.updateOne(
        { userId: contactId },
        {
          $push: {
            contacts: { ...newContact, roomId },
          },
        }
      );
      return { newContact: true, roomId };
    } catch (error) {
      return error;
    }
  }
}

module.exports = User;
