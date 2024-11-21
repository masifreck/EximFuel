import {View, Text, StyleSheet,Image} from 'react-native';
import React from 'react';

const Notification = () => {
  return (
    <View style={styles.container}>
         <Image
              style={styles.leftIcon}
              source={require('../assets/remove.png')}
            />
            <Text style={styles.buttonText}>No Notifications</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:"center",
  },
  leftIcon:{
    height: 100,
    width: 100,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    paddingTop:10,
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: 'PoppinsSemiBold',
  },
});
export default Notification;
