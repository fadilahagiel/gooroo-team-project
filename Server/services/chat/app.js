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
  const { userId, username, role } = socket.user;
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

  socket.on("leaveRoom", (roomId) => {
    console.log(`⚡: userId: ${userId}, ${username}, leave room`, roomId);
    socket.leave(roomId);
  });

  socket.on("sendChat", async (payload) => {
    // console.log(`this is payload =>`, payload);

    const { roomId, user, msg } = payload;
    await Chat.updateChat(roomId, user, msg);
    const data = { user, msg };
    socket.to(roomId).emit("receiveChat", data);
  });

  // // notify existing users
  // socket.broadcast.emit("user connected", {
  //   userID: socket.id,
  //   username: socket.username,
  // });

  // // forward the private message to the right recipient
  // socket.on("private-msg", ({ content, to }) => {
  //   socket.to(to).emit("private message", {
  //     content,
  //     from: socket.id,
  //   });
  // });

  // // notify users upon disconnection
  socket.on("disconnect", () => {
    // socket.broadcast.emit("user disconnected", socket.id);
    if (role === "student") --onlineStudents;
    if (role === "teacher") --onlineTeachers;
    onlineUsers = onlineUsers.filter((el) => el.userId !== userId);
    console.log(`⚡: userId  ${username} just disconnected!`);
  });

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

app.post("/chatlogs", async (req, res, next) => {
  try {
    const { roomId } = req.body;
    const chatLogs = await Chat.findChatRoom(roomId);
    res.status(200).send(chatLogs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const contact = await User.findContact(userId);
    res.status(200).send(contact);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/add", async (req, res, next) => {
  try {
    const { user, contact } = req.body;
    // const { contactId, contactName, contactRole } = req.body;
    // const user = { userId };
    // const contact = { contactId, contactName, contactRole };
    const result = await User.addContact(user, contact);
    if (!result.newContact) throw { msg: "bad request" };
    const chatRoom = await Chat.createChatRoom(result.roomId);
    res.status(201).send({ roomId: chatRoom.roomId });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

// server.listen(PORT, () => {
//   console.log(`Listening to port: ${PORT}`);
// });

mongoConnect().then(() => {
  server.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
  });
});
