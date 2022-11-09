import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";

import Profile from "./Profile";
import TopUp from "./TopUp";
import Midtrans from "./Midtrans";

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondaty2,
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
              backgroundColor={colors.secondaty2}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />

      <ProfileStack.Screen
        options={{
          title: "Top Up",
          headerLeft: () => (
            <Icon.Button
              name="ios-arrow-back"
              backgroundColor={colors.secondaty2}
              onPress={() => {
                navigation.navigate("Profile");
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
              backgroundColor={colors.secondaty2}
              onPress={() => {
                navigation.navigate("TopUp");
              }}
            />
          ),
        }}
        name="Midtrans"
        component={Midtrans}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
