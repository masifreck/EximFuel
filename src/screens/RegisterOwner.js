import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Button,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
// import {ScrollView} from 'react-native-gesture-handler';
import CustomAlert from '../components/CustomAlert';
import {useNavigation} from '@react-navigation/native';
import useApiToken from '../components/Token';
import LoadingIndicator from '../components/LoadingIndicator';
import CalendarModal from '../components/Calander';
import CustomInput from '../components/CustomInput';
import CustomDropbox from '../components/CustomDropbox';
import {CustomRequestOptions} from '../components/CustomRequestOptions';
import CustomImagePicker from '../components/CustomeImagePicker';
// import CustomRequestOptions from '../components/CustomRequestOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCheckbox from '../components/CustomeCheckBox';
import CustomOTPVerify from '../components/CustomOTPVerify';
import Toast from 'react-native-toast-message';
import {darkBlue} from '../components/constant';
const RegisterOwner = () => {
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

  // calander==================
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); //27/02/2024
  const [ConvSelectedStartDate, setConvSelectedStartDate] = useState(null); //2024-02-29
  // ===========================================
  const data3 = [
    {label: 'Individual', value: '1'},
    {label: 'Other than Individual/HUF', value: '2'},
  ];
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [panno, setpanno] = useState('');
  const [name, setName] = useState('');
  const [adharNumber, setAdharNumber] = useState('');
  const [partytype, setpartytype] = useState('');
  const [primaryContact, setPrimaryContact] = useState('');
  const [secondaryContact, setSecondaryContact] = useState('');
  const [email, setEmail] = useState('');
  const [ownerAddress, setownerAddress] = useState('');
  const [acnumber, setacnumber] = useState('');
  const [bankname, setbankname] = useState('');
  const [actype, setactype] = useState('');
  const [IfscCode, setIfscCode] = useState('');
  const [TotalVehicles, setTotalVehicles] = useState(0);
  const [ShortageRecovery, setShortageRecovery] = useState(0);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [hasBorder, setHasBorder] = useState(false); // State for border

  const [adharFront, setAdharFront] = useState(null);
  const [adharBack, setAdharBack] = useState(null);
  const [PanPhotot, setPanPhoto] = useState(null);
  const [passPhoto, setPassPhototo] = useState(null);

  const [bankName, setBankName] = useState('');
  const [bankData, setBankData] = useState([]);
  const [serachBank, setSearchBank] = useState('');

  const [acType, setACType] = useState('');
  const [acTypeData, setAcTypeData] = useState([]);
  const [searchAcType, setSearchAcType] = useState('');
  const [isPCVerified, setPCVerified] = useState(false);
  const [isSCVerified, setSCVerified] = useState(false);

  const [primaryOTPUI, setprimaryOTPUI] = useState(false);
  const [secondaryOTPUI, setSecondaryOTPUI] = useState(false);

  const [Pverified, setPverified] = useState(false);
  const [Sverified, setSverified] = useState(false);
const [isOTP1VLoading,setIsOTP1VLoading]=useState(false);
const [isOTP2VLoading,setIsOTP2VLoading]=useState(false);
  const handleShowToast = () => {
    setHasBorder(true);
  };

  const [IsLoading, setIsLoading] = useState(false);
  const [is_everything_ok, setis_everything_ok] = useState(false);
  // fetching banking details====================================

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const [banksearch, setbanksearch] = useState('bank');

  // useEffect(() => {
  //   if (banksearch && apiTokenReceived !== null) {
  //     fetchData1();
  //   }
  //   if (apiTokenReceived !== null) {
  //     fetchData2();
  //   }
  // }, [banksearch, apiTokenReceived]);
  // useEffect(() => {
  //   console.log(data1, data2, 'data is here');
  //   if (data1.length === 0 || data2.length === 0) {
  //     setIsLoading(true);
  //   } else {
  //     setIsLoading(false);
  //     setis_everything_ok(true);
  //   }
  // }, [data1, data2]);
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (is_everything_ok === false) {
  //       // Redirect to home page if is_everything_ok is still false after 45 seconds
  //       console.log('Redirecting to home page...');
  //       setErrorMessage('Unexpected Error! Login Again');
  //       setShowAlert(true);
  //     }
  //   }, 45000); // 45 seconds in milliseconds

  //   return () => clearTimeout(timeoutId); // Clear the timeout when the component unmounts or when is_everything_ok changes
  // }, [is_everything_ok]);

  // ============================================================
  const validation = () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const adharRegex = /^\d{12}$/;
    if (!panRegex.test(panno)) {
      setErrorMessage('Please enter a valid PAN number (e.g., ABCDE1234F)');
      setShowAlert(true);
      return false;
    }
    if (!name) {
      setErrorMessage('Please enter Owner Name');
      setShowAlert(true);
      return false;
    }
    if (!ConvSelectedStartDate) {
      setErrorMessage('Please Choose the DOB');
      setShowAlert(true);
      return false;
    }
    if (!adharRegex.test(adharNumber)) {
      setErrorMessage('Please enter a valid 12-digit Aadhar number');
      setShowAlert(true);
      return false;
    }

    if (!partytype) {
      setErrorMessage('Please Choose TDS Type');
      setShowAlert(true);
      return false;
    }
    if (!primaryContact) {
      setErrorMessage('Please enter a valid primary contact');
      setShowAlert(true);
      return false;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setShowAlert(true);
      return false;
    }

    return true;
  };

  const registertheOwner = () => {
    if (!validation()) return;
    setIsLoading(true);
    const postData = {
      OwnerName: name,
      PanNo: panno,
      AdharNo: adharNumber,
      DobOwner: ConvSelectedStartDate,
      TdsTypeId: partytype,
      PrimaryMobileNo: primaryContact,
      SecondaryMobileNo: secondaryContact,
      Address: ownerAddress,
      EmailAddress: email,
      AccountNo: acnumber,
      BankId: bankName,
      AccountTypeId: acType,
      IFSCCode: IfscCode,
      TotalNoVehicle: TotalVehicles,
      ShortageRecovery: ShortageRecovery,
    };
    console.log('posted data==============', postData);
    const {url, requestOptions} = CustomRequestOptions(
      'https://Exim.Tranzol.com/api/OwnerApi/CreateOwner',
      apiTokenReceived,
      postData,
    );
    console.log(url, requestOptions);
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
        } else {
          if (
            data.apiResult.Error ===
            "Violation of UNIQUE KEY constraint 'owner_panNo'. Cannot insert duplicate key in object 'dbo.App_Owner'. The duplicate key value is (AAAAA1111A).\r\nThe statement has been terminated."
          ) {
            const errorMessage = 'Panno is already exists.';
            setErrorMessage(errorMessage);
            setShowAlert(true);
          } else {
            const errorMessage = data.apiResult.Error;
            setErrorMessage(errorMessage);
            setShowAlert(true);
            console.log('logged', data.apiResult);
          }
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
    //navigation.navigate('OwnerDetails');
  };

  // const handlePanChange = input => {
  //   const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  //   if (panRegex.test(input)) {
  //     setpanno(input.toUpperCase());
  //     setIsVerified(true);
  //     setpanno(input)
  //   } else {
  //     setIsVerified(false);
  //   }
  // };
  const handlePanChange = text => {
    const upperText = text.toUpperCase();
    setpanno(upperText); // assuming setPanno is your state setter
  };

  const handleAdharFront = useCallback(image => {
    setAdharFront(image);
  }, []);

  const handleAdharBack = useCallback(image => {
    setAdharBack(image);
  }, []);

  const handlePassbook = useCallback(image => {
    setPassPhototo(image);
  }, []);

  const handlePanCard = useCallback(image => {
    setPanPhoto(image);
  }, []);

  useEffect(() => {
    if (serachBank) {
      fetchBankName(serachBank);
    }
  }, [serachBank]);
  const fetchBankName = async search => {
    try {
      console.log('Fetching Association with search:', search);
      const encodedSearch = encodeURIComponent(search);
      const url = `https://Exim.Tranzol.com/api/OwnerApi/GetBankNameList?search=${encodedSearch}`;
      console.log('Request URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${apiTokenReceived}`, // assuming this token is defined correctly
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);

        if (data.apiResult && data.apiResult.Result) {
          const BankData = data.apiResult.Result.map(item => ({
            label: item.Name,
            value: item.Id,
          }));
          setBankData(BankData);
        } else {
          console.log('No bank results found.');
        }
      } else {
        console.log('Error in fetching bank data. Status:', response.status);
      }
    } catch (error) {
      console.log('Error in fetching bank data:', error);
    }
  };
  useEffect(() => {
    const fetchAcountType = async search => {
      try {
        console.log('Fetching Association with search:', search);
        const encodedSearch = encodeURIComponent(search);
        const url = `https://Exim.Tranzol.com/api/OwnerApi/GetBankAccountType?search=${encodedSearch}`;
        console.log('Request URL:', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${apiTokenReceived}`, // assuming this token is defined correctly
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);

          if (data.apiResult && data.apiResult.Result) {
            const Data = data.apiResult.Result.map(item => ({
              label: item.Type,
              value: item.Id,
            }));
            setAcTypeData(Data);
          } else {
            console.log('No bank results found.');
          }
        } else {
          console.log('Error in fetching bank data. Status:', response.status);
        }
      } catch (error) {
        console.log('Error in fetching bank data:', error);
      }
    };
    fetchAcountType(searchAcType);
  }, [searchAcType]);

  const handleImage = image => {
    setPanPhoto(image);
  };
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
  const [otp2, setOtp2] = useState(null);
  const handleOtpSubmit1 = otp => {
    console.log('OTP to send to server:', otp);
    // ✅ Now send this OTP to your backend
    setprimaryOTPUI(true);
  };
  const handleOtpSubmit2 = enteredOtp => {
    setIsOTP2VLoading(true)
    try{
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
    } }catch(err){
       Toast.show({
        type: 'error',
        text1: 'Invalid',
        text2: 'Function not working',
        visibilityTime: 3000,
        position: 'top',
      });
    }finally{
setIsOTP2VLoading(false);
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
  const [isOTP2loading, setIsOtp2Loading] = useState(false);
const handleOTP2 = async () => {
  if (!secondaryContact || !/^\d{10}$/.test(secondaryContact)) {
    setErrorMessage('Please enter a valid secondary contact (10 digits)');
    setShowAlert(true);
    return;
  }

  try {
    setIsOtp2Loading(true);
    const generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp2(generatedOTP);
console.log('s otp',generatedOTP)
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

  return (
    <ScrollView style={{backgroundColor: '#edeef2'}}>
      {/* {IsLoading ? (
        <LoadingIndicator />
      ) : ( */}
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require('../assets/profile.png')} />
        </View>
        <View style={styles.levelContainer}>
          <Text
            style={{
              color: '#453D98ff',
              // fontWeight: '900',
              fontSize: 15,
              marginBottom: 10,
              marginTop: 8,
              textAlign: 'center',
              fontFamily: 'PoppinsBold',
            }}>
            Owner Details
          </Text>
          <Text style={styles.MandatoryText}>
            Mandatory Fields<Text style={{color: 'red'}}>*</Text>
          </Text>

          <CustomInput
            labelText="PAN Number"
            placeholdername="Enter PAN Number"
            onChangeText={handlePanChange}
            hasBorder={hasBorder}
            width="85%"
            stringlength={10}
            isVerified={isVerified}
            isMandatory={true}
            autoCapitalize={true}
          />

          <CustomInput
            labelText="Name"
            placeholdername="Enter your name"
            onChangeText={text => setName(text)}
            hasBorder={hasBorder}
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
              value={selectedDate}
              placeholder={'DD-MM-YYYY'}
              autoCorrect={false}
              editable={false}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                style={styles.rightIcon}
                source={require('../assets/calendar.png')}
              />
            </TouchableOpacity>
          </View>

          <CustomInput
            labelText="Aadhar Number"
            placeholdername="Enter Aadhar Number"
            onChangeText={text => setAdharNumber(text)}
            hasBorder={hasBorder}
            isMandatory={true}
            stringlength={12}
            keyboardTypename="numeric"
          />
          <CustomDropbox
            hasBorder={hasBorder}
            labelText="TDS Type"
            dropData={data3}
            placeholdername={'Select TDS Type'}
            showSearch={false}
            value={partytype}
            onChange={item => {
              setpartytype(item.value); // Update the state when the value changes
            }}
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
              placeholdername="Enter Mobile No"
              onChangeText={text => setPrimaryContact(text)}
              hasBorder={hasBorder}
              isMandatory={true}
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
            )}
</View>
            {primaryOTPUI && <CustomOTPVerify isVloading={isOTP1VLoading} onVerify={handleOtpSubmit1} />}

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
                onPress={handleOTP2}
                disabled={secondaryOTPUI}>
                {isOTP2loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>
                    GET OTP
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          {secondaryOTPUI && (
            <CustomOTPVerify
              onVerify={handleOtpSubmit2}
              onResend={handleOTP2}
              isVloading={isOTP2VLoading}
            />
          )}
          <CustomCheckbox
            label="I Call and Verify the Secondary No."
            value={isSCVerified}
            onChange={value => setSCVerified(value ? true : false)}
          />
          <CustomInput
            labelText="Email Address"
            placeholdername="Enter Email Id"
            onChangeText={text => setEmail(text)}
          />
          <CustomInput
            labelText="Owner Address"
            placeholdername="Enter Owner Address"
            onChangeText={text => setownerAddress(text)}
            isend="true"
            isaddress="true"
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
            Bank Details
          </Text>
          <CustomInput
            labelText=" A/C Number"
            placeholdername="Enter A/C Number"
            onChangeText={text => setacnumber(text)}
            hasBorder={hasBorder}
            keyboardTypename="numeric"
            isMandatory={true}
          />
          <CustomDropbox
            hasBorder={hasBorder}
            labelText="Bank Name"
            dropData={bankData}
            placeholdername={'Enter Bank Name'}
            searchPlaceholdername={'Enter Bank Name'}
            value={bankName}
            onChange={item => {
              setBankName(item.value);
              setbanksearch(banksearch);
            }}
            onChangeText={text => setSearchBank(text)}
          />

          <CustomDropbox
            hasBorder={hasBorder}
            labelText="Account Type"
            dropData={acTypeData}
            placeholdername={'Select Account Type'}
            searchPlaceholdername={'Search...'}
            value={acType}
            onChange={item => {
              setACType(item.value);
              setSearchAcType(searchAcType);
            }}
            showSearch={true}
            onChangeText={t => setSearchAcType(t)}
          />
          <CustomInput
            labelText="IFSC Code"
            placeholdername="Enter IFSC Code"
            onChangeText={text => setIfscCode(text.toUpperCase())}
            hasBorder={hasBorder}
            isMandatory={true}
            autoCapitalize={true}
            isend="true"
          />
        </View>
        <View
          style={[
            styles.levelContainer,
            {alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20},
          ]}>
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

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <CustomImagePicker
              bgImage={require('../assets/aadhaar.png')}
              title=" Adhar Front"
              onImagePicked={handleAdharFront}
              imageData={adharFront}
            />
            <CustomImagePicker
              bgImage={require('../assets/adhar_BACK.png')}
              title=" Adhar Back"
              onImagePicked={handleAdharBack}
              imageData={adharBack}
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <CustomImagePicker
              bgImage={require('../assets/passbook.png')}
              title="Passbook Front"
              onImagePicked={handlePassbook}
              imageData={passPhoto}
            />
            <CustomImagePicker
              bgImage={require('../assets/pan-card.png')}
              title=" PAN Card Front"
              onImagePicked={handlePanCard}
              imageData={PanPhotot}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={registertheOwner}>
          {IsLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.text}>Register</Text>
          )}
        </TouchableOpacity>
      </View>
      {/* )} */}
      <CustomAlert
        visible={showAlert}
        message={errorMessage}
        onClose={closeAlert}
      />
      <CalendarModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(date, convDate) => {
          setSelectedDate(date);
          setConvSelectedStartDate(convDate);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    alignItems: 'center',
    borderColor: 'black',
    alignSelf: 'center',
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
    shadowColor: 'black', // Set shadow color to blue
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10, // This is for Android
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

  rightIcon: {
    height: 22,
    width: 22,
  },
});

export default RegisterOwner;
