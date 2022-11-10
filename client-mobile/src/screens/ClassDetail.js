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
  Alert,
} from "react-native";
import { Modalize } from "react-native-modalize";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import * as Animatable from "react-native-animatable";
import { useEffect, useState } from "react";
import axios from "axios";

import { serverUrl } from "../config/url";

export default function ClassDetail({ navigation, route }) {
  const confirmation = () => {
    Alert.alert(
      `${oneClass.name}`,
      `Are you sure want to enroll this class ?`,
      [
        {
          text: "No",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: () => {
            buyClass(oneClass.id);
          },
        },
      ]
    );
  };
  const [oneClass, setOneClass] = useState({});
  const [isBuy, setIsBuy] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const fetchOneClass = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const { data } = await axios({
        method: "get",
        url: `${serverUrl}/classes/${route.params.id}`,
        headers: {
          access_token,
        },
      });
      setOneClass(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addWishlist = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const { data } = await axios({
        method: "post",
        url: `${serverUrl}/wishlists/${oneClass.id}`,
        headers: {
          access_token,
        },
      });
      alert("Success add to wishlist");
      setIsLoved(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = () => {
    setIsLoved(false);
  };

  const cekWishlist = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const { data } = await axios({
        method: "get",
        url: `${serverUrl}/wishlists/cek/${route.params.id}`,
        headers: {
          access_token,
        },
      });
      setIsLoved(data);
    } catch (error) {
      console.log(error);
    }
  };

  const cekTransaction = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const { data } = await axios({
        method: "get",
        url: `${serverUrl}/transactions/cek/${route.params.id}`,
        headers: {
          access_token,
        },
      });
      setIsBuy(data);
    } catch (error) {
      console.log(error);
    }
  };
  const buyClass = async (id) => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      const response = await fetch(`${serverUrl}/transactions/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token,
        },
      });
      const dataTes = await response.json();
      if (dataTes.message === "not enough balance") {
        return navigation.navigate("TopUp");
      }
      setIsBuy(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    cekWishlist();
    fetchOneClass();
    cekTransaction();
  }, []);

  useEffect(() => {
    cekWishlist();
  }, [isLoved]);

  useEffect(() => {
    cekTransaction();
  }, [isBuy]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Image
          source={{
            uri: oneClass?.Subject?.image,
          }}
          style={styles.image_logo}
        />
        <Text style={styles.text_header}>{oneClass.name}</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <View style={styles.heartWrapper}>
          {isLoved ? (
            <Entypo
              name="heart"
              size={32}
              color="tomato"
              onPress={removeWishlist}
            />
          ) : (
            <Entypo onPress={addWishlist} name="heart" size={32} color="grey" />
          )}
        </View>
        <ScrollView>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{oneClass.description}</Text>
          </View>

          <View style={styles.infoWrapper}>
            <View>
              <Text style={styles.infoTitle}>PRICE</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>
                  Rp.{" "}
                  {oneClass.price
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.infoTitle}>RATING</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>{oneClass.averageRating}</Text>
                <Text style={styles.infoSubText}>/10</Text>
              </View>
            </View>
            <View>
              <Text style={styles.infoTitle}>QUOTA</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>
                  {oneClass?.Transactions?.length
                    ? oneClass?.Transactions?.length
                    : "0"}
                </Text>
                <Text style={styles.infoSubText}>/{oneClass?.quota}</Text>
              </View>
            </View>
          </View>
          <View style={styles.infoSchedule}>
            <Text style={styles.infoTitle}>SCHEDULE</Text>
            <View>
              {oneClass?.Schedule?.map((el) => {
                return (
                  <Text style={{ color: colors.primary, fontSize: 12 }}>
                    {el}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={[styles.wrapper, { justifyContent: "flex-end" }]}>
            {isBuy ? (
              <View style={styles.buttonWrapperTrue}>
                <Text style={styles.buttonTextTrue}>Already Enroll</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.buttonWrapperFalse}
                onPress={confirmation}
              >
                {/* onPress={() => buyClass(oneClass.id)}> */}
                <Text style={styles.buttonTextFalse}>Enroll This Class</Text>
              </TouchableOpacity>
            )}
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
    flex: 0.9,
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
    flex: 1.1,
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
  infoSchedule: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  infoWrapper: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: -25,
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
    marginTop: -30,
  },
  buttonWrapperTrue: {
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: "grey",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonWrapperFalse: {
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: colors.green2,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonTextTrue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  buttonTextFalse: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  imageWarper: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    width: 180,
    height: 180,
    borderRadius: 30,
  },
  image_logo: {
    // justifyContent: "center",
    // alignItems: "center",
    width: 160,
    height: 160,
    borderRadius: 30,
  },
});
