import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import colors from "./src/config/colors";

import Icon from "react-native-vector-icons/Ionicons";

import MainTabScreen from "./src/screens/MainTabScreen";
import Profile from "./src/screens/Profile";

const ProfileStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
    </ProfileStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Home" component={MainTabScreen} />
        <Drawer.Screen name="My Profile" component={ProfileStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
