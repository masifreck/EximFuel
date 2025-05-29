import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const FirstPage = () => {
  return (
    <View style={{flex:1}}>
      <Card/>
    </View>
  )
}


const Card=()=>{
<View style={styles.cardContainer}>
<Text>Driver Name</Text>
</View>
}

const styles=StyleSheet.create({
    cardContainer:{
        flex:1,
        backgroundColor:'#9894e6',
        padding:10,
        elevation:4,
        width:'100%'
    }
})
export default FirstPage