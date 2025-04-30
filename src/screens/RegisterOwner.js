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
  ActivityIndicator,ScrollView
} from 'react-native';
import React, {useState, useEffect} from 'react';
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
const RegisterOwner = () => {
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

  const handleShowToast = () => {
    setHasBorder(true);
  };

  const [IsLoading, setIsLoading] = useState(false);
  const [is_everything_ok, setis_everything_ok] = useState(false);
  // fetching banking details====================================

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const [banksearch, setbanksearch] = useState('bank');

  const fetchData1 = async () => {
    try {
      const response = await fetch(
        `https://Exim.Tranzol.com/api/OwnerApi/GetBankNameList?search=${banksearch}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Basic ${apiTokenReceived}`,
            clientId: 'TRANZOLBOSS',
            clientSecret: 'TRANZOLBOSSPAN',
          },
          redirect: 'follow',
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (result) {
        // console.log(result);
        const formattedData = result.apiResult.Result.map(bank => ({
          label: bank.Name.toString(),
          value: bank.Id, // Assuming Id is a number; convert to string if needed
        }));
        setData1(formattedData);
        // console.log(data1);
      } else {
        console.log('Unexpected API response:', result);
      }
    } catch (error) {
      console.log('Error fetching bank details:', error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await fetch(
        'https://Exim.Tranzol.com/api/OwnerApi/GetBankAccountType',
        {
          method: 'GET',
          headers: {
            Authorization: `Basic ${apiTokenReceived}`, //Basic SnlvdGk6SnlvdGlAMTIz
            clientId: 'TRANZOLBOSS',
            clientSecret: 'TRANZOLBOSSPAN',
          },
          redirect: 'follow',
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (result) {
        // console.log(result);
        const formattedData = result.apiResult.Result.map(banktype => ({
          label: banktype.Type.toString(),
          value: banktype.Id, // Assuming Id is a number; convert to string if needed
        }));
        setData2(formattedData);
      } else {
        console.log('Unexpected API response:', result);
      }
    } catch (error) {
      console.log('Error fetching GetBankAccountType:', error);
    }
  };

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
  const registertheOwner = () => {
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
      BankId: bankname,
      AccountTypeId: actype,
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
            handleShowToast();
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
    navigation.navigate('OwnerDetails');
  };

  const handlePanChange = input => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (panRegex.test(input)) {
      setpanno(input.toUpperCase());
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  
  const handleSaveImageData = (image) => {
    //console.log('Selected Image Data:', image);
    setCapturedPhoto(image);
  };
  
  return (
    <ScrollView style={{backgroundColor: '#edeef2'}}>
      {/* {IsLoading ? (
        <LoadingIndicator />
      ) : ( */}
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require('../assets/profile.png')}
            />
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
            <CustomInput
              labelText="Primary Contact Number"
              placeholdername="Enter Mobile Number"
              onChangeText={text => setPrimaryContact(text)}
              hasBorder={hasBorder}
              isMandatory={true}
              stringlength={10}
              keyboardTypename="numeric"
            />

            <CustomInput
              labelText="Secondary Contact Number"
              placeholdername="Enter Mobile Number"
              onChangeText={text => setSecondaryContact(text)}
              stringlength={10}
              keyboardTypename="numeric"
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
              dropData={data1}
              placeholdername={'Enter Bank Name'}
              searchPlaceholdername={'Enter Bank Name'}
              value={bankname}
              onChange={item => {
                setbankname(item.value);
              }}
              onChangeText={text => setbanksearch(text)}
            />

            <CustomDropbox
              hasBorder={hasBorder}
              labelText="Account Type"
              dropData={data2}
              placeholdername={'Select Account Type'}
              searchPlaceholdername={'Search...'}
              value={actype}
              onChange={item => {
                setactype(item.value);
              }}
              showSearch={false}
            />
            <CustomInput
              labelText="IFSC Code"
              placeholdername="Enter IFSC Code"
              onChangeText={text => setIfscCode(text)}
              hasBorder={hasBorder}
              isMandatory={true}
              isend="true"
            />
            <CustomImagePicker title="PAN CARD PHOTO" iconName='card-account-details-outline' onImagePicked={handleSaveImageData} />
          </View>

          <TouchableOpacity style={styles.button} onPress={registertheOwner}>
            <Text style={styles.text}>Register</Text>
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
