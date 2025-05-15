// CustomCheckbox.js
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { View } from 'react-native';
import { darkBlue } from './constant';

const CustomCheckbox = ({ label, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = (checked) => {
    setIsChecked(checked);

    const value = checked ? true : false;

    console.log(`Checkbox '${label}' changed to:`, value); // ✅ Console log

    onChange(value); // Send 1 or 0 to parent
  };

  return (
    <View style={{ padding: 10,marginLeft:15 }}>
      <BouncyCheckbox
        size={35}
        fillColor="#ffb703"
        unfillColor="#FFFFFF"
        text={label}
        iconStyle={{ borderColor: "green" }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{ fontFamily: "JosefinSans-Regular", color: darkBlue,fontSize:14,fontWeight:'bold' }}
        isChecked={isChecked}
        onPress={handlePress}
        position="left"
      />
    </View>
  );
};

export default CustomCheckbox;