// CustomCheckbox.js
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { View } from 'react-native';
import { darkBlue } from './constant';

const CustomCheckbox = ({ label, value = 0, onChange }) => {
  const handlePress = (checked) => {
    const val = checked ? true : false;
    onChange(val); // Send 1 or 0 to parent
  };

  return (
    <View style={{ padding: 5,marginLeft:10 }}>
      <BouncyCheckbox
        size={35}
        fillColor="#ffb703"
        unfillColor="#FFFFFF"
        text={label}
        iconStyle={{ borderColor: 'green' }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{
          fontFamily: 'JosefinSans-Regular',
          color: darkBlue,
          fontSize: 14,
        }}
        isChecked={value === true}
        onPress={handlePress}
        position="left"
      />
    </View>
  );
};

export default CustomCheckbox;