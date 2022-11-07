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
} from "react-native";
import { Modalize } from "react-native-modalize";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import * as Animatable from "react-native-animatable";

export default function ClassDetail({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://saintif.com/wp-content/uploads/2019/05/Bilangan-prima.png",
          }}
          style={styles.image_logo}
        />
        <Text style={styles.text_header}>Bilangan Prima</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <View style={styles.heartWrapper}>
          <Entypo name="heart" size={32} color="tomato" />
        </View>
        <ScrollView>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              Descriptionzzjfjaklsfnaslfjsdilafsklfjiailbfklfiailfbaklv
              dasklfewilfjwkfanjaw;fnj;wa
            </Text>
          </View>

          <View style={styles.infoWrapper}>
            <View>
              <Text style={styles.infoTitle}>PRICE</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>75.000</Text>
                <Text style={styles.infoSubText}>/session</Text>
              </View>
            </View>
            <View>
              <Text style={styles.infoTitle}>RATING</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>3.5</Text>
                <Text style={styles.infoSubText}>/5</Text>
              </View>
            </View>
            <View>
              <Text style={styles.infoTitle}>DURATION</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>3</Text>
                <Text style={styles.infoSubText}> Days</Text>
              </View>
            </View>
          </View>
          <View style={styles.wrapper}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => alert("ENROLL!!!!")}
            >
              <Text style={styles.buttonText}>Enroll This Class</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  heartWrapper: {
    position: "absolute",
    right: 40,
    top: -30,
    width: 64,
    height: 64,
    backgroundColor: colors.white,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    opacity: 0.9,
  },
  text_header: {
    marginTop: 10,
    color: colors.green2,
    fontWeight: "bold",
    fontSize: 25,
  },
  descriptionWrapper: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.secondaty2,
    height: 85,
  },
  infoWrapper: {
    flex: 2,
    flexDirection: "row",
    marginHorizontal: 20,
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
    color: colors.primary,
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
  image_logo: {
    backgroundColor: colors.white,
    padding: 50,
    width: 170,
    height: 170,
    borderRadius: 30,
    marginTop: -30,
  },
});
