import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Avatar, Title, Caption, Paragraph, Drawer } from "react-native-paper";
import { Modalize } from "react-native-modalize";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import * as Animatable from "react-native-animatable";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ClassDetail({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animatable.View style={styles.header}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Avatar.Image
              source={require("../assets/face_demo.png")}
              size={70}
            />
            <View style={{ marginLeft: 25, flexDirection: "column", flex: 2 }}>
              <Title style={styles.title}>Fadilah Agiel</Title>
              <Caption style={styles.caption}>Agiel008</Caption>
              <View style={styles.section}>
                <Paragraph style={styles.paragraph}>3</Paragraph>
                <Caption style={styles.caption}>Classes</Caption>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                flex: 1,
              }}
            >
              <Text style={styles.infoTitle}>RATING</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>8</Text>
                <Text style={styles.infoSubText}> /10</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.5 }}>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-end",
                // marginTop: 10,
              }}
            >
              {/* <Text style={{ color: colors.secondaty2 }}>CONTACT ME!</Text> */}
              <TouchableOpacity>
                <Icon
                  name="ios-chatbox-ellipses-outline"
                  color={colors.green2}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.descriptionTitle}>Bio</Text>
              <Text style={styles.descriptionText}>
                adnk;fnuwafnjfnwjdn;dmla'dmwaelfbniw
                fewhfbywDN'DM,SAnIDLEBFHWLbfiwfenejw;fnW;
              </Text>
            </View>
          </View>
          {/* <View style={{ flex: 3 }}></View> */}
          <View style={styles.row}></View>
        </View>
      </Animatable.View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Class List</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 400 }}
        >
          <View style={styles.classWarpper}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 20,
                    }}
                  >
                    Bilangan Prima
                  </Text>
                </View>
              </View>
              <View
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <Text style={styles.infoTitle}>DURATION</Text>
                <View style={styles.infoTextWrapper}>
                  <Text>3</Text>
                  <Text style={styles.infoSubText}> Sessions</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
                onPress={() => alert("to class detail")}
              >
                <View>
                  <Text style={{ color: colors.green1 }}>See More</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.classWarpper}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 20,
                    }}
                  >
                    Bilangan Prima
                  </Text>
                </View>
              </View>
              <View
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <Text style={styles.infoTitle}>DURATION</Text>
                <View style={styles.infoTextWrapper}>
                  <Text>3</Text>
                  <Text style={styles.infoSubText}> Sessions</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
                onPress={() => {}}
              >
                <View>
                  <Text style={{ color: colors.green1 }}>See More</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.classWarpper}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 20,
                    }}
                  >
                    Bilangan Prima
                  </Text>
                </View>
              </View>
              <View
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <Text style={styles.infoTitle}>DURATION</Text>
                <View style={styles.infoTextWrapper}>
                  <Text>3</Text>
                  <Text style={styles.infoSubText}> Sessions</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
                onPress={() => {}}
              >
                <View>
                  <Text style={{ color: colors.green1 }}>See More</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.classWarpper}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 20,
                    }}
                  >
                    Bilangan Prima
                  </Text>
                </View>
              </View>
              <View
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <Text style={styles.infoTitle}>DURATION</Text>
                <View style={styles.infoTextWrapper}>
                  <Text>3</Text>
                  <Text style={styles.infoSubText}> Sessions</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
                onPress={() => {}}
              >
                <View>
                  <Text style={{ color: colors.green1 }}>See More</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
      <Modalize
        handleStyle={{
          marginTop: 30,
          backgroundColor: colors.primary,
          width: 80,
        }}
        modalStyle={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: colors.white,
        }}
        alwaysOpen={250}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={{ margin: 30, marginTop: 50, marginBottom: 80 }}>
          <Text>Comments:</Text>
          <View style={styles.cardContainer}>
            <Image
              source={require("../assets/face_demo2.png")}
              style={styles.cardImageContainer}
            />
            <View style={styles.infoWrapper}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.primary,
                }}
              >
                Giovanni
              </Text>
              <Text style={{ fontSize: 16, color: colors.secondary1 }}>
                amazing class
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={require("../assets/face_demo2.png")}
              style={styles.cardImageContainer}
            />
            <View style={styles.infoWrapper}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.primary,
                }}
              >
                Giovanni
              </Text>
              <Text style={{ fontSize: 16, color: colors.secondary1 }}>
                so FUN wkwkwk
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={require("../assets/face_demo2.png")}
              style={styles.cardImageContainer}
            />
            <View style={styles.infoWrapper}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.primary,
                }}
              >
                Giovanni
              </Text>
              <Text style={{ fontSize: 16, color: colors.secondary1 }}>
                Nice Teacher!
              </Text>
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
    backgroundColor: colors.primary,
  },
  header: {
    flex: 0.7,
    paddingHorizontal: 30,
    paddingTop: 15,
    backgroundColor: colors.primary,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  caption: {
    color: colors.secondaty2,
    fontSize: 14,
    lineHeight: 14,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    color: colors.white,
    fontWeight: "bold",
    marginRight: 3,
    fontSize: 14,
    lineHeight: 14,
  },
  footer: {
    flex: 1.3,
    backgroundColor: colors.secondaty2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    opacity: 0.9,
  },
  text_footer: {
    color: colors.secondary1,
    fontSize: 16,
    fontWeight: "bold",
  },
  classWarpper: {
    backgroundColor: colors.white,
    height: 150,
    width: 150,
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
  descriptionWrapper: {
    marginHorizontal: 10,
    marginTop: -20,
  },
  descriptionTitle: {
    fontSize: 24,
    color: colors.white,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.secondaty2,
    height: 85,
  },
  cardContainer: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  cardImageContainer: {
    height: 50,
    width: 50,
    marginLeft: 10,
    borderRadius: 50,
  },
  infoWrapper: {
    marginHorizontal: 10,
    justifyContent: "space-between",
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
  wrapper: {
    flex: 1,
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: colors.green2,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
});
