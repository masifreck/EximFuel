import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ButtomBar from './components/ButtomBar';
import OwnerDetails from './screens/OwnerDetails';
import Driver from './screens/Driver';
import Vehicle from './screens/Vehicle';
import MinesLoading from './screens/MinesLoading';
import Unloading from './screens/Unloading';
import FGLoading from './screens/FGLoading';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
      const [username, setUsername] = useState('');

  useEffect(() => {
    const getUserID = async () => {
      const userId = await AsyncStorage.getItem('username');
      setUsername(userId || 'User'); // fallback if null
    };
    getUserID();
  }, []);
  const handleLogout = () => {
    // Your logout logic (e.g., AsyncStorage.clear(), navigation reset, etc.)
    console.log("Logged out");
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
              <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.usernameText}>{username}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Icon name="logout" size={25} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>Powered by Tranzol</Text>
        <Text style={styles.versionText}>Version 0.0.1</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#1e88e5',
        drawerLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen name="ButtomBar" component={ButtomBar}
        options={{
          title: 'Home',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen name="OwnerDetails" component={OwnerDetails}
        options={{
          title: 'Owner',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="account-box-outline" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen name="Driver" component={Driver}
        options={{
          title: 'Driver',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="steering" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen name="Vehicle" component={Vehicle}
        options={{
          title: 'Vehicle',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="truck-outline" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen name="MinesLoading" component={MinesLoading}
        options={{
          title: 'Mines Loading',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="dump-truck" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen name="FGLoading" component={FGLoading}
        options={{
          title: 'FG Loading',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="package-variant-closed" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen name="Unloading" component={Unloading}
        options={{
          title: 'Unloading',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="garage-variant" color={color} size={size} />
          )
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
    header: {
    padding: 20,
    backgroundColor: '#1e88e5',
    marginBottom: 10,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
  },
  usernameText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Roboto-Bold',
    marginTop: 0,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#e53935',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#777',
  },
  versionText: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default DrawerNavigation;
