import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Card = ({onPress, text, imageSource, color}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <LinearGradient
        colors={color}
        style={{height: deviceHeight / 7.5, width: deviceWidth / 3 - 30}}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image style={styles.image} source={imageSource} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'gray',
    borderRadius: 5,
    height: deviceHeight / 7.5,
    width: deviceWidth / 3 - 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  text: {
    fontFamily:"PoppinsRegular",
    color: '#4b4b4b',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 7,
  },
  image: {
    width: 70,
    height: 53,
    alignSelf: 'center',
    marginTop: '8%',
  },
});

export default Card;
