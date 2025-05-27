import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { darkBlue } from './constant';

const SelectButton = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('E-Challan');

  const scaleEChallan = useRef(new Animated.Value(1)).current;
  const scaleManual = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    onSelect(selectedOption); // notify parent on mount and update
  }, [selectedOption]);

  const handleSelect = (option) => {
    setSelectedOption(option);

    // Animate
    Animated.sequence([
      Animated.timing(option === 'E-Challan' ? scaleEChallan : scaleManual, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(option === 'E-Challan' ? scaleEChallan : scaleManual, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleEChallan }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedOption === 'E-Challan' && styles.selectedButton,
          ]}
          onPress={() => handleSelect('E-Challan')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption === 'E-Challan' && styles.selectedText,
            ]}
          >
            E-Challan
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleManual }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedOption === 'Manually' && styles.selectedButton,
          ]}
          onPress={() => handleSelect('Manually')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption === 'Manually' && styles.selectedText,
            ]}
          >
            Manually
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
    padding: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation:4
  },
  selectedButton: {
    backgroundColor: darkBlue,
  },
  buttonText: {
    color: darkBlue,
    fontSize: 18,
    fontWeight:'bold'
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:18
  },
});

export default SelectButton;
