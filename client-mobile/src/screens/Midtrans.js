import { WebView } from "react-native-webview";

export default function Midtrans({ navigation, route }) {
  const { url, price } = route.params;

  return (
    <WebView
      source={{ uri: url }}
      onNavigationStateChange={(navState) => {
        if (navState.url.includes("success")) {
          console.log(price, "tes sukses");
          navigation.navigate("Profile");
        }
      }}
    />
  );
}
