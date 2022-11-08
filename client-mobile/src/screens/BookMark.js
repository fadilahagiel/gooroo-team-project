import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import { Avatar, Title, Caption, Paragraph, Drawer } from "react-native-paper";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Modalize } from "react-native-modalize";
import { useEffect, useState } from "react";
import axios from "axios";
import CardClasses from "../components/cardClasses";
import IonIcon from "react-native-vector-icons/Ionicons";
import { serverUrl } from "../config/url";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ClassList({ route, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IonIcon name="ios-menu" color={colors.white} size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 25 }}>
          <Text style={styles.text_header}>My Bookmark List</Text>
          <Text style={styles.Text_header2}>
            Stay focus and always ready to learn
          </Text>
        </View>
      </View>

      <Modalize
        handleStyle={{
          marginTop: 30,
          backgroundColor: colors.secondary1,
          width: 80,
        }}
        modalStyle={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: colors.white,
        }}
        alwaysOpen={630}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={styles.mainWarpper}>
          <View style={styles.classWarpper}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  // justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 20,
                    }}
                  >
                    Nama Kelas
                  </Text>
                  <Text
                    style={{
                      color: colors.secondaty2,
                      fontSize: 16,
                    }}
                  >
                    By, whoo
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                  }}
                >
                  <View>
                    <Text style={{ color: colors.green1 }}>See More</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  marginTop: 10,
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text style={styles.infoTitle}>PRICE</Text>
                  <View style={styles.infoTextWrapper}>
                    <Text>30000</Text>
                    <Text style={styles.infoSubText}> /Session</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.infoTitle}>QUOTA</Text>
                  <View style={styles.infoTextWrapper}>
                    <Text>3</Text>
                    <Text style={styles.infoSubText}> /10</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.infoTitle}>DURATION</Text>
                  <View style={styles.infoTextWrapper}>
                    <Text>3</Text>
                    <Text style={styles.infoSubText}> Days</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary1,
  },
  header: {
    flex: 0.5,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  text_header: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  Text_header2: {
    color: colors.green2,
    fontWeight: "bold",
    marginTop: 5,
  },
  mainWarpper: {
    margin: 20,
  },
  classWarpper: {
    backgroundColor: colors.white,
    height: 120,
    width: "100%",
    marginTop: 20,
    marginRight: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  infoTitle: {
    fontSize: 12,
    color: colors.secondaty2,
  },
  infoTextWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 5,
  },
  infoText: {
    fontSize: 20,
    color: colors.white,
  },
  infoSubText: {
    fontSize: 14,
    color: colors.secondaty2,
  },
});
