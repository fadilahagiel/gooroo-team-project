import { useCallback, useEffect, useState } from "react";
import { AsyncStorage, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { fetchChatLogs } from "../actions";
import socket from "../config/socket";

export default function ChatScreen({ route }) {
  const { roomId } = route.params;
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    fetchChat();
    socket.emit("joinRoom", roomId);

    return function leaveRoom() {
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);

  useEffect(() => {
    socket.on("receiveChat", (payload) => {
      // setMessages([...messages, payload]);
      console.log({ payload: payload.text });
      onReceive(payload.text);
    });
  }, [socket]);

  const fetchChat = async () => {
    try {
      const logs = await fetchChatLogs(roomId);
      logs.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setMessages(logs);

      let userContacts = await AsyncStorage.getItem("contacts");
      userContacts = JSON.parse(userContacts);
      console.log({ userContacts: userContacts.contacts });
      const userInfo = {
        _id: userContacts.userId,
        name: userContacts.username,
        avatar: userContacts.avatar,
      };
      console.log({ userInfo });
      setUser(userInfo);

      const contacts = userContacts.contacts.filter(
        (el) => el.roomId === roomId
      );
      const { contactId, contactName, contactImage } = contacts[0];
      setOtherUser({
        _id: contactId,
        name: contactName,
        avatar: contactImage,
      });
    } catch (error) {
      alert(error);
    }
  };

  const onSend = useCallback((messages = []) => {
    // console.log(messages);
    const payload = messages[0];
    payload.roomId = roomId;
    console.log(payload);
    socket.emit("sendChat", payload);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const onReceive = (text) => {
    setMessages((previousMessages) => {
      GiftedChat.append(previousMessages, [
        {
          _id: Math.round(Math.random() * 1000000),
          text,
          createdAt: new Date(),
          user: otherUser,
        },
      ]);
      // return {
      //   messages: GiftedChat.append(
      //     previousState.messages,
      //     [
      //       {
      //         _id: Math.round(Math.random() * 1000000),
      //         text,
      //         createdAt: new Date(),
      //         user: otherUser,
      //       },
      //     ],
      //     Platform.OS !== "web"
      //   ),
      // };
    });
  };

  // onSendFromUser = (messages: IMessage[] = []) => {
  //   const createdAt = new Date()
  //   const messagesToUpload = messages.map(message => ({
  //     ...message,
  //     user,
  //     createdAt,
  //     _id: Math.round(Math.random() * 1000000),
  //   }))
  //   this.onSend(messagesToUpload)
  // }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={user}
    />
  );
}
