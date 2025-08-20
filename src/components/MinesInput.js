import { View, TextInput, StyleSheet, Text } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'; // ✅ import vector icon
import { darkBlue, inputbgColor, textColor } from './constant';

const MinesInput = ({ 
  value, 
  onChangeText, 
  placeholder, 
  width = '80%',
  keyboardType = 'default', 
  label,        // ✅ default text
  iconName       // ✅ default icon
}) => {
  return (
    <View style={[styles.container]}>
      {/* Input Field */}
      <TextInput
        style={[styles.input, { width: width }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        keyboardType={keyboardType}
      />

      {/* Label + Icon below input */}
      <View style={styles.subcontainer}>
         <Text style={styles.label}>{label}</Text>
        <Ionicons name={iconName} size={18} color={darkBlue} style={{ marginRight: 6 }} />
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flexDirection:'row',
    justifyContent:'space-evenly',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#000',
    backgroundColor: inputbgColor,
  },
  subcontainer: {
    flexDirection: 'column',  // ✅ icon + text side by side
    alignItems: 'center',
    marginTop: 6,
    width:'20%'
  },
  label: {
    fontSize: 14,
    color: textColor
  }
});

export default MinesInput;
