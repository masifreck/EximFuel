import {View, Text,ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingIndicator = () => {
  return (
    <View
      style={{
        marginVertical: '80%',
      }}>
      <ActivityIndicator size="large" color="#453D98ff" />
      <Text
        style={{
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',
          color: darkBlue,
          // fontWeight: '900',
          fontSize: 15,
          marginBottom: 10,
          marginTop: 8,
          textAlign: 'center',
          fontFamily: 'PoppinsBold',
        }}>
        Please wait
      </Text>
    </View>
  );
};

export default LoadingIndicator;
