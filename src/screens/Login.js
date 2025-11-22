import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {ScrollView, TextInput} from 'react-native-gesture-handler';
// import {StyleSheet} from 'react-native';
// import {Image} from 'react-native';
import {myFetchPostRequest} from '../api/MyFetchApi';
import CustomAlert from '../components/CustomAlert';

// import { myFetchPostRequest } from '../common/MyFetchApi'
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoadingIndicator from '../components/LoadingIndicator';
import {useNavigation} from '@react-navigation/native';

const {height, widht} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const transfer = useNavigation();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const [useridError, setuseridError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  //====================================================================================================================
  const [errorMessage, setErrorMessage] = useState(''); // Initialize state for error message
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => {
    // Function to close the alert
    setShowAlert(false);
  };
  //====================================================================================================================

  const handleUserIdChange = text => {
    setUserId(text);
  };
  const handlePasswordChange = text => {
    setPassword(text);
  };

const handleSubmit = async () => {
  setIsLoading(true);

  if (userId === '' || password === '') {
    setIsLoading(false);

    setuseridError(userId === '' ? 'Enter User Id' : '');
    setpasswordError(password === '' ? 'Enter Password' : '');
    return;
  }

  try {
    const response = await fetch(
      'https://Exim.Tranzol.com/api/AccountApi/Login',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',   // IMPORTANT
        },
        body: JSON.stringify({
          Username: userId,
          Password: password,
        }),
      },
    );

    const result = await response.json();
    setIsLoading(false);

    console.log("API Response:", result);

    if (result === 'Invalid username and password.') {
      setuseridError('Invalid Credentials!');
      setpasswordError('Invalid Credentials!');
      setUserId('');
      setPassword('');
    } else {
      // Normally result = { token: "...", signature: "..." }

      AsyncStorage.setItem('username', userId);
      AsyncStorage.setItem('password', password);

      if (result.token) {
        AsyncStorage.setItem('Token', result.token);
      }
      if (result.signature) {
        AsyncStorage.setItem('Sign', result.signature);
      }

      navigation.replace('DrawerNavigation');
    }

  } catch (error) {
    setIsLoading(false);
    console.log('Login Error:', error);
    setErrorMessage('Check Internet Connection!');
    setShowAlert(true);
  }
};



  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {IsLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <Image
            source={require('../assets/loginScreen.jpg')}
            resizeMode="center"
            style={styles.img}
          />
          <Welcome />

          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#ebeef2',
              width: '100%',
              height: height / 2 + 60,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              marginTop: 30,
              paddingTop: 30,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 25,
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontFamily: 'PoppinsExtraBold',
              }}>
              Login 
            </Text>

            <View>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.leftIcon}
                  source={require('../assets/user.png')}
                />
                <TextInput
                  placeholderTextColor={'#6c6f73'}
                  style={{
                    paddingLeft: 30,
                    color: 'black',
                    fontSize: 15,
                    width: 250,
                    fontFamily: 'PoppinsRegular',
                  }}
                  placeholder={'Enter User Id'}
                  autoCorrect={false}
                  // maxLength={10}
                  value={userId}
                  onChangeText={handleUserIdChange}
                />
              </View>

              {useridError && (
                <Text style={styles.errorText}>{useridError}</Text>
              )}
            </View>

            <View>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.leftIcon}
                  source={require('../assets/password.png')}
                />
                <TextInput
                  placeholderTextColor={'#6c6f73'}
                  style={{
                    paddingLeft: 30,
                    color: 'black',
                    fontSize: 15,
                    width: 250,
                    fontFamily: 'PoppinsRegular',
                  }}
                  placeholder={'Enter Password'}
                  secureTextEntry={true}
                  autoCorrect={false}
                  value={password}
                  onChangeText={handlePasswordChange}
                />
              </View>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            <LoginButton
              onClick={() => {
                handleSubmit();
              }}
            />
          </View>
        </View>
      )}
      <CustomAlert
        visible={showAlert}
        message={errorMessage}
        onClose={closeAlert}
      />
    </ScrollView>
  );
};

const Welcome = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Text style={[styles.txt, {color: 'black'}]}>Welcome To</Text>

      <Text style={[styles.txt1]}>Exim Logistics</Text>
    </View>
  );
};

const LoginButton = prop => {
  return (
    <TouchableOpacity style={styles.button} onPress={prop.onClick}>
      <Text style={styles.text}>Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 450,
    height: 250,
    marginTop: 10,
    marginBottom: 10,
  },
  txt: {
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
    // fontFamily:"PoppinsExtraBold"
    fontFamily: 'PoppinsRegular',
    letterSpacing: 1,
  },
  txt1: {
    fontSize: 30,
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'PoppinsExtraBold',
    color: '#28187e',
    shadowColor: 'black',
    shadowRadius: 5,
    elevation: 50, // for Android
  },

  inputContainer: {
    height: 55,
    width: 300,
    backgroundColor: '#cbdcf7',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 20,
    // borderColor:'#5d92d4',
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  rrightIcon: {
    position: 'absolute',
    right: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  button: {
    backgroundColor: '#28187e',
    borderRadius: 5,
    marginVertical: 40,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: 'PoppinsRegular',
  },
  inputError: {
    borderColor: 'red', // add red border color if mobile number is not valid
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default Login;
