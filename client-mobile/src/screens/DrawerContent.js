import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";

import { AuthContext } from "../components/context";

import Icon from "react-native-vector-icons/Ionicons";
import MatrialIcon from "react-native-vector-icons/Octicons";
import FeatherIcon from "react-native-vector-icons/Feather";

export function DrawerContent(props) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={require("../assets/face_demo.png")}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Username</Title>
                <Caption style={styles.caption}>Full Name</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  13
                </Paragraph>
                <Caption style={styles.caption}>Bookmark</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  2
                </Paragraph>
                <Caption style={styles.caption}>Class Enrolled</Caption>
              </View>
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
                <FeatherIcon name="bookmark" color={color} size={size} />
              )}
              label="Bookmark"
              onPress={() => {
                props.navigation.navigate("Bookmark");
              }}
            />
            <DrawerItem
              style={{ marginTop: 10 }}
              icon={({ color, size }) => (
                <MatrialIcon name="history" color={color} size={size} />
              )}
              label="History"
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />
            <DrawerItem
              style={{ marginTop: 10 }}
              icon={({ color, size }) => (
                <FeatherIcon name="settings" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="ios-exit-outline" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
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
