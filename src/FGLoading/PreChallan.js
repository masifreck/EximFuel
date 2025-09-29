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
import { inpurtbgcolor2, inputbgColor, textColor } from '../components/constant';
import { darkBlue } from '../components/constant';
import CalendarModal from '../components/Calander';
;
const ScreenWidth = Dimensions.get('window').width;
const OwnerDetails = () => {
  const navigation = useNavigation();
  const [challanNumber, setchallanNumber] = useState('');
  const [apiTokenReceived, setapiTokenReceived] = useState(null);
  AsyncStorage.getItem('Token')
    .then(token => {
      setapiTokenReceived(token);
    })
    .catch(error => {
      const TokenReceived = useApiToken();
      setapiTokenReceived(TokenReceived);
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
const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); 
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
  const [ownerName,setOwnerName]=useState('');
    const [ownerId,setOwnerId]=useState('');
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

  useEffect(() => {
    if (searchDriver) {
      fetchDriver(searchDriver);
    }
  }, [searchDriver]);
const fetchDriver = async (search) => {
  try {
    console.log('Fetching driver with search:', search);
    const encodedSearch = encodeURIComponent(search);
    const url = `https://exim.tranzol.com/api/OwnerApi/GetDriverList?name=${encodedSearch}`;
    console.log('Request URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${apiTokenReceived}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Driver API Response:', data);

      if (data.apiResult?.Result) {
        const driverData = data.apiResult.Result.map((driver) => ({
           label: `${driver.DriverName} (${driver.DlNumber ?? ''})`,
          value: driver.Id,           // 👈 Correct field
          DlNumber: driver.DlNumber ?? '',
        }));
        setDriverData(driverData);
      } else {
        console.log('Driver list missing in the response');
      }
    } else {
      console.log('Error fetching Driver list:', response.status);
    }
  } catch (error) {
    console.log('Error fetching Driver list:', error);
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
       // console.log('vehicle API Response:', data);
  
        if (data.VehicleNoList) {
          // Corrected to use VehicleNoList
          const vehicleData = data.VehicleNoList.map((vehicle) => ({
            label: vehicle.VehicleNo ,
            value: vehicle.VehicleId,
            PANNumber:vehicle.PANNumber??'',
            OwnerId:vehicle.OwnerId??'',
            
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
  const resetInputs1 = () => {
  setchallanNumber('');
  setPANNo('');
  setDLNo('');
  setSearchTerm('');
  setSearchVehicle('');
  setSearchDriver('');
  setSelectedJobNo('');
  setSelectedVehicleNo('');
  setOwnerName('');
  setOwnerId('');
  setVehicleId('');
  setDriverId('');
  setJobNo('');
  setVehicleNo('');
  setDriverName('');
  setSelectedDate(null);
  setJobDetails({});
};
const handleGenerateChallan = () => {
  if (
    (!jobNo || jobNo.length === 0) ||
    (!vehicleNo || vehicleNo.length === 0) ||
    (!driverName || driverName.length === 0) ||
    (!selectedDate || selectedDate.length === 0)
  ) {
    Alert.alert(
      'Please select all fields',
      'Job No, Vehicle No, Allotment Date and Driver are required'
    );
    handleShowToast();
  } else {
    navigation.navigate('preChallan', {
      JobDetails: JobDetails,
      VEHICLENO: selectedVehicleNo,
      VEHICLEID: vehicleId,
      DLNo: DLNo,
      PANNo: PANNo,
      driverName:driverName,
      driverId:driverId,
      ownerId:ownerId,
      selectedDate:selectedDate,
    });
    resetInputs1();
  }
};

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
            marginTop: '10%',
            marginBottom: 20,paddingBottom:50
          }}>
         
          <View
            style={{
              height: 200,
              width: '60%',
              alignItems: 'center',
              borderRadius: 10,
              shadowColor: 'black', // Set shadow color to blue
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 10, // This is for Android
              marginBottom:20
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
    setOwnerId(item.OwnerId??'')
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
  value={driverId}
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  onChange={item => {
    setDriverId(item.value),
    setDriverName(item.label)
    setDLNo(item.DlNumber??'')
    setIsFocus(false);
  }}
  onChangeText={text => {
    setSearchDriver(text);
  }}
/>
<Text style={styles.levelText}>Alloment Date
<Text style={{color: 'red'}}> *</Text></Text>    
<View
  style={[
    styles.inputContainer,
    {
      borderWidth: hasBorder ? 0.9 : 0,
      borderColor: hasBorder ? 'red' : 'transparent',
    },
  ]}
>

  {/* Display the selected date in the TextInput */}
  <TextInput
    placeholderTextColor={'#6c6f73'}
    style={{
      color: 'black',
      fontSize: 15,
      width: '85%',
      marginRight: 20,
    }}
    value={selectedDate}  // Bind selected date to TextInput value
    placeholder={'DD-MM-YYYY'}  // Default placeholder
    autoCorrect={false}
    editable={false}  // Non-editable since date is selected via the calendar
  />

  {/* Calendar icon to trigger the modal */}
  <TouchableOpacity onPress={() => setModalVisible(true)}>
    <Image
      style={styles.rightIcon}
      source={require('../assets/calendar.png')}
    />
  </TouchableOpacity>
</View>

{/* CalendarModal Component */}
<CalendarModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  onSelect={(date, convDate) => {
    setSelectedDate(convDate);  // Set the formatted date (YYYY-MM-DD)
    setModalVisible(false);
  }}
/>
  <TouchableOpacity style={styles.button} onPress={handleGenerateChallan}>
            <Text style={styles.text}>Check Details</Text>
          </TouchableOpacity>
</View>

</>
        </View>
      )}
      <CustomAlert
        visible={showAlert} 
        message={errorMessage}
        onClose={closeAlert}
      />
    
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
    levelText: {
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
    fontSize: 13,
    fontFamily: 'PoppinsMedium',
  },
  toastContainer: {
    borderRadius: 5,
    position: 'absolute',
    bottom: '17%', // Center vertically
    left: '26%', // Center horizontally
    transform: [{translateX: -50}, {translateY: -50}], // Center both horizontally and vertically
  },
   inputContainer: {
    height: 50,
    width: ScreenWidth * 0.8,
    backgroundColor: '#9894e6',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'black',
    alignSelf: 'center',
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
    rightIcon: {
    height: 30,
    width: 30,
  },
});

export default OwnerDetails;