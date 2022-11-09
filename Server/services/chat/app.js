"use strict";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { mongoConnect } = require("./config/mongodb");
const io = new Server(server);
const User = require("./models/user");
const Chat = require("./models/chat");
const PORT = process.env.PORT || 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/** TO-DO
 *
 * Private message - done
 * Save Contacts - done
 * Chat history
 *
 */

// io.use((socket, next) => {
//   const { userId } = socket.handshake.auth.userId;
//   if (!userId) {
//     return next(new Error("invalid username"));
//   }
//   socket.user = { username, userId, role };
//   next();
// });

io.use((socket, next) => {
  const user = socket.handshake.auth;
  if (!user) {
    return next(new Error("invalid user"));
  }
  socket.user = user;
  next();
});

let onlineUsers = [];
let onlineStudents = 0;
let onlineTeachers = 0;
io.on("connection", (socket) => {
  const { username, role } = socket.user;
  const userId = socket.user.id;
  console.log(`⚡: userId: ${userId}, ${username} just connected!`);

  // fetch existing users
  onlineUsers.push({
    userId,
    username,
    role,
    socketId: socket.id,
  });
  if (role === "student") ++onlineStudents;
  if (role === "teacher") ++onlineTeachers;

  // user join a chatRoom
  socket.on("joinRoom", (roomId) => {
    console.log(`⚡: userId: ${userId}, ${username}, join room`, roomId);
    socket.join(roomId);
  });

  // user leave a chatroom
  socket.on("leaveRoom", (roomId) => {
    console.log(`⚡: userId: ${userId}, ${username}, leave room`, roomId);
    socket.leave(roomId);
  });

  // on send text message
  socket.on("sendChat", async (payload) => {
    const { roomId, user, text, createdAt, _id } = payload;
    await Chat.updateChat(roomId, user, text, createdAt, _id);
    const data = { user, text, createdAt, _id };
    socket.to(roomId).emit("receiveChat", data);
  });

  // notify users upon disconnection
  socket.on("disconnect", () => {
    if (role === "student") --onlineStudents;
    if (role === "teacher") --onlineTeachers;
    onlineUsers = onlineUsers.filter((el) => el.userId !== userId);
    console.log(`⚡: userId  ${username} just disconnected!`);
  });

  // on error
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

app.get("/", (req, res) => {
  res.status(200).send({
    onlineStudents: onlineStudents,
    onlineTeachers: onlineTeachers,
    onlineUsers,
  });
});

app.get("/chatlogs", async (req, res, next) => {
  try {
    const roomId = req.headers.roomid;
    const chatLogs = await Chat.findChatRoom(roomId);
    res.status(200).send(chatLogs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/add", async (req, res, next) => {
  try {
    const { user, contact } = req.body;
    const result = await User.addContact(user, contact);
    if (!result.newContact) {
      res.status(200).send({ roomId: result.roomId });
    } else {
      const chatRoom = await Chat.createChatRoom(result.roomId);
      res.status(201).send({ roomId: chatRoom.roomId });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { username, role, userimage } = req.headers;
    const contact = await User.findContact(userId, username, role, userimage);
    res.status(200).send(contact);
  } catch (error) {
    res.status(500).send(error);
  }
});

mongoConnect().then(() => {
  server.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
  });
});
