import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native'; // ✅ import Lottie
import { darkBlue, Width } from '../components/constant';

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
      //console.log("i got admin password logging directly", userId, password);
      navigation.replace('DrawerNavigation', {userId});
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      {/* Lottie background animation */}
      
      <LottieView
        source={require('../assets/eximTruck.json')}
        autoPlay
        loop
        style={StyleSheet.absoluteFillObject}
        
      />

      {/* Overlay Texts */}
      <View style={styles.header}>
        <Image source={require('../assets/EL-logo.png')} style={{width:100,height:100}}/>
        <Text style={styles.title}>EXIM LOGISTICS</Text>
      </View>

      <Text style={styles.footer}>Powered by Tranzol</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // fallback color
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    marginTop: 60,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: 22,
    color: darkBlue,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    fontSize: 13,
    marginBottom: 20,
    letterSpacing: 1,
    //fontFamily: 'PoppinsExtraBold',
    color: darkBlue,
    textAlign: 'center',
  },
});

export { globalusername, globalpassword };
export default Splash;
