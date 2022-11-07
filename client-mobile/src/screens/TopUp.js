import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

export default function TopUp({ navigation }) {
  const [price, setPrice] = useState("");

  const topUp = async (prc) => {
    try {
      if (prc < 50000 || !prc) {
        Alert.alert("Minimum top up Rp 50000");
      } else {
        console.log(prc, "ini price");
        const { data } = await axios({
          url: `https://335d-139-228-102-240.ap.ngrok.io/users/topup`,
          method: "post",
          data: {
            price: prc,
          },
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2Njc4MDU4NjF9.PAOA-qpaxOvDcQl8w6lELJOkG-gI7e7Z3CoYuHWFjlo",
          },
        });
        console.log(data, "ini data");
        navigation.navigate("Midtrans", {
          url: data.transaction.redirect_url,
          price: prc,
        });
      }
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
