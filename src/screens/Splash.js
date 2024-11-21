import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
let globalusername;
let globalpassword;
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(getLoginDetails, 3000);
  }, []);

  const getLoginDetails = async () => {
    let userId = await AsyncStorage.getItem('username');
    let password = await AsyncStorage.getItem('password');
    if (userId && password) {
      globalusername = userId;
      globalpassword = password;
      console.log("i got admin password logging directly",userId,password);
      navigation.replace('DrawerNavigation', {userId});
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/EL-logo.png')} style={styles.logo} />
      <Text style={styles.smallText}>Powered by TRANZOL</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  smallText: {
    fontSize: 14,
    position: 'absolute',
    bottom: 30,
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'PoppinsExtraBold',
    color: '#767674',
  },
});

export {globalusername, globalpassword};
export default Splash;
