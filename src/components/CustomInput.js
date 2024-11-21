import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import React from 'react';

const CustomInput = ({
  labelText,
  placeholdername,
  onChangeText,
  hasBorder = false,
  width = '100%',
  keyboardTypename = 'default',
  stringlength = 500,
  isMandatory = false,
  isVerified,
  isend = false,
  isaddress = false,
  value
}) => {
  return (
    <>
      <Text style={styles.levelText}>
        {labelText} {isMandatory && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            height: isaddress ? 120 : 50,
            borderWidth: hasBorder && isMandatory ? 0.9 : 0,
            borderColor: hasBorder && isMandatory ? 'red' : 'transparent',
            marginBottom: isend ? 20 : 0,
          },
        ]}>
        <TextInput
          placeholderTextColor={'#6c6f73'}
          style={{
            color: 'black',
            fontSize: 15,
            width: width,
            marginRight: width === '85%' ? 20 : 0,
          }}
          placeholder={placeholdername}
          autoCorrect={false}
          multiline={true}
          keyboardType={keyboardTypename}
          onChangeText={onChangeText}
          maxLength={stringlength}
          value={value}
        />
        {width === '85%' ? (
          isVerified ? (
            <Image
              style={styles.rightIcon}
              source={require('../assets/verified.png')}
            />
          ) : (
            <Image
              style={styles.wrongIcon}
              source={require('../assets/delete-cross.png')}
            />
          )
        ) : null}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  levelText: {
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
    fontSize: 13,
    fontFamily: 'PoppinsMedium',
  },

  inputContainer: {
    width: '90%',
    backgroundColor: '#cedff0',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'black',
    alignSelf: 'center',
  },
  rightIcon: {
    height: 22,
    width: 22,
  },
  wrongIcon: {
    height: 15,
    width: 15,
    tintColor: 'red',
  },
});

export default CustomInput;
