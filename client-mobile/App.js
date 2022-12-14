import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import RootStackScreen from "./src/screens/RootStackScreen";
import ProfileScreen from "./src/screens/ProfileStackScreen";
import MainTabScreen from "./src/screens/MainTabScreen";
import AddProfile from "./src/screens/AddProfile";
import Profile from "./src/screens/Profile";
import Bookmark from "./src/screens/BookMark";
import History from "./src/screens/History";
import ContactsScreen from "./src/screens/ContactsScreen";

import { AuthContext } from "./src/components/context";

import { DrawerContent } from "./src/screens/DrawerContent";
import ChatScreen from "./src/screens/ChatScreen";

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    id: null,
    username: null,
    access_token: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIVE_TOKEN":
        return {
          ...prevState,
          access_token: action.access_token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          id: action.id,
          username: action.username,
          access_token: action.access_token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          id: null,
          username: null,
          access_token: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          id: action.id,
          username: action.username,
          access_token: action.access_token,
          isLoading: false,
        };
      default:
        break;
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: () => {
        setIsLoading(false), setUserToken("access_token");
      },
      signUp: () => {
        setIsLoading(false), setUserToken("access_token");
      },
      signOut: () => {
        setIsLoading(false), setUserToken(null);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
          >
            <Drawer.Screen name="Home" component={MainTabScreen} />
            <Drawer.Screen name="My Profile" component={ProfileScreen} />
            <Drawer.Screen name="AddProfile" component={AddProfile} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Bookmark" component={Bookmark} />
            <Drawer.Screen name="Contacts" component={ContactsScreen} />
            <Drawer.Screen name="History" component={History} />
            <Drawer.Screen name="ChatScreen" component={ChatScreen} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
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
