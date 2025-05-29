import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,

  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { darkBlue } from './constant';
const {height, width} = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  return (
  
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.threeDot}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Image
            style={styles.threeDotImg}
            source={require('../assets/menus.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {/* <Image style={styles.img} source={require('../assets/EL-logo.png')} /> */}
          <Image
            style={styles.imgTxt}
            source={require('../assets/EL-Text.png')}
          />
        </View>
      </View>
 
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    backgroundColor: darkBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  threeDot: {
    height: 35,
    width: 35,
    alignSelf: 'center',
    position: 'absolute',
    left: 10,
  },
  threeDotImg: {
    height: 35,
    width: 35,
    tintColor: '#ffffff',
    alignSelf: 'center',
  },
  img: {
    height: 35,
    width: 35,
    margin: 10,
    alignSelf: 'center',
  },
  imgTxt: {
    height: 35,
    width: 180,
    alignSelf: 'center',
  },
});

export default Header;
