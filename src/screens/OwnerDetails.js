import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,TextInput
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomRequestOptionsAdmin} from '../components/CustomRequestOptions';


const OwnerDetails = () => {

  // TOKEN RETRIEVEL============================================================================================================================
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
  // ===============================
  const navigation = useNavigation();
  const [panNumber, setPanNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => {
    setShowAlert(false);
  };
  // handle toast==============================================
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
  // handle buttons=====================================================

  const fetchownerdetails = async redirectpage => {
    if (panNumber.length !== 0) {
      if (panNumber.length === 10) {
        try {
          const {url, requestOptions} = CustomRequestOptionsAdmin(
            `https://Exim.Tranzol.com/api/OwnerApi/GetOwner?panNo=${panNumber}`,
            apiTokenReceived,
          );
          const response = await fetch(url, requestOptions);
          if (response.ok) {
            const data = await response.json();
            if (data.error) {
              setErrorMessage(data.error);
              console.log('API Response Error:', errorMessage);
              setErrorMessage(errorMessage);
              setShowAlert(true);
            } else {
              if (data.apiResult.Result === null) {
                const errorMessage = 'Pan Number Not Found';
                setErrorMessage(errorMessage);
                handleShowToast();
              } else {
                navigation.navigate(redirectpage, {
                  ownerDetails: data,
                });
              }
            }
          } else {
            setErrorMessage('Error fetching vehicle details');
            const errorMessage = 'Error fetching driver details';
            setErrorMessage(errorMessage);
            setShowAlert(true);
          }
        } catch (error) {
          setErrorMessage('Network Error');
          setShowAlert(true);
        }
      } else {
        setErrorMessage('Invalid Pan Number');
        handleShowToast();
      }
    } else {
      setErrorMessage('Enter Pan Number');
      handleShowToast();
    }
    setPanNumber('');
  };
  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '30%',
          marginBottom: 20,
        }}>
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
            source={require('../assets/woner.png')}
            style={{
              height: 200,
              width: '100%',
              backgroundColor: '#453D98ff',
              borderRadius: 10,
            }}
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
            style={{
              paddingTop: 13,
              paddingLeft: 30,
              letterSpacing: 0.5,
              color: 'black',
              fontSize: 15,
              width: 250,
              fontFamily: 'PoppinsSemiBold',
            }}
            placeholder={'Enter Pan Number'}
            autoCorrect={false}
            value={panNumber}
            maxLength={10}
            onChangeText={text => setPanNumber(text)}
            autoCapitalize = {"characters"}
            // onChangeText={handleUserIdChange}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, {marginTop: 30}]}
          onPress={() => fetchownerdetails('ShowOwnerDetails')}>
          <Text style={styles.text}>Show Owner Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchownerdetails('UpdateOwner')}>
          <Text style={styles.text}>Update Owner Details</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'PoppinsMedium',
            }}>
            If Not Registered !{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterOwner');
            }}>
            <Text
              style={{
                color: '#453D98ff',
                fontSize: 14,
                // fontWeight: '500',
                fontFamily: 'PoppinsBold',
              }}>
              Click Here to Register.
            </Text>
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
  inputContainer: {
    height: 55,
    width: 300,
    backgroundColor: '#9894e6',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
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
    backgroundColor: '#453D98ff',
    marginBottom: 20,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  toastContainer: {
    borderRadius: 5,
    position: 'absolute',
    bottom: '26%', // Center vertically
    left: '26%', // Center horizontally
    transform: [{translateX: -50}, {translateY: -50}],
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
