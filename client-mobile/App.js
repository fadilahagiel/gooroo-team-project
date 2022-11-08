import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import RootStackScreen from "./src/screens/RootStackScreen";
import ProfileScreen from "./src/screens/ProfileStackScreen";
import MainTabScreen from "./src/screens/MainTabScreen";
import Bookmark from "./src/screens/BookMark";
import Settings from "./src/screens/Settings";

import { AuthContext } from "./src/components/context";

import { DrawerContent } from "./src/screens/DrawerContent";

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
            <Drawer.Screen name="Bookmark" component={Bookmark} />
            <Drawer.Screen name="Settings" component={Settings} />
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
