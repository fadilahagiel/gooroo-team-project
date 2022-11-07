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
} from "react-native";
import * as Animatable from "react-native-animatable";
import colors from "../config/colors";
import subjects from "../dummySubject";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Home({ navigation }) {
  const SubjectCard = ({ subject }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate("ClassList", { data: subject })}
      >
        <ImageBackground
          source={{
            uri: subject.image,
          }}
          style={{
            marginVertical: 5,
            marginHorizontal: 5,
            borderRadius: 50,
            width: windowWidth / 2 - 30,
            height: windowHeight / 6,
            paddingTop: 25,
            paddingLeft: 20,
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingBottom: 5,
            }}
          >
            {subject.name}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Hello, Username</Text>
        <Text style={styles.Text_header2}>
          What Subject you want to learn today?
        </Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text_footer}>Choose Your Subject</Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={subjects}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <SubjectCard subject={item} />}
          />
        </View>
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
    paddingVertical: 20,
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
  text_footer: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "500",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
});
