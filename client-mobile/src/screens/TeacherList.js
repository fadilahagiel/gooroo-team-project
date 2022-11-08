import { useEffect, useState } from "react";
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
  Image,
  ScrollView,
  AsyncStorage,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Modalize } from "react-native-modalize";
import colors from "../config/colors";
import subjects from "../dummySubject";

import axios from "axios";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TeacherList({ navigation }) {
  const [teachers, setTeachers] = useState([]);
  const fetchTeachers = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const { data } = await axios({
        method: "get",
        url: `https://335d-139-228-102-240.ap.ngrok.io/teachers`,
        headers: {
          access_token,
        },
      });
      console.log(data);
      setTeachers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTeachers();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Choose Your Best Teacher!</Text>
        <Text style={styles.Text_header2}>It's Gonna be Fun and Amazing!</Text>
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
        alwaysOpen={630}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}>
        <View style={{ margin: 20, marginTop: 50, marginBottom: 80 }}>
          {teachers.map((el) => {
            return (
              <View key={el.id}>
                <View style={styles.cardContainer}>
                  <View>
                    <Image
                      source={require("../assets/face_demo.png")}
                      style={styles.cardImageContainer}
                    />
                  </View>
                  <View style={styles.cardDetailContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <View style={{ flex: 2 }}>
                        <Text
                          style={{
                            // fontWeight: "bold",
                            color: colors.primary,
                            fontSize: 20,
                          }}>
                          {el.fullName}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text style={styles.infoTitle}>RATING</Text>
                        <View style={styles.infoTextWrapper}>
                          <Text style={styles.infoText}>
                            {el.averageRating}
                          </Text>
                          <Text style={styles.infoSubText}>/10</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <View style={{ marginTop: 10 }}>
                        <Text style={styles.infoTitle}>TOTAL CLASS</Text>
                        <View style={styles.infoTextWrapper}>
                          <Text style={styles.infoText}>
                            {el?.Classes?.length}
                          </Text>
                          <Text style={styles.infoSubText}> Classes</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{ justifyContent: "flex-end" }}
                        onPress={() =>
                          navigation.navigate("TeacherDetail", { id: el.id })
                        }>
                        <View>
                          <Text style={{ color: colors.green1 }}>See More</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
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
    flex: 0.5,
    // justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  footer: {
    flex: 3.5,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    opacity: 0.9,
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
  cardContainer: {
    height: 130,
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
    height: 100,
    width: 100,
    marginLeft: 20,
    backgroundColor: colors.secondaty2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDetailContainer: {
    height: 100,
    width: "100%",
    backgroundColor: colors.white,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: "center",
  },
  infoWrapper: {
    flex: 2,
    flexDirection: "row",
    marginHorizontal: 10,
    justifyContent: "space-between",
  },
  infoTitle: {
    fontSize: 10,
    color: colors.secondaty2,
  },
  infoTextWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 3,
  },
  infoText: {
    fontSize: 15,
    color: colors.primary,
  },
  infoSubText: {
    fontSize: 10,
    color: colors.secondaty2,
  },
});
