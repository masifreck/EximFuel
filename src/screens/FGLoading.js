import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
  TextInput,KeyboardAvoidingView,      
  Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import useApiToken from '../components/Token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import { Dropdown } from 'react-native-element-dropdown';
import {  Dimensions } from "react-native";
import { textColor } from '../components/constant';
import { darkBlue } from '../components/constant';
import SelectButton from '../components/SelectButton';
const ScreenWidth = Dimensions.get('window').width;
const OwnerDetails = () => {
  const navigation = useNavigation();
  const [challanNumber, setchallanNumber] = useState('');
  const [apiTokenReceived, setapiTokenReceived] = useState(null);
  AsyncStorage.getItem('Token')
    .then(token => {
      setapiTokenReceived(token);
    //  console.log('Retrieved token:', token);
    })
    .catch(error => {
      const TokenReceived = useApiToken();
      setapiTokenReceived(TokenReceived);
      // console.log('Received token', apiTokenReceived);
      // console.log('Error retrieving token:', error);
    });
  const [FGLoading, setFGLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // Initialize state for error message
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [hasBorder, setHasBorder] = useState(false); // State for border
 const [isFocus, setIsFocus] = useState(false);
   const [jobId,setJobId]=useState('')

    const [jobData,setJobData]=useState([])
    const [vehicleData,setVehicleData]=useState([])
    const [PANNo,setPANNo]=useState('');
    const [driverData,setDriverData]=useState([])  
const [DLNo,setDLNo]=useState('');
      const [searchTerm, setSearchTerm] = useState('');
      const [searchVehicle,setSearchVehicle]=useState('')
      const [searchDriver,setSearchDriver]=useState('')
  const [selectedJobNo,setSelectedJobNo]=useState('')
  const [selectedVehicleNo,setSelectedVehicleNo]=useState('');
   const [vehicleId, setVehicleId] = useState('');
    const [driverId, setDriverId] = useState('');
    const [jobNo,setJobNo]=useState('');
      const [vehicleNo,setVehicleNo]=useState('');
      const [driverName,setDriverName]=useState('')
      const [JobDetails,setJobDetails]=useState({});
  const handleShowToast = () => {
    setShowToast(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      hideToast();
    }, 5000);
    setHasBorder(true);
  };

  const hideToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setHasBorder(false);
    });
    setShowToast(false);
  };
  const resetInputs = () => {
    setchallanNumber(''); // Reset the panNumber input field
  };
  const closeAlert = () => {
    // Function to close the alert
    setShowAlert(false);
  };
  const handleShowDetails = async () => {
    if (challanNumber.length === 0) {
      setErrorMessage("Enter Challan Number");
      handleShowToast();
      resetInputs();
    } else {
      setIsLoading(true); // Set loading state to true
      try {
        const url = `https://exim.tranzol.com/api/LoadingChallan/GetFinishGoods?challanNo=${challanNumber}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
          Authorization: `Basic ${apiTokenReceived}`, // You may want to keep this secure
          },
          redirect: 'follow',
        });
  
        setIsLoading(false);
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
  
          if (data.apiResult.Result === null) {
            // Case: No Challan details (Result is null)
            const errorMessage = 'Invalid Challan Number';
            setErrorMessage(errorMessage);
            setShowAlert(true);
            resetInputs();
          } else {
            // Case: Valid Challan details exist (Result is not null)
            setFGLoading(data); // Store the result in your state
            navigation.navigate('ShowFGLoadingChalan', {
              FGLoading: data, // Pass the challan details to the next screen
            });
            resetInputs();
          }
        } else {
          // Case: Fetching failed, no response
          console.log('Error fetching Challan details');
          setErrorMessage('Challan Number Not Found');
          handleShowToast();
          resetInputs();
        }
      } catch (error) {
        // Case: Exception or network failure
        console.log('An error occurred:', error);
        setErrorMessage('An error occurred');
        setShowAlert(true);
        resetInputs();
      }
    }
  };
  useEffect(() => {
    if (searchDriver) {
      fetchDriver(searchDriver);
    }
  }, [searchDriver]);
  const fetchDriver = async (search) => {
    try {
      console.log('Fetching vehicle with search:', search);
      const encodedSearch = encodeURIComponent(search);
      const url = `https://exim.tranzol.com/api/DropDown/Driver?search=${encodedSearch}`;
      console.log('Request URL:', url);
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
        Authorization: `Basic ${apiTokenReceived}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
  
        if (data.DriverList) {
          // Corrected to use VehicleNoList
          const driverData = data.DriverList.map((Driver) => ({
            label: Driver.PartyName,
            value: Driver.Id,
            
          }));
          setDriverData(driverData);
        } else {
          console.log('DriverList missing in the response');
        }
      } else {
        console.log('Error in fetching DriverList no:', response.status);
      }
    } catch (error) {
      console.log('Error in fetching DriverList no:', error);
    }
  };
  useEffect(() => {
    if (searchVehicle) {
      fetchVehicle(searchVehicle);
    }
  }, [searchVehicle]);
  const fetchVehicle = async (search) => {
    try {
      console.log('Fetching vehicle with search:', search);
      const encodedSearch = encodeURIComponent(search);
      const url = `https://exim.tranzol.com/api/DropDown/VehicleNo?search=${encodedSearch}`;
      console.log('Request URL:', url);
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
        Authorization: `Basic ${apiTokenReceived}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
  
        if (data.VehicleNoList) {
          // Corrected to use VehicleNoList
          const vehicleData = data.VehicleNoList.map((vehicle) => ({
            label: vehicle.VehicleNo,
            value: vehicle.VehicleId,
            PANNumber:vehicle.PANNumber??'',
          }));
          setVehicleData(vehicleData);
        } else {
          console.log('VehicleNoList is missing in the response');
        }
      } else {
        console.log('Error in fetching vehicle no:', response.status);
      }
    } catch (error) {
      console.log('Error in fetching vehicle no:', error);
    }
  };
  
  useEffect(() => {
    if (selectedVehicleNo) {
      console.log('in useEffect', jobNo, selectedVehicleNo);
  
      const fetchOwnerName = async () => {
        try {
          console.log('Fetching JobOther:', selectedVehicleNo);
          const encodedSearch = encodeURIComponent(selectedVehicleNo);
          const url = `https://exim.tranzol.com/api/DropDown/VehicleNo?search=${encodedSearch}`;
          console.log('Request URL:', url);
  
          const response = await fetch(url, {
            method: 'GET',
            headers: {
            Authorization: `Basic ${apiTokenReceived}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data);
  
            if (data.VehicleNoList && data.VehicleNoList.length > 0) {
              
            setOwnerName(data.VehicleNoList[0].OwnerName)
            setOwnerId(data.VehicleNoList[0].OwnerId)
              console.log('ownerId:', data.VehicleNoList[0].OwnerId);
            } else {
              console.log('vehicle ownerlist is empty or missing in the response');
            }
          } else {
            console.log('Error in fetching owner name no:', response.status);
          }
        } catch (error) {
          console.log('Error in fetching owner name no:', error);
        }
      };
  
      fetchOwnerName(); // Call the function to fetch job details
    }
  }, [selectedVehicleNo]);
  
  // Function to fetch job numbers based on search input
  const fetchJob = async (search) => {
    try {
      console.log('Fetching jobs with search:', search);
      const encodedSearch = encodeURIComponent(search);
      const url = `https://exim.tranzol.com/api/DropDown/Jobno?search=${encodedSearch}`;
      console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
        Authorization: `Basic ${apiTokenReceived}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.JobList) {
          const jobData = data.JobList.map((job) => ({
            label: job.JobNo,
            value: job.JobId,
            ConsigneeId:job.ConsigneeId??'',
            ConsigneeName:job.ConsigneeName??'',
            ConsignorId:job.ConsignorId??'',
            ConsignorName:job.ConsignorName??'',
            LoadingPointId:job.LoadingPointId??'',
            MaterialName:job.MaterialName??'',
            LoadingPoint:job.LoadingPoint??'',
            UnloadingPoint:job.UnloadingPoint??'',
            UnloadingPointId:job.UnloadingPointId??'',            
          }));
          setJobData(jobData);
           console.log('Job data set:', jobData);
        } else {
          console.log('JobList is missing in the response');
        }
      } else {
        console.log('Error in fetching Job no:', response.status);
      }
    } catch (error) {
      console.log('Error in fetching job no:', error);
    }
  };
  useEffect(() => {
    if (searchTerm) {
      fetchJob(searchTerm);
    }
  }, [searchTerm]);
  useEffect(() => {
    if (selectedJobNo) {
      console.log('in useEffect', jobNo, selectedJobNo);
  
      const fetchJobOthers = async () => {
        try {
          console.log('Fetching JobOther:', selectedJobNo);
          const encodedSearch = encodeURIComponent(selectedJobNo);
          const url = `https://exim.tranzol.com/api/DropDown/Jobno?search=${encodedSearch}`;
          console.log('Request URL:', url);
  
          const response = await fetch(url, {
            method: 'GET',
            headers: {
            Authorization: `Basic ${apiTokenReceived}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data);
  
            if (data.JobList && data.JobList.length > 0) {
              const { LoadingPoint } = data.JobList[0]; // Get the first job's LoadingPoint
              // setLoadingPoint(LoadingPoint);
              // setUnLoadingPoint(data.JobList[0].UnloadingPoint)
              // setMaterialType(data.JobList[0].MaterialName)
              // setConsigneeType(data.JobList[0].ConsigneeName)
              // setConsignorType(data.JobList[0].ConsignorName)
              // setLoadingPointId(data.JobList[0].LoadingPointId)
              // setUnLoadingPointId(data.JobList[0].UnloadingPointId)
              // setConsignorId(data.JobList[0].ConsignorId)
              // setConsigneeId(data.JobList[0].ConsigneeId)
              // setMaterialId(data.JobList[0].MaterialId)
              // console.log('Loading Point:', LoadingPoint);
              // console.log('loading id',loadingPointId);
              // console.log('unloading id',unloadingPointId)
              // console.log('consignor id',consignorId)
              // console.log('consignee id',consigneeId)
              // console.log('material id',materialId)
            } else {
              console.log('JobList is empty or missing in the response');
            }
          } else {
            console.log('Error in fetching Job no:', response.status);
          }
        } catch (error) {
          console.log('Error in fetching job no:', error);
        }
      };
  
      fetchJobOthers(); // Call the function to fetch job details
    }
  }, [selectedJobNo]);
  const [selected, setSelected] = useState(true);

  const handleSelection = (value) => {
    setSelected(value);
  };
  const handleGenerateChallan=()=>{
    if(jobNo.length===0 && vehicleNo.length===0 && driverName.length===0){
     Alert.alert('Please select all fields','Job No, Vehicle No and Driver are required')
      handleShowToast()
    }else{
      navigation.navigate('NewChalan',{JobDetails:JobDetails,VEHICLENO:vehicleNo,VEHICLEID:vehicleId,DLNo:DLNo,PANNo:PANNo})
  }
}
  return (
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
    <ScrollView>
      {isLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '30%',
            marginBottom: 20,
          }}>
         
          <View
            style={{
              height: 200,
              width: '50%',
              alignItems: 'center',
              borderRadius: 10,
              shadowColor: 'black', // Set shadow color to blue
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 10, // This is for Android
            }}>
            <Image
              source={require('../assets/FG-loading.png')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                backgroundColor: darkBlue,
              }}
              resizeMode="contain"
            />
          </View>
           <SelectButton 
           isFirstSelected={selected}
              button1Text="Entry"
        button2Text="Check Details"
           onSelect={handleSelection} />
           {selected? (
            <>
           <View>
   <Text style={styles.levelText}>
          Job No <Text style={{color: 'red'}}>*</Text>
        </Text>
       
        
        <Dropdown
  style={styles.dropdown}
  placeholderStyle={styles.placeholderStyle}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  itemTextStyle={{color: 'black'}}
  data={jobData}  // Updated job data from API
  search
  maxHeight={300}
  labelField="label"
  valueField="value"
  placeholder={'Select Job No'}
  value={jobNo}
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  onChange={item => {
    setJobNo(item.value);  // Set selected job number
    setSelectedJobNo(item.label)
    setJobId(item.value)
     setJobDetails(item);
   // console.log('Selected Job ID:', item.value,selectedJobNo,item.label);  // Log the selected job ID
    setIsFocus(false);
  }}
  onChangeText={text => {
    setSearchTerm(text);  // Update searchTerm as user types
  }}
/>
         </View>

<View>
             <Text style={styles.levelText}>
                Vehicle No <Text style={{color: 'red'}}>*</Text>
              </Text>
        <Dropdown
  style={styles.dropdown}
  placeholderStyle={styles.placeholderStyle}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  itemTextStyle={{color: 'black'}}
  data={vehicleData}  // Updated job data from API
  search
  maxHeight={300}
  labelField="label"
  valueField="value"
  placeholder={'Select Vehicle No'}
  value={vehicleNo}
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  onChange={item => {
    setVehicleNo(item.value);  // Set selected job number
    setSelectedVehicleNo(item.label)
    setVehicleId(item.value)
    setPANNo(item.PANNumber??'')
    console.log('Selected Vehicle ID:', item.value,selectedVehicleNo,);  // Log the selected job ID
    setIsFocus(false);
  }}
  onChangeText={text => {
    setSearchVehicle(text);
  }}
/>
</View>
<View>
   <Text style={styles.levelText}>
          Driver<Text style={{color: 'red'}}>*</Text>
        </Text>
       
        
        <Dropdown
  style={styles.dropdown}
  placeholderStyle={styles.placeholderStyle}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  itemTextStyle={{color: 'black'}}
  data={driverData}  // Updated job data from API
  search
  maxHeight={300}
  labelField="label"
  valueField="value"
  placeholder={'Select Driver'}
  value={driverName}
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  onChange={item => {
    setDriverId(item.value),
    setDriverName(item.value)
    setIsFocus(false);
  }}
  onChangeText={text => {
    setSearchDriver(text);
  }}
/>
  <TouchableOpacity style={styles.button} onPress={handleGenerateChallan}>
            <Text style={styles.text}>Generate Challan</Text>
          </TouchableOpacity>
</View>
</>
):(
  <>
          <View
            style={[
              styles.inputContainer,
              {
                borderWidth: hasBorder ? 0.9 : 0,
                borderColor: hasBorder ? 'red' : 'transparent',
                backgroundColor: hasBorder ? 'red' : '#9894e6',
              },
            ]}>
            <Image
              style={styles.leftIcon}
              source={require('../assets/id-card.png')}
            />
            <TextInput
              placeholderTextColor={'black'}
              style={{
                paddingTop: 13,
                paddingLeft: 30,
                letterSpacing: 0.5,
                color: 'black',
                fontSize: 15,
                width: 250,
                fontFamily: 'PoppinsSemiBold',
              }}
              value={challanNumber}
              placeholder={'Enter Challan Number'}
              autoCorrect={false}
              onChangeText={text => setchallanNumber(text)}
            />
          </View>
   


          <TouchableOpacity style={styles.button} onPress={handleShowDetails}>
            <Text style={styles.text}>Show Challan Details</Text>
          </TouchableOpacity>
          </>
)}
          {/* <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontFamily: 'PoppinsMedium',
              }}>
              For New Challan Entry !{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NewChalan');
              }}>
              <Text
                style={{
                  color: darkBlue,
                  fontSize: 18,
                  // fontWeight: '500',
                  fontFamily: 'PoppinsBold',
                  fontWeight:'bold'
                }}>
                Click Here.
              </Text>
            </TouchableOpacity>
          </View> */}
      
        </View>
      )}
      <CustomAlert
        visible={showAlert} 
        message={errorMessage}
        onClose={closeAlert}
      />
      {/* {showToast && (
        <Animated.View
          style={[styles.toastContainer, {opacity: fadeAnim, zIndex: 999}]}>
          <Text style={styles.toastText}>{errorMessage}</Text>
        </Animated.View>
      )} */}
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 55,
    width: 300,
    backgroundColor: '#9894e6',
    // backgroundColor:"black",
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 30,
    // borderColor:'#5d92d4',
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  button: {
    backgroundColor: darkBlue,
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 20,
    height: 50,
    width: 300,
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
    borderRadius: 5,
    position: 'absolute',
    bottom: '17%', // Center vertically
    left: '26%', // Center horizontally
    transform: [{translateX: -50}, {translateY: -50}], // Center both horizontally and vertically
  },
  toastText: {
    color: 'red',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'PoppinsMedium',
    shadowColor: 'black', // Set shadow color to blue
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10, // This is for Android
  },
    dropdown: {
    height: 50,
    width: ScreenWidth * 0.8,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: '#9894e6',
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 15,
    color: textColor,
  },
  selectedTextStyle: {
    fontSize: 15,
    color: 'black',
    fontWeight:'bold'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    color: '#6c6f73',
  },
   levelText: {
    //alignItems: 'flex-start',
    padding: 5,
    marginLeft: '2%',
    color: 'black',
    fontSize: 13,
    fontFamily: 'PoppinsMedium',
    textAlign:'left'
  },
});

export default OwnerDetails;
