import { View, Text, LogBox } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const handleLogout = () => {
  const navigation = useNavigation();
  AsyncStorage.clear();
  navigation.replace("Login");
  console.log("logout");
};
const Logout = () => {
  LogBox.ignoreLogs([
    " Cannot update a component (`ForwardRef(BaseNavigationContainer)`) while rendering a different component (`Logout`)"
  ]);
  return handleLogout();
};

export default Logout;
