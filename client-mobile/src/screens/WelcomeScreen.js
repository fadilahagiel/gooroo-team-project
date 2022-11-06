import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../config/colors";
import SPACING from "../config/SPACING";
const { height } = Dimensions.get("window");
const height_logo = height * 0.28;

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/a71e16012a4afef2f46af95065a5623f.jpg")}
      style={styles.container}
    >
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.View
          style={{ justifyContent: "center" }}
          animation="bounceIn"
          duraton="1500"
        >
          <Text
            style={{
              fontSize: 100,
              fontWeight: "800",
              color: colors.secondaty2,
              margin: -20,
              alignSelf: "center",
            }}
          >
            GOO
          </Text>
          <Text
            style={{
              fontSize: 100,
              fontWeight: "800",
              color: colors.white,
              margin: -20,
              alignSelf: "center",
            }}
          >
            ROO.
          </Text>
          <Text
            style={{
              color: colors.green1,
              marginTop: 20,
              justifyContent: "center",
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Be Better Than Yesterday
          </Text>
        </Animatable.View>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Be The Smartest Person in The Room!</Text>
        <Text style={styles.text}>Sign In with an Account</Text>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.textSign}>Get Started</Text>
            <MaterialIcons
              name="navigate-next"
              color={colors.white}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.primary,
  },
  header: {
    flex: 2.3,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 0.7,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    opacity: 0.9,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: colors.primary,
    fontSize: 27,
    fontWeight: "bold",
    top: -20,
  },
  text: {
    color: colors.secondary1,
    fontSize: 17,
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
    color: colors.primary,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: colors.primary,
    marginTop: 10,
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
