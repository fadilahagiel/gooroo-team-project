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
  AsyncStorage,
} from "react-native";
import colors from "../config/colors";

import { Modalize } from "react-native-modalize";

import IonIcon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../config/url";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function BookMark({ route, navigation }) {
  const [wishlists, setWishlists] = useState([]);
  const fetchMyWishlist = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      const { data } = await axios({
        method: "get",
        url: `${serverUrl}/wishlists`,
        headers: {
          access_token,
        },
      });
      setWishlists(data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMyWishlist();
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IonIcon
              name="ios-menu"
              color={colors.white}
              size={20}
            />
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
        scrollViewProps={{ showsVerticalScrollIndicator: false }}>
        {wishlists.map((el) => {
          return (
            <View
              key={el.id}
              style={styles.mainWarpper}>
              <View style={styles.classWarpper}>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      // justifyContent: "space-between",
                    }}>
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        style={{
                          color: colors.primary,
                          fontSize: 20,
                        }}>
                        {el?.Class?.name}
                      </Text>
                      <Text
                        style={{
                          color: colors.secondaty2,
                          fontSize: 16,
                        }}>
                        By, {el?.Class?.Teacher?.fullName}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ClassDetail", {
                          id: el?.Class?.id,
                        })
                      }
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                      }}>
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
                    }}>
                    <View>
                      <Text style={styles.infoTitle}>PRICE</Text>
                      <View style={styles.infoTextWrapper}>
                        <Text>
                          Rp{" "}
                          {el?.Class?.price
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </Text>
                        {/* <Text style={styles.infoSubText}> /Session</Text> */}
                      </View>
                    </View>
                    {/* <View>
                      <Text style={styles.infoTitle}>QUOTA</Text>
                      <View style={styles.infoTextWrapper}>
                        <Text>{el?.Class?.price}</Text>
                        <Text style={styles.infoSubText}> /10</Text>
                      </View>
                    </View> */}
                    <View>
                      <Text style={styles.infoTitle}>Subject</Text>
                      <View style={styles.infoTextWrapper}>
                        <Text> {el?.Class?.Subject?.name}</Text>
                        {/* <Text style={styles.infoSubText}> Session</Text> */}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
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
