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
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { serverUrl } from "../config/url";
import { addContact, fetchContacts } from "../actions";
import { useFocusEffect } from "@react-navigation/native";

export default function ClassDetail({ navigation, route }) {
  const { id } = route.params;
  const [teacher, setTeacher] = useState({});
  const [testimoni, setTestimoni] = useState([]);

  const fetchTeacher = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const { data } = await axios({
        method: "get",
        url: `${serverUrl}/teachers/${id}`,
        headers: { access_token },
      });
      const idUser = data.UserId;
      const user = await axios({
        method: "get",
        url: `${serverUrl}/users/${idUser}`,
      });
      setTeacher(data);
      setTeacher({ ...data, username: user.data.username });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransaction = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const { data } = await axios({
        method: "get",
        url: `${serverUrl}/transactions/teacher/${id}`,
        headers: { access_token },
      });
      setTestimoni(data);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchTeacher();
      fetchTransaction();
      }, [])
  );

  useEffect(() => {
        fetchTeacher();
        fetchTransaction();
  }, []);

  const handleChat = async (id) => {
    const roomId = await addContact(id);
    await fetchContacts();
    navigation.navigate("ChatScreen", roomId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animatable.View style={styles.header}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Avatar.Image
              source={{ uri: teacher.image }}
              size={70}
            />
            <View style={{ marginLeft: 25, flexDirection: "column", flex: 2 }}>
              <Title style={styles.title}>{teacher.fullName}</Title>
              <Caption style={styles.caption}>{teacher.username}</Caption>
              <View style={styles.section}>
                <Paragraph style={styles.paragraph}>
                  {teacher?.Classes?.length}
                </Paragraph>
                <Caption style={styles.caption}>Classes</Caption>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                flex: 1,
              }}>
              <Text style={styles.infoTitle}>RATING</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>{teacher.averageRating}</Text>
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
              }}>
              <TouchableOpacity>
                <Icon
                  name="ios-chatbox-ellipses-outline"
                  color={colors.green2}
                  size={30}
                  onPress={() => handleChat(teacher.UserId)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.descriptionTitle}>Bio</Text>
              <Text style={styles.descriptionText}>{teacher.bio}</Text>
            </View>
          </View>
          <View style={styles.row}></View>
        </View>
      </Animatable.View>
      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig">
        <Text style={styles.text_footer}>Class List</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 400 }}>
          {teacher?.Classes?.map((el) => {
            return (
              <View
                key={el.id}
                style={styles.classWarpper}>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                    }}>
                    <View>
                      <Text
                        style={{
                          color: colors.primary,
                          fontSize: 20,
                        }}>
                        {el.name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.infoWrapper}>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}>
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
                      }}>
                      <Text style={styles.infoTitle}>QUOTA</Text>
                      <View style={styles.infoTextWrapper}>
                        <Text>{el?.Transactions?.length}</Text>
                        <Text style={styles.infoSubText}> /{el?.quota}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}>
                      <Text style={styles.infoTitle}>DURATION</Text>
                      <View style={styles.infoTextWrapper}>
                        <Text>{el?.Schedules?.length}</Text>
                        <Text style={styles.infoSubText}> Sessions</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                    onPress={() =>
                      navigation.navigate("ClassDetail", {
                        id: el.id,
                      })
                    }>
                    <View>
                      <Text style={{ color: colors.green1 }}>See More</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
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
        scrollViewProps={{ showsVerticalScrollIndicator: false }}>
        <View style={{ margin: 30, marginTop: 50, marginBottom: 80 }}>
          <Text>Comments:</Text>
          {testimoni.map((el) => {
            return (
              <View
                key={el.id}
                style={styles.cardContainer}>
                <Image
                  source={{ uri: el?.Student?.image }}
                  style={styles.cardImageContainer}
                />
                <View style={styles.CommentWarpper}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: colors.primary,
                    }}>
                    {el?.Student?.fullName}
                  </Text>
                  <Text style={{ fontSize: 16, color: colors.secondary1 }}>
                    {el?.testimoni}
                  </Text>
                </View>
              </View>
            );
          })}
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
    width: 250,
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
  CommentWarpper: {
    marginHorizontal: 10,
    justifyContent: "space-between",
  },
  infoWrapper: {
    flex: 1,
    // marginHorizontal: 10,
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
