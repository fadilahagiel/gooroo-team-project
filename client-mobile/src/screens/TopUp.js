import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function TopUp({ navigation }) {
  const [price, setPrice] = useState("");

  const topUp = (val) => {
    try {
      navigation.navigate("Midtrans", {
        url: "https://app.sandbox.midtrans.com/snap/v3/redirection/085ce27b-f4d6-4f45-922b-e8f5a00f329b",
        price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.containerPhoto}>
      <View style={styles.userView}>
        <View style={{ marginStart: 0 }}>
          <Text style={styles.hallo}>Enter Top up amount</Text>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          onChangeText={setPrice}
          placeholder="Rp 0"
          keyboardType="numeric"
        />
      </View>
      <View style={{ flexDirection: "row-reverse" }}>
        <Text style={styles.description}>Min Rp 50.000</Text>
      </View>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => topUp(price)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  containerPhoto: {
    flex: 1,
    padding: 10,
  },
  userView: {
    width: "80%",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  hallo: {
    color: "#2B377F",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 2,
    marginTop: 5,
    paddingHorizontal: 35,
  },
  inputcontainer: {
    width: "84%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#a0acda",
    width: "100%",
    marginLeft: 60,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#2B377F",
    marginTop: 10,
    marginHorizontal: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
    textAlign: "center",
  },
  description: {
    color: "#ec5f58",
    fontSize: 12,
    marginBottom: 10,
    paddingRight: 30,
    marginTop: 5,
  },
});
