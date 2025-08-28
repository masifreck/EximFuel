import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Animated,Alert
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import {CustomRequestOptionsAdmin} from '../components/CustomRequestOptions';
import useApiToken from '../components/Token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Searching from '../components/Searching';
import { darkBlue } from '../components/constant';
const OwnerDetails = () => {
  const navigation = useNavigation();
  const [apiTokenReceived, setapiTokenReceived] = useState(null);
  AsyncStorage.getItem('Token')
    .then(token => {
      setapiTokenReceived(token);
     // console.log('Retrieved token:', token);
    })
    .catch(error => {
      const TokenReceived = useApiToken();
      setapiTokenReceived(TokenReceived);
      console.log('Received token', apiTokenReceived);
      console.log('Error retrieving token:', error);
    });
  const [dlNumber, setDLNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Initialize state for error message
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [hasBorder, setHasBorder] = useState(false); // State for border
  const handleShowToast = () => {
    setShowToast(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      hideToast();
    }, 5000);
    setHasBorder(true);
  };

  const hideToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setHasBorder(false);
    });
    setShowToast(false);
  };

  const resetInputs = () => {
    setDLNumber(''); // Reset the panNumber input field
  };
  const closeAlert = () => {
    // Function to close the alert
    setShowAlert(false);
    resetInputs();
  };

  const handleShowDriverDetails = async redirectpage => {
  if (dlNumber.length === 0) {
    setErrorMessage('Enter DL Number');
    handleShowToast();
    return;
  }

  if (dlNumber.length !== 15 && dlNumber.length !== 16) {
    setErrorMessage('Invalid DL Number');
    handleShowToast();
    return;
  }

  try {
    setIsLoading(true);

    const {url, requestOptions} = CustomRequestOptionsAdmin(
      `https://Exim.Tranzol.com/api/OwnerApi/GetDriver?licenseNo=${dlNumber}`,
      apiTokenReceived,
    );

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      console.log('Error fetching driver details');
      setErrorMessage('Error fetching driver details');
      setShowAlert(true);
      resetInputs();
      return;
    }

    const data = await response.json();
    // console.log('Driver API Response:', data);

    if (data.error) {
      console.log('API Response Error:', data.error);
      setErrorMessage(data.error);
      setShowAlert(true);
      resetInputs();
      return;
    }

    const driverResult = data?.apiResult?.Result;

    if (!driverResult || !driverResult.DLNumber) {
      Alert.alert(
        'Driver Not Registered',
        'This Driver is not registered. Do you want to register it?',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => navigation.navigate('RegisterDriver', { DLNumber: dlNumber }) }
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate(redirectpage, {
        driverDetails: data,
      });
      resetInputs();
    }

  } catch (error) {
    console.log('An error occurred:', error);
    Alert.alert(
      'Error',
      'An error occurred while fetching driver details. Please Try Again',
      [{ text: 'OK' }],
      { cancelable: false }
    );
  } finally {
    setIsLoading(false);
    setDLNumber('');
  }
};


  return (
    <>
    {isLoading?(
      <Searching/>
    ):(
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            height: 200,
            width: '50%',
            alignItems: 'center',
            borderRadius: 10,
            shadowColor: 'black', // Set shadow color to blue
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 10, // This is for Android
          }}>
          <Image
            source={require('../assets/truck-driver.png')}
            style={styles.image}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              borderWidth: hasBorder ? 0.9 : 0,
              borderColor: hasBorder ? 'red' : 'transparent',
              backgroundColor: hasBorder ? 'red' : '#9894e6',
            },
          ]}>
          <Image
            style={styles.leftIcon}
            source={require('../assets/id-card.png')}
          />
          <TextInput
            placeholderTextColor={'black'}
            style={styles.input}
            placeholder="Enter DL Number"
            value={dlNumber}
            onChangeText={text => setDLNumber(text)}
            autoCapitalize = {"characters"}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleShowDriverDetails('ShowDriverDetails')}>
          <Text style={styles.buttonText}>Show Driver Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => handleShowDriverDetails('UpdateDriver')}>
          <Text style={styles.buttonText}>Update Driver Details</Text>
        </TouchableOpacity>
             <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate('ManageDriver')}>
          <Text style={styles.buttonText}>Manage Driver</Text>
        </TouchableOpacity>
        <View style={styles.registerTextContainer}>
          <Text style={styles.blackText}>If Not Registered! </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterDriver');
            }}>
            <Text style={styles.blueText}>Click Here to Register.</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomAlert
        visible={showAlert}
        message={errorMessage}
        onClose={closeAlert}
      />

      {/* {showToast && (
        <Animated.View
          style={[styles.toastContainer, {opacity: fadeAnim, zIndex: 999}]}>
          <Text style={styles.toastText}>{errorMessage}</Text>
        </Animated.View>
      )} */}
    </ScrollView>)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30%',
    marginBottom: 20,
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  image: {
    height: 200,
    width: '100%',
    backgroundColor: darkBlue,
    borderRadius: 10,
  },
  inputContainer: {
    height: 55,
    width: 300,
    backgroundColor: '#9894e6',
    // backgroundColor:"black",
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    paddingTop: 13,
    paddingLeft: 30,
    letterSpacing: 0.5,
    color: 'black',
    fontSize: 15,
    width: 250,
    fontFamily: 'PoppinsSemiBold',
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  button: {
    backgroundColor: darkBlue,
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 20,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: darkBlue,
    borderRadius: 5,
    marginBottom: 20,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: 'PoppinsSemiBold',
  },
  linkText: {
    color: darkBlue,
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  blackText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'PoppinsMedium',
  },
  blueText: {
    color: darkBlue,
    fontSize: 14,
    // fontWeight: '500',
    fontFamily: 'PoppinsBold',
  },
  toastContainer: {
    borderRadius: 5,
    position: 'absolute',
    bottom: '26%', // Center vertically
    left: '26%', // Center horizontally
    transform: [{translateX: -50}, {translateY: -50}], // Center both horizontally and vertically
  },
  toastText: {
    color: 'red',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'PoppinsMedium',
    shadowColor: 'black', // Set shadow color to blue
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10, // This is for Android
  },
});

export default OwnerDetails;
