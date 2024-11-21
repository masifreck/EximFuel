import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
  TextInput
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import useApiToken from '../components/Token';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OwnerDetails = () => {
  const navigation = useNavigation();
  const [challanNumber, setchallanNumber] = useState('');
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
  const [FGLoading, setFGLoading] = useState(null);
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
    setchallanNumber(''); // Reset the panNumber input field
  };
  const closeAlert = () => {
    // Function to close the alert
    setShowAlert(false);
  };
  const handleShowDetails = async () => {
    if (challanNumber.length === 0) {
      setErrorMessage("Enter Challan Number");
      handleShowToast();
      resetInputs();
    } else {
      setIsLoading(true); // Set loading state to true
      try {
        const url = `https://exim.tranzol.com/api/LoadingChallan/GetFinishGoods?challanNo=${challanNumber}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Basic YWRtaW46YWRtaW5AMDc=`, // You may want to keep this secure
          },
          redirect: 'follow',
        });
  
        setIsLoading(false);
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
  
          if (data.apiResult.Result === null) {
            // Case: No Challan details (Result is null)
            const errorMessage = 'Invalid Challan Number';
            setErrorMessage(errorMessage);
            setShowAlert(true);
            resetInputs();
          } else {
            // Case: Valid Challan details exist (Result is not null)
            setFGLoading(data); // Store the result in your state
            navigation.navigate('ShowFGLoadingChalan', {
              FGLoading: data, // Pass the challan details to the next screen
            });
            resetInputs();
          }
        } else {
          // Case: Fetching failed, no response
          console.log('Error fetching Challan details');
          setErrorMessage('Challan Number Not Found');
          handleShowToast();
          resetInputs();
        }
      } catch (error) {
        // Case: Exception or network failure
        console.log('An error occurred:', error);
        setErrorMessage('An error occurred');
        setShowAlert(true);
        resetInputs();
      }
    }
  };
  

  return (
    <ScrollView>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
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
              source={require('../assets/FG-loading.png')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                backgroundColor: '#453D98ff',
              }}
              resizeMode="contain"
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
              value={challanNumber}
              placeholder={'Enter Challan Number'}
              autoCorrect={false}
              onChangeText={text => setchallanNumber(text)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleShowDetails}>
            <Text style={styles.text}>Show Challan Details</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontFamily: 'PoppinsMedium',
              }}>
              For New Challan Entry !{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NewChalan');
              }}>
              <Text
                style={{
                  color: '#453D98ff',
                  fontSize: 18,
                  // fontWeight: '500',
                  fontFamily: 'PoppinsBold',
                  fontWeight:'bold'
                }}>
                Click Here.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    // backgroundColor:"black",
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 30,
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
  button: {
    backgroundColor: '#453D98ff',
    borderRadius: 5,
    marginTop: 30,
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
    bottom: '17%', // Center vertically
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
