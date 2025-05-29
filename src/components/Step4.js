import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApiToken from './Token';
import CustomFilePicker from './CustomFilePicker';
import CalendarModal from './Calander';
import { styles } from './Step4Styles';
import { data, LoadtypeData } from './DropDownData';
import { darkBlue } from './constant';
const Step4 = () => {
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
  const [isFocus, setIsFocus] = useState(false);


  const [jobNo,setJobNo]=useState('');
  const [vehicleNo,setVehicleNo]=useState('');
  const [driverName,setDriverName]=useState('')
  const [brokerName,setBrokerName]=useState('')
  const [associationName,setAssociationName]=useState('')
  const [jobId,setJobId]=useState('')
  const [ownerId,setOwnerId]=useState('')
const [truckSource,setTruckSource]=useState('')
  const [selectedJobNo,setSelectedJobNo]=useState('')
  const [selectedVehicleNo,setSelectedVehicleNo]=useState('');
  const [loadingPointId,setLoadingPointId]=useState('')
  const [unloadingPointId,setUnLoadingPointId]=useState('')
  const [vehicleId, setVehicleId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [brokerId, setBrokerId] = useState('');
  const [associationId, setAssociationId] = useState('');
  const [consigneeId, setConsigneeId] = useState(null);
  const [consignorId, setConsignorId] = useState(null);
  const [IsGps, setIsGps] = useState('');
  const [VehicleType, setVehicleType] = useState('');
  const [driverType,setDriverType]=useState('');
  const [brokerType, setBrokerType]=useState('');
  const [associationType,setAssociationType]=useState('');
  const [consignorType,setConsignorType]=useState('');
  const [consigneeType,setConsigneeType]=useState('');
  const [hasBorder, setHasBorder] = useState(false);
 const [loadingPoint,setLoadingPoint]=useState('');
  const [unLoadingPoint,setUnLoadingPoint]=useState('');
  const [grossWt,setGrossWt]=useState('');
  const [tierWt,setTierWt]=useState('');
  const [netWt,setNetWt]=useState('');
  const [loadType, setLoadType]=useState('');
  const [materialValue,setMaterialValue]=useState('');
  const [remarks,setRemarks]=useState('');
  const [attachment,setAttachment]=useState('');
  const [materialType,setMaterialType]=useState('')
  const [materialId,setMaterialId]=useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); //27/02/2024
  const [ConvSelectedStartDate, setConvSelectedStartDate] = useState(null); //2024-02-29
  const [ownerName,setOwnerName]=useState('')



  const fetchchallandata = () => {
    navigation.navigate('NewChalan', {
      vehicleId: vehicleId,
      driverId: driverId,
      brokerId: brokerId,
      associationId: associationId,
      consigneeId: consigneeId,
      consignorId: consignorId,
      IsGps: IsGps,
      VehicleType: VehicleType,
      
jobId:jobId,
selectedDate:selectedDate,
loadType:loadType,
materialValue:materialValue,
remarks:remarks,
tierWt:tierWt,
grossWt:grossWt,
netWt:netWt,
truckSource:truckSource,
ownerId:ownerId,
loadingPointId:loadingPointId,
unloadingPointId:unloadingPointId,
materialId,materialId,
      //PumpId: PumpId,
    });
  };
  useEffect(()=>{
    if(materialId){
      fetchchallandata()
    }
  },[materialId])
  useEffect(()=>{
    if(unloadingPointId){
      fetchchallandata()
    }
  },[unLoadingPoint])
  useEffect(()=>{
    if(loadingPointId){
      fetchchallandata()
    }
  },[loadingPointId])
  useEffect(()=>{
    if(ownerId){
      fetchchallandata()
    }
  },[ownerId])
  useEffect(()=>{
    if(truckSource){

    }
  },[truckSource])
  useEffect(()=>{
    if(netWt){
      fetchchallandata()
    }
  },[netWt])
  useEffect(()=>{
    if(grossWt){

    }
  },[grossWt])
  useEffect(()=>{
    if(tierWt){
      fetchchallandata()
    }
  },[tierWt])
  useEffect(()=>{
    if(materialValue){
      fetchchallandata()
    }
  },[materialValue])
  useEffect(()=>{
    if(remarks){

    }
  },[remarks])
useEffect(()=>{
  if(selectedDate){
    fetchchallandata()
  }
},[selectedDate])
useEffect(()=>{
  if(loadType){
    fetchchallandata()
  }
},[loadType])
useEffect(()=>{
  if(jobId){
    fetchchallandata()
  }
},[jobId])
  useEffect(() => {
    if (vehicleId) {
      fetchchallandata();
    }
  }, [vehicleId]);

  useEffect(() => {
    if (driverId) {
      fetchchallandata();
    }
  }, [driverId]);

  useEffect(() => {
    if (brokerId) {
      fetchchallandata();
    }
  }, [brokerId]);

  useEffect(() => {
    if (associationId) {
      fetchchallandata();
    }
  }, [associationId]);

  useEffect(() => {
    if (consigneeId) {
      fetchchallandata();
    }
  }, [consigneeId]);

  useEffect(() => {
    if (consignorId) {
      fetchchallandata();
    }
  }, [consignorId]);

  useEffect(() => {
    if (VehicleType) {
      fetchchallandata();
    }
  }, [VehicleType]);

  

  const [searchTerm, setSearchTerm] = useState('');
  const [searchVehicle,setSearchVehicle]=useState('')
  const [searchDriver,setSearchDriver]=useState('')
  const [searchBroker,setSearchBroker]=useState('')
  const [searchAssociation,setSearchAssociation]=useState('')

  const [jobData,setJobData]=useState([])
  const [vehicleData,setVehicleData]=useState([])
  const [driverData,setDriverData]=useState([])
  const [brokerData,setBrokerData]=useState([])
  const [associationData,setAssociationData]=useState([])

  const [isLoading, setIsLoading] = useState(false); 
  useEffect(() => {
    if (searchAssociation) {
      fetchAssociation(searchAssociation);
    }
  }, [searchAssociation]);
  const fetchAssociation = async (search) => {
    try {
      console.log('Fetching Association with search:', search);
      const encodedSearch = encodeURIComponent(search);
      const url = `https://exim.tranzol.com/api/DropDown/Association?search=${encodedSearch}`;
      console.log('Request URL:', url);
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Basic YWRtaW46YWRtaW5AMDc=',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
  
        if (data.Association) {
          // Corrected to use VehicleNoList
          const associationData = data.Association.map((association) => ({
            label: association.Association,
            value: association.Id,
          }));
          setAssociationData(associationData);
        } else {
          console.log('Association missing in the response');
        }
      } else {
        console.log('Error in fetching Association no:', response.status);
      }
    } catch (error) {
      console.log('Error in fetching Association no:', error);
    } 
  };
  useEffect(() => {
    if (searchBroker) {
      fetchBroker(searchBroker);
    }
  }, [searchBroker]);
  const fetchBroker = async (search) => {
    try {
      console.log('Fetching broker with search:', search);
      const encodedSearch = encodeURIComponent(search);
      const url = `https://exim.tranzol.com/api/DropDown/Broker?search=${encodedSearch}`;
      console.log('Request URL:', url);
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Basic YWRtaW46YWRtaW5AMDc=',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
  
        if (data.BrokerList) {
          // Corrected to use VehicleNoList
          const brokerData = data.BrokerList.map((broker) => ({
            label: broker.PartyName,
            value: broker.Id,
          }));
          setBrokerData(brokerData);
        } else {
          console.log('BROKER missing in the response');
        }
      } else {
        console.log('Error in fetching broker no:', response.status);
      }
    } catch (error) {
      console.log('Error in fetching broker no:', error);
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
          Authorization: 'Basic YWRtaW46YWRtaW5AMDc=',
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
          Authorization: 'Basic YWRtaW46YWRtaW5AMDc=',
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
              Authorization: 'Basic YWRtaW46YWRtaW5AMDc=',
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
          Authorization: 'Basic YWRtaW46YWRtaW5AMDc=',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.JobList) {
          const jobData = data.JobList.map((job) => ({
            label: job.JobNo,
            value: job.JobId,
          }));
          setJobData(jobData);
           
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
              Authorization: 'Basic YWRtaW46YWRtaW5AMDc=',
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data);
  
            if (data.JobList && data.JobList.length > 0) {
              const { LoadingPoint } = data.JobList[0]; // Get the first job's LoadingPoint
              setLoadingPoint(LoadingPoint);
              setUnLoadingPoint(data.JobList[0].UnloadingPoint)
              setMaterialType(data.JobList[0].MaterialName)
              setConsigneeType(data.JobList[0].ConsigneeName)
              setConsignorType(data.JobList[0].ConsignorName)
              setLoadingPointId(data.JobList[0].LoadingPointId)
              setUnLoadingPointId(data.JobList[0].UnloadingPointId)
              setConsignorId(data.JobList[0].ConsignorId)
              setConsigneeId(data.JobList[0].ConsigneeId)
              setMaterialId(data.JobList[0].MaterialId)
              console.log('Loading Point:', LoadingPoint);
              console.log('loading id',loadingPointId);
              console.log('unloading id',unloadingPointId)
              console.log('consignor id',consignorId)
              console.log('consignee id',consigneeId)
              console.log('material id',materialId)
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
  

  return (
    <View style={styles.container}>
      <View style={styles.levelContainer}>
        <Text style={styles.MandatoryText}>
          Mandatory Fields<Text style={{color: 'red'}}>*</Text>
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 8,
            marginTop: 8,
            color: darkBlue,
            textAlign: 'center',
            fontFamily: 'PoppinsBold',
          }}>
          Other Details
        </Text>
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
    
    console.log('Selected Job ID:', item.value,selectedJobNo,item.label);  // Log the selected job ID
    setIsFocus(false);
  }}
  onChangeText={text => {
    setSearchTerm(text);  // Update searchTerm as user types
  }}
/>

<Text style={styles.levelText}>Loading Point
          <Text style={{color: 'red'}}> *</Text>
          </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 20,
            }}
            value={loadingPoint}
            placeholder={'Loading Point Will Auto Fetch'}
            autoCorrect={false}
            onChangeText={text => setGrossWt(text)}
            editable={false}
          />
        </View>
        <Text style={styles.levelText}>Unloading Point
          <Text style={{color: 'red'}}> *</Text>
          </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 20,
            }}
            value={unLoadingPoint}
            placeholder={'Unloading Point Will Auto Fetch'}
            autoCorrect={false}
            onChangeText={text => setGrossWt(text)}
            editable={false}
          />
        </View>
        <Text style={styles.levelText}>Material
          <Text style={{color: 'red'}}> *</Text>
          </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 20,
            }}
            value={materialType}
            placeholder={'Material Will Auto Fetch'}
          
            autoCorrect={false}
            onChangeText={text => setGrossWt(text)}
            editable={false}
          />
        </View>
        <Text style={styles.levelText}>Consignor
          <Text style={{color: 'red'}}> *</Text>
          </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 20,
            }}
            value={consignorType}
            placeholder={'Consignor'}
            
            autoCorrect={false}
            onChangeText={text => setGrossWt(text)}
            editable={false}
          />
        </View>
    
        <Text style={styles.levelText}>Consignee
          <Text style={{color: 'red'}}> *</Text>
          </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 20,
            }}
        
            placeholder={'Consignee '}
            value={consigneeType}
            autoCorrect={false}
            onChangeText={text => setGrossWt(text)}
            editable={false}
          />
        </View>
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
    console.log('Selected Vehicle ID:', item.value,selectedVehicleNo,);  // Log the selected job ID
    setIsFocus(false);
  }}
  onChangeText={text => {
    setSearchVehicle(text);
  }}
/>
<Text style={styles.levelText}>Owner Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 20,
            }}
            placeholder={'Owner Name'}
            autoCorrect={false}
            editable={false}
            value={ownerName}
            
            onChangeText={text => setOwnerName(text)}
          />
        </View>
          <Text style={styles.levelText}>Gross Weight
          <Text style={{color: 'red'}}> *</Text>
          </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 20,
            }}
            placeholder={'Enter Gross WT'}
            autoCorrect={false}
            onChangeText={text => setGrossWt(text)}
          />
        </View>
        <Text style={styles.levelText}>Tare Weight
        <Text style={{color: 'red'}}> *</Text>
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 20,
            }}
            placeholder={'Enter Tare WT'}
            autoCorrect={false}
            onChangeText={text => setTierWt(text)}
          />
        </View>
        <Text style={styles.levelText}>Net Weight
        <Text style={{color: 'red'}}> *</Text>
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 20,
            }}
            placeholder={'Enter Net WT'}
            autoCorrect={false}
            onChangeText={text => setNetWt(text)}
          />
        </View>

        <Text style={styles.levelText}>Truck Source</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: 'black'}}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select '}
          value={truckSource}
          onChange={item => {
            setTruckSource(item.value);
            console.log('Truck Source',truckSource, item.value)
            setIsFocus(false);
          }}
        />
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
  <Text style={styles.levelText}>
          Broker  <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Dropdown
  style={styles.dropdown}
  placeholderStyle={styles.placeholderStyle}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  itemTextStyle={{color: 'black'}}
  data={brokerData}  // Updated job data from API
  search
  maxHeight={300}
  labelField="label"
  valueField="value"
  placeholder={'Select Broker'}
  value={brokerName}
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  onChange={item => {
    setBrokerName(item.value); 
    setBrokerId(item.value) // Set selected job number
   // setSelectedVehicleNo(item.label)
    //console.log('Selected Driver ID:', item.value,selectedVehicleNo,);  // Log the selected job ID
    setIsFocus(false);
  }}
  onChangeText={text => {
    setSearchBroker(text);
  }}
/>

        <Text style={styles.levelText}>
          Association <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Dropdown
  style={styles.dropdown}
  placeholderStyle={styles.placeholderStyle}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  itemTextStyle={{color: 'black'}}
  data={associationData}  // Updated job data from API
  search
  maxHeight={300}
  labelField="label"
  valueField="value"
  placeholder={'Select Association'}
  value={associationName}
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  onChange={item => {
    setAssociationName(item.value);
    setAssociationId(item.value)  // Set selected job number
   // setSelectedVehicleNo(item.label)
    console.log('Selected association ID:', item.value,);  // Log the selected job ID
    setIsFocus(false);
  }}
  onChangeText={text => {
    setSearchAssociation(text);
  }}
/>

          <Text style={styles.levelText}>
          Load Type<Text style={{color: 'red'}}>*</Text>
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: 'black'}}
          data={LoadtypeData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Load Type'}
          value={loadType}
          onChange={item => {
            setLoadType(item.value);
            setIsFocus(false);
          }}
          />
      <Text style={styles.levelText}>Load Date</Text>

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
  }}
/>



           <Text style={styles.levelText}>Material Value</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 20,
            }}
            placeholder={'Enter Material Value'}
            autoCorrect={false}
            onChangeText={text => setMaterialValue(text)}
          />
        </View>
        <Text style={styles.levelText}>Attachments</Text>
          <CustomFilePicker/>
  <Text style={styles.levelText}>Remarks</Text>
        <View style={[styles.inputContainer,{height:100}]}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 20,
            }}
            placeholder={'Add Remarks'}
            autoCorrect={false}
            onChangeText={text => setRemarks(text)}
          />
        </View>
      </View>
       </View>
  );
};



export default Step4;
