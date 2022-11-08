import { WebView } from "react-native-webview";
import axios from "axios";
import { AsyncStorage } from "react-native";
import serverUrl from "../config/url";
export default function Midtrans({ navigation, route }) {
  const { url, price } = route.params;
  const updateSaldo = async (prc) => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      await axios({
        method: "patch",
        url: `${serverUrl}/users/saldo`,
        data: {
          saldo: prc,
        },
        headers: {
          access_token,
        },
      });
      navigation.navigate("Profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WebView
      source={{ uri: url }}
      onNavigationStateChange={(navState) => {
        if (navState.url.includes("success")) {
          updateSaldo(price);
        }
      }}
    />
  );
}
