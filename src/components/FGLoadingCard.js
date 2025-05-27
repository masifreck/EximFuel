import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Height, Width } from './constant';

const FGLoadingCard = ({ imageSource, imageOpacity = 0.5, children }) => {
  return (
    <ImageBackground
      source={imageSource}
      style={styles.image}
      imageStyle={{ opacity: imageOpacity }}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Width,
    height: Height*0.3,
    justifyContent: 'center', // optional, centers children
    alignItems: 'center',     // optional, centers children
  },
});

export default FGLoadingCard;
