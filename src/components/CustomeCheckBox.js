// CustomCheckbox.js
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { View } from 'react-native';
import { darkBlue, Width } from './constant';

const CustomCheckbox = ({ label, value = 0, onChange }) => {
  const handlePress = (checked) => {
    const val = checked ? true : false;
    onChange(val); // Send 1 or 0 to parent
  };

  return (
    <View style={{ padding: 10,marginLeft:10 ,marginVertical:10}}>
      <BouncyCheckbox
        size={30}
        fillColor="#ffb703"
        unfillColor="#FFFFFF"
        text={label}
        iconStyle={{ borderColor: 'green' }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{
          fontFamily: 'JosefinSans-Regular',
          color: darkBlue,
          fontSize: 13,
          width:Width*0.65
        }}
        isChecked={value === true}
        onPress={handlePress}
        position="left"
      />
    </View>
  );
};

export default CustomCheckbox;