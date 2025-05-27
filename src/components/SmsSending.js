import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native'; // ✅ import Lottie
import { darkBlue, Width } from '../components/constant';



const SmsSending = () => {


  return (
    <View style={styles.container}>
      
      
      <LottieView
        source={require('../assets/smssending.json')}
        autoPlay
        loop
        style={StyleSheet.absoluteFillObject}
      />
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

export default SmsSending;
