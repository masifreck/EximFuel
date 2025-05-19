import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,ScrollView,Image,
  ImageBackground
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {ScrollView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import CustomAlert from '../components/CustomAlert';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import useApiToken from '../components/Token';
import CustomInput from '../components/CustomInput';
import CustomDropbox from '../components/CustomDropbox';
// import CustomRequestOptions from '../components/CustomRequestOptions';
import {CustomRequestOptions} from '../components/CustomRequestOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkBlue } from '../components/constant';
const RegisterVehicle = () => {
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

  const navigation = useNavigation();

  const [errorMessage, setErrorMessage] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [vehicleRegistrationNo, setVehicleRegistrationNo] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [engineNumber, setEngineNumber] = useState('');
  const [pollution, setPollution] = useState('');
  const [fitness, setFitness] = useState('');
  const [permit, setPermit] = useState('');
  const [VehicleTyres, setVehicleTyres] = useState('');
  const [roadTax, setRoadTax] = useState('');

  const [hasBorder, setHasBorder] = useState(false); // State for border
  const handleShowToast = () => {
    setHasBorder(true);
  };

  const [PanNumber, setPanNumber] = useState('');
  const [OwnerData, setOwnerData] = useState([]);
  const [ownerNameSelected, setOwnerNameSelected] = useState('');
  // dummy=========

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (PanNumber && PanNumber.length >= 3) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://Exim.Tranzol.com/api/OwnerApi/GetOwnerListByName?search=${PanNumber}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Basic ${apiTokenReceived}`,
                clientId: 'TRANZOLBOSS',
                clientSecret: 'TRANZOLBOSSPAN',
              },
              redirect: 'follow',
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();
          console.log('owner list', result);

          if (result.apiResult?.Result?.length) {
            const formattedData = result.apiResult.Result.map(owner => ({
              label: owner.OwnerName,
              value: owner.Id,
            }));
            setOwnerData(formattedData);
          } else {
            console.log('No data found.');
          }
        } catch (error) {
          console.log('Error fetching owner data:', error);
        }
      };

      fetchData();
    }
  }, 500); // delay in ms

  return () => clearTimeout(delayDebounce); // cleanup on input change
}, [PanNumber]);



  // ========================
  const [IsLoading, setIsLoading] = useState(true);
  const [is_everything_ok, setis_everything_ok] = useState(false);

  const registertheVehicle = () => {
    setIsLoading(true);
    const postData = {
      OwnerId: ownerNameSelected,
      VehicleTyre: VehicleTyres,
      VehicleNo: vehicleRegistrationNo,
      ChassicNo: chassisNumber,
      EngineNo: engineNumber,
      PollutionNo: pollution,
      FitnessNo: fitness,
      StatePermitNo: permit,
      RoadTaxNo: roadTax,
    };
    console.log(postData);
    const {url, requestOptions} = CustomRequestOptions(
      'https://exim.tranzol.com/api/VehicleApi/CreateVehicle',
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
          const errorMessage = 'Registration Successfull!';
          setErrorMessage(errorMessage);
          setShowAlert(true);
        } else {
          if (
            data.apiResult.Error ===
            "Violation of UNIQUE KEY constraint 'Vehicle_No'. Cannot insert duplicate key in object 'dbo.App_Vehicle'. The duplicate key value is (111110000).\r\nThe statement has been terminated."
          ) {
            const errorMessage = 'Vehicle No is already exists.';
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
    navigation.navigate('Vehicle');
  };

  useEffect(() => {
    if (
      vehicleRegistrationNo &&
      vehicleRegistrationNo.length > 8 &&
      vehicleRegistrationNo.length < 13
    ) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, [vehicleRegistrationNo]);

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
console.log('PanNumber is:', PanNumber);

  return (
    <ScrollView style={{backgroundColor: '#edeef2'}}>
      {IsLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
           <View style={styles.imgContainer}>
                      <Image
                        style={styles.img}
                        source={require('../assets/Truck.png')}
                      />
                    </View>
                    <ScrollView horizontal={true} style={{flexDirection:'row'}}>
<ImageBackground source={require('../assets/rcfront.png')} imageStyle={{borderRadius:10}}
style={styles.dlCard}>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:7,position:'absolute',top:46,left:76}}>123456789012</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:7,position:'absolute',top:46,left:130}}>20-05-2023</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:7,position:'absolute',top:46,left:180}}>20-05-2038</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:7,position:'absolute',top:63,left:76}}>P53AFDCB9CEA07330</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:7,position:'absolute',top:85,left:76}}>M2SA0107ED3805</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:7,position:'absolute',top:103,left:76}}>SURESWAR DASH</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:7,position:'absolute',top:122,left:76}}>SURESWAR DASH SURESWAR DASH SURESWAR DASH</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:7,position:'absolute',top:143,left:76}}>SURESWAR DASH</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:7,position:'absolute',top:157,left:76,width:200}}>Address SURESWAR DASH
  SURESWAR DASH SURESWAR DASH SURESWAR DASH SURESWAR  
</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:7,position:'absolute',bottom:24,left:10}}>Fuel Type</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:7,position:'absolute',width:65,top:165,left:10}}>Emissionfgj</Text>


</ImageBackground>
<ImageBackground source={require('../assets/rcbackwitout.png')} imageStyle={{borderRadius:10}}
style={styles.dlCard}>

</ImageBackground>
                    </ScrollView>
          <View style={styles.levelContainer}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 8,
                marginTop: 8,
                color: '#453D98ff',
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Vehicle Details
            </Text>
            <Text style={styles.MandatoryText}>
              Mandatory Fields<Text style={{color: 'red'}}>*</Text>
            </Text>
            <CustomInput
              labelText=" Vehicle Registration No"
              placeholdername="Enter Vehicle Registration No"
              onChangeText={text => setVehicleRegistrationNo(text)}
              hasBorder={hasBorder}
              width="85%"
              isVerified={isVerified}
              isMandatory={true}
            />
            <CustomDropbox
              hasBorder={hasBorder}
              labelText="Owner Name"
              dropData={OwnerData}
              placeholdername={'Select Owner Name'}
              searchPlaceholdername={'Enter Owner Name'}
              value={ownerNameSelected}
              onChange={item => {
                setOwnerNameSelected(item.value);
              }}
              onChangeText={text => setPanNumber(text)}
            />

            <CustomInput
              labelText="Vehicle Tyres"
              placeholdername="Vehicle Tyres"
              onChangeText={text => setVehicleTyres(text)}
              hasBorder={hasBorder}
              keyboardTypename="numeric"
              isMandatory={true}
            />
            <CustomInput
              labelText="Chassis Number"
              placeholdername="Enter Chassis Number"
              onChangeText={text => setChassisNumber(text)}
            />
            <CustomInput
              labelText="Engine Number"
              placeholdername="Enter Engine Number"
              onChangeText={text => setEngineNumber(text)}
            />
            <CustomInput
              labelText="Pollution"
              placeholdername="Enter Pollution Number"
              onChangeText={text => setPollution(text)}
            />
            <CustomInput
              labelText="Fitness"
              placeholdername="Enter Fitness Number"
              onChangeText={text => setFitness(text)}
            />
            <CustomInput
              labelText="State Permit No"
              placeholdername="State Permit No"
              onChangeText={text => setPermit(text)}
            />
            <CustomInput
              labelText="Road Tax"
              placeholdername="Enter Road Tax Number"
              onChangeText={text => setRoadTax(text)}
              isend={true}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={registertheVehicle}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </View>
      )}
      <CustomAlert
        visible={showAlert}
        message={errorMessage}
        onClose={closeAlert}
      />
    </ScrollView>
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
  const dob = driver.Dob;

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
      <Text style={[styles.dlText,{position:'absolute',top:25,left:70,fontWeight:'bold'}]}>TEST 1234567890</Text>
     
       
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
    // borderWidth: 0.5,
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
    dlCard: {
height:180,
width:290,

  borderRadius: 10,
  margin: 16,
  padding: 12,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 5,
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
    backgroundColor:darkBlue
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
  toastContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: '58%', // Center vertically
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
});

export default RegisterVehicle;
