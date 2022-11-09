import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title, Caption, Paragraph, Drawer } from "react-native-paper";

import { AuthContext } from "../components/context";

import Icon from "react-native-vector-icons/Ionicons";
import MatrialIcon from "react-native-vector-icons/Octicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import { serverUrl } from "../config/url";
import socket from "../config/socket";
import { useFocusEffect } from "@react-navigation/native";

export function DrawerContent(props) {
  console.log();
  const { signOut } = React.useContext(AuthContext);
  const [user, setUser] = useState({});
  const [student, setStudent] = useState({});
  const [classes, setClasses] = useState(0);

  const fetchUser = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      const { data } = await axios({
        url: `${serverUrl}/users`,
        method: "GET",
        headers: {
          access_token,
        },
      });
      const res = await axios({
        url: `${serverUrl}/students`,
        method: "get",
        headers: {
          access_token,
        },
      });
      if (!res.data) {
        Alert.alert("Please update profile first to continue");
        return props.navigation.navigate("Profile");
      }
      setStudent(res.data);
      setUser(data);
    } catch (error) {
      console.log(error, "ini dari drawer");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
    }, [])
  );

  const submitLogout = async () => {
    await AsyncStorage.clear();
    socket.disconnect();
    signOut();
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image source={{ uri: student?.image }} size={50} />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{user.username}</Title>
                <Caption style={styles.caption}>
                  {student?.fullName ? student?.fullName : user.username}
                </Caption>
              </View>
            </View>
            <View style={styles.row}>
              {/* <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {student?.Wishlists?.length}
                </Paragraph>
                <Caption style={styles.caption}>Bookmark</Caption>
              </View> */}
              {/* <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {classes}
                </Paragraph>
                <Caption style={styles.caption}>Class Enrolled</Caption>
              </View> */}
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              style={{ marginTop: 10 }}
              icon={({ color, size }) => (
                <MatrialIcon name="home" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              style={{ marginTop: 10 }}
              icon={({ color, size }) => (
                <FeatherIcon name="user" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("My Profile");
              }}
            />
            <DrawerItem
              style={{ marginTop: 10 }}
              icon={({ color, size }) => (
                <AntDesign name="contacts" color={color} size={size} />
              )}
              label="Contacts"
              onPress={() => {
                props.navigation.navigate("Contacts");
              }}
            />
            <DrawerItem
              style={{ marginTop: 10 }}
              icon={({ color, size }) => (
                <Icon
                  name="ios-chatbox-ellipses-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Chat"
              onPress={() => {
                props.navigation.navigate("ChatScreen");
              }}
            />
            <DrawerItem
              style={{ marginTop: 10 }}
              icon={({ color, size }) => (
                <FeatherIcon name="bookmark" color={color} size={size} />
              )}
              label="Bookmark"
              onPress={() => {
                props.navigation.navigate("History");
              }}
            />
            <DrawerItem
              style={{ marginTop: 10 }}
              icon={({ color, size }) => (
                <MatrialIcon name="history" color={color} size={size} />
              )}
              label="History"
              onPress={() => {
                props.navigation.navigate("History");
              }}
            />
            {/* <DrawerItem
              style={{ marginTop: 10 }}
              icon={({ color, size }) => (
                <FeatherIcon name="settings" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("Settings");
                props.navigation.navigate("History");
              }}
            /> */}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="ios-exit-outline" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={submitLogout}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 30,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
