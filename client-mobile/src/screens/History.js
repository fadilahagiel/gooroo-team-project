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
import colors from "../config/colors";

import { Modalize } from "react-native-modalize";

import IonIcon from "react-native-vector-icons/Ionicons";

export default function History({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IonIcon name="ios-menu" color={colors.white} size={20} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 25,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.text_header}>TOTAL BALANCE</Text>
          <Text style={styles.Text_header2}>Rp. 3050000</Text>
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
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={styles.mainWarpper}>
          <View style={styles.classWarpper}>
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
                      color: "yellow",
                      fontSize: 20,
                    }}
                  >
                    + 50000
                  </Text>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 16,
                      marginTop: 5,
                    }}
                  >
                    TopUp balance
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                  }}
                >
                  <View>
                    <Text style={{ color: colors.white }}>30 Nov 2022</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                  alignItems: "flex-end",
                }}
              >
                <Text style={styles.infoTitle}>DEBIT</Text>
              </View>
            </View>
          </View>
          <View style={styles.classWarpper2}>
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
                      color: "yellow",
                      fontSize: 20,
                    }}
                  >
                    - 50000
                  </Text>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 16,
                      marginTop: 5,
                    }}
                  >
                    Ikut kelas Ms. Sri
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                  }}
                >
                  <View>
                    <Text style={{ color: colors.white }}>30 Nov 2022</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                  alignItems: "flex-end",
                }}
              >
                <Text style={styles.infoTitle}>kredit</Text>
              </View>
            </View>
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green2,
  },
  header: {
    flex: 0.5,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  text_header: {
    color: colors.white,
    // fontWeight: "bold",
    fontSize: 20,
  },
  Text_header2: {
    color: "yellow",
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 25,
  },
  mainWarpper: {
    margin: 20,
    marginTop: 40,
  },
  classWarpper: {
    backgroundColor: colors.blue,
    height: 90,
    width: "100%",
    marginRight: 10,
    marginBottom: 20,
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
  classWarpper2: {
    backgroundColor: colors.red,
    height: 90,
    width: "100%",
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 20,
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
    fontSize: 14,
    color: colors.white,
    textTransform: "uppercase",
  },
});
