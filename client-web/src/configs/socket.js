import { io } from "socket.io-client";

const serverChat = "http://localhost:3030";

const socket = io(serverChat, { autoConnect: false });

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

export default socket;
