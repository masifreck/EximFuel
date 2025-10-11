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
import LottieView from 'lottie-react-native';
import Loading from '../components/Loading';
import { inputbgColor } from '../components/constant';
import { darkBlue } from '../components/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Unloading = () => {
  const navigation = useNavigation();
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

  const [challanNumber, setchallanNumber] = useState('');
  const [Unloading, setUnloading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // Initialize state for error message
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [hasBorder, setHasBorder] = useState(false); // State for border
  const [loadingDetails,setLoadingDetails]=useState(null)
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
    return;
  }

  setIsLoading(true);

  try {
    // 1️⃣ First API: Get Unloading Challan
    const unloadingUrl = `https://Exim.Tranzol.com/api/LoadingChallan/GetUnloadingChallan?challanNo=${challanNumber}`;
    const unloadingResponse = await fetch(unloadingUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${apiTokenReceived}`,
        clientId: 'TRANZOLBOSS',
        clientSecret: 'TRANZOLBOSSPAN',
      },
      redirect: 'follow',
    });

    if (!unloadingResponse.ok) {
      setIsLoading(false);
      setErrorMessage('Error fetching Unloading Challan details');
      setShowAlert(true);
      resetInputs();
      return;
    }
    const finishGoodsUrl = `https://exim.tranzol.com/api/LoadingChallan/GetFinishGoods?challanNo=${challanNumber}`;
    const finishGoodsResponse = await fetch(finishGoodsUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${apiTokenReceived}`,
      },
      redirect: 'follow',
    });

    setIsLoading(false);

    if (!finishGoodsResponse.ok) {
      setErrorMessage('Error fetching Finish Goods details');
      setShowAlert(true);
      resetInputs();
      return;
    }

    const finishGoodsData = await finishGoodsResponse.json();
    //console.log('Finish Goods API Response:', finishGoodsData);
setLoadingDetails(finishGoodsData)
    if (finishGoodsData.apiResult?.Result === null) {
      const errorMessage = 'Invalid Challan Number (Finish Goods not found)';
      setErrorMessage(errorMessage);
      setShowAlert(true);
      resetInputs();
      return;
    }

    // 3️⃣ Success: Navigate with both data
    navigation.navigate('UnloadingEntry', {
      Unloading: finishGoodsData,
    
    });
    const unloadingData = await unloadingResponse.json();
    console.log('Unloading API Response:', unloadingData);

    if (unloadingData.error || unloadingData.date === null) {
      setIsLoading(false);
      setErrorMessage(unloadingData.error || 'Challan Number Not Found');
      handleShowToast();
      resetInputs();

    }

   //create method to navigate to show the unloading details
    else {
      navigation.navigate('ShowUnloadingDetails', {
        Unloading: unloadingData,
        finishGoodsData:finishGoodsData
      });
    }
    setIsLoading(false);

  } catch (error) {
    console.log('An error occurred:', error);
    setIsLoading(false);
    setErrorMessage('An error occurred while fetching data.');
    setShowAlert(true);
    resetInputs();
  }
};

  return (
    <ScrollView>
      {isLoading ? (
        <Loading/>
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
                backgroundColor: darkBlue,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          </View>
<View style={{flexDirection:'row',justifyContent:'space-evenly',justifyContent:'center',gap:10}}>
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
                width: '80%',
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
          <TouchableOpacity onPress={()=>navigation.navigate('QRScanner',{field:7})} style={{marginTop:30,backgroundColor:'#f4d58d',elevation:4,borderRadius:10,padding:2}}>
  <LottieView
            source={require('../assets/scanning.json')}
            loop
            autoPlay
            style={{width:60,height:50}}
            />
            </TouchableOpacity>
            </View>
          <TouchableOpacity style={styles.button}  onPress={()=>  handleShowDetails()}>
            <Text style={styles.text}>View Details</Text>
          </TouchableOpacity>
         
         
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
    width: 220,
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
