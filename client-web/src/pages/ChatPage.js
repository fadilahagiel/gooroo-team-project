import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  Text,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchChatLogs, fetchContacts } from "../store/actionCreator";
import { v4 as uuidv4 } from "uuid";
import socket from "../configs/socket";

export default function ChatPage() {
  const contacts = useSelector((state) => state.contacts);
  const user = useSelector((state) => state.user);
  const [chatRoom, setChatRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("receiveChat", (payload) => {
      setMessages((messages) => [...messages, payload]);
    });
  }, []);

  useEffect(() => {
    if (chatRoom) {
      socket.emit("joinRoom", chatRoom);
    }
  }, [chatRoom]);

  const handleSendMessage = () => {
    const payload = {
      roomId: chatRoom,
      _id: uuidv4(),
      user,
      text: textInput,
      createdAt: new Date(),
    };
    socket.emit("sendChat", payload);
    delete payload.roomId;
    setMessages((messages) => [...messages, payload]);
    setTextInput("");
  };

  const handleRoomChat = (roomId) => {
    if (chatRoom) {
      socket.emit("leaveRoom", chatRoom);
    }
    dispatch(fetchChatLogs(roomId)).then((data) => {
      setMessages(data);
      setChatRoom(roomId);
    });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Container
          style={{
            flex: "1",
            height: "100vh",
            backgroundColor: "rgba(9, 11, 72, 0.8)",
          }}
        >
          <h1 style={{ paddingTop: "10px", color: "white" }}>Contacts</h1>
          <Container
            className={"p-5"}
            style={{
              flex: "2",
              backgroundColor: "",
              height: "80vh",
              margin: "25, 25, 25, 25",
            }}
          >
            <Button
              style={{
                display: "flex",
                marginBottom: "30px",
                backgroundColor: "rgba(250,250,250,0.5",
              }}
              className={"mb-4, flex-row"}
            >
              <img
                style={{ flex: "1", maxWidth: "100px", borderRadius: "100%" }}
                src="https://static.remove.bg/remove-bg-web/221525818b4ba04e9088d39cdcbd0c7bcdfb052e/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
              />
              <h4 style={{ flex: "4", padding: "15px" }}>Students Name</h4>
            </Button>
            {contacts.map((el) => {
              return (
                <Button
                  style={{
                    display: "flex",
                    width: "300px",
                    height: "75px",
                    marginBottom: "30px",
                    backgroundColor: "rgba(250,250,250,0.5",
                  }}
                  className={"mb-4, flex-row"}
                  onClick={() => handleRoomChat(el.roomId)}
                >
                  <img
                    style={{
                      flex: "1",
                      maxWidth: "100px",
                      maxHeight: "60px",
                    }}
                    src={el.contactImage}
                  />
                  <h4 style={{ flex: "4", padding: "15px" }}>
                    {el.contactName}
                  </h4>
                </Button>
              );
            })}
          </Container>
        </Container>
        <Container
          style={{
            flex: "3",
            backgroundColor: "rgba(9, 11, 72, 0.1)",
            height: "100vh",
          }}
        >
          {messages.map((el) => {
            // console.log({ el })
            if (el.user._id == user.userId) {
              return (
                <text
                  className={"card"}
                  style={{ maxWidth: "400px", padding: "10px", margin: "15px" }}
                >
                  {el.text}
                </text>
              );
            } else {
              return (
                <text
                  className={"card"}
                  style={{
                    maxWidth: "400px",
                    padding: "10px",
                    margin: "15px",
                    right: "0",
                    backgroundColor: "rgba(200,210,250, 1)",
                  }}
                >
                  {el.text}
                </text>
              );
            }
          })}
          <textarea
            style={{ width: "800px", position: "absolute", bottom: "0" }}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          ></textarea>
          <button
            style={{
              position: "absolute",
              height: "55px",
              bottom: "0",
              right: "0",
            }}
            onClick={() => handleSendMessage()}
          >
            Send
          </button>
        </Container>
      </div>
    </>
  );
}
