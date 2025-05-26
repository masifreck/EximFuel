import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Loading = () => {
  return (
    <View>
      <LottieView
      source={require('../assets/loading.json')}
      style={StyleSheet.absoluteFillObject}
      autoPlay
      loop
      />
    </View>
  )
}

export default Loading