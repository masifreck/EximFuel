import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropbox = ({
  hasBorder,
  labelText,
  dropData,
  placeholdername,
  searchPlaceholdername,
  value,
  onChange,
  onChangeText,
  showSearch = true,
  isend = false,
  dropposition='auto',
  isIcon
}) => {
  return (
    <>
    <View style={{flexDirection:'column',  width:isIcon?'75%':'90%',marginLeft:18}}>
      <Text
        style={{
          alignItems: 'flex-start',
          padding: 5,
         // marginLeft: '5%',
          color: 'black',
          fontSize: 13,
          fontFamily: 'PoppinsMedium',
        }}>
        {labelText} <Text style={{color: 'red'}}>*</Text>
      </Text>
      <Dropdown
        style={[
          styles.dropdown,
          {
            borderWidth: hasBorder ? 0.9 : 0,
            borderColor: hasBorder ? 'red' : 'transparent',
            marginBottom: isend ? 20 : 0,
          
          },
        ]}
        placeholderStyle={{fontSize: 15, color: '#6c6f73'}}
        selectedTextStyle={{fontSize: 15, color: '#6c6f73'}}
        inputSearchStyle={{
          height: 40,
          fontSize: 15,
          color: '#6c6f73',
          //   fontFamily: 'PoppinsMedium',
        }}
        itemTextStyle={{color: 'black'}}
        data={dropData}
        search={showSearch}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholdername}
        searchPlaceholder={searchPlaceholdername}
        value={value}
        onChange={onChange}
        onChangeText={onChangeText}
        dropdownPosition={dropposition}
      />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '100%',
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: '#caf0f8',
    paddingHorizontal: 15,
  },
});
export default CustomDropbox;
