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
  FlatList,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import colors from "../config/colors";
import SPACING from "../config/SPACING";
const { height } = Dimensions.get("window");
const height_logo = height * 0.28;
import axios from "axios";
import serverUrl from "../config/url";
export default function Login({ navigation }) {
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    check_textInputChange: false,
    check_usernameInputChange: false,
    secureTextEntry: true,
  });
  const register = async () => {
    fetch(`${serverUrl}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: data.email, password: data.password, username:data.username })
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.message) {
          throw data.message
        }
        return data
      })
      .catch((error) => {
        return alert(error)
      })
  };

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const usernameInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_usernameInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_usernameInputChange: false,
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
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Sign Up Now!</Text>
      </View>
      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig">
        <ScrollView>
          <Text style={[styles.text_footer]}>Username</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color={colors.secondaty2}
              size={20}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor={colors.secondaty2}
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => usernameInputChange(val)}
            />
            {data.check_usernameInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome
              name="envelope-o"
              color={colors.secondaty2}
              size={20}
            />
            <TextInput
              placeholder="Your Email"
              placeholderTextColor={colors.secondaty2}
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              color={colors.secondaty2}
              size={20}
            />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              placeholderTextColor={colors.secondaty2}
              style={[styles.textInput]}
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather
                  name="eye-off"
                  color="grey"
                  size={20}
                />
              ) : (
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => register()}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: colors.white,
                  },
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signUp,
                {
                  borderColor: colors.primary,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: colors.primary,
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
