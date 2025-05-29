import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { darkBlue } from './constant';

const SelectButton = ({ isFirstSelected, onSelect, button1Text = 'E-Challan', button2Text = 'Manually' }) => {
  const scaleFirst = useRef(new Animated.Value(1)).current;
  const scaleSecond = useRef(new Animated.Value(1)).current;

  const handleSelect = (value) => {
    onSelect(value);

    const animatedValue = value ? scaleFirst : scaleSecond;

    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleFirst }] }}>
        <TouchableOpacity
          style={[styles.button, isFirstSelected && styles.selectedButton]}
          onPress={() => handleSelect(true)}
        >
          <Text style={[styles.buttonText, isFirstSelected && styles.selectedText]}>
            {button1Text}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleSecond }] }}>
        <TouchableOpacity
          style={[styles.button, !isFirstSelected && styles.selectedButton]}
          onPress={() => handleSelect(false)}
        >
          <Text style={[styles.buttonText, !isFirstSelected && styles.selectedText]}>
            {button2Text}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    gap:20,
    alignItems:'center'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 4,
    width:120
  },
  selectedButton: {
    backgroundColor: darkBlue,
  },
  buttonText: {
    color: darkBlue,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign:'center'
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign:'center'
  },
});

export default SelectButton;
