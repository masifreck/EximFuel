import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,ScrollView,Image,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import React, {useState, useEffect,useCallback} from 'react';
import CustomAlert from '../components/CustomAlert';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import useApiToken from '../components/Token';
import CustomInput from '../components/CustomInput';
import CustomDropbox from '../components/CustomDropbox';
import { Dialog, ALERT_TYPE } from 'react-native-alert-notification';
import NetInfoWrapper from '../components/CheckNetInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkBlue } from '../components/constant';
import CustomImagePicker from '../components/CustomeImagePicker';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import { Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
const RegisterVehicle = ({route}) => {
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
 const { vehicleNo } = route?.params?route.params:'';
//console.log(vehicleNo)

  const navigation = useNavigation();

  const [errorMessage, setErrorMessage] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [vehicleRegistrationNo, setVehicleRegistrationNo] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [engineNumber, setEngineNumber] = useState('');
  const [pollution, setPollution] = useState('');
  const [VPUCCExpiry,setVPUCCExpiry]=useState('');

  const [fitness, setFitness] = useState('');
  const [VFitnessExpiry,setVFitnessExpiry]=useState('');

  const [permit, setPermit] = useState('');
  const [VPermitExpiry,setVPermitExpiry]=useState('');
const [VCode,setVCode]=useState('');
  const [VNationalPermitExpiry,setVNationalPermitExpiry]=useState('');
const [VInsuranceNo,setVInsuranceNo]=useState('');
const [VInsuranceExpiry,setVInsuranceExpiry]=useState('');
const [VOwnerName,setVOwnerName]=useState('')
const [TaxExpiry,setTaxExpiry]=useState('' )
  const [VehicleTyres, setVehicleTyres] = useState('');
  const [roadTax, setRoadTax] = useState('');

  const [hasBorder, setHasBorder] = useState(false); // State for border
  const handleShowToast = () => {
    setHasBorder(true);
  };

  const [PanNumber, setPanNumber] = useState('');
  const [OwnerData, setOwnerData] = useState([]);
  const [ownerNameSelected, setOwnerNameSelected] = useState('');

  const [truckFront,setTruckFront]=useState(null);
  const [truckBack,setTruckBack]=useState(null);
  const [truckRight,setTruckRight]=useState(null);
  const [truckLeft,setTruckLeft]=useState(null);

  const [RCFrontPhoto,setRCFrontPhoto]=useState(null);
  const [RCBackPhotot,setRCBackPhotot]=useState(null);
  const [MapUrl,setMapUrl] = useState('');
  // dummy=========  
 useEffect(()=>{
if(vehicleNo){
  setVehicleRegistrationNo(vehicleNo)
}
 },[vehicleNo])
useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (PanNumber && PanNumber.length >= 3) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://Exim.Tranzol.com/api/OwnerApi/getOwnerList?panno=${PanNumber}`,
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
        //  console.log('owner list', result.apiResult);

          if (result.apiResult?.Result?.length) {
            const formattedData = result.apiResult.Result.map(owner => ({
              label: owner.OwnerName + ' - ' + owner.PanNo,
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

 const [vehicleDetails, setVehicleDetails] = useState(null);
const [isDataLoading, setIsDataLoading] = useState(false);
  useEffect(() => {
    if (vehicleNo) {
      setIsDataLoading(true);
      const fetchVehicle = async () => {
        try {
          const response = await fetch(
            `https://exim.tranzol.com/api/VehicleApi/GetVerifyVehicleNo?vehicleno=${vehicleNo}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${apiTokenReceived}`,
              },
            }
          );

          const data = await response.json();
console.log(data)
          if (data?.apiResult?.Result) {
            const details=data.apiResult.Result;
            setVehicleDetails(data.apiResult.Result);

            setVehicleRegistrationNo(details.VehicleNo)
            setChassisNumber(details.ChasisNo);
           setEngineNumber(details.EngineNo);
            setPollution(details.PUCCNo);
            setVPUCCExpiry(details.PUCCExpiry);
            setFitness(details.FitnessNo);
            setVFitnessExpiry(details.FitnessExpiry);
            setPermit(details.PermitNo);
            setVPermitExpiry(details.PermitExpiry);
            setVNationalPermitExpiry(details.NationalPermitExpiry)
setVInsuranceNo(details.InsuranceNo)
setVInsuranceExpiry(details.InsuranceExpiry);
setVOwnerName(details.OwnerName);
setRoadTax(details.TaxNo)
setVCode(details.Code)
setTaxExpiry(details.TaxExpiry)
          } else {
            console.warn('Vehicle not verified or invalid data', data);
            setVehicleDetails(null);
          }
        } catch (error) {
          console.error('Error fetching vehicle details:', error);
          setVehicleDetails(null);
        }finally{
          setIsDataLoading(false);
        }
      };

      fetchVehicle();
    }
  }, [vehicleNo, apiTokenReceived]);

  // ========================
  const [IsLoading, setIsLoading] = useState(true);
  const [is_everything_ok, setis_everything_ok] = useState(false);

const getCurrentCoordinates = async () => {
  const permissionType = Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  });

  try {
    let permissionStatus = await check(permissionType);

    if (permissionStatus === RESULTS.DENIED || permissionStatus === RESULTS.LIMITED) {
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
            maximumAge: 10000,
            forceRequestLocation: true,
            showLocationDialog: true,
          }
        );
      });
    } else if (permissionStatus === RESULTS.BLOCKED) {
      Alert.alert(
        'Location Permission Blocked',
        'Please enable location access in your settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: openSettings },
        ]
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
    const { latitude, longitude } = coordinates;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    setMapUrl(mapUrl);
   // console.log('Map URL:', mapUrl);
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    setErrorMessage('Failed to fetch location. Please enable location services.');
    setShowAlert(true);
  }
};
useEffect(() => {
  fetchAndSetCurrentLocation();
}, []);
  const validation = () => {
    //  if(!MapUrl){
    //   setErrorMessage('Please enalbe your location');
    //   setShowAlert(true);
    //    fetchAndSetCurrentLocation();
    //   return false;
    // }
    if(!ownerNameSelected){
      setErrorMessage('Please select Owner Name');
      setShowAlert(true);
      return false;
    }
    if(!VehicleTyres){
      setErrorMessage('Please enter Vehicle Tyres');
      setShowAlert(true);
      return false;
    }
if (!RCFrontPhoto) {
  setErrorMessage('Please upload RC Front Photo');
  setShowAlert(true);
  return false;
}
  if (!RCBackPhotot) {
  setErrorMessage('Please upload RC Back Photo');
  setShowAlert(true);
  return false;
}
    return true;
  };
  const registertheVehicle =async () => {
   
 
if(!validation()) return
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
      StatePermitNo:permit,
      FitnessNo:fitness,
      VOwnerName:VOwnerName,
      VCode:VCode,
      VPUCCNo:pollution,
      VPUCCExpiry:VPUCCExpiry,
      VFitnessNo:fitness,
      VFitnessExpiry:VFitnessExpiry,
      VPermitNo:permit,
      VPermitExpiry:VPermitExpiry,
      VNationalPermitExpiry:VNationalPermitExpiry,
      VInsuranceNo:VInsuranceNo,
      VInsuranceExpiry:VInsuranceExpiry,
      VTaxNo:roadTax,
      VTaxExpiry:TaxExpiry,
      VEngineNo:engineNumber,
      VChasisNo:chassisNumber,
MapUrl: MapUrl,
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
    }
  });
  if (truckFront) {
    formData.append('VehicleFrontImage', {
      uri: truckFront.uri,
      type: truckFront.type,
      name: truckFront.fileName || 'truckFront.jpg',
    });
  }
  if (truckBack) {
    formData.append('VehicleBackImage', {
      uri: truckBack.uri,
      type: truckBack.type,
      name: truckBack.fileName || 'truckBack.jpg',
    });
  }
  if (truckRight) {
    formData.append('VehicleRightImage', {                                
      uri: truckRight.uri,
      type: truckRight.type,
      name: truckRight.fileName || 'truckRight.jpg',
    });
  }
  if (truckLeft) {
    formData.append('VehicleLeftImage', {
      uri: truckLeft.uri,
      type: truckLeft.type,
      name: truckLeft.fileName || 'truckLeft.jpg',
    });   
  }
  if (RCFrontPhoto) {
    formData.append('RCFrontImage', {
      uri: RCFrontPhoto.uri,
      type: RCFrontPhoto.type,
      name: RCFrontPhoto.fileName || 'RCFront.jpg',
    });
  }
  if (RCBackPhotot) {
    formData.append('RCBackImage', {
      uri: RCBackPhotot.uri,          
      type: RCBackPhotot.type,
      name: RCBackPhotot.fileName || 'RCBack.jpg',
    });
  }
  console.log('FormData:', formData);
      fetch('https://Exim.Tranzol.com/api/VehicleApi/CreateVehicle', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiTokenReceived}`
      // Do NOT add Content-Type here; let fetch handle it for multipart/form-data
    },
    body: formData
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
                     const successMessage = `✅ Vehicle Registration Successful! 🎉\n\n🚛 Vehicle No: ${vehicleRegistrationNo} \n\n with Owner ${ownerNameSelected}✨`;

    navigation.navigate('success', { message: successMessage });
        } else {
          if (
            data.apiResult.Error.includes(
            "Violation of UNIQUE KEY constraint 'Vehicle_No'.")
          ) {
            const errorMessage = 'Vehicle No is already exists.';
            setErrorMessage(errorMessage);
            setShowAlert(true);
          } else {
             const errorMessage = 'Error: ' + data.apiResult.Error;
            setErrorMessage(errorMessage);
            setShowAlert(true);
            console.log('logged', data.apiResult);
          }
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('Error:', error);
        setErrorMessage('Network Error',`${error.message}`);
        setShowAlert(true);
      });
  };
  const closeAlert = () => {
    setShowAlert(false);
    //navigation.navigate('Vehicle');
  };

 

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
//console.log('PanNumber is:', PanNumber);
  const handleTrucBack = useCallback(image => {
    setTruckBack(image);
  }, []);
    const handleTruckFront = useCallback(image => {
      setTruckFront(image);
    }, []);
      const handleTruckRight = useCallback(image => {
        setTruckRight(image);
      }, []);
        const handleTruckLeft = useCallback(image => {
          setTruckLeft(image);
        }, []);
          const handleRCFront = useCallback(image => {
            setRCFrontPhoto(image);
          }, []);
            const handleRCBack = useCallback(image => {
              setRCBackPhotot(image);
            }, []);
             const showConfirmDialog = () => {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Are you sure?',
      textBody: 'Do you really want to go to the Owner page?',
      button: 'Yes',
      cancelButton: 'No',
      onPressButton: () => {
        Dialog.hide();
        navigation.navigate('OwnerDetails');
      },
      onPressCancelButton: () => {
        Dialog.hide();
      },
    });
  };
  return (
       <AlertNotificationRoot>
    <ScrollView style={{backgroundColor: '#edeef2'}}>
      <View style={{flex:1}}>
      <NetInfoWrapper/>
      </View>
 
        <View style={styles.container}>
           <View style={styles.imgContainer}>
                      <Image
                        style={styles.img}
                        source={require('../assets/Truck.png')}
                      />
                    </View>
                    {isDataLoading ? (
                      <ActivityIndicator
                        size="large"
                        color={darkBlue}
                        style={{marginTop: 20}}
                      />
                    ) : (
                    <ScrollView horizontal={true} style={{flexDirection:'row'}}>
<ImageBackground source={require('../assets/rcfrontnew.png')} imageStyle={{borderRadius:10}}
style={styles.dlCard}>
<Text
  style={{
    position: 'absolute',
    top: 160,
    left: 40,
    color: vehicleDetails?.Code === 'VERIFIED' ? 'green' : 'red',
    fontWeight:'bold'
  }}
>
  {vehicleDetails?.Code ? vehicleDetails.Code : ''}
</Text>

<Text style={{color:'#020202',fontWeight:'bold',fontSize:15,position:'absolute',top:85,left:150,fontWeight:'bold'}}>{vehicleRegistrationNo?vehicleRegistrationNo:''}</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:12,position:'absolute',top:90,left:260}}>{vehicleDetails?.PermitNo?vehicleDetails.PermitNo:''}</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:15,position:'absolute',top:88,left:373}}>{vehicleDetails?.PermitExpiry?vehicleDetails.PermitExpiry:''}</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:15,position:'absolute',top:125,left:148}}>{vehicleDetails?.ChasisNo? vehicleDetails.ChasisNo:''}</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:15,position:'absolute',top:167,left:148}}>{vehicleDetails?.EngineNo? vehicleDetails.EngineNo:''}</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:15,position:'absolute',top:205,left:148}}>{vehicleDetails?.OwnerName?vehicleDetails.OwnerName:''}</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:14,position:'absolute',top:242,left:148}}>{vehicleDetails?.PUCCNo?vehicleDetails.PUCCNo:''}</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:14,position:'absolute',top:285,left:148}}>{vehicleDetails?.PUCCExpiry?vehicleDetails.PUCCExpiry:''}</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:14,position:'absolute',top:326,left:148,}}>{vehicleDetails?.NationalPermitExpiry?vehicleDetails.NationalPermitExpiry:''}
</Text>
{/* fuel type */}
<Text style={{color:'#020202',fontWeight:'bold',fontSize:10,position:'absolute',bottom:46,left:20}}>{vehicleDetails?.InsuranceNo?vehicleDetails.InsuranceNo:''}</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:13,position:'absolute',width:110,top:322,left:20}}>{vehicleDetails?.InsuranceExpiry?vehicleDetails.InsuranceExpiry:''}</Text>


</ImageBackground>
<ImageBackground source={require('../assets/rcnewback.png')} imageStyle={{borderRadius:10}}
style={styles.dlCard}>
  <Text style={{color:'#020202',fontWeight:'bold',fontSize:18,position:'absolute',top:88,left:18,fontWeight:'bold'}}>{vehicleRegistrationNo?vehicleRegistrationNo:''}</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:15,position:'absolute',bottom:50,left:200}}>{vehicleDetails?.FitnessNo?vehicleDetails.FitnessNo:''}</Text>
<Text style={{color:'#020202',fontWeight:'bold',fontSize:14,position:'absolute',width:110,bottom:50,left:325}}>{vehicleDetails?.FitnessExpiry?vehicleDetails.FitnessExpiry:''}</Text>
</ImageBackground>
                    </ScrollView>)}
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
              Vehicle Details
            </Text>
            <Text style={styles.MandatoryText}>
              Mandatory Fields<Text style={{color: 'red'}}>*</Text>
            </Text>
            {/* <CustomInput
              labelText=" Vehicle Registration No"
              placeholdername="Enter Vehicle Registration No"
              onChangeText={text => setVehicleRegistrationNo(text)}
              hasBorder={hasBorder}
              width="85%"
              isVerified={isVerified}
              isMandatory={true}
            /> */}
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
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
                isIcon={true}
            />
            <TouchableOpacity onPress={showConfirmDialog}>
              <Image source={require('../assets/adduser.png')} style={{width:50,height:50,marginTop:30,marginRight:10}}/>
            </TouchableOpacity>
            
</View>
            <CustomInput
              labelText="Vehicle Tyres"
              placeholdername="Vehicle Tyres"
              onChangeText={text => setVehicleTyres(text)}
              hasBorder={hasBorder}
              keyboardTypename="numeric"
              isMandatory={true}
              isend={true}
            />
            {/* <CustomInput
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
            /> */}
          </View>
                  <View
          style={[
            styles.levelContainer,
            {alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20},
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

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <CustomImagePicker
              bgImage={require('../assets/rcfrontnew.png')}
              title=" RC Front"
              onImagePicked={handleRCFront}
              imageData={RCFrontPhoto}
              isMandatory={true}
            />
            <CustomImagePicker
              bgImage={require('../assets/rcnewback.png')}
              title=" RC Back"
              onImagePicked={handleRCBack}
              imageData={RCBackPhotot}
              isMandatory={true}
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <CustomImagePicker
              bgImage={require('../assets/truckfront.png')}
              title="Truck Front"
              onImagePicked={handleTruckFront}
              imageData={truckFront}
              width={80}
            />
            <CustomImagePicker
              bgImage={require('../assets/truckback.png')}
              title=" Truck Back"
              onImagePicked={handleTrucBack}
              imageData={truckBack}
              width={80}
            />
          </View>
             <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <CustomImagePicker
              bgImage={require('../assets/truckright.png')}
              title="Truck Right"
              onImagePicked={handleTruckRight}
              imageData={truckRight}
            />
            
            <CustomImagePicker
              bgImage={require('../assets/truckleft.png')}
              title=" Truck Left"
              onImagePicked={handleTruckLeft}
              imageData={truckLeft}
            />
          </View>
        </View>
          <TouchableOpacity style={styles.button} onPress={registertheVehicle}>
               {IsLoading ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
            <Text style={styles.text}>Register</Text>)} 
          </TouchableOpacity>
        </View>
      
      <CustomAlert
        visible={showAlert}
        message={errorMessage}
        onClose={closeAlert}
      />
    </ScrollView>
    </AlertNotificationRoot>
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
height:350,
width:570,
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
