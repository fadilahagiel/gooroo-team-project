import axios from "axios";
import { AsyncStorage } from "react-native";
import { serverChat, serverUrl } from "./config/url";

const getToken = async () => {
  const token = await AsyncStorage.getItem("access_token");
  return token;
};

export const fetchContacts = async () => {
  try {
    const access_token = await getToken();
    const { data } = await axios({
      url: `${serverUrl}/contacts`,
      method: "get",
      headers: { access_token },
    });
    await AsyncStorage.setItem("contacts", JSON.stringify(data));
    return data;
  } catch (error) {
    // alert(error);
  }
};

export const fetchChatLogs = async (roomId) => {
  try {
    const access_token = await getToken();
    const { data } = await axios({
      url: `${serverUrl}/contacts/chat`,
      method: "get",
      headers: { access_token, roomId },
    });
    const chatLogs = data;
    return chatLogs;
  } catch (error) {
    // alert(error);
  }
};

export const addContact = async (userId) => {
  try {
    const access_token = await getToken();
    const { data } = await axios({
      url: `${serverUrl}/contacts/${userId}`,
      method: "get",
      headers: { access_token },
    });
    return data;
  } catch (error) {
    alert(error);
  }
};
