import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      width: '90%',
      borderColor: 'black',
      // borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      alignSelf: 'center',
      backgroundColor: '#e6eff0',
      paddingHorizontal: 15,
    },
    dropdownend: {
      height: 50,
      width: '90%',
      borderColor: 'black',
      // borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      alignSelf: 'center',
      backgroundColor: '#e6eff0',
      paddingHorizontal: 15,
      marginBottom: 120,
    },
    placeholderStyle: {
      fontSize: 15,
      // paddingLeft:8,
      color: '#6c6f73',
    },
    selectedTextStyle: {
      fontSize: 15,
      color: '#6c6f73',
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 15,
      color: '#6c6f73',
    },
  
    container: {
      alignItems: 'center',
      // justifyContent:'center',
      flex: 1,
      flexDirection: 'column',
    },
    levelContainer: {
      backgroundColor: '#fcfafb',
      width: '90%',
      margin: 10,
      borderRadius: 15,
      borderWidth: 0.5,
      borderColor: 'gray',
      paddingVertical:10
      // alignItems: 'center',
      // justifyContent: 'center
    },
    levelText: {
      alignItems: 'flex-start',
      padding: 5,
      marginLeft: '5%',
      color: 'black',
      fontSize: 13,
      fontFamily: 'PoppinsMedium',
    },
    imgContainer: {
      height: 110,
      width: 110,
      marginTop: 20,
      marginBottom: 10,
    },
    img: {
      height: 100,
      width: 100,
      borderRadius: 50,
    },
    Uploadimg: {
      height: 30,
      width: 30,
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    inputContainer: {
      height: 50,
      width: '90%',
      backgroundColor: '#e6eff0',
      flexDirection: 'row',
      paddingHorizontal: 15,
      borderRadius: 10,
      // borderWidth: 0.5,
      alignItems: 'center',
      borderColor: 'black',
      alignSelf: 'center',
    },
    rightIcon: {
      height: 25,
      width: 25,
    },
    rightIconFile: {
      height: 30,
      width: 30,
      margin: '15%',
    },
    MandatoryText: {
      alignItems: 'flex-start',
      padding: 5,
      marginLeft: '5%',
      color: 'black',
      fontSize: 10,
      fontFamily: 'PoppinsRegular',
    },
  });