import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import CustomAlert from '../components/CustomAlert';
import { CustomRequestOptionsAdmin } from '../components/CustomRequestOptions';
import useApiToken from '../components/Token';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Vehicle = () => {
  const [apiTokenReceived, setapiTokenReceived] = useState(null);
  AsyncStorage.getItem('Token')
    .then(token => {
      setapiTokenReceived(token);
      console.log('Retrieved token:', token);
    })
    .catch(error => {
      const TokenReceived = useApiToken();
      setapiTokenReceived(TokenReceived);
      console.log('Received token', apiTokenReceived);
      console.log('Error retrieving token:', error);
    });
  const navigation = useNavigation();
  const [vehicleNo, setVehicleNo] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Initialize state for error message
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

  const handleShowDetails = async redirectpage => {
    if (vehicleNo.length !== 0) {
      if (vehicleNo.length > 8 && vehicleNo.length < 13) {
        try {
          const {url,requestOptions}=CustomRequestOptionsAdmin(`https://Exim.Tranzol.com/api/VehicleApi/GetVehicleByNo?vehicleNo=${vehicleNo}`,apiTokenReceived)
      
          const response = await fetch(url, requestOptions);
          if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data);
            if (data.error) {
              console.log('API Response Error:', errorMessage);
              setErrorMessage(data.error);
              setShowAlert(true);
            } else {
              if (data.apiResult.Result === null) {
                const errorMessage = 'Vehicle Number Not Found!';
                setErrorMessage(errorMessage);
                handleShowToast();
              } else if (data.apiResult.Result.VehicleNo === null) {
                const errorMessage = 'Vehicle Number Not Found!';
                setErrorMessage(errorMessage);
                handleShowToast();
              } else {
                navigation.navigate(redirectpage, {
                  vehicleDetails: data,
                });
              }
            }
          } else {
            // Handle the error
            console.log('Error fetching vehicle details');
            const errorMessage = 'Error fetching vehicle details';
            setErrorMessage(errorMessage);
            setShowAlert(true);
          }
        } catch (error) {
          console.log('An error occurred:', error);
          setErrorMessage('An error occurred:');
          setShowAlert(true);
        }
      } else {
        setErrorMessage('Enter Min 9 charecters ');
        handleShowToast();
      }
    } else {
      setErrorMessage('Enter Vehicle Number');
      handleShowToast();
    }
    setVehicleNo('');
  };
  const closeAlert = () => {
    // Function to close the alert
    setShowAlert(false);
  };

  return (
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
            source={require('../assets/Truck.png')}
            style={styles.truckImage}
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
            source={require('../assets/delivery-truck.png')}
          />
          <TextInput
            placeholderTextColor={'black'}
            style={styles.input}
            placeholder={'Enter Registration No'}
            autoCorrect={false}
            value={vehicleNo}
            onChangeText={text => setVehicleNo(text)}
            autoCapitalize = {"characters"}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, {marginTop: 30}]}
          onPress={() => handleShowDetails('ShowVehicleDetails')}>
          <Text style={styles.buttonText}>Show Vehicle Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleShowDetails('UpdateVehicle')}>
          <Text style={styles.buttonText}>Update Vehicle Details</Text>
        </TouchableOpacity>

        <View style={styles.registerTextContainer}>
          <Text style={styles.blackText}>If Not Registered! </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterVehicle');
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
      {showToast && (
        <Animated.View
          style={[styles.toastContainer, {opacity: fadeAnim, zIndex: 999}]}>
          <Text style={styles.toastText}>{errorMessage}</Text>
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30%',
    marginBottom: 20,
  },
  truckImage: {
    height: 200,
    width: '100%',
    backgroundColor: '#453D98ff',
    borderRadius: 10,
  },
  inputContainer: {
    height: 55,
    width: 300,
    backgroundColor: '#9894e6',
    // backgroundColor:"black",
    alignContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
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
  button: {
    backgroundColor: '#453D98ff',
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
    color: '#453D98ff',
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

export default Vehicle;
