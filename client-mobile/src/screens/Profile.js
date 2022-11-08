import {
  Text,
  View,
  StyleSheet,
  Button,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import colors from "../config/colors";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";

export default function Profile({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../assets/face_demo2.png")}
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <TouchableOpacity style={styles.edit}>
            <Feather name="edit-2" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.textTitle}>Septriadi Gabriel</Text>
          <Text style={styles.text}>Aldo's Owner</Text>
        </View>

        <View style={styles.statContainer}>
          <View style={styles.StatBox}>
            <Text style={styles.textTitle}>12</Text>
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
            <Text style={styles.textTitle}>2</Text>
            <Text style={[styles.text]}>Class Enrolled</Text>
          </View>
          <View style={styles.StatBox}>
            <Text style={styles.textTitle}>130000</Text>
            <Text style={[styles.text]}>Balance</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.topUpButton}
          onPress={() => navigation.navigate("TopUp")}
        >
          <Text style={{ color: colors.white, fontWeight: "bold" }}>TopUp</Text>
        </TouchableOpacity>

        <View style={{ margin: 20, marginTop: 30, height: "100%" }}>
          <Text style={{ color: colors.secondary1 }}>ENROLLED CLASS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                      Nama Kelas
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
                      Nama Kelas
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
                      Nama Kelas
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaty2,
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
    height: 200,
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
