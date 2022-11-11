import { useCallback, useEffect, useRef, useState } from "react";
import {
  AsyncStorage,
  Button,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { fetchChatLogs } from "../actions";
import Icon from "react-native-vector-icons/Ionicons";
import uuid from "react-native-uuid";
import socket from "../config/socket";
import colors from "../config/colors";

export default function ChatScreen({ navigation, route }) {
  const { roomId } = route.params;
  const [msgInput, setMsgInput] = useState("");
  const [chatLogs, setChatLogs] = useState([]);
  const [user, setUser] = useState({});
  const [otherUser, setOtherUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const scrollViewRef = useRef();

  useEffect(() => {
    fetchChat();
    socket.emit("joinRoom", roomId);

    return function leaveRoom() {
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);

  useEffect(() => {
    socket.on("receiveChat", (payload) => {
      setChatLogs((chatLogs) => [...chatLogs, payload]);
    });
  }, []);

  const fetchChat = async () => {
    try {
      const logs = await fetchChatLogs(roomId);
      setChatLogs(logs);

      let userContacts = await AsyncStorage.getItem("contacts");
      userContacts = JSON.parse(userContacts);
      const userInfo = {
        _id: userContacts.userId,
        name: userContacts.username,
        avatar: userContacts.avatar,
      };
      setUser(userInfo);

      const contactInfo = userContacts.contacts.filter(
        (el) => el.roomId === roomId
      );
      const { contactId, contactName, contactImage } = contactInfo[0];
      setOtherUser({
        _id: contactId,
        name: contactName,
        avatar: contactImage,
      });

      setIsLoading(false);
    } catch (error) {
      // alert(error);
    }
  };

  const handleSendMsg = async () => {
    const payload = {
      roomId,
      _id: uuid.v4(),
      user,
      text: msgInput,
      createdAt: new Date(),
    };
    socket.emit("sendChat", payload);
    setMsgInput("");
    delete payload.roomId;
    setChatLogs((chatLogs) => [...chatLogs, payload]);
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ backgroundColor: colors.secondary1 }}>
        <View style={styles.container}>
          <View style={styles.roomInfo}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="ios-arrow-back" color={colors.white} size={20} />
            </TouchableOpacity>
            <Image
              source={{ uri: otherUser.avatar }}
              style={styles.contactAvatar}
            />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{otherUser.name}</Text>
            </View>
          </View>
          <ScrollView
            style={styles.chatBox}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            {chatLogs.map((el, index) => {
              return user._id === el.user._id ? (
                <View key={index} style={styles.sentBox}>
                  <View style={styles.sentMsg}>
                    <Text style={{ fontSize: 16 }}>{el.text}</Text>
                  </View>
                </View>
              ) : (
                <View key={index} style={styles.receivedBox}>
                  <View style={styles.receivedMsg}>
                    <Text style={{ fontSize: 16 }}>{el.text}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputText}
              onChangeText={(input) => setMsgInput(input)}
              value={msgInput}
              placeholder="Type here"
            />
            <TouchableOpacity
              onPress={() => handleSendMsg("sent")}
              style={styles.sendButton}
            >
              <Text style={{ fontWeight: "bold", color: colors.white }}>
                SEND
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.secondaty2,
    height: "100%",
    // alignItems: "center",
    justifyContent: "center",
  },
  roomInfo: {
    height: 70,
    width: "100%",
    // borderWidth: 2,
    // borderRadius: 20,
    backgroundColor: colors.secondary1,
    // margin: 5,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  contactAvatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 15,
    // resizeMode: "cover",
  },
  contactInfo: {
    justifyContent: "center",
    marginLeft: 15,
  },
  contactName: {
    fontSize: 22,
    color: colors.white,
  },
  username: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20,
  },
  inputBox: {
    backgroundColor: colors.secondary1,
    justifyContent: "center",
    flexDirection: "row",
    padding: 20,
  },
  inputText: {
    maxHeight: 40,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.white,
    backgroundColor: colors.white,
    // width: "80%",
    width: "85%",
    marginRight: 10,
    color: "#1D1D1D",
  },
  sendButton: {
    backgroundColor: colors.green2,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 60,
    borderRadius: 10,
  },
  chatBox: {
    // backgroundColor: "red",
    flex: 1,
    width: "100%",
  },
  sentBox: {
    alignItems: "flex-end",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  sentMsg: {
    backgroundColor: colors.green2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sentFooter: {
    fontSize: 11,
    marginHorizontal: 5,
  },
  receivedBox: {
    alignItems: "flex-start",
    marginHorizontal: 20,

    marginVertical: 5,
  },
  receivedMsg: {
    backgroundColor: colors.secondary1,
    // borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  receivedFooter: {
    fontSize: 11,
    marginHorizontal: 5,
  },
});
