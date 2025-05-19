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
  Alert,ImageBackground
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
import {darkBlue, Width} from '../components/constant';
import CustomOTPVerify from '../components/CustomOTPVerify';
import CustomCheckbox from '../components/CustomeCheckBox';
import SmsSending from '../components/SmsSending';
const RegisterDriver = () => {
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

  const [capturedPhoto1, setCapturedPhoto1] = useState(null);
  const [capturedPhoto2, setCapturedPhoto2] = useState(null);
  const [capturedPhoto3, setCapturedPhoto3] = useState(null);
  const [DLPhoto, setDLPhoto] = useState(null);
  const [AdharFPhoto, setAdharFPhoto] = useState(null);
  const [AdharBPhoto, setAdharBPhoto] = useState(null);
  const [PanPhoto, setPanPhotot] = useState(null);
  const [Pverified, setPverified] = useState(false);
  const [Sverified, setSverified] = useState(false);
  const [isSamePAdd, setIsSamePAdd] =useState(false);
  const [currentAdd, setCurrentAdd] = useState('');

  const [isPCVerified,setPCVerified]=useState(false);
  const [isSCVerified,setSCVerified]=useState(false);

  const [primaryOTPUI, setprimaryOTPUI] = useState(false);
  const [secondaryOTPUI, setSecondaryOTPUI] = useState(false);

 useEffect(() => {
  if (isSamePAdd) {
    setCurrentAdd(driverAddress); // Copy if checked
  } else {
    setCurrentAdd(''); // Clear if unchecked
  }
}, [isSamePAdd, driverAddress]);

  const validation = () => {
    const cleanDL = dlNumber.replace(/[\s-]/g, ''); // assuming dlNumber is your state variable
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const regex = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const adharRegex = /^\d{12}$/;
    if (
      !(cleanDL.length === 15 || cleanDL.length === 16) ||
      !regex.test(cleanDL)
    ) {
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
    if (email && !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setShowAlert(true);
      return false;
    }

    // If valid
    return true;
  };

  const registertheDriver = () => {
    if (!validation()) return;
    // setIsLoading(true);
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
    console.log('data', postData);
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
    // navigation.navigate('Driver');
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

  const [adharFront,setAdharFront]=useState(null);
  const [adharBack,setAdharBack]=useState(null);
  const [panPhoto,setPanPhoto]=useState(null);
  const [dlPhoto,setdlPhoto]=useState(null);
  const handleSaveImageData1 = image => {
    //console.log('Selected Image Data:', image);
    setCapturedPhoto1(image);
  };
  const handleSaveImageData2 = image => {
    //console.log('Selected Image Data:', image);
    setCapturedPhoto2(image);
  };
  const handleSaveImageData3 = image => {
    //console.log('Selected Image Data:', image);
    setCapturedPhoto3(image);
  };

  const handleAdharFront = image => {
    //console.log('Selected Image Data:', image);
    setAdharFront(image);
  };
  const handleAdharBack=image=>{
    setAdharBack(image)
  }
  const handlePan= image=>{
    setPanPhoto(image)
  }
  const handleDL=image=>{
    setDLPhoto(image)
  }
  const openDialScreen = number => {
    console.log('phone', number);
    if (!primaryContact || !/^\d{10}$/.test(number)) {
      setErrorMessage('Please enter a valid primary contact (10 digits)');
      setShowAlert(true);
      return false;
    }

    if (Platform.OS === 'ios') {
      number = `telprompt:${number}`;
    } else {
      number = `tel:${number}`;
    }
    Linking.openURL(number);
  };
const [otp2,setOtp2]=useState(null);
  const handleOtpSubmit1 = otp => {
    console.log('OTP to send to server:', otp);
    // ✅ Now send this OTP to your backend
    setprimaryOTPUI(true);
  };
 const handleOtpSubmit2 = (enteredOtp) => {
  if (enteredOtp === otp2) {
    // OTP matched ✅
    setSecondaryOTPUI(false);
    setSverified(true);

    Toast.show({
      type: 'success',
      text1: 'OTP Verified Successfully',
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


  const handleOTP1 = async () => {
    if (!primaryContact || !/^\d{10}$/.test(primaryContact)) {
      setErrorMessage('Please enter a valid primary contact (10 digits)');
      setShowAlert(true);
      return;
    }

    const payload = {
      PhoneNumber: primaryContact,
      Username: userName || 'Abhijit Pradhan', // fallback
    };

    try {
      const response = await fetch(
        'http://visa4health.tranzol.com/api/CodeLogin/SendOtp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (data && data.PhoneNumber === primaryContact) {
        setprimaryOTPUI(true);

        Toast.show({
          type: 'success',
          text1: 'OTP Sent Successfully',
          text2: `OTP sent to ${primaryContact}`,
          visibilityTime: 3000,
          position: 'top',
        });
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      console.log('OTP send error:', error);
      setErrorMessage('Failed to send OTP. Please try again.');
      setShowAlert(true);
    }

    try {
      setprimaryOTPUI(true);
    } catch (error) {
      console.log(error);
    }
  };
const [isOTP2loading,setIsOtp2Loading]=useState(false);
 const handleOTP2 = async () => {
  if (!secondaryContact || !/^\d{10}$/.test(secondaryContact)) {
    setErrorMessage('Please enter a valid secondary contact (10 digits)');
    setShowAlert(true);
    return;
  }

  try {
    // 1. Generate 6-digit OTP
    setIsOtp2Loading(true);
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('generated otp 2',generatedOTP, secondaryContact)
    setOtp2(generatedOTP); // Store in state

    // 2. Prepare API URL
    const baseUrl = 'https://bhashsms.com/api/sendmsg.php';
    const params = new URLSearchParams({
      user: 'Anil003',
      pass: '123456',
      sender: 'TRNZOL',
      phone: secondaryContact,
      text: `Your OTP is ${generatedOTP}`,
      priority: 'ndnd',
      stype: 'normal',
    });

    const apiUrl = `${baseUrl}?${params.toString()}`;

    // 3. Call SMS API using fetch
    const response = await fetch(apiUrl);
    const resultText = await response.text(); // BhashSMS returns plain text

    // You can optionally log or check `resultText` to verify delivery
    console.log('SMS API response:', resultText);

    // 4. Show success toast
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
  }finally{
    setIsOtp2Loading(false);
  }
};

const [currentPage, setCurrentPage] = useState(1);
const bgcolor2 = currentPage===1 ? 'grey' : 'limegreen';
  return (
     <>
    {isOTP2loading ? (
      <SmsSending />
    ) : (
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
           <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:20}}>
                <View style={{width:80,height:80,borderRadius:40,
                  borderColor:'limegreen',borderWidth:8,
                  justifyContent:'center',alignItems:'center'
                }}>
          {currentPage===1 &&<Text style={{color:'gray',fontWeight:'bold',fontSize:35}}>1</Text>}
          {currentPage===2 && <Image style={{width:50,height:50}} source={require('../assets/check-mark.png')}/>}
                </View>
                <View style={{width:60,height:8,backgroundColor:bgcolor2}}>
               
                </View>
                <View style={{width:80,height:80,borderRadius:40,
                  borderColor:bgcolor2,borderWidth:8,
                  justifyContent:'center',alignItems:'center'
                }}>
          <Text style={{color:'gray',fontWeight:'bold',fontSize:35}}>2</Text>
                </View>
                </View>
          {currentPage === 1 && (
            <>
            
            <DLCard/>
          
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
                placeholdername="Enter Mobile N0."
                onChangeText={text => setPrimaryContact(text)}
                hasBorder={hasBorder}
                stringlength={10}
                keyboardTypename="numeric"
                isMandatory={true}
                isIcon={true}
              />
              <TouchableOpacity
                style={{position: 'absolute', right: 95, top: 20}}
                onPress={() => openDialScreen(primaryContact)}>
                <Image
                  style={{width: 35, height: 35, marginTop: 22}}
                  source={require('../assets/phonecall.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 70,
                  height: 50,
                  backgroundColor: darkBlue,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 4,
                  borderRadius: 10,
                  marginTop: 35,
                }}
                onPress={handleOTP1}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>
                  GET OTP
                </Text>
                {/* <Text style={{color:'white',fontWeight:'bold',fontSize:12}}>OTP</Text> */}
              </TouchableOpacity>
            </View>
            {primaryOTPUI && <CustomOTPVerify onVerify={handleOtpSubmit1} />}
            <CustomCheckbox label="I Call and Verify the Primary No." value={isPCVerified} onChange={(value) => setPCVerified(value ? true : false)} />
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
  <Image source={require('../assets/check-mark.png')} style={{width:50,height:50,marginTop:20}} />
) : (<TouchableOpacity
  style={{
    width: 70,
    height: 50,
    backgroundColor:secondaryOTPUI?'grey': darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 10,
    marginTop: 35,
  }}
  onPress={handleOTP2}
  disabled={secondaryOTPUI}
>
  {isOTP2loading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
      GET OTP
    </Text>
  )}
</TouchableOpacity>
)}

             
            </View>
           
            {secondaryOTPUI && <CustomOTPVerify onVerify={handleOtpSubmit2}  onResend={handleOTP2}/>}
              <CustomCheckbox label="I Call and Verify the Secondary No." value={isSCVerified} onChange={(value) => setSCVerified(value ? true : false)} />
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
            {/* <CustomInput
              labelText="Driver Address"
              placeholdername="Enter Driver Address"
              onChangeText={text => setdriverAddress(text)}
              isend="true"
              isaddress={true}
            /> */}
            
          <CustomCheckbox label="Same As Permanent Address" value={isSamePAdd} onChange={(value) => setIsSamePAdd(value ? true : false)} />
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
          <View style={[styles.levelContainer, {alignItems: 'center',paddingVertical:30,paddingHorizontal:20}]}>
            <Text
              style={{
                color: '#453D98ff',
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
                width: Width * 1,
              }}>
              <CustomImagePicker
                width={80}
                bgImage={require('../assets/leftphoto.jpg')}
                onlyCamera={true}
                title="Driver Photo Left"
                iconName="camera-enhance"
                onImagePicked={handleSaveImageData1}
                 imageData={capturedPhoto1}
              />
              <CustomImagePicker
                width={80}
                bgImage={require('../assets/frontphoto.png')}
                onlyCamera={true}
                title="Driver Photo Front"
                iconName="camera-enhance"
                onImagePicked={handleSaveImageData2}
                 imageData={capturedPhoto2}
              />
              <CustomImagePicker
                width={80}
                bgImage={require('../assets/rigntphoto.jpg')}
                onlyCamera={true}
                title="Driver Photo Right"
                iconName="camera-enhance"
                onImagePicked={handleSaveImageData3}
                imageData={capturedPhoto3}
              />
            </ScrollView>
         
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <CustomImagePicker
                bgImage={require('../assets/aadhaar.png')}
                title="Driver Adhar Front"
                iconName="camera-enhance"
                onImagePicked={handleAdharFront}
                imageData={adharFront}
              />
              <CustomImagePicker
                bgImage={require('../assets/aadhaar.png')}
                title="Driver Adhar Back"
                iconName="camera-enhance"
                imageData={adharBack}
                onImagePicked={handleAdharBack}
              />
            </View>
            
               <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
               <CustomImagePicker
              bgImage={require('../assets/dlpng.webp')}
              title="Driving Lincence Front"
              iconName="camera-enhance"
              onImagePicked={handleDL}
              imageData={DLPhoto}
            />

            <CustomImagePicker
              bgImage={require('../assets/pan-card.png')}
              title="Driver PAN Card Front"
              iconName="camera-enhance"
              onImagePicked={handlePan}
              imageData={panPhoto}
            />
            </View>
          </View>)}

          {/* <TouchableOpacity style={styles.button} onPress={registertheDriver}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity> */}
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {currentPage > 1 && (
              <View style={{flexDirection:'row',justifyContent:'space-between',gap:50}}>
            <TouchableOpacity style={styles.navButton} onPress={() => setCurrentPage(currentPage - 1)}>
              <Text style={styles.navtext}>Previous</Text>
            </TouchableOpacity>
             
              <TouchableOpacity style={styles.navButton} onPress={registertheDriver}>
            <Text style={styles.navtext}>Register</Text>
          </TouchableOpacity>
          </View>
          )}
          {currentPage < 2 && (
          
            <TouchableOpacity style={styles.navButton} onPress={() => setCurrentPage(currentPage + 1)}>
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

      <Modal transparent={true} animationType="fade" visible={calendarVisible}>
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
    </ScrollView>)}
    </>
  );
};
const DLCard = ({driver}) => {
    function convertDateFormat(inputDate) {
    const [year, month, day] = inputDate.split('T')[0].split('-');
    return `${day}-${month}-${year}`;
  }
  function convertDateFormat(inputDate) {
    const [year, month, day] = inputDate.split('T')[0].split('-');
    return `${day}-${month}-${year}`;
  }
  const dob = driver?.Dob?driver.Dob:'';

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
  imageStyle={{ borderRadius: 10, }} // optional: applies rounded corners to the background
>
    
      <View style={styles.dlCardHeader}>
       
      </View>
      <Text style={[styles.dlText,{position:'absolute',top:25,left:70,fontWeight:'bold'}]}>TEST 123456789</Text>
     
       
        <View style={styles.dlDetails}>
        
          
          <Text style={[styles.dlText,{position:'absolute',top:85,left:70,fontSize:10}]}> {formattedDate ? formattedDate : '-'}</Text>
          {/* <Text style={styles.dlText}>{driver.PrimaryContactNo}</Text> */}
            <Text style={[styles.dlText,{position:'absolute',bottom:22,left:10,fontSize:11}]}>Driver Name</Text>
       
        
         <Image source={require('../assets/driver.png')} style={[styles.dlPhoto,{position:'absolute',right:-10,top:35}]} />
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
height:200,
width:320,
backgroundColor:'red',
  borderRadius: 10,
  margin: 16,
  padding: 12,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
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
  color: '#000',
  marginBottom: 4,
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
  navButton:{
    width:120,height:50,backgroundColor:darkBlue,elevation:4,borderRadius:10,
    justifyContent:'center',alignItems:'center',marginBottom:10
  },
  navtext:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
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
