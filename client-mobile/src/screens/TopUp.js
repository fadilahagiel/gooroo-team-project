import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import colors from "../config/colors";
import axios from "axios";
import { serverUrl } from "../config/url";
export default function TopUp({ navigation }) {
  const [price, setPrice] = useState("");

  const topUp = async (prc) => {
    try {
      if (prc < 50000 || !prc) {
        Alert.alert("Minimum top up Rp 50000");
      } else {
        const access_token = await AsyncStorage.getItem("access_token");

        const { data } = await axios({
          url: `${serverUrl}/users/topup`,
          method: "post",
          data: {
            price: prc,
          },
          headers: {
            access_token,
          },
        });

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
          <Text style={styles.hallo}>Enter top up amount</Text>
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
    backgroundColor: colors.primary,
  },
  userView: {
    width: "80%",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  hallo: {
    color: colors.white,
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
    backgroundColor: colors.white,
    borderColor: colors.green2,
    width: "100%",
    marginLeft: 60,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.green2,
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
    color: "yellow",
    fontSize: 12,
    marginBottom: 10,
    paddingRight: 30,
    marginTop: 5,
  },
});
