import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { inputbgColor } from '../components/constant';

const BaseCard = ({ Key, value, isEditable, dropDownData, onSelect }) => {
    const [isOpen,setIsOpen]=useState(false);

    const toggle=()=>{
        setIsOpen(!isOpen)
    }
  return (
    <View style={styles.container}>
      

      {isOpen ? (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={dropDownData}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          value={value}
          onChange={(item) => {onSelect(item.value)
            setIsOpen(false)}
          }
        />
      ) : (
        <>
        <Text style={styles.keyText}>{Key}</Text>
        <Text style={styles.valueText}>{value}</Text>
        </>
      )}

      {isEditable && (
        <TouchableOpacity onPress={toggle}>
          <Image style={styles.editImg} source={require('../assets/edit.png')} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: inputbgColor,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  keyText: {
    flex: 1,
    color: 'black',
  },
  valueText: {
    flex: 2,
    color: 'black',
  },
  dropdown: {
    flex: 2,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    color: 'gray',
  },
  selectedTextStyle: {
    color: 'black',
  },
  editImg: {
    width: 25,
    height: 25,
  },
});

export default BaseCard;
