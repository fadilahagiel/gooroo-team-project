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
  AsyncStorage
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
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const access_token = await AsyncStorage.getItem("access_token");
      const { data } = await axios({
        url: `${serverUrl}/classes`,
        headers: {
          access_token
        },
      });
      const dataClass = data.filter(
        (el) => el.SubjectId == route.params.subject.id
      );
      setClasses(dataClass);
    };
    fetch().catch(console.error);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Subject's Name</Text>
        <Text style={styles.Text_header2}>Ready to Learn?</Text>
        <View
          style={{
            height: 45,
            marginTop: 25,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 15,
            backgroundColor: colors.white,
            borderRadius: 30,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Icon size={20} name="search" />
          <TextInput
            style={{ fontSize: 15, marginLeft: 5 }}
            placeholder="Find Your Perfect Class"
          />
        </View>
      </View>

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
        alwaysOpen={560}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={styles.mainWarpper}>
          {classes.map((el) => {
            return (
              <View key={el.id} style={styles.classWarpper}>
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
                        {el.name}
                      </Text>
                      <Text
                        style={{
                          color: colors.secondaty2,
                          fontSize: 16,
                        }}
                      >
                        By, {el.Teacher.fullName}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                      }}
                      onPress={() =>
                        navigation.navigate("ClassDetail", {
                          id: el.id,
                        })
                      }
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
                        <Text> Rp.{" "}
                          {el.price
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.infoTitle}>QUOTA</Text>
                      <View style={styles.infoTextWrapper}>
                        <Text>{el.quota - el?.Transactions?.length} </Text>
                        <Text style={styles.infoSubText}>/{el.quota}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.infoTitle}>DURATION</Text>
                      <View style={styles.infoTextWrapper}>
                        <Text>{el?.Schedules?.length}</Text>
                        <Text style={styles.infoSubText}> Days</Text>
                      </View>

                    </View>
                  </View>
                </View>

              </View>
              )
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
    flex: 0.5,
    // justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingTop: 15,
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
    marginTop: 35,
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
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },
  caption1: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 14,
    color: colors.secondary1,
  },
  caption2: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 14,
    color: colors.green2,
  },
});
