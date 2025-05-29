import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Help from '../screens/Help';
import Logout from './Logout';
import { darkBlue } from './constant';
const ButtomBar = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Home />
      ) : selectedTab == 1 ? (
        <Notification />
      ) : selectedTab == 2 ? (
        <Help />
      ) : (
        <Logout />
      )}

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTab == 0 ? styles.clickedButton : styles.defaultButton,
          ]}
          onPress={() => setSelectedTab(0)}>
          <Image
            source={require('../assets/home.png')}
            style={[
              styles.buttonIcon,
              selectedTab == 0 ? styles.clickedIcon : styles.defaultIcon,
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedTab == 1 ? styles.clickedButton : styles.defaultButton,
          ]}
          onPress={() => setSelectedTab(1)}>
          <Image
            source={require('../assets/bell.png')}
            style={[
              styles.buttonIcon,
              selectedTab == 1 ? styles.clickedIcon : styles.defaultIcon,
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedTab == 2 ? styles.clickedButton : styles.defaultButton,
          ]}
          onPress={() => setSelectedTab(2)}>
          <Image
            source={require('../assets/help.png')}
            style={[
              styles.buttonIcon,
              selectedTab == 2 ? styles.clickedIcon : styles.defaultIcon,
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedTab == 3 ? styles.clickedButton : styles.defaultButton,
          ]}
          onPress={() => setSelectedTab(3)}>
          <Image
            source={require('../assets/logout.png')}
            style={[
              styles.buttonIcon,
              selectedTab == 3 ? styles.clickedIcon : styles.defaultIcon,
            ]}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.copyright}>Powerd By Tranzol</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5ff',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  button: {
    borderWidth: 0,
    borderColor: '#1e4175',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: darkBlue,
  },
  clickedButton: {
    backgroundColor: '#f1f5ff',
  },
  buttonIcon: {
    height: 24,
    width: 24,
    tintColor: '#f1f5ff',
  },
  defaultIcon: {
    height: 24,
    width: 24,
  },
  clickedIcon: {
    tintColor: darkBlue,
  },
  copyright: {
    color: 'white',
    fontSize: 7,
    letterSpacing: 2.5,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 5,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: '38%',
  },
});

export default ButtomBar;
