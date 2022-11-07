import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./WelcomeScreen";
import Login from "./Login";
import Register from "./Register";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <RootStack.Screen name="Login" component={Login} />
    <RootStack.Screen name="Register" component={Register} />
  </RootStack.Navigator>
);

export default RootStackScreen;
