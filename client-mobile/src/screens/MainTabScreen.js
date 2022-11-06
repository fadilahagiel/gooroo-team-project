import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../config/colors";

import HomeScreen from "./Home";
import ClassList from "./ClassList";
import TeacherList from "./TeacherList";
import TeacherDetail from "./TeacherDetail";

import Icon from "react-native-vector-icons/Ionicons";

const HomeStack = createNativeStackNavigator();
const TeacherStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

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
      }}
    >
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
        name="HomeScreen"
        component={HomeScreen}
      />
      <HomeStack.Screen name="ClassList" component={ClassList} />
    </HomeStack.Navigator>
  );
};

const TeacherStackScreen = ({ navigation }) => {
  return (
    <TeacherStack.Navigator
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
      <TeacherStack.Screen
        options={{
          title: "Teacher List",
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
        name="Teacher List"
        component={TeacherList}
      />
      <TeacherStack.Screen name="TeacherDetail" component={TeacherDetail} />
    </TeacherStack.Navigator>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colors.primary}
      inactiveColor={colors.secondaty2}
      barStyle={{
        position: "absolute",
        bottom: -5,
        elevation: 0,
        backgroundColor: colors.white,
        height: 90,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
        name="Tab Home"
        component={HomeStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "List",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-list" color={color} size={26} />
          ),
        }}
        name="List"
        component={TeacherStackScreen}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;