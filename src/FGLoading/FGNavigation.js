import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { darkBlue } from "../components/constant";
import PreChallan from "./PreChallan";
import AllotmentList from "./GenerateChallan";
import CheckDetails from "./CheckDetails";

const Tab = createBottomTabNavigator();

const FGNavigation = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: [
          {
            position: "absolute",
            bottom: 10,
            left: 20,
            right: 20,
           // elevation: 8,
            backgroundColor: "#ffffffe2",
            borderRadius: 20,
            height: 60,
            paddingBottom: 6,
            paddingTop: 6,
            //...styles.shadow,
          },
          isKeyboardVisible ? { display: "none" } : null, // 👈 Hide when keyboard is open
        ],
        tabBarActiveTintColor: darkBlue,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: -10,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === "Allotment") {
            iconName = "file-document-outline";
          } else if (route.name === "Generate") {
            iconName = "file-plus-outline";
          } else if (route.name === "Details") {
            iconName = "file-search-outline";
          }

          return (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: darkBlue + "15" },
              ]}
            >
              <Icon
                name={iconName}
                size={focused ? 28 : 24}
                color={color}
                style={{ marginBottom: 2 }}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Allotment" component={PreChallan} />
      <Tab.Screen name="Generate" component={AllotmentList} />
      <Tab.Screen name="Details" component={CheckDetails} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 6,
  },
});

export default FGNavigation;
 