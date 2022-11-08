import axios from "axios";
import { AsyncStorage } from "react-native";
import { serverChat, serverUrl } from "./config/url";

export const fetchContacts = async () => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    const response = await axios({
      url: `${serverUrl}/contacts`,
      method: "get",
      headers: { access_token },
    });
    const contacts = response.data;
    // console.log(contacts);
    await AsyncStorage.setItem("contacts", JSON.stringify(contacts));
    const test = await AsyncStorage.getItem("contacts");
    // console.log({ test });
    return contacts;
  } catch (error) {
    alert(error);
  }
};
