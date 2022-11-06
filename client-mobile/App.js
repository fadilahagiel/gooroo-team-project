import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import colors from "./src/config/colors";

import Icon from "react-native-vector-icons/Ionicons";

import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import TeacherList from "./src/screens/TeacherList";
import ClassList from "./src/screens/ClassList";
import TeacherDetail from "./src/screens/TeacherDetail";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import TopUp from "./src/screens/TopUp";
import Midtrans from "./src/screens/Midtrans";

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.white,
        headerShadowVisible: false, // applied here
        headerBackTitleVisible: false,
      }}>
      <HomeStack.Screen
        options={{
          title: "My Home",
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
        name="Home"
        component={Home}
      />
      <HomeStack.Screen
        name="TeacherList"
        component={TeacherList}
      />
      <HomeStack.Screen
        name="ClassList"
        component={ClassList}
      />
      <HomeStack.Screen
        name="TeacherDetail"
        component={TeacherDetail}
      />
      <HomeStack.Screen
        name="TopUp"
        component={TopUp}
      />
      <HomeStack.Screen
        name="Midtrans"
        component={Midtrans}
      />
      {/* <HomeStack.Screen name="Welcome" component={WelcomeScreen} />
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="Register" component={Register} /> */}
    </HomeStack.Navigator>
  );
};

const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary1,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.white,
        headerShadowVisible: false, // applied here
        headerBackTitleVisible: false,
      }}>
      <ProfileStack.Screen
        options={{
          title: "My Profile",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              backgroundColor={colors.secondary1}
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
        initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeStackScreen}
        />
        <Drawer.Screen
          name="My Profile"
          component={ProfileStackScreen}
        />
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
