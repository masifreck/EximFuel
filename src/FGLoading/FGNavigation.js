import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { darkBlue } from '../components/constant';
import PreChallan from './PreChallan';
import AllotmentList from './GenerateChallan';
// Dummy screens


const GenerateChallan = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Generate Challan Screen</Text>
  </View>
);

const CheckDetails = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Check Details Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const FGNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: darkBlue,
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Pre-Challan') {
            iconName = 'file-document-outline';
          } else if (route.name === 'Generate Challan') {
            iconName = 'file-plus-outline';
          } else if (route.name === 'Check Details') {
            iconName = 'file-search-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Pre-Challan" component={PreChallan} />
      <Tab.Screen name="Generate Challan" component={AllotmentList}/>
      <Tab.Screen name="Check Details" component={CheckDetails} />
    </Tab.Navigator>
  );
};

export default FGNavigation;
