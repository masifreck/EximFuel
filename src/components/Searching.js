import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const Searching = () => {
  return (
    <View style={{flex:1,backgroundColor:'rgba(0,0,0,0)'}}>
        <LottieView
        source={require('../assets/searchingAnimation.json')}
        autoPlay
        loop
        style={StyleSheet.absoluteFill}
        />
   
    </View>
  )
}

export default Searching