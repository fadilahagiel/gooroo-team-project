import { WebView } from "react-native-webview";
import axios from "axios";

export default function Midtrans({ navigation, route }) {
  const { url, price } = route.params;
  const updateSaldo = async (prc) => {
    try {
      await axios({
        method: "patch",
        url: `https://335d-139-228-102-240.ap.ngrok.io/users/saldo`,
        data: {
          saldo: prc,
        },
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2Njc4MDU4NjF9.PAOA-qpaxOvDcQl8w6lELJOkG-gI7e7Z3CoYuHWFjlo",
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
