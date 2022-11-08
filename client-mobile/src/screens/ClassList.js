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
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios({
        url: `${serverUrl}/classes`,
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2Njc4MzU3MDF9.6QflhZsaykaSPW58RVoiEuxaBEBuEVPQjMokKfZApu0",
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
        <View style={{ margin: 20, marginTop: 50, marginBottom: 10 }}>
          {classes.map((el) => {
            return (
              <View key={el.id} style={styles.buttonClass}>
                <View style={{ marginRight: 5, flexDirection: "row" }}>
                  <Image
                    source={require("../assets/face_demo.png")}
                    style={{
                      flex: 1,
                      width: 70,
                      height: 70,
                      marginRight: 10,
                      borderRadius: 5,
                    }}
                  />
                  <View
                    style={{
                      flex: 2,
                      marginLeft: 5,
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.title}>{el.name}</Text>
                    <Text style={styles.caption1}>
                      By. {el?.Teacher?.fullName}
                    </Text>
                    <Text style={styles.caption2}>
                      {el?.Schedules?.length} Days
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ClassDetail", { id: el.id })
                    }
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "flex-end",
                      padding: 10,

                      marginRight: 10,
                    }}
                  >
                    <IonIcon
                      name="ios-enter-outline"
                      color={colors.green1}
                      size={30}
                    />
                  </TouchableOpacity>
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
  buttonClass: {
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: colors.white,
    shadowColor: "000",
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
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
