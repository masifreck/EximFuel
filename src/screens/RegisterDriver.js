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
  Linking,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomAlert from '../components/CustomAlert';
import {useNavigation} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import useApiToken from '../components/Token';
import LoadingIndicator from '../components/LoadingIndicator';
import CustomInput from '../components/CustomInput';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomRequestOptions from '../components/CustomRequestOptions';
import {CustomRequestOptions} from '../components/CustomRequestOptions';
import CustomImagePicker from '../components/CustomeImagePicker';
import {darkBlue, inputbgColor, Width} from '../components/constant';
import CustomOTPVerify from '../components/CustomOTPVerify';
import CustomCheckbox from '../components/CustomeCheckBox';
import SmsSending from '../components/SmsSending';
import Loading from '../components/Loading';
import Searching from '../components/Searching';
import Geolocation from 'react-native-geolocation-service';
import RNFS from 'react-native-fs';

import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
const RegisterDriver = ({route}) => {
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
  const {DLNumber} = route?.params ? route.params : '';
  // console.log('DL NO FROM ROUTE',DLNumber)
  useEffect(() => {
    if (DLNumber) {
      setdlNumber(DLNumber);
    }
  }, [DLNumber]);
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

  const [isSamePAdd, setIsSamePAdd] = useState(false);
  const [currentAdd, setCurrentAdd] = useState('');
  const [isDLSearching, setIsDLSearching] = useState(false);
  const [ValidTill, setValidTill] = useState('');

  const [isPCVerified, setPCVerified] = useState(false);
  const [isSCVerified, setSCVerified] = useState(false);

  const [Pverified, setPverified] = useState(false);
  const [Sverified, setSverified] = useState(false);
  const [primaryOTPUI, setprimaryOTPUI] = useState(false);
  const [secondaryOTPUI, setSecondaryOTPUI] = useState(false);
  const [otp1, setOtp1] = useState(null);
  const [otp2, setOtp2] = useState(null);
  const [isOTP1loading, setIsOtp1Loading] = useState(false);
  const [isOTP2loading, setIsOtp2Loading] = useState(false);

  const [Commercial, setCommercial] = useState('');
  const [Code, setCode] = useState('');

  const [MapUrl, setMapUrl] = useState('');
  useEffect(() => {
    if (isSamePAdd) {
      setCurrentAdd(driverAddress); // Copy if checked
    } else {
      setCurrentAdd(''); // Clear if unchecked
    }
  }, [isSamePAdd, driverAddress]);
  const getCurrentCoordinates = async () => {
    const permissionType = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    });
    try {
      let permissionStatus = await check(permissionType);

      if (
        permissionStatus === RESULTS.DENIED ||
        permissionStatus === RESULTS.LIMITED
      ) {
        permissionStatus = await request(permissionType);
      }

      if (permissionStatus === RESULTS.GRANTED) {
        return await new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            position => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            error => {
              reject(new Error('Failed to fetch location: ' + error.message));
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 1000000,
              forceRequestLocation: true,
              showLocationDialog: true,
            },
          );
        });
      } else if (permissionStatus === RESULTS.BLOCKED) {
        Alert.alert(
          'Location Permission Blocked',
          'Please enable location access in your settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openSettings},
          ],
        );
        throw new Error('Location permission blocked');
      } else {
        throw new Error('Location permission denied');
      }
    } catch (error) {
      throw error;
    }
  };
  // Create a function to fetch and set the map URL
  const fetchAndSetCurrentLocation = async () => {
    try {
      const coordinates = await getCurrentCoordinates();
      console.log('Current Coordinates:', coordinates);
      const {latitude, longitude} = coordinates;
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      setMapUrl(mapUrl);
      // console.log('Map URL:', mapUrl);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setErrorMessage(
        'Failed to fetch location. Please enable location services.',
      );
      setShowAlert(true);
    }
  };

  // Call this function inside useEffect or anywhere else
  useEffect(() => {
    fetchAndSetCurrentLocation();
  }, []);
  const validation = () => {
    const cleanDL = dlNumber.replace(/[\s-]/g, ''); // assuming dlNumber is your state variable
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const regex = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const adharRegex = /^\d{12}$/;
    if (
      !(dlNumber.length === 15 || dlNumber.length === 16) 
    ) {
      console.log('dl no',cleanDL)
      setErrorMessage('Please enter a valid DL No.');
      setShowAlert(true);
      return false;
    }
    if (!name) {
      setErrorMessage('Please enter Driver Name');
      setShowAlert(true);
      return false;
    }
    if (
      !convselectedStartDate ||
      convselectedStartDate.includes('undefined') ||
      convselectedStartDate.trim() === '' ||
      convselectedStartDate === 'undefined/undefined/'
    ) {
      setErrorMessage('Please enter a valid DOB');
      setShowAlert(true);
      return false;
    }

    if (!adharRegex.test(adharNumber)) {
      setErrorMessage('Please enter a valid 12-digit Aadhar number');
      setShowAlert(true);
      return false;
    }
    if (!primaryContact || !/^\d{10}$/.test(primaryContact)) {
      setErrorMessage('Please enter a valid primary contact (10 digits)');
      setShowAlert(true);
      return false;
    }

    if (secondaryContact && !/^\d{10}$/.test(secondaryContact)) {
      setErrorMessage('Please enter a valid secondary contact (10 digits).');
      setShowAlert(true);
      return false;
    }

    if (PanNo && !panRegex.test(PanNo)) {
      setErrorMessage('Please enter a valid PAN number (e.g., ABCDE1234F)');
      setShowAlert(true);
      return false;
    }
    // if (email && !emailRegex.test(email)) {
    //   setErrorMessage('Please enter a valid email address');
    //   setShowAlert(true);
    //   return false;
    // }

     if (!DriverFrontImage) {
 setErrorMessage('Please add Driver Photo');
      setShowAlert(true);
      return false;
     }
     if (!currentAdd || currentAdd.length < 12) {
  setErrorMessage('Driver Address must be at least 12 characters long');
  setShowAlert(true);
  return false;
}


      if (!DLPhoto) {
 setErrorMessage('Please add Driver DL.');
      setShowAlert(true);
      return false;

      }
    // if (!MapUrl) {
    //   setErrorMessage('Please enalbe your location');
    //   setShowAlert(true);
    //   fetchAndSetCurrentLocation();
    //   return false;
    // }
    // If valid
    return true;
  };

  const registertheDriver = () => {
    if (!validation()) return;
      setIsLoading(true);
    console.log('date', convselectedStartDate);
    const parts = convselectedStartDate.split('/');
    const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;
    const postData = {
      DLNumber: dlNumber,
      DriverName: name,
      AdharNo: adharNumber,
      Dob: formattedDate,
      PrimaryContactNo: primaryContact,
      MapUrl: MapUrl,
      IsPCVerification: isPCVerified,
      IsSCVefication: isSCVerified,
      PCVerification: Pverified,
      SCVerification: isSCVerified,
      SecondaryContactNo: secondaryContact,
      DriverEmail: email,
      DriverAddress: currentAdd,
      PanNo: PanNo,
    };
    const formData = new FormData();

    // Append all fields after converting boolean & number to string
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
    if (DriverFrontImage) {
      formData.append('DriverFrontImage', {
        uri: DriverFrontImage.uri,
        type: DriverFrontImage.type,
        name: DriverFrontImage.fileName || 'driver.jpg',
      });
    }
    // if (DriverLeftImage) {
    //   formData.append('DriverLeftImage', {
    //     uri: DriverLeftImage.uri,
    //     type: DriverLeftImage.type,
    //     name: DriverLeftImage.fileName || 'driver.jpg',
    //   });
    // }
    // if (DriverRightImage) {
    //   formData.append('DriverRightImage', {
    //     uri: DriverRightImage.uri,
    //     type: DriverRightImage.type,
    //     name: DriverRightImage.fileName || 'driver.jpg',
    //   });
    // }
    if (DLPhoto) {
      formData.append('DrivingLicence', {
        uri: DLPhoto.uri,
        type: DLPhoto.type,
        name: DLPhoto.fileName || 'dl.jpg',
      });
    }
    if (adharFront) {
      formData.append('AadharFront', {
        uri: adharFront.uri,
        type: adharFront.type,
        name: adharFront.fileName || 'adhar.jpg',
      });
    }
    if (adharBack) {
      formData.append('AadharBack', {
        uri: adharBack.uri,
        type: adharBack.type,
        name: adharBack.fileName || 'adhar.jpg',
      });
    }
    if (panPhoto) {
      formData.append('Pan', {
        uri: panPhoto.uri,

        type: panPhoto.type,
        name: panPhoto.fileName || 'pan.jpg',
      });
    }

   // console.log('data', postData);

    fetch('https://Exim.Tranzol.com/api/OwnerApi/CreateDriver',{
      method:'POST',
      headers:{
        'Authorization':`Basic ${apiTokenReceived}`,
      },body:formData,
    })
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
            const successMessage = `✅ Driver Registration Successful! 🎉\n\n👨‍✈️ Name: ${name}\n🪪 DL No: ${dlNumber}\n📞 Contact: ${primaryContact}`;

    navigation.navigate('success', { message: successMessage });
        } else if (data.apiResult.Result === null) {
          if (
            data.apiResult.Error.includes(
            "Violation of UNIQUE KEY constraint 'Driver_Dl'.")
          ) {
            const errorMessage = 'Driver license is already exists.';
            setErrorMessage(errorMessage);
            setShowAlert(true);
          } else {
              setErrorMessage(data.apiResult.Error);
            setShowAlert(true);
            console.log('logged', data.apiResult);
          }
        } else {
          setErrorMessage(data.apiResult.Error);
            setShowAlert(true);
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
    // navigation.navigate('Driver');
  };

  // Verification code=======================================================================

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

  const [DriverFrontImage, setDriverFrontImage] = useState(null);
  const [DriverLeftImage, setDriverLeftImage] = useState(null);
  const [DriverRightImage, setDriverRightImage] = useState(null);
  const [DLPhoto, setDLPhoto] = useState(null);
  const [adharFront, setAdharFront] = useState(null);
  const [adharBack, setAdharBack] = useState(null);
  const [panPhoto, setPanPhoto] = useState(null);

  const handleSaveImageData1 = image => {
    //console.log('Selected Image Data:', image);
    setDriverLeftImage(image);
  };
  const handleSaveImageData2 = image => {
    //console.log('Selected Image Data:', image);
    setDriverFrontImage(image);
  };
  const handleSaveImageData3 = image => {
    //console.log('Selected Image Data:', image);
    setDriverRightImage(image);
  };

  const handleAdharFront = image => {
    //console.log('Selected Image Data:', image);
    setAdharFront(image);
  };
  const handleAdharBack = image => {
    setAdharBack(image);
  };
  const handlePan = image => {
    setPanPhoto(image);
  };
  const handleDL = image => {
    setDLPhoto(image);
  };
const openDialScreen = async (number) => {
  console.log('phone', number);

  // Validate 10-digit number
  if (!number || !/^\d{10}$/.test(number)) {
  //  Alert.alert();
    setErrorMessage('Invalid Number Please enter a valid 10-digit phone number.');
      setShowAlert(true);
    return;
  }

  // Format the dial URL depending on the platform
  const dialURL = Platform.OS === 'ios' ? `telprompt:${number}` : `tel:${number}`;

  try {
    const canOpen = await Linking.canOpenURL(dialURL);
    if (canOpen) {
      await Linking.openURL(dialURL);
    } else {
      Alert.alert('Error', 'Dialer not supported on this device.');
    }
  } catch (error) {
    console.error('Dialer Error:', error);
    Alert.alert('Error', 'Something went wrong while trying to open the dialer.');
  }
};

  const handleOtpSubmit1 = enteredOtp => {
    console.log('OTP to send to server:', enteredOtp);
    if (enteredOtp === otp1) {
      // OTP matched ✅
      setprimaryOTPUI(false);
      setPverified(true);

      Toast.show({
        type: 'success',
        text1: 'PrimaryContact OTP Verified Successfully',
        text2: `For ${secondaryContact}`,
        visibilityTime: 3000,
        position: 'top',
      });
    } else {
      // OTP did not match ❌
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter the correct OTP',
        visibilityTime: 3000,
        position: 'top',
      });
    }
  };
  const handleOtpSubmit2 = enteredOtp => {
    if (enteredOtp === otp2) {
      // OTP matched ✅
      setSecondaryOTPUI(false);
      setSverified(true);

      Toast.show({
        type: 'success',
        text1: ' Secondary Contact OTP Verified Successfully',
        text2: `For ${secondaryContact}`,
        visibilityTime: 3000,
        position: 'top',
      });
    } else {
      // OTP did not match ❌
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter the correct OTP',
        visibilityTime: 3000,
        position: 'top',
      });
    }
  };

  const HandldeSendOTP1 = async () => {
    if (!primaryContact || !/^\d{10}$/.test(primaryContact)) {
      setErrorMessage('Please enter a valid primary contact (10 digits)');
      setShowAlert(true);
      return;
    }

    try {
      setIsOtp1Loading(true);
      const generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();

      setOtp1(generatedOTP);

      const message = `Your OTP is ${generatedOTP} - CIYA Technologies`;
      const encodedMessage = encodeURIComponent(message); // Properly encoded
      const apiUrl = `https://bhashsms.com/api/sendmsg.php?user=Anil003&pass=123456&sender=TRNZOL&phone=${secondaryContact}&text=${encodedMessage}&priority=ndnd&stype=normal`;

      const response = await fetch(apiUrl);
      const resultText = await response.text();
      console.log('SMS API response:', resultText);

      setprimaryOTPUI(true);
      Toast.show({
        type: 'success',
        text1: 'OTP Sent Successfully',
        text2: `OTP sent to ${secondaryContact}`,
        visibilityTime: 3000,
        position: 'top',
      });
    } catch (error) {
      console.log('OTP send error:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to send OTP',
        text2: 'Please try again later.',
      });
    } finally {
      setIsOtp1Loading(false);
    }
  };

  const HadleSendOTP2 = async () => {
    if (!secondaryContact || !/^\d{10}$/.test(secondaryContact)) {
      setErrorMessage('Please enter a valid secondary contact (10 digits)');
      setShowAlert(true);
      return;
    }

    try {
      setIsOtp2Loading(true);
      const generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();

      setOtp2(generatedOTP);

      const message = `Your OTP is ${generatedOTP} - CIYA Technologies`;
      const encodedMessage = encodeURIComponent(message); // Properly encoded
      const apiUrl = `https://bhashsms.com/api/sendmsg.php?user=Anil003&pass=123456&sender=TRNZOL&phone=${secondaryContact}&text=${encodedMessage}&priority=ndnd&stype=normal`;

      const response = await fetch(apiUrl);
      const resultText = await response.text();
      console.log('SMS API response:', resultText);

      setSecondaryOTPUI(true);
      Toast.show({
        type: 'success',
        text1: 'OTP Sent Successfully',
        text2: `OTP sent to ${secondaryContact}`,
        visibilityTime: 3000,
        position: 'top',
      });
    } catch (error) {
      console.log('OTP send error:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to send OTP',
        text2: 'Please try again later.',
      });
    } finally {
      setIsOtp2Loading(false);
    }
  };

  useEffect(() => {
    const fetchDLDetails = async () => {
      setIsDLSearching(true);
      const url = `https://Exim.Tranzol.com/api/OwnerApi/GetVerifyDriver?licenseNo=${dlNumber}
  22${selectedStartDate}`;
      console.log(url);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${apiTokenReceived}`,
          },
        });

        const data = await response.json();
         console.log(data);
        setCalendarVisible(false);
        if (data?.apiResult?.Result) {
          const Details = data.apiResult.Result;
          setName(Details.DriverName);
          setValidTill(Details.ValidTill);
          setCode(Details.Code);
          setCommercial(Details.Commercial);
        } else {
          Alert.alert(
            'Error',
            'Did Not Find Verification Data for This DL NO. Please Check Details',
          );
        }
      } catch (err) {
        Alert.alert('Error', 'Error Fetching DL Verification');
      } finally {
        setIsDLSearching(false);
      }
    };

    // Only call the API when both values are available
    if (dlNumber && selectedStartDate) {
      fetchDLDetails();
    }
  }, [dlNumber, selectedStartDate]);

  const [currentPage, setCurrentPage] = useState(1);
  const bgcolor2 = currentPage === 1 ? 'grey' : 'limegreen';
  return (
    <>
      {isDLSearching ? (
        <Searching />
      ) : (
        <ScrollView style={{backgroundColor: '#edeef2'}}>
          {IsLoading ? (
            <LoadingIndicator/>
          ) : (
            <View style={styles.container}>
              <View style={styles.imgContainer}>
                <Image
                  style={styles.img}
                  source={require('../assets/driver.png')}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderColor: 'limegreen',
                    borderWidth: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {currentPage === 1 && (
                    <Text
                      style={{color: 'gray', fontWeight: 'bold', fontSize: 35}}>
                      1
                    </Text>
                  )}
                  {currentPage === 2 && (
                    <Image
                      style={{width: 50, height: 50}}
                      source={require('../assets/check-mark.png')}
                    />
                  )}
                </View>
                <View
                  style={{
                    width: 60,
                    height: 8,
                    backgroundColor: bgcolor2,
                  }}></View>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderColor: bgcolor2,
                    borderWidth: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: 'gray', fontWeight: 'bold', fontSize: 35}}>
                    2
                  </Text>
                </View>
              </View>
              {currentPage === 1 && (
                <>
                  <DLCard
                    dlno={dlNumber}                    DOB={selectedStartDate}
                    name={name}
                    ValidTill={ValidTill}
                    Commercial={Commercial}
                    Code={Code}
                  />

                  <View style={styles.levelContainer}>
                    <Text
                      style={{
                        color: darkBlue,
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
                    {/* <CustomInput
              labelText="DL Number"
              placeholdername="Enter DL Number"
              onChangeText={text => setdlNumber(text)}
              hasBorder={hasBorder}
              width="85%"
              isVerified={isVerified}
              isMandatory={true}
              value={dlNumber}
            /> */}
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

                      <TouchableOpacity
                        onPress={() => setCalendarVisible(true)}>
                        <Image
                          style={styles.rightIcon}
                          source={require('../assets/calendar.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    {/* <CustomInput
              labelText="Name"
              placeholdername="Enter Driver Name"
              onChangeText={text => setName(text)}
              hasBorder={hasBorder}
              isMandatory={true}
            /> */}

                    <CustomInput
                      labelText="Aadhar Number"
                      placeholdername="Enter Aadhar Number"
                      onChangeText={text => setAdharNumber(text)}
                      hasBorder={hasBorder}
                      stringlength={12}
                      keyboardTypename="numeric"
                      isMandatory={true}
                      value={adharNumber}
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        gap: -5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CustomInput
                        labelText="Primary Contact Number"
                        placeholdername="Enter Mobile No."
                        onChangeText={text => setPrimaryContact(text)}
                        hasBorder={hasBorder}
                        stringlength={10}
                        keyboardTypename="numeric"
                        isMandatory={true}
                        isIcon={true}
                        value={primaryContact}
                      />
                      <TouchableOpacity
                        style={{position: 'absolute', right: 95, top: 20}}
                        onPress={() => openDialScreen(primaryContact)}>
                        <Image
                          style={{width: 35, height: 35, marginTop: 22}}
                          source={require('../assets/phonecall.png')}
                        />
                      </TouchableOpacity>
                      {Pverified ? (
                        <Image
                          source={require('../assets/check-mark.png')}
                          style={{width: 50, height: 50, marginTop: 20}}
                        />
                      ) : (
                        <TouchableOpacity
                          style={{
                            width: 70,
                            height: 50,
                            backgroundColor: primaryOTPUI ? 'gray' : darkBlue,
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 4,
                            borderRadius: 10,
                            marginTop: 35,
                          }}
                          onPress={HandldeSendOTP1}
                          disabled={primaryOTPUI}>
                          {isOTP1loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 12,
                              }}>
                              GET OTP
                            </Text>
                          )}
                          {/* <Text style={{color:'white',fontWeight:'bold',fontSize:12}}>OTP</Text> */}
                        </TouchableOpacity>
                      )}
                    </View>
                    {primaryOTPUI && (
                      <CustomOTPVerify
                        onVerify={handleOtpSubmit1}
                        onResend={HandldeSendOTP1}
                      />
                    )}
                    <CustomCheckbox
                      label="I Call and Verify the Primary No."
                      value={isPCVerified}
                      onChange={value => setPCVerified(value ? true : false)}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: -5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CustomInput
                        labelText="Secondary Contact Number"
                        placeholdername="Enter Mobile No"
                        onChangeText={text => setSecondaryContact(text)}
                        stringlength={10}
                        keyboardTypename="numeric"
                        isIcon={true}
                        value={secondaryContact}
                      />

                      <TouchableOpacity
                        style={{position: 'absolute', right: 95, top: 20}}
                        onPress={() => openDialScreen(primaryContact)}>
                        <Image
                          style={{width: 35, height: 35, marginTop: 22}}
                          source={require('../assets/phonecall.png')}
                        />
                      </TouchableOpacity>
                      {Sverified ? (
                        <Image
                          source={require('../assets/check-mark.png')}
                          style={{width: 50, height: 50, marginTop: 20}}
                        />
                      ) : (
                        <TouchableOpacity
                          style={{
                            width: 70,
                            height: 50,
                            backgroundColor: secondaryOTPUI ? 'grey' : darkBlue,
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 4,
                            borderRadius: 10,
                            marginTop: 35,
                          }}
                          onPress={HadleSendOTP2}
                          disabled={secondaryOTPUI}>
                          {isOTP2loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 12,
                              }}>
                              GET OTP
                            </Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </View>

                    {secondaryOTPUI && (
                      <CustomOTPVerify
                        onVerify={handleOtpSubmit2}
                        onResend={HadleSendOTP2}
                      />
                    )}
                    <CustomCheckbox
                      label="I Call and Verify the Secondary No."
                      value={isSCVerified}
                      onChange={value => setSCVerified(value ? true : false)}
                    />
                    <CustomInput
                      labelText="Pan Number"
                      placeholdername="Enter Pan Number"
                      onChangeText={text => setPanNo(text)}
                      autoCapitalize={'charters'}
                      stringlength={10}
                      value={PanNo}
                    />

                    <CustomInput
                      labelText="Email Address"
                      placeholdername="Enter Email Id"
                      onChangeText={text => setEmail(text)}
                      value={email}
                    />
                    {/* <CustomInput
              labelText="Driver Address"
              placeholdername="Enter Driver Address"
              onChangeText={text => setdriverAddress(text)}
              isend="true"
              isaddress={true}
            /> */}

                    <CustomCheckbox
                      label="Same As Permanent Address"
                      value={isSamePAdd}
                      onChange={value => setIsSamePAdd(value ? true : false)}
                    />
                    <CustomInput
                      value={currentAdd}
                      labelText="Current Address"
                      placeholdername="Enter Driver Address"
                      onChangeText={text => setCurrentAdd(text)}
                      isend="true"
                      isaddress={true}
                    />
                  </View>
                </>
              )}
              {currentPage === 2 && (
                <View
                  style={[
                    styles.levelContainer,
                    {
                      alignItems: 'center',
                      paddingVertical: 30,
                      paddingHorizontal: 20,
                    },
                  ]}>
                  <Text
                    style={{
                      color: darkBlue,
                      fontSize: 18,
                      marginBottom: 10,
                      marginTop: 20,
                      textAlign: 'center',
                      fontFamily: 'PoppinsBold',
                    }}>
                    Attachments
                  </Text>

                  <ScrollView
                    horizontal={true}
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      gap: 10,

                    }}>
                    {/* <CustomImagePicker
                      width={80}
                      bgImage={require('../assets/leftphoto.jpg')}
                      onlyCamera={true}
                      title="Driver Photo Left"
                      iconName="camera-enhance"
                      onImagePicked={handleSaveImageData1}
                      imageData={DriverLeftImage}
                    /> */}
                    <CustomImagePicker
                      width={80}
                      isMandatory={true}
                      bgImage={require('../assets/frontphoto.png')}
                      onlyCamera={true}
                      title="Driver Photo Front"
                      iconName="camera-enhance"
                      onImagePicked={handleSaveImageData2}
                      imageData={DriverFrontImage}
                    />
                    {/* <CustomImagePicker
                      width={80}
                      bgImage={require('../assets/rigntphoto.jpg')}
                      onlyCamera={true}
                      title="Driver Photo Right"
                      iconName="camera-enhance"
                      onImagePicked={handleSaveImageData3}
                      imageData={DriverRightImage}
                    /> */}
                  </ScrollView>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomImagePicker
                      bgImage={require('../assets/aadhaar.png')}
                      title="Driver Adhar Front"
                      iconName="camera-enhance"
                      onImagePicked={handleAdharFront}
                      imageData={adharFront}
                    />
                    <CustomImagePicker
                      bgImage={require('../assets/adhar_BACK.png')}
                      title="Driver Adhar Back"
                      iconName="camera-enhance"
                      imageData={adharBack}
                      onImagePicked={handleAdharBack}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomImagePicker
                      bgImage={require('../assets/dlpng.webp')}
                      title="Driving Lincence Front"
                      iconName="camera-enhance"
                      onImagePicked={handleDL}
                      imageData={DLPhoto}
                      isMandatory={true}
                    />

                    <CustomImagePicker
                      bgImage={require('../assets/pan-card.png')}
                      title="Driver PAN Card Front"
                      iconName="camera-enhance"
                      onImagePicked={handlePan}
                      imageData={panPhoto}
                    />
                  </View>
                </View>
              )}

              {/* <TouchableOpacity style={styles.button} onPress={registertheDriver}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity> */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {currentPage > 1 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 50,
                    }}>
                    <TouchableOpacity
                      style={styles.navButton}
                      onPress={() => setCurrentPage(currentPage - 1)}>
                      <Text style={styles.navtext}>Previous</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.navButton}
                      onPress={registertheDriver}>
                      <Text style={styles.navtext}>Register</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {currentPage < 2 && (
                  <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setCurrentPage(currentPage + 1)}>
                    <Text style={styles.navtext}>Next</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          {/* custom alert code==================================== */}
          <CustomAlert
            visible={showAlert}
            message={errorMessage}
            onClose={closeAlert}
          />

          <Modal
            transparent={true}
            animationType="fade"
            visible={calendarVisible}>
            {calendarVisible && (
              <View style={[styles.modalContainer]}>
                <View style={styles.alertContainer}>
                  <CalendarPicker
                    onDateChange={onDateChange}
                    selectedDayColor="#ffffff"
                    todayBackgroundColor="#9894e6"
                    selectedDayTextColor="#453D98ff"
                    height={400}
                    width={Width * 0.9}
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
      )}
    </>
  );
};
const DLCard = ({
  driver,
  name,
  dlno,
  ValidTill,
  DOB,
  Commercial,
  convselectedStartDate,
  Code,
}) => {
  function convertDateFormat(inputDate) {
    const [year, month, day] = inputDate.split('T')[0].split('-');
    return `${day}-${month}-${year}`;
  }
  function convertDateFormat(inputDate) {
    const [year, month, day] = inputDate.split('T')[0].split('-');
    return `${day}-${month}-${year}`;
  }
  const dob = driver?.Dob ? driver.Dob : '';

  let formattedDate;
  if (dob) {
    formattedDate = convertDateFormat(dob);
  } else {
    formattedDate = ''; // Or any other appropriate message or action
  }
  return (
    <ImageBackground
      source={require('../assets/DL.png')} // replace with your background image
      style={styles.dlCard}
      imageStyle={{borderRadius: 10}} // optional: applies rounded corners to the background
    >
      <View style={styles.dlCardHeader}></View>
      <Text
        style={[
          styles.dlText,
          {position: 'absolute', top: 28, left: 70, fontSize: 16},
        ]}>
        {dlno ? dlno : ''}
      </Text>

      <View style={styles.dlDetails}>
        <Text
          style={[
            styles.dlText,
            {position: 'absolute', top: 54, left: 140, fontSize: 13},
          ]}>
          {' '}
          {ValidTill ? ValidTill : '-'}
        </Text>
        <Text
          style={[
            styles.dlText,
            {position: 'absolute', top: 85, left: 73, fontSize: 12},
          ]}>
          {' '}
          {DOB ? DOB : '-'}
        </Text>
        {/* <Text style={styles.dlText}>{driver.PrimaryContactNo}</Text> */}
        <Text
          style={[
            styles.dlText,
            {position: 'absolute', bottom: 24, left: 10, fontSize: 15},
          ]}>
          {name ? name : ''}
        </Text>
        {Code && (
          <Text
            style={[
              styles.dlText,
              {
                position: 'absolute',
                bottom: 20,
                left: 195,
                fontSize: 11,
              },
            ]}>
            Code:{' '}
            <Text style={{color: Code === 'VERIFIED' ? 'green' : 'red'}}>
              {Code ? Code : ''}
            </Text>
          </Text>
        )}

        {Commercial && (
          <Text
            style={[
              styles.dlText,
              {
                position: 'absolute',
                bottom: 8,
                left: 195,
                fontSize: 11,
              },
            ]}>
            Commercial:{' '}
            <Text style={{color: Commercial === 'YES' ? 'green' : 'red'}}>
              {Commercial ? Commercial : ''}
            </Text>
          </Text>
        )}

        {/* <Image source={require('../assets/driver.png')} style={[styles.dlPhoto,{position:'absolute',right:-10,top:35}]} /> */}
      </View>
    </ImageBackground>
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
  dlCard: {
    height: 200,
    width: 320,
    borderRadius: 10,
    margin: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },
  dlCardHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  dlCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  dlCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dlPhoto: {
    height: 70,
    width: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  dlDetails: {
    flex: 1,
  },
  dlText: {
    fontSize: 14,
    color: darkBlue,
    marginBottom: 4,
    fontWeight: 'bold',
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
  navButton: {
    width: 120,
    height: 50,
    backgroundColor: darkBlue,
    elevation: 4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  navtext: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: inputbgColor,
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

export default RegisterDriver;
