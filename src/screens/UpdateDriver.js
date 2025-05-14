import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,ScrollView
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {ScrollView} from 'react-native-gesture-handler';
import CustomAlert from '../components/CustomAlert';
import {useNavigation, useRoute} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import CustomInput from '../components/CustomInput';
import useApiToken from '../components/Token';
import LoadingIndicator from '../components/LoadingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UpdateDriver = () => {
  const route = useRoute();
  const {driverDetails} = route.params;
  const FetchDriverDetails = driverDetails.apiResult.Result;
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
  // console.log(FetchDriverDetails);
  const InputField = ({label, placeholder, onChangeText}) => {
    return (
      <View>
        <Text style={styles.levelText}>{label}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={placeholder}
            autoCorrect={false}
            onChangeText={text => onChangeText(text)}
          />
        </View>
      </View>
    );
  };
  // calander==================
  function convertDateFormat(inputDate) {
    const [year, month, day] = inputDate.split('T')[0].split('-');
    return `${year}-${month}-${day}`;
  }
  let format = new Date(FetchDriverDetails.Dob).toLocaleDateString('en-GB');

  // Example usage:
  const inputDate = FetchDriverDetails.Dob;
  const formattedDate = convertDateFormat(inputDate);

  const [selectedStartDate, setSelectedStartDate] = useState(format);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [convselectedStartDate, setconvSelectedStartDate] = useState(formattedDate);
  const handleOkPress = () => {
    setCalendarVisible(false);
  };

  const onDateChange = date => {
    const selectedFormattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
    // console.log(selectedFormattedDate);
    setSelectedStartDate(selectedFormattedDate)
    const parts = selectedFormattedDate.split('/');
    const [day, month, year] = parts;
    const convertedDate = `${year}-${month}-${day}`;
    setconvSelectedStartDate(convertedDate);
    console.log("converted date is here",convselectedStartDate);
  };
 
  //calander===================
  // new data=============================================================

  const navigation = useNavigation();

  const [isVerified, setIsVerified] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // keys from the postman==============================================================\
  const [id, setid] = useState(FetchDriverDetails.Id);
  const [dlNumber, setdlNumber] = useState(FetchDriverDetails.DLNumber);
  const [name, setName] = useState(FetchDriverDetails.DriverName);
  const [adharNumber, setAdharNumber] = useState(FetchDriverDetails.AdharNo);
  const [primaryContact, setPrimaryContact] = useState(
    FetchDriverDetails.PrimaryContactNo,
  );
  const [secondaryContact, setSecondaryContact] = useState(
    FetchDriverDetails.SecondaryContactNo,
  );
  const [email, setEmail] = useState(FetchDriverDetails.DriverEmail);
  const [driverAddress, setdriverAddress] = useState(
    FetchDriverDetails.DriverAddress,
  );
    const validation = () => {
  const cleanDL = dlNumber.replace(/[\s-]/g, ''); // assuming dlNumber is your state variable
 const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const regex = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/;
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const adharRegex = /^\d{12}$/;
  if (!(cleanDL.length === 15 || cleanDL.length === 16) || !regex.test(cleanDL)) {
    setErrorMessage('Please enter a valid DL No.');
    setShowAlert(true);
    return false;
  }
if(!name){
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
  const [PanNo, setPanNo] = useState(FetchDriverDetails.PanNo);
  const registertheDriver = () => {
     if (!validation()) return;
    setIsLoading(true);
    const postData = {
      Id: id,
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
    console.log("posted date",postData);
    const url = 'https://Exim.Tranzol.com/api/OwnerApi/CreateDriver';
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
          const errorMessage = 'Update Successfull!';
          setErrorMessage(errorMessage);
          setShowAlert(true);
        } else if (data.apiResult.Result === null) {
          const errorMessage = 'Something Went Wrong!';
          setErrorMessage(errorMessage);
          setShowAlert(true);
        } else {
          const errorMessage = 'Fill Mandatory Fields';
          setErrorMessage(errorMessage);
          setShowAlert(true);
        }
        // Handle the response here
      })
      .catch(error => {
        setIsLoading(false);
        console.log('Error:', error);
        setErrorMessage('Network Error');
        setShowAlert(true);
        // Handle the error here
      });
  };
  const closeAlert = () => {
    // Function to close the alert
    setShowAlert(false);
    redirect();
  };
  const redirect = () => {
   // navigation.navigate('Driver');
  };
  // Toast Message ===================================================================================
  const [IsLoading, setIsLoading] = useState(true);
  const [is_everything_ok, setis_everything_ok] = useState(false);
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
            <Text style={styles.levelText}>
              DL Number <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'gray',
                  fontSize: 15,
                  width: '85%',
                  marginRight: 20,
                }}
                placeholder={'Enter DL Number'}
                autoCorrect={false}
                editable={false}
                value={dlNumber}
                onChangeText={text => setdlNumber(text)}
              />
            </View>

            <Text style={styles.levelText}>
              Name <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
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
              Aadhar Number <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter Aadhar Number'}
                autoCorrect={false}
                value={adharNumber}
                maxLength={12}
                onChangeText={text => setAdharNumber(text)}
              />
            </View>

            <Text style={styles.levelText}>
              Date Of Birth <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
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
                editable={false}
              />

              <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                <Image
                  style={styles.rightIcon}
                  source={require('../assets/calendar.png')}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.levelText}>
              Primary Contact Number <Text style={{color: 'red'}}>*</Text>
            </Text>
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
                value={primaryContact}
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
                maxLength={10}
                value={secondaryContact}
                onChangeText={text => setSecondaryContact(text)}
              />
            </View>
            <Text style={styles.levelText}>Pan Number</Text>
            <View style={styles.inputContainer}>
              <TextInput  
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter Pan Number'}
                autoCorrect={false}
                value={PanNo}
                onChangeText={text => setPanNo(text)}
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
                placeholder={'Enter Email'}
                value={email}
                autoCorrect={false}
                onChangeText={text => setEmail(text)}
              />
            </View>

            <Text style={styles.levelText}>Driver Address</Text>
            <View style={[styles.inputContainer, {marginBottom: 20, height: 120}]}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter Driver Address'}
                autoCorrect={false}
                multiline={true}
                value={driverAddress}
                onChangeText={text => setdriverAddress(text)}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={registertheDriver}>
            <Text style={styles.text}>Update Details</Text>
          </TouchableOpacity>
        </View>
       )} 
      {/* custom alert code==================================== */}
      <CustomAlert
        visible={showAlert}
        message={errorMessage}
        onClose={closeAlert}
      />
      {/* Toast message code================================== */}

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
export default UpdateDriver;
