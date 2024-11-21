import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomAlert from '../components/CustomAlert';
import {useNavigation} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import useApiToken from '../components/Token';
import LoadingIndicator from '../components/LoadingIndicator';
import CustomInput from '../components/CustomInput';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomRequestOptions from '../components/CustomRequestOptions';
import { CustomRequestOptions } from '../components/CustomRequestOptions';
const RegisterDriver = () => {
  const [apiTokenReceived, setapiTokenReceived] = useState();
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
  const [IsLoading, setIsLoading] = useState(true);
  const [is_everything_ok, setis_everything_ok] = useState(false);

  const [hasBorder, setHasBorder] = useState(false); // State for border
  const handleShowToast = () => {
    setHasBorder(true);
  };

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
    // console.log(selectedStartDate);
  };
  useEffect(() => {
    const parts = selectedStartDate.split('/');
    const [day, month, year] = parts;
    const convertedDate = `${year}/${month}/${day}`;
    setconvSelectedStartDate(convertedDate);
    // console.log(convselectedStartDate);
  }, [selectedStartDate]);
  //calander===================

  const navigation = useNavigation();

  const [isVerified, setIsVerified] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // keys from the postman==============================================================
  const [dlNumber, setdlNumber] = useState('');
  const [name, setName] = useState('');
  const [adharNumber, setAdharNumber] = useState('');
  const [dob, setDOB] = useState('');
  const [primaryContact, setPrimaryContact] = useState('');
  const [secondaryContact, setSecondaryContact] = useState('');
  const [email, setEmail] = useState('');
  const [driverAddress, setdriverAddress] = useState('');
  const [PanNo, setPanNo] = useState('');

  const registertheDriver = () => {
    setIsLoading(true);
    const postData = {
      DLNumber: dlNumber,
      DriverName: name,
      AdharNo: adharNumber,
      Dob: convselectedStartDate,
      PrimaryContactNo: primaryContact,
      SecondaryContactNo: secondaryContact,
      DriverEmail: email,
      DriverAddress: driverAddress,
      PanNo: PanNo,
    };
    const {url, requestOptions} = CustomRequestOptions(
      'https://Exim.Tranzol.com/api/OwnerApi/CreateDriver',
      apiTokenReceived,
      postData,
    );
    fetch(url, requestOptions)
      .then(response => {
        setIsLoading(false);
        if (!response.ok) {
          const error = 'Network response was not ok';
          setErrorMessage(error);
          setShowAlert(true);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        if (data.apiResult.Result !== null) {
          const errorMessage = 'Registration Successfull';
          setErrorMessage(errorMessage);
          setShowAlert(true);
        } else if (data.apiResult.Result === null) {
          if (
            data.apiResult.Error ===
            "Violation of UNIQUE KEY constraint 'Driver_Dl'. Cannot insert duplicate key in object 'dbo.App_Driver'. The duplicate key value is (123451234512345).\r\nThe statement has been terminated."
          ) {
            const errorMessage = 'Driver license is already exists.';
            setErrorMessage(errorMessage);
            setShowAlert(true);
          } else {
            handleShowToast();
            console.log('logged', data.apiResult);
          }
        } else {
          handleShowToast();
          console.log('logged', data.apiResult);
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('Error:', error);
        setErrorMessage('Network Error');
        setShowAlert(true);
      });
  };
  const closeAlert = () => {
    setShowAlert(false);
    navigation.navigate('Driver');
  };

  // Verification code=======================================================================
  useEffect(() => {
    if (dlNumber.length === 15 || dlNumber.length === 16) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, [dlNumber]);

  useEffect(() => {
    // Check if apiTokenReceived is not null
    if (apiTokenReceived !== null) {
      setIsLoading(false);
      setis_everything_ok(true);
    }
  }, [apiTokenReceived]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (is_everything_ok === false) {
        // Redirect to home page if is_everything_ok is still false after 45 seconds
        console.log('Redirecting to home page...');
        setErrorMessage('Unexpected Error! Login Agian');
        setShowAlert(true);
      }
    }, 45000); // 45 seconds in milliseconds

    return () => clearTimeout(timeoutId); // Clear the timeout when the component unmounts or when is_everything_ok changes
  }, [is_everything_ok]);

  return (
    <ScrollView style={{backgroundColor: '#edeef2'}}>
      {IsLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require('../assets/driver.png')}
            />
          </View>
          <View style={styles.levelContainer}>
            <Text
              style={{
                color: '#453D98ff',
                fontSize: 15,
                marginBottom: 10,
                marginTop: 8,
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Driver Details
            </Text>
            <Text style={styles.MandatoryText}>
              Mandatory Fields<Text style={{color: 'red'}}>*</Text>
            </Text>
            <CustomInput
              labelText="DL Number"
              placeholdername="Enter DL Number"
              onChangeText={text => setdlNumber(text)}
              hasBorder={hasBorder}
              width="85%"
              isVerified={isVerified}
              isMandatory={true}
            />
            <CustomInput
              labelText="Name"
              placeholdername="Enter Driver Name"
              onChangeText={text => setName(text)}
              hasBorder={hasBorder}
              isMandatory={true}
            />
            <CustomInput
              labelText="Aadhar Number"
              placeholdername="Enter Aadhar Number"
              onChangeText={text => setAdharNumber(text)}
              hasBorder={hasBorder}
              stringlength={12}
              keyboardTypename="numeric"
              isMandatory={true}
            />

            <Text style={styles.levelText}>
              Date Of Birth <Text style={{color: 'red'}}>*</Text>
            </Text>
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
                  width: '85%',
                  marginRight: 20,
                }}
                value={selectedStartDate}
                placeholder={'DD-MM-YYYY'}
                autoCorrect={false}
                onChangeText={text => setDOB(text)}
                editable={false}
              />

              <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                <Image
                  style={styles.rightIcon}
                  source={require('../assets/calendar.png')}
                />
              </TouchableOpacity>
            </View>
            <CustomInput
              labelText="Primary Contact Number"
              placeholdername="Enter Mobile Number"
              onChangeText={text => setPrimaryContact(text)}
              hasBorder={hasBorder}
              stringlength={10}
              keyboardTypename="numeric"
              isMandatory={true}
            />

            <CustomInput
              labelText="Secondary Contact Number"
              placeholdername="Enter Mobile Number"
              onChangeText={text => setSecondaryContact(text)}
              stringlength={10}
              keyboardTypename="numeric"
            />

            <CustomInput
              labelText="Pan Number"
              placeholdername="Enter Pan Number"
              onChangeText={text => setPanNo(text)}
            />

            <CustomInput
              labelText="Email Address"
              placeholdername="Enter Email Id"
              onChangeText={text => setEmail(text)}
            />
            <CustomInput
              labelText="Driver Address"
              placeholdername="Enter Driver Address"
              onChangeText={text => setdriverAddress(text)}
              isend="true"
              isaddress={true}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={registertheDriver}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* custom alert code==================================== */}
      <CustomAlert
        visible={showAlert}
        message={errorMessage}
        onClose={closeAlert}
      />

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
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: '#e7f5e6',
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 15,
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
    fontFamily: 'PoppinsMedium',
  },

  container: {
    alignItems: 'center',
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
  },
  rightIcon: {
    height: 15,
    width: 15,
    // margin:'15%'
  },
  wrongIcon: {
    height: 15,
    width: 15,
    tintColor: 'red',
  },
  button: {
    backgroundColor: '#453D98ff',
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
  MandatoryText: {
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
    fontSize: 10,
    fontFamily: 'PoppinsRegular',
  },
  toastContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: '65%', // Center vertically
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
    backgroundColor: '#453D98ff',
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
    color: '#453D98ff',
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
  rightIcon: {
    height: 22,
    width: 22,
  },
  alertContainer: {
    width: 400,
    height: 450,
    backgroundColor: '#453D98ff',
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
    color: '#453D98ff',
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

export default RegisterDriver;
