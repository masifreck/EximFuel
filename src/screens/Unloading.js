import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,TextInput
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import useApiToken from '../components/Token';
const Unloading = () => {
  const navigation = useNavigation();
  const apiTokenReceived = useApiToken();
  console.log('Received token', apiTokenReceived);

  const [challanNumber, setchallanNumber] = useState('');
  const [Unloading, setUnloading] = useState(null);
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
      setErrorMessage('Enter Challan Number');
      handleShowToast();
      resetInputs();
    } else {
      setIsLoading(true); // Set loading state to true
      try {
        const url = `https://Exim.Tranzol.com/api/LoadingChallan/GetUnloadingChallan?challanNo=${challanNumber}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${apiTokenReceived}`,
            clientId: 'TRANZOLBOSS',
            clientSecret: 'TRANZOLBOSSPAN',
          },
          redirect: 'follow',
        });
        setIsLoading(false);
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          if (data.error) {
            console.log('API Response Error:', errorMessage);
            setErrorMessage(data.error);
            setShowAlert(true);
          } else {
            setUnloading(data);
            if (data.apiResult.Result === null) {
              const errorMessage = 'Challan Number Not Found';
              setErrorMessage(errorMessage);
              handleShowToast();
              resetInputs();
            } else {
              navigation.navigate('UnloadingEntry', {
                Unloading: data,
              });
              resetInputs();
            }
          }
        } else {
          console.log('Error fetching Challan details');
          const errorMessage = 'Error fetching Challan details';
          setErrorMessage(errorMessage);
          setShowAlert(true);
          resetInputs();
        }
      } catch (error) {
        console.log('An error occurred:', error);
        setErrorMessage('An error occurred:');
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
              source={require('../assets/unloading.png')}
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: '#453D98ff',
                borderRadius: 10,
              }}
              resizeMode="cover"
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
              placeholder={'Enter Challan Number'}
              autoCorrect={false}
              onChangeText={text => setchallanNumber(text)}
              // maxLength={10}
              // value={userId}
              // onChangeText={handleUserIdChange}
            />
          </View>

          <TouchableOpacity style={styles.button}  onPress={()=>  navigation.navigate('UnloadingEntry', {
                Unloading: '',
              })}>
            <Text style={styles.text}>View Details</Text>
          </TouchableOpacity>
          {/* // onPress={() => {
          //   navigation.navigate('ShowUnloadingDetails');
          // }}> */}
         
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
    bottom: '9%', // Center vertically
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

export default Unloading;
