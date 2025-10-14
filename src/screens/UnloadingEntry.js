//
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Modal,ScrollView,ActivityIndicator
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {ScrollView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import CustomAlert from '../components/CustomAlert';
import {useNavigation, useRoute} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import useApiToken from '../components/Token';
import LoadingIndicator from '../components/LoadingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomImagePicker from '../components/CustomeImagePicker';
import Unloading from './Unloading';
import { darkBlue } from '../components/constant';
const RegisterOwner = () => {
  // calander==================
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [convselectedStartDate, setconvSelectedStartDate] = useState(null);
  const handleOkPress = () => {
    setCalendarVisible(false);
  };
  const onDateChange = date => {
    const selectedFormattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
    setSelectedStartDate(selectedFormattedDate);
    console.log(selectedStartDate);
  };
  useEffect(() => {
    const parts = selectedStartDate.split('/');
    const [day, month, year] = parts;
    const convertedDate = `${year}/${month}/${day}`;
    setconvSelectedStartDate(convertedDate);
    console.log(convselectedStartDate);
  }, [selectedStartDate]);
  //calander===================
  const navigation = useNavigation();
    const [apiTokenReceived, setapiTokenReceived] = useState();
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
  const route = useRoute();
 const {Unloading} = route.params;
 console.log('Unloading data received:', Unloading);
  const FetchminesDetails = Unloading?.apiResult?.Result || {};

// States with safe default values
const [isFocus, setIsFocus] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [showAlert, setShowAlert] = useState(false);

const [ChallanNo, setChallanNo] = useState(FetchminesDetails.ChallanNo || '');
const [VehicleNo, setVehicleNo] = useState(FetchminesDetails.VehicleNo || '');
const [WayBillNo, setWayBillNo] = useState(FetchminesDetails.EwayBillNo1 || '');
const [GSPNo, setGSPNo] = useState(FetchminesDetails.GPSNo || '');
const [GrossWt, setGrossWt] = useState(
  parseFloat(FetchminesDetails?.GrossWt)?.toFixed(3) || ''
);

const [TareWt, setTareWt] = useState(
  parseFloat(FetchminesDetails?.TareWt)?.toFixed(3) || ''
);

const [NetWt, setNetWt] = useState(
  parseFloat(FetchminesDetails?.NetWt)?.toFixed(3) || ''
);

const [LoadDate, setLoadDate] = useState(FetchminesDetails?.LoadDate? FetchminesDetails.LoadDate.split('T')[0] : '');
const [LoadType, setLoadType] = useState(FetchminesDetails.LoadType || '');
const [Id, setId] = useState(FetchminesDetails.Id || '');

  const [UnloadDate, setUnloadDate] = useState('');
  const [UnloadGrossWt, setUnloadGrossWt] = useState('0.00');
  const [UnloadTareWt, setUnloadTareWt] = useState('0.00');
  const [UnloadWt, setUnloadWt] = useState('0.00');
  const [GRNNumber, setGRNNumber] = useState('');
  const [GPSReceived, setGPSReceived] = useState('');
  const data2 = [
    {label: 'Yes', value: '1'},
    {label: 'No', value: '0'},
  ];
const [PrintUnloadImage,setPrintUnloadImage]=useState(null)
const [UnloadImage, setUnloadImage] = useState(null);

const [Loading, setLoading] = useState(false); // Loading state
const resetUnloadingStates = () => {
  setChallanNo(FetchminesDetails.ChallanNo || '');
  setVehicleNo(FetchminesDetails.VehicleNo || '');
  setWayBillNo(FetchminesDetails.EwayBillNo1 || '');
  setGSPNo(FetchminesDetails.GPSNo || '');
  setGrossWt(parseFloat(FetchminesDetails?.GrossWt)?.toFixed(3) || '');
  setTareWt(parseFloat(FetchminesDetails?.TareWt)?.toFixed(3) || '');
  setNetWt(parseFloat(FetchminesDetails?.NetWt)?.toFixed(3) || '');
  setLoadDate(FetchminesDetails?.LoadDate ? FetchminesDetails.LoadDate.split('T')[0] : '');
  setLoadType(FetchminesDetails.LoadType || '');
  setId(FetchminesDetails.Id || '');

  setUnloadDate(''); 
  setUnloadGrossWt('0.00');
  setUnloadTareWt('0.00');
  setUnloadWt('0.00');
  setGRNNumber('');
  setGPSReceived('');
  setPrintUnloadImage(null);
  setUnloadImage(null);
};

const registertheVehicle = () => {
 

const postData = { LoadingId: Id, GPSReceived: GPSReceived, UnloadDate: convselectedStartDate, UnloadGrossWt: UnloadGrossWt, UnloadTareWt: UnloadTareWt, UnloadWt: UnloadWt, GRNNumber: GRNNumber, };
 const formData = new FormData();   
Object.keys(postData).forEach(key => {
      if (postData[key] !== null) {
        let value = postData[key];
        if (typeof value === 'boolean' || typeof value === 'number') {
          value = String(value);
        }
        formData.append(key, value);
       // console.log(`${key}: ${value}`); // Hermes-safe logging
      }
    });
      if (PrintUnloadImage) {
      formData.append('PrintUnloadImage', {
        uri: PrintUnloadImage.uri,
        type: PrintUnloadImage.type,
        name: PrintUnloadImage.fileName || 'unlodingdoc1.jpg',
      });
    }
      if (UnloadImage) {
      formData.append('UnloadImage', {
        uri: UnloadImage.uri,
        type: UnloadImage.type,
        name: UnloadImage.fileName || 'unloadingdoc2.jpg',
      });
    }
  const url = 'https://Exim.Tranzol.com/api/LoadingChallan/CreateUnloadingChallan';

  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${apiTokenReceived}`,
      clientId: 'TRANZOLBOSS',
      clientSecret: 'TRANZOLBOSSPAN',
    },
    body: formData,
    redirect: 'follow',
  };

  setLoading(true); // Start loading

  fetch(url, requestOptions)
    .then(response => {
      setLoading(false); // Stop loading
      if (!response.ok) {
        setErrorMessage('Network response was not ok');
        setShowAlert(true);
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data?.apiResult?.Result !== null) {
        setErrorMessage('Registration Successful');
        resetUnloadingStates();
        setShowAlert(true);
      } else {
        handleShowToast();
      }
    })
    .catch(error => {
      setLoading(false); // Stop loading on error
      console.log('Fetch Error:', error);
      setErrorMessage('An error occurred during the request');
      setShowAlert(true);
    });
};

  const closeAlert = () => {
    // Function to close the alert
    setShowAlert(false);
    redirect();
  };
  const redirect = () => {
    navigation.navigate('Unloading');
  };

  const [showToast, setShowToast] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [hasBorder, setHasBorder] = useState(false); // State for border
  const handleShowToast = () => {
    setShowToast(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      hideToast();
    }, 700);
    setHasBorder(true);
  };

  const hideToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowToast(false);
    });
  };

  const [IsLoading, setIsLoading] = useState(true);
  const [is_everything_ok, setis_everything_ok] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (is_everything_ok === false) {
        // Redirect to home page if is_everything_ok is still false after 45 seconds
        console.log('Redirecting to home page...');
        setErrorMessage('Unexpected Error! Login Again');
        setShowAlert(true);
      }
    }, 45000); // 45 seconds in milliseconds

    return () => clearTimeout(timeoutId); // Clear the timeout when the component unmounts or when is_everything_ok changes
  }, [is_everything_ok]);

  useEffect(() => {
    if (apiTokenReceived !== null) {
      setIsLoading(false);
      setis_everything_ok(true);
    }
  }, [apiTokenReceived]);

  return (
    <ScrollView style={{backgroundColor: '#edeef2'}}>
      {IsLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.levelContainer}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 8,
                marginTop: 8,
                color: darkBlue,
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Challan Details
            </Text>

            <Text style={styles.levelText}>Challan No</Text>
            <View
              style={[
                styles.inputContainer,
                {
                  borderWidth: hasBorder ? 0.9 : 0,
                  borderColor: hasBorder ? 'red' : 'transparent',
                },
              ]}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                value={ChallanNo}
                editable={false}
                autoCorrect={false}
                onChangeText={text => setChallanNo(text)}
              />
            </View>

            <Text style={styles.levelText}>Vehicle No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                value={VehicleNo}
                editable={false}
                onChangeText={text => setVehicleNo(text)}
              />
            </View>
            <Text style={styles.levelText}>WayBill No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                value={WayBillNo}
                editable={false}
                autoCorrect={false}
                onChangeText={text => setWayBillNo(text)}
              />
            </View>
            <Text style={styles.levelText}>GSP No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                value={GSPNo}
                editable={false}
                onChangeText={text => setGSPNo(text)}
              />
            </View>
            <Text style={styles.levelText}>Gross WT</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                value={GrossWt.toString()}
                editable={false}
                autoCorrect={false}
                onChangeText={text => setGrossWt(text)}
              />
            </View>

            <Text style={styles.levelText}>Tare WT</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                value={TareWt.toString()}
                editable={false}
                autoCorrect={false}
                onChangeText={text => setTareWt(text)}
              />
            </View>

            <Text style={styles.levelText}>Net WT</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                value={NetWt.toString()}
                editable={false}
                autoCorrect={false}
                onChangeText={text => setNetWt(text)}
              />
            </View>

         
            <Text style={styles.levelText}>Load Date</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                value={LoadDate}
                editable={false}
                onChangeText={text => setLoadDate(text)}
              />
            </View>

            <Text style={styles.levelText}>Load Type</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                value={LoadType}
                editable={false}
                onChangeText={text => setLoadType(text)}
              />
            </View>
          {/* {unload part starts from here } */}
            <Text
              style={{
                fontSize: 18,
                marginBottom: 8,
                marginTop: 10,
                color: darkBlue,
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Enter Details
            </Text>
            <Text style={styles.MandatoryText}>
              Mandatory Fields<Text style={{color: 'red'}}>*</Text>
            </Text>
            <Text style={styles.levelText}>
              Unload Date <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '35%',
                }}
                placeholder={'DD-MM-YYYY'}
                autoCorrect={false}
                editable={false}
                value={selectedStartDate}
                onChangeText={text => setUnloadDate(text)}
              />
              <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                <Image
                  style={styles.rightIcon}
                  source={require('../assets/calendar.png')}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.levelText}>
              Unload Gross WT <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'0.00'}
                autoCorrect={false}
                onChangeText={text => setUnloadGrossWt(text)}
                keyboardType='numeric'
              />
            </View>

            <Text style={styles.levelText}>
              Unload Tare WT <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'0.00'}
                autoCorrect={false}
                onChangeText={text => setUnloadTareWt(text)}
                keyboardType='numeric'
              />
            </View>

            <Text style={styles.levelText}>
              Unload WT <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'0.00'}
                autoCorrect={false}
                onChangeText={text => setUnloadWt(text)}
                keyboardType='numeric'
              />
            </View>

            <Text style={styles.levelText}>
              GRN Number <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={[styles.inputContainer, {marginBottom: 10}]}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter GRNNumber'}
                autoCorrect={false}
                onChangeText={text => setGRNNumber(text)}
              />
            </View>
            <Text style={styles.levelText}>
              GPS Received <Text style={{color: 'red'}}>*</Text>
            </Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black'}}
              data={data2}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select ' : '...'}
              searchPlaceholder="Search..."
              value={GPSReceived}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setGPSReceived(item.value);
                setIsFocus(false);
              }}
            />
               <View style={{flexDirection:'row',justifyContent:'space-evenly',width:'90%',marginTop:10}}>
             <CustomImagePicker
                      
                   
                      bgImage={require('../assets/invoice.png')}
                      
                      title="Unloading Doc 1"
                      iconName="camera-enhance"
                      onImagePicked={(imageData) => setPrintUnloadImage(imageData)}
                      imageData={PrintUnloadImage}
                    />
                     <CustomImagePicker
                      width={80}
                    
                      bgImage={require('../assets/lr.png')}
                    
                      title="Unloading Doc 2"
                      iconName="camera-enhance"
                      onImagePicked={(imageData) => setUnloadImage(imageData)}
                      imageData={UnloadImage}
                    />
          </View>
          </View>
       
          <TouchableOpacity style={styles.button} onPress={registertheVehicle}>
            {Loading ? (
              <ActivityIndicator color="#fff"  size='small'/>
            ):(
          
            <Text style={styles.text}>Register</Text>
              )}
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
          <Text style={styles.toastText}>Fill All Mandatory Fields</Text>
        </Animated.View>
      )}
      <Modal transparent={true} animationType="fade" visible={calendarVisible}>
        {calendarVisible && (
          <View style={styles.modalContainer}>
            <View style={styles.alertContainer}>
              <CalendarPicker
                onDateChange={onDateChange}
                selectedDayColor="#ffffff"
                todayBackgroundColor="#9894e6"
                selectedDayTextColor="#453D98ff"
                height={400}
                width={400}
                textStyle={{
                  fontFamily: 'PoppinsBold',
                  color: 'white',
                  fontSize: 15,
                }}
              />

              <View style={styles.buttoncont}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleOkPress}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleOkPress}>
                  <Text style={styles.buttonText}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '90%',
    borderColor: 'black',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: '#cedff0',
    paddingHorizontal: 15,
    marginBottom: 30,
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
    // fontFamily:"PoppinsMedium"
  },

  container: {
    alignItems: 'center',
    // justifyContent:'center',
    flex: 1,
    flexDirection: 'column',
  },
  levelContainer: {
    backgroundColor: 'white',
    width: '90%',
    margin: 10,
    borderRadius: 15,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  levelText: {
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
    fontSize: 13,
    fontFamily: 'PoppinsMedium',
  },
  MandatoryText: {
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
    fontSize: 10,
    fontFamily: 'PoppinsRegular',
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
    backgroundColor: '#cedff0',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    borderColor: 'black',
    alignSelf: 'center',
    // fontFamily:"PoppinsBold"
  },
  rightIcon: {
    height: 20,
    width: 20,
  },
  button: {
    backgroundColor: darkBlue,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 40,
    height: 50,
    width: '90%',
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
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: '40%', // Center vertically
    left: '39%', // Center horizontally
    transform: [{translateX: -50}, {translateY: -50}], // Center both horizontally and vertically
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PoppinsMedium',
    shadowColor: 'black', // Set shadow color to blue
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10, // This is for Android
  },
  rightIcon: {
    height: 22,
    width: 22,
  },
  alertContainer: {
    width: 400,
    height: 450,
    backgroundColor: darkBlue,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)', // Semi-transparent background
  },

  closeButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    height: 40,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: darkBlue,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttoncont: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterOwner;
