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
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import CustomAlert from '../components/CustomAlert';
import {useNavigation, useRoute} from '@react-navigation/native';
import useApiToken from '../components/Token';
import LoadingIndicator from '../components/LoadingIndicator';
import CalendarModal from '../components/Calander';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UpdateOwner = () => {
  const route = useRoute();
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

  const {ownerDetails} = route.params;
  const FetchOwnerDetails = ownerDetails.apiResult.Result;
  console.log(FetchOwnerDetails);
  // new data=============================================================
  const convertDateFormat = dateString =>
    dateString.split('/').reverse().join('-');

  // Example usage:
  const outputDate = convertDateFormat(FetchOwnerDetails.DobOwner1);

  // console.log(outputDate);
  // console.log(outputDate); // Output: '2024-02-27'

  // calander==================
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(FetchOwnerDetails.DobOwner1); //27/02/2024
  const [ConvSelectedStartDate, setConvSelectedStartDate] =
    useState(outputDate); //2024-02-29

  // ===========================================
  const data3 = [
    {label: 'Individual', value: '1'},
    {label: 'Other than Individual/HUF', value: '2'},
  ];
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const [Id, setId] = useState(FetchOwnerDetails.Id);
  const [panno, setpanno] = useState(FetchOwnerDetails.PanNo);
  const [name, setName] = useState(FetchOwnerDetails.OwnerName);
  const [adharNumber, setAdharNumber] = useState(FetchOwnerDetails.AdharNo);

  const TDSTypeName = FetchOwnerDetails.TDSTypeName;
  const [partytype, setpartytype] = useState(FetchOwnerDetails.TdsTypeId);

  const BankNameName = FetchOwnerDetails.BankNameName;
  const [bankname, setbankname] = useState(FetchOwnerDetails.BankId);
  // useEffect(() => {
  //   console.log(bankname);
  // }, [bankname]);
  const BankTypeName = FetchOwnerDetails.BankTypeName;
  const [actype, setactype] = useState(FetchOwnerDetails.AccountTypeId);
  const [primaryContact, setPrimaryContact] = useState(
    FetchOwnerDetails.PrimaryMobileNo,
  );
  const [secondaryContact, setSecondaryContact] = useState(
    FetchOwnerDetails.SecondaryNo,
  );
  const [email, setEmail] = useState(FetchOwnerDetails.EmailAddress);
  const [ownerAddress, setownerAddress] = useState(FetchOwnerDetails.Address);
  const [acnumber, setacnumber] = useState(FetchOwnerDetails.AccountNo);
  const [IfscCode, setIfscCode] = useState(FetchOwnerDetails.IFSCCode);

  const [TotalVehicles, setTotalVehicles] = useState(0);
  const [ShortageRecovery, setShortageRecovery] = useState(0);

  const [showAlert, setShowAlert] = useState(false);
  // fetching banking details====================================

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [banksearch, setbanksearch] = useState('');

  const fetchData1 = async () => {
    try {
      const response = await fetch(
        `https://Exim.Tranzol.com/api/OwnerApi/GetBankNameList?search=${banksearch}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Basic ${apiTokenReceived}`,
          
          },
        }, //what happened and
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (result) {
        console.log(result);
        const formattedData = result.apiResult.Result.map(bank => ({
          label: bank.Name.toString(),
          value: bank.Id, // Assuming Id is a number; convert to string if needed
        }));
        setData1(formattedData);
        console.log(data1);
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
            Authorization: `Basic ${apiTokenReceived}`,
            
          },
        
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
      console.log('Error fetching Job numbers:', error);
    }
  };
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
  if(!ConvSelectedStartDate){
    setErrorMessage('Please Choose the DOB')
        setShowAlert(true);
    return false;
  }
  if (!adharRegex.test(adharNumber)) {
    setErrorMessage('Please enter a valid 12-digit Aadhar number');
    setShowAlert(true);
    return false;
  }

  if(!partytype){
    setErrorMessage('Please Choose TDS Type');
    setShowAlert(true);
    return false; 
  }
  if(!primaryContact){
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
    Id: Id,
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

  console.log('Posted Data:', postData);

  const url = 'https://Exim.Tranzol.com/api/OwnerApi/CreateOwner';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${apiTokenReceived}`,
      clientId: 'TRANZOLBOSS',
      clientSecret: 'TRANZOLBOSSPAN',
    },
    redirect: 'follow',
    body: JSON.stringify(postData),
  };

  fetch(url, requestOptions)
    .then(async response => {
      setIsLoading(false);
      
      const data = await response.json(); // ✅ Await before using
      console.log('Response Data:', data); // ✅ Log actual response JSON

      if (!response.ok) {
        const error = 'Network response was not ok';
        setErrorMessage(error);
        setShowAlert(true);
        throw new Error(error);
      }

      if (data.apiResult?.Result !== null) {
        setErrorMessage('Update Successful!');
        setShowAlert(true);
      } else if (data.apiResult?.Result === null) {
        setErrorMessage(data.apiResult?.Error || 'Unknown Error');
        setShowAlert(true);
      } else {
        setErrorMessage('Fill Mandatory Fields');
        setShowAlert(true);
      }
    })
    .catch(error => {
      setIsLoading(false);
      console.log('Error:', error.message);
      setErrorMessage('Network Error');
      setShowAlert(true);
    });
};

  const closeAlert = () => {
    setShowAlert(false);
    redirect();
  };
  const redirect = () => {
    //navigation.navigate('OwnerDetails');
  };

  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (banksearch && apiTokenReceived !== null) {
      fetchData1();
    }
    if (apiTokenReceived !== null) {
      fetchData2();
    }
  }, [banksearch, apiTokenReceived]);
  const [is_everything_ok, setis_everything_ok] = useState(false);
  useEffect(() => {
    // console.log(data1, data2, 'data is here');
    if (data1.length === 0 || data2.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setis_everything_ok(true);
    }
  }, [data1, data2]);
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (is_everything_ok === false) {
  //       setErrorMessage('Unexpected Error! Login Again');
  //       setShowAlert(true);
  //     }
  //   }, 45000); // 45 seconds in milliseconds

  //   return () => clearTimeout(timeoutId);
  // }, [is_everything_ok]);

  return (
    <ScrollView style={{backgroundColor: '#edeef2'}}>
      {IsLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.levelContainer}>
            <Text
              style={{
                color: '#453D98ff',
                fontSize: 20,
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
            <Text style={styles.levelText}>
              PAN Number<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={[styles.inputContainer]}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'gray',
                  fontSize: 15,
                  width: '85%',
                  marginRight: 20,
                }}
                value={panno}
                editable={false}
              />
            </View>

            <Text style={styles.levelText}>
              Name<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={[styles.inputContainer]}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Name'}
                autoCorrect={false}
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>

            <Text style={styles.levelText}>
              Date Of Birth<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={[styles.inputContainer]}>
              <TouchableOpacity
                style={{width: '85%'}}
                onPress={() => setModalVisible(true)}>
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
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  style={styles.rightIcon}
                  source={require('../assets/calendar.png')}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.levelText}>
              Aadhar Number<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={[styles.inputContainer]}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter Aadhar Number'}
                autoCorrect={false}
                keyboardType="numeric"
                value={adharNumber}
                maxLength={12}
                onChangeText={text => setAdharNumber(text)}
              />
            </View>

            <Text style={styles.levelText}>
              TDS Type<Text style={{color: 'red'}}>*</Text>
            </Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black'}}
              data={data3}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={TDSTypeName}
              value={partytype}
              onChange={item => {
                setpartytype(item.value); // Update the state when the value changes
              }}
            />

            <Text style={styles.levelText}>
              Primary Contact Number<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={[styles.inputContainer]}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter Mobile Number'}
                autoCorrect={false}
                value={primaryContact}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={text => setPrimaryContact(text)}
              />
            </View>

            <Text style={styles.levelText}>Secondary Contact Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter Mobile Number'}
                autoCorrect={false}
                value={secondaryContact}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={text => setSecondaryContact(text)}
              />
            </View>

            <Text style={styles.levelText}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter Email Id'}
                autoCorrect={false}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>

            <Text style={styles.levelText}>Owner Address</Text>
            <View
              style={[styles.inputContainer, {marginBottom: 20, height: 120}]}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter Owner Address'}
                autoCorrect={false}
                value={ownerAddress}
                multiline={true}
                onChangeText={text => setownerAddress(text)}
              />
            </View>
          </View>

          <View style={styles.levelContainer}>
            <Text
              style={{
                color: '#453D98ff',
                fontSize: 20,
                marginBottom: 10,
                marginTop: 8,
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Bank Details
            </Text>

            <Text style={styles.levelText}>
              A/C Number<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={[styles.inputContainer]}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter A/C Number'}
                autoCorrect={false}
                keyboardType="numeric"
                onChangeText={text => setacnumber(text)}
                value={acnumber}
              />
            </View>

            <Text style={styles.levelText}>
              Bank Name<Text style={{color: 'red'}}>*</Text>
            </Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black'}}
              data={data1}
              search
              maxHeight={180}
              labelField="label"
              valueField="value"
              placeholder={BankNameName}
              value={bankname}
              searchPlaceholder="Enter Bank Name"
              onChange={item => {
                setbankname(item.value);
              }}
              onChangeText={text => setbanksearch(text)}
            />

            <Text style={styles.levelText}>
              Account Type<Text style={{color: 'red'}}>*</Text>
            </Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data2}
              maxHeight={150}
              labelField="label"
              valueField="value"
              itemTextStyle={{color: 'black'}}
              placeholder={BankTypeName}
              searchPlaceholder="Search"
              onChange={item => {
                setactype(item.value);
              }}
            />

            <Text style={styles.levelText}>
              IFSC Code<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={[styles.inputContainer, {marginBottom: 20}]}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter IFSC Code'}
                autoCorrect={false}
                value={IfscCode}
                onChangeText={text => setIfscCode(text)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={registertheOwner}>
            <Text style={styles.text}>Update</Text>
          </TouchableOpacity>
        </View>
       )} 
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
  dropdown: {
    height: 50,
    width: '90%',
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: '#cedff0',
    paddingHorizontal: 15,
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
    padding:5,
    fontFamily: 'PoppinsMedium',
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

export default UpdateOwner;
