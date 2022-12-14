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
  SafeAreaView,
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
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [finishedClasses, setFinishedClasses] = useState([]);
  const [data, setData] = useState({
    rating: "",
    testimoni: "",
  });
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
      const arr = data.filter(
        (el) => el.status != "done" && el.status != "collected"
      );
      setEnrolledClasses(arr);
      const arrFinished = data.filter(
        (el) => el.status == "done" || el.status == "collected"
      );
      setFinishedClasses(arrFinished);
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

  const textInputChange = (val) => {
    setData({
      ...data,
      rating: val,
    });
  };

  const testimoniInputChange = (val) => {
    setData({
      ...data,
      testimoni: val,
    });
  };

  const response = async (id) => {
    const access_token = await AsyncStorage.getItem("access_token");
    const { data } = await axios({
      method: "get",
      url: `${serverUrl}/transactions/response/${id}`,
      headers: {
        access_token,
      },
    });
    const transactionId = data.id;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              {student !== null ? (
                <Image
                  source={{ uri: student.image }}
                  style={styles.image}
                  resizeMode="center"
                />
              ) : (
                <Image
                  source={require("../assets/defaultpict.jpg")}
                  style={styles.image}
                  resizeMode="center"
                />
              )}
            </View>
            {student !== null ? (
              <View></View>
            ) : (
              <TouchableOpacity
                style={styles.edit}
                onPress={() => navigation.navigate("AddProfile")}
              >
                <Feather name="edit-2" size={20} color={colors.white} />
              </TouchableOpacity>
            )}
          </View>

          <View style={[styles.infoContainer]}>
            <Text style={styles.textTitle}>
              {student?.fullName ? student?.fullName : ""}
            </Text>
            <Text style={styles.text}>
              {student?.User?.username ? student.User?.username : ""}
            </Text>
          </View>

          <View style={[styles.statContainer]}>
            <View style={styles.StatBox}>
              <Text style={styles.textTitle}>
                {student?.Wishlists?.length ? student?.Wishlists?.length : 0}
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
              <Text style={styles.textTitle}>
                {myClasses?.length ? myClasses?.length : 0}
              </Text>
              <Text style={[styles.text]}>Class Enrolled</Text>
            </View>
            <View style={styles.StatBox}>
              {student !== null ? (
                <Text style={styles.textTitle}>
                  Rp{" "}
                  {student?.User?.saldo
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Text>
              ) : (
                <Text style={styles.textTitle}>Rp. 0</Text>
              )}

              <Text style={[styles.text]}>Balance</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.topUpButton]}
            onPress={() => navigation.navigate("TopUp")}
          >
            <Text style={{ color: "yellow", fontWeight: "bold" }}>TopUp</Text>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text style={{ color: colors.secondaty2, marginLeft: 20 }}>
              ENROLLED CLASS
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ height: 170 }}
            >
              {enrolledClasses.map((el) => {
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
                              color: colors.white,
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
                            <Text style={{ color: "yellow" }}>{el?.price}</Text>
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
                            <Text style={{ color: "yellow" }}>
                              {el?.Transactions?.length}
                            </Text>
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
                            <Text style={{ color: "yellow" }}>
                              {el?.Schedules?.length}
                            </Text>
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
                          <Text style={{ color: "yellow" }}>See More</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            {/* CLASS FINISHED */}
            <Text style={{ color: colors.secondaty2, marginLeft: 20 }}>
              FINISHED CLASS
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ height: 140 }}
            >
              {finishedClasses.map((el) => {
                return (
                  <View key={el.id} style={styles.classWarpper2}>
                    <View style={{ flex: 1 }}>
                      <View>
                        <View>
                          <Text
                            style={{
                              color: colors.white,
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

                        <View
                          style={{
                            alignItems: "flex-end",
                            justifyContent: "center",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              marginTop: 10,
                              backgroundColor: colors.green1,
                              width: 120,
                              height: 30,
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 30,
                            }}
                            onPress={() =>
                              navigation.navigate("Response", { id: el?.id })
                            }
                          >
                            <Text style={{ color: "yellow" }}>
                              Give Response
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
             
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    height: "100%",
  },
  inner: {
    flex: 1,
    justifyContent: "space-around",
  },
  textTitle: {
    color: colors.white,
    fontSize: 20,
    fontStyle: 'capitalize'
  },
  text: {
    color: colors.secondaty2,
    fontSize: 16,
    marginTop: 5,
    textTransform: 'capitalize'
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
    backgroundColor: colors.secondaty2,
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
    backgroundColor: colors.green1,
    marginRight: 25,
    marginTop: 15,
    height: 30,
    width: 70,
    borderRadius: 30,
  },
  classWarpper: {
    backgroundColor: colors.secondary1,
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
    backgroundColor: colors.secondary1,
    height: 110,
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
    color: colors.white,
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
    color: colors.white,
  },
});
