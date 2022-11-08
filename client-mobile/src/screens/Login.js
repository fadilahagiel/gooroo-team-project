import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  Platform,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import colors from "../config/colors";

import axios from "axios";
import { AsyncStorage } from "react-native";
import { AuthContext } from "../components/context";
import { serverUrl } from "../config/url";

import { fetchContacts } from "../actions";
import socket from "../config/socket";


const { height } = Dimensions.get("window");

export default function Login({ navigation }) {
  const [data, setData] = React.useState({
    email: "budi@mail.com",
    password: "12345",
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const { signIn } = React.useContext(AuthContext);

  const submitLogin = async () => {
    // console.log(data);
    try {
      // console.log("cek");
      // console.log(data, "cek email");
      // console.log(data.password);
      const response = await fetch(`${serverUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const dataTes = await response.json();
      if (dataTes.message) {
        throw dataTes.message;
      }
      await AsyncStorage.setItem("access_token", dataTes.access_token);
      // console.log({ userId: dataTes.id });
      const contacts = await fetchContacts(dataTes.id);
      console.log({ dataTes });
      socket.auth = dataTes;
      socket.connect();
      signIn();
    } catch (error) {
      console.log(error);
      return alert(error);
    }
  };

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
      });
    } else {
      setData({
        ...data,
        password: val,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  return (
    <ImageBackground
      source={require("../assets/a71e16012a4afef2f46af95065a5623f.jpg")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome Back!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <TouchableOpacity
          style={{
            alignItems: "flex-end",
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate("WelcomeScreen")}
        >
          <FontAwesome name="times-circle" color={colors.primary} size={30} />
        </TouchableOpacity>
        <Text style={[styles.text_footer]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.secondaty2} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.secondaty2}
            style={[styles.textInput]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            value={data.email}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.secondaty2} size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            placeholderTextColor={colors.secondaty2}
            style={[styles.textInput]}
            onChangeText={(val) => handlePasswordChange(val)}
            value={data.password}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={() => submitLogin()}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={[
              styles.signUp,
              {
                borderColor: colors.primary,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: colors.primary,
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 40,
    opacity: 0.9,
  },
  text_header: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "500",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: colors.primary,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: colors.primary,
  },
  signUp: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
