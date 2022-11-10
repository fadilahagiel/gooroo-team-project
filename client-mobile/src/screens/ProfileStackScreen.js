import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";

import Profile from "./Profile";
import AddProfile from "./AddProfile";
import Response from "./Response";
import TopUp from "./TopUp";
import Midtrans from "./Midtrans";

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.white,
        headerShadowVisible: false, // applied here
        headerBackTitleVisible: false,
      }}
    >
      <ProfileStack.Screen
        options={{
          title: "My Profile",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              backgroundColor={colors.primary}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
        name="MyProfile"
        component={Profile}
      />

      <ProfileStack.Screen
        options={{
          title: "Top Up",
          headerLeft: () => (
            <Icon.Button
              name="ios-arrow-back"
              backgroundColor={colors.primary}
              onPress={() => {
                navigation.navigate("MyProfile");
              }}
            />
          ),
        }}
        name="TopUp"
        component={TopUp}
      />
      <ProfileStack.Screen
        options={{
          title: "PayMent",
          headerLeft: () => (
            <Icon.Button
              name="ios-arrow-back"
              backgroundColor={colors.primary}
              onPress={() => {
                navigation.navigate("TopUp");
              }}
            />
          ),
        }}
        name="Midtrans"
        component={Midtrans}
      />
      <ProfileStack.Screen
        options={{
          title: "My Profile",
          headerLeft: () => (
            <Icon.Button
              name="ios-arrow-back"
              backgroundColor={colors.primary}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
        }}
        name="AddProfile"
        component={AddProfile}
      />
      <ProfileStack.Screen
        options={{
          title: "My Profile",
          headerLeft: () => (
            <Icon.Button
              name="ios-arrow-back"
              backgroundColor={colors.primary}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
        }}
        name="Response"
        component={Response}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
