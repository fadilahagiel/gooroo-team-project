import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import colors from "../config/colors";
import Feather from "react-native-vector-icons/Feather";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../config/url";

import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function Profile({ navigation, route }) {
  const [student, setStudent] = useState({});
  const [myClasses, setMyClasses] = useState([]);
  const fetchStudent = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      const { data } = await axios({
        method: "get",
        url: `${serverUrl}/students`,
        headers: {
          access_token,
        },
      });
      setStudent(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyClass = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      const { data } = await axios({
        method: "get",
        url: `${serverUrl}/classes/myClassesStudent`,
        headers: {
          access_token,
        },
      });
      setMyClasses(data);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchStudent();
      fetchMyClass();
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                <Image
                  source={{ uri: student.image }}
                  style={styles.image}
                  resizeMode="center"
                />
              </View>
              <TouchableOpacity style={styles.edit}>
                <Feather name="edit-2" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>

            <View style={[styles.infoContainer]}>
              <Text style={styles.textTitle}>{student.fullName}</Text>
              <Text style={styles.text}>{student?.User?.username}</Text>
            </View>

            <View style={[styles.statContainer]}>
              <View style={styles.StatBox}>
                <Text style={styles.textTitle}>
                  {student?.Wishlists?.length}
                </Text>
                <Text style={[styles.text]}>Bookmarks</Text>
              </View>
              <View
                style={[
                  styles.StatBox,
                  {
                    borderColor: colors.secondary1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}
              >
                <Text style={styles.textTitle}>{myClasses.length}</Text>
                <Text style={[styles.text]}>Class Enrolled</Text>
              </View>
              <View style={styles.StatBox}>
                <Text style={styles.textTitle}>
                  Rp{" "}
                  {student?.User?.saldo
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Text>
                <Text style={[styles.text]}>Balance</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.topUpButton]}
              onPress={() => navigation.navigate("TopUp")}
            >
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                TopUp
              </Text>
            </TouchableOpacity>

            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text style={{ color: colors.secondary1, marginLeft: 20 }}>
                ENROLLED CLASS
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ height: 170 }}
              >
                {myClasses.map((el) => {
                  return (
                    <View key={el.id} style={styles.classWarpper}>
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flex: 2,
                            // justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                color: colors.primary,
                                fontSize: 20,
                              }}
                            >
                              {el.name}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                color: colors.secondaty2,
                                fontSize: 16,
                              }}
                            >
                              By, {el?.Teacher?.fullName}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.infoWrapper}>
                          <View
                            style={{
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={styles.infoTitle}>PRICE</Text>
                            <View style={styles.infoTextWrapper}>
                              <Text>{el?.price}</Text>
                              <Text style={styles.infoSubText}></Text>
                            </View>
                          </View>
                          <View
                            style={{
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={styles.infoTitle}>QUOTA</Text>
                            <View style={styles.infoTextWrapper}>
                              <Text>{el?.Transactions?.length}</Text>
                              <Text style={styles.infoSubText}>
                                {" "}
                                /{el?.quota}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={styles.infoTitle}>DURATION</Text>
                            <View style={styles.infoTextWrapper}>
                              <Text>{el?.Schedules?.length}</Text>
                              <Text style={styles.infoSubText}> Sessions</Text>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ClassDetail", {
                              id: el.id,
                            })
                          }
                          style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          <View>
                            <Text style={{ color: colors.green1 }}>
                              See More
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
              <Text style={{ color: colors.secondary1, marginLeft: 20 }}>
                FINISHED CLASS
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ height: 350 }}
              >
                <View style={styles.classWarpper2}>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flex: 2,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: colors.primary,
                            fontSize: 20,
                          }}
                        >
                          Class's Name
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: colors.secondaty2,
                            fontSize: 16,
                          }}
                        >
                          By, Class's Teacher
                        </Text>
                      </View>
                      <View style={{ flex: 1, marginTop: 10 }}>
                        <Text style={{ color: colors.secondaty2 }}>RATING</Text>

                        <TextInput
                          placeholder="rate between 1-10"
                          editable={true}
                          style={{
                            height: 40,
                            borderWidth: 1,
                            borderColor: colors.primary,
                            padding: 10,
                            borderRadius: 10,
                            marginTop: 5,
                            backgroundColor: colors.white,
                          }}
                        />
                      </View>

                      <View style={{ flex: 2, marginTop: 20 }}>
                        <Text>REVIEW</Text>
                        <TextInput
                          placeholder="state your review"
                          multiline
                          numberOfLines={4}
                          editable={true}
                          style={{
                            height: 80,
                            borderWidth: 1,
                            borderColor: colors.primary,
                            paddingLeft: 10,
                            marginTop: 5,
                            backgroundColor: colors.white,
                            borderRadius: 10,
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            marginTop: 10,
                            backgroundColor: colors.green2,
                            width: 80,
                            height: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 30,
                          }}
                        >
                          <Text style={{ color: colors.white }}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ClassDetail", {
                          id: el.id,
                        })
                      }
                      style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <View>
                        <Text style={{ color: colors.green1 }}>See More</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaty2,
    height: "100%",
  },
  inner: {
    flex: 1,
    justifyContent: "space-around",
  },
  textTitle: {
    color: colors.white,
    fontSize: 20,
  },
  text: {
    color: colors.secondary1,
    fontSize: 16,
    marginTop: 5,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginTop: 20,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  edit: {
    backgroundColor: colors.secondary1,
    position: "absolute",
    bottom: 0,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
  },
  statContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30,
  },
  StatBox: {
    flex: 1,
    alignItems: "center",
  },
  topUpButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: colors.green2,
    marginRight: 25,
    marginTop: 15,
    height: 30,
    width: 70,
    borderRadius: 30,
  },
  classWarpper: {
    backgroundColor: colors.white,
    height: 140,
    width: 250,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  classWarpper2: {
    backgroundColor: colors.white,
    height: 300,
    width: 250,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  textInput: {
    flex: 1,

    borderColor: colors.primary,
    paddingLeft: 10,
    color: colors.primary,
  },
  infoWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
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
