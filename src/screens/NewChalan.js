import { ScrollView, ActivityIndicator, Alert,View, TouchableOpacity, Text, StyleSheet,TextInput,Image, Dimensions,
  Switch
 } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { data, LoadtypeData } from '../components/DropDownData';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import CustomFilePicker from '../components/CustomFilePicker';
import CalendarModal from '../components/Calander';
import { darkBlue } from '../components/constant';
import {Dropdown} from 'react-native-element-dropdown';
import { styles } from './NewChallanStyles';
const ScreeWidth=Dimensions.get('window').width
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import CustomImagePicker from '../components/CustomFilePicker';
import StepIndicator from '../FGLoading/StepIndicator';
import SelectButton from '../components/SelectButton';
import CardType2 from '../FGLoading/CardType2';
import { is } from 'date-fns/locale';
import Searching from '../components/Searching';


const NewChalan = ({navigation,route}) => {
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

  
 const { params: { JobDetails, VEHICLENO, VEHICLEID, DLNo, PANNo } = {} } = useRoute();

console.log("Job Details from route:", JobDetails);
console.log("Vehicle No:", VEHICLENO);
console.log("Vehicle ID:", VEHICLEID);
console.log("DL No:", DLNo);
console.log("PAN No:", PANNo);

console.log('job no from route',JobDetails.label + '' , 'JOBID' ,JobDetails.value)
//   useEffect(()=>{
// if(JOBNO){
//   setJobNo(JOBNO)
// }
//   },[JOBNO])
  // State variables
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
 
  
  const [isStep1Visible, setIsStep1Visible]=useState(false);
  const [isFirstStep,setFirstSetp]=useState(true)
  const [isStep3,setIsStep3]=useState(false)
  const[delNo2,setDelNo2]=useState('')

  const [ChallanNo, setChallanNo] = useState('');
 // const [EwayBillNo, setEwayBillNo] = useState('');
 const [ewayBillNo,setEwayBillNo]=useState('')
 
  const [GpsNo, setGpsNo] = useState('');
  const [SlipNo, setSlipNo] = useState('');
  const [StoNo, setStoNo] = useState('');
  const [DelNo, setDelNo] = useState('');
  const [FreightTigerNo, setFreightTigerNo] = useState('');
  const [FreightRate, setFreightRate] = useState(null);
  const [Cash, setCash] = useState(0);
  const [HSD, setHSD] = useState('');
  const [BankAmount, setBankAmount] = useState(0);
  const [PumpId, setPumpId] = useState('');
  const [pumpsearch, setpumpsearch] = useState('');
  const [pumpData, setpumpData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [PumpName,setPumpName]=useState('')
  const [acName,setAcName]=useState('');
  const [AccountNo,setAccountNo]=useState('');
  const [Ifsc, setIfsc]=useState('');
  const [clientInvoice1,setClientInvoice1]=useState('');
  const [clientInvoice2,setClientInvoice2]=useState('');
  const [clientInvoice3,setClientInvoice3]=useState('');
  const [inputVisible2,setInputVisible2]=useState(false);
  const [inputVisible3,setInputVisible3]=useState(false);
  const [isVisibleEWaybill2,setIsVisibleEWaybill2]=useState(false);
  const [isVisibleEWaybill3,setIsVisibleEWaybill3]=useState(false);

  const [otherExpence,setOtherExpence]=useState(0);
  const [detention,setDetention]=useState('')
 
  const [openQRScanner1,setOpenQRScanner1]=useState(false);



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
  const [guaranteewt,setGuaranteeWt]=useState('')

  const [ewayBillNo1,setEwayBillNo1]=useState('')
  const [ewayBillNo2,setEwayBillNo2]=useState('');
  const [ewayBillNo3,setEwayBillNo3]=useState('');
  const [ChallanDoc,setChallanDoc]=useState();
  const [InvoiceDoc,setInvoiceDoc]=useState();

   const [isOtherAccount, setIsOtherAccount] = useState(false);
  const HandleInput2=()=>{
    setInputVisible2(!inputVisible2)
    setClientInvoice2('')
  }
  const HandleInput3=()=>{
    setInputVisible3(!inputVisible3)
    setClientInvoice3('')
  }
  const HandleEwaybill2 = () => {
    setIsVisibleEWaybill2(prevState => !prevState);
  };
  useEffect(() => {

  }, [isVisibleEWaybill2]);
  
  const HandleEwaybill3 = () => {
    setIsVisibleEWaybill3(prevState => !prevState); 
  };

  
 const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  if (PANNo  && apiTokenReceived) {
    const fetchOwnerDetails = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://Exim.Tranzol.com/api/OwnerApi/GetOwner?panNo=${PANNo}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",   // ✅ correct for GET
              Authorization: `Basic ${apiTokenReceived}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Owner API Response:", data);

        if (data?.apiResult?.StatusCode === 200 && data.apiResult.Result) {
          setOwnerData(data.apiResult.Result);
        } else {
          Alert.alert("Error", data?.apiResult?.Error || "No owner details found.");
        }
      } catch (error) {
        console.error("Error fetching owner details:", error);
        Alert.alert("Error", "Failed to fetch owner details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerDetails();
  }
}, [PANNo,]);





const convertDateFormat = (dateString) => {
  const [day, month, year] = dateString.split('/'); // Split by "/"
  return `${year}-${month}-${day}`;  // Rearrange to "YYYY-MM-DD"
};


useEffect(() => {
  try {
    if (route.params?.scannedEwayBillNo) {
      const ewayBillNo1 = route.params.scannedEwayBillNo.split('/')[0]; // Extract value before '/'
      setEwayBillNo1(ewayBillNo1);
    }

    if (route.params?.scannedClientInvoice1) {
      try {
        const clientInvoice1 = jwtDecode(route.params.scannedClientInvoice1);
        const lm = JSON.parse(clientInvoice1.data);
        const formattedDate = convertDateFormat(lm.DocDt);  
        setClientInvoice1(lm.DocNo);
        setSelectedDate(formattedDate);
        setMaterialValue(String(lm.TotInvVal));
      } catch (error) {
        Alert.alert('Invalid QR Code', 'The scanned QR code for Client Invoice 1 is not a valid JWT.');
      }
    }

    if (route.params?.scannedClientInvoice2) {
      try {
        const clientInvoice2 = jwtDecode(route.params.scannedClientInvoice2);
        const lm = JSON.parse(clientInvoice2.data);
        setClientInvoice2(lm.DocNo);
      } catch (error) {
        Alert.alert('Invalid QR Code', 'The scanned QR code for Client Invoice 2 is not a valid JWT.');
      }
    }

    if (route.params?.scannedClientInvoice3) {
      try {
        const clientInvoice3 = jwtDecode(route.params.scannedClientInvoice3);
        const lm = JSON.parse(clientInvoice3.data);
        setClientInvoice3(lm.DocNo);
      } catch (error) {
        Alert.alert('Invalid QR Code', 'The scanned QR code for Client Invoice 3 is not a valid JWT.');
      }
    }

    if (route.params?.scannedEwayBillNo2) {
      const ewayBillNo2 = route.params.scannedEwayBillNo2.split('/')[0]; // Extract value before '/'
      setEwayBillNo2(ewayBillNo2);
    }

    if (route.params?.scannedEwayBillNo3) {
      const ewayBillNo3 = route.params.scannedEwayBillNo3.split('/')[0]; // Extract value before '/'
      setEwayBillNo3(ewayBillNo3);
    }
  } catch (error) {
    console.error('Error decoding JWT or processing QR code:', error);
    Alert.alert('Error', 'An unexpected error occurred while processing the QR code.');
  }
}, [
  route.params?.scannedEwayBillNo,
  route.params?.scannedClientInvoice1,
  route.params?.scannedClientInvoice2,
  route.params?.scannedClientInvoice3,
  route.params?.scannedEwayBillNo2,
  route.params?.scannedEwayBillNo3
]);

  


  const [searchTerm, setSearchTerm] = useState('');
  const [searchVehicle,setSearchVehicle]=useState('')
  const [searchDriver,setSearchDriver]=useState('')
  const [searchBroker,setSearchBroker]=useState('')
  const [searchAssociation,setSearchAssociation]=useState('')
  const [searchLoading,setSearchLoading]=useState('');
  const [searchUnloading,setSearchUnloading]=useState('');
  const [searchMaterial,setSearchMaterial]=useState('')

  const [jobData,setJobData]=useState([])
  const [vehicleData,setVehicleData]=useState([])
  const [driverData,setDriverData]=useState([])
  const [brokerData,setBrokerData]=useState([])
  const [associationData,setAssociationData]=useState([])
  const [loadingData,setLoadingData]=useState([]);
    const [unloadingData,setUnloadingData]=useState([]);
    const [materialData,setMaterialDate]=useState([])
     const [selected, setSelected] = useState(true);
  
  const onPaymentStepComplete = async () => {

    const postData1 = {
      ChallanNo: ChallanNo.toString(),
      ewayBillNo1,
      ewayBillNo2,
      ewayBillNo3,
      clientInvoiceNo1: clientInvoice1,
      clientInvoiceNo2: clientInvoice2,
      clientInvoiceNo3: clientInvoice3,
      gpsNo: GpsNo,
      SlipNo,
      StoNo,
      delNo: DelNo,
      freightTigerNo: FreightTigerNo || 0,
      freightRate: FreightRate || parseInt(FreightRate),
      cash: parseInt(Cash),
      bankAmount: parseInt(BankAmount),
      hsd: HSD || 0,
      detention: detention || 0,
      pumpId: PumpId || 0,
      accountholderName: acName,
      ifscCode: Ifsc,
      otherExpense: otherExpence,
    };

    setData1(postData1);
  };
  const imageSource = inputVisible2 
  ? require('../assets/removedel.png') 
  : require('../assets/add.png');
  const imageSource2 = inputVisible3
  ? require('../assets/removedel.png') 
  : require('../assets/add.png');
  const imageSource3 = isVisibleEWaybill2 
  ? require('../assets/removedel.png') 
  : require('../assets/add.png');
  const imageSource4 = isVisibleEWaybill3
  ? require('../assets/removedel.png') 
  : require('../assets/add.png');
const [searchPump,setSearchPump]=useState('');
  

const onSubmitSteps = () => {
  // Perform all validation checks
  if (!jobId) {
    Alert.alert('Validation Error', 'Please Select Job No');
    return false;
  }
  if (!vehicleId) {
    Alert.alert('Validation Error', 'Please Select Vehicle No');
    return false;
  }
  if (!netWt) {
    Alert.alert('Validation Error', 'Please Enter Net Weight');
    return false;
  }
  if (!driverId) {
    Alert.alert('Validation Error', 'Please Select Driver');
    return false;
  }
  if (!truckSource) {
    Alert.alert('Validation Error', 'Please Truck Source');
    return false;
  }
  if (!selectedDate) {
    Alert.alert('Validation Error', 'Please Select Load Date');
    return false;
  }

  // Prepare the postData2 object
  const postData2 = {
    vehicleId: vehicleId ? parseInt(vehicleId, 10) : null,
    driverId: driverId ? parseInt(driverId, 10) : null,
    brokerId: brokerId ? parseInt(brokerId, 10) : null,
    associationId: associationId ? parseInt(associationId, 10) : null,
    consigneeId: consigneeId ? parseInt(consigneeId, 10) : null,
    consignorId: consignorId ? parseInt(consignorId, 10) : null,
    loadType: loadType || '',  // Assuming it's a string
    VehicleType: VehicleType || '',  // Assuming it's a string
    jobId: jobId ? parseInt(jobId, 10) : null,
    loadDate: selectedDate || null,
    materialValues: materialValue || '',
    tareWt: tierWt ? parseFloat(tierWt) : 0,
    grossWt: grossWt ? parseFloat(grossWt) : 0,
    netWt: netWt ? parseFloat(netWt) : 0,
    truckSource: truckSource || '',  // Assuming it's a string
    ownerId: ownerId ? parseInt(ownerId, 10) : null,
    loadingPointId: loadingPointId ? parseInt(loadingPointId, 10) : null,
    unloadingPointId: unloadingPointId ? parseInt(unloadingPointId, 10) : null,
    materialId: materialId ? parseInt(materialId, 10) : null,
  };

  // Set the data2 state with the prepared postData2 object
  setData2(postData2);

  // Merge data1 and data2 using spread operator
  setTimeout(() => {
    const mergedData = {
      ...data1,   // Existing data1
      ...postData2 // New data2 (postData2)
    };

    console.log('Merged data:', mergedData); // Log the merged data
    // You can now use this merged data as required for further operations
  }, 100);

  return true; // Return true if all validations pass
};
const HandleSubmit = async () => {
  const postData = {
    ChallanNo: ChallanNo ? ChallanNo.toString() : '',
    EwayBillNo1: ewayBillNo1 || '',
    EwayBillNo2: ewayBillNo2 || '',
    EwayBillNo3: ewayBillNo3 || '',
    ClientInvoiceNo1: clientInvoice1 || '',
    ClientInvoiceNo2: clientInvoice2 || '',
    ClientInvoiceNo3: clientInvoice3 || '',
    GPSNo: GpsNo || '',
    DelNo: DelNo || '',
    FreightTigerNo: FreightTigerNo ? FreightTigerNo.toString() : '',
    FreightRate: FreightRate ? parseFloat(FreightRate) : 0,
    Cash: Cash ? parseInt(Cash) : 0,
    BankAmount: BankAmount ? parseInt(BankAmount) : 0,
    HSD: HSD ? parseFloat(HSD) : 0,
    Detention: detention ? parseInt(detention) : 0,
    PumpId: PumpId ? PumpId.toString() : null,
    AccountholderName: acName || '',
    IfscCode: Ifsc || '',
    OtherExpense: otherExpence ? parseFloat(otherExpence) : 0,
    VehicleId: vehicleId ? parseInt(vehicleId, 10) : null,
    DriverId: driverId ? parseInt(driverId, 10) : null,
    BrokerId: brokerId ? parseInt(brokerId, 10) : null,
    AssociationId: associationId ? parseInt(associationId, 10) : null,
    ConsigneeId: consigneeId ? parseInt(consigneeId, 10) : null,
    ConsignorId: consignorId ? parseInt(consignorId, 10) : null,
    LoadType: loadType || '',
    VehicleType: VehicleType || '',
    JobId: jobId ? parseInt(jobId, 10) : null,
    LoadDate: selectedDate || null,
    MaterialValues: materialValue || '',
    TareWt: tierWt ? parseFloat(tierWt) : 0,
    GrossWt: grossWt ? parseFloat(grossWt) : 0,
    NetWt: netWt ? parseFloat(netWt) : 0,
    TruckSource: truckSource || '',
    OwnerId: ownerId ? parseInt(ownerId, 10) : null,
    LoadingPointId: loadingPointId ? parseInt(loadingPointId, 10) : null,
    UnloadingPointId: unloadingPointId ? parseInt(unloadingPointId, 10) : null,
    MaterialId: materialId ? parseInt(materialId, 10) : null,
    GuaranteeWt: guaranteewt ? parseFloat(guaranteewt) : 0,
    Remarks:remarks || '',
    AccountNo:AccountNo ? AccountNo : 0

  };
  
  // Convert postData to FormData
  const formData = new FormData();
  Object.keys(postData).forEach(key => {
    if (postData[key] !== null) {
      formData.append(key, postData[key]); // Append values as is
    }
  });
  
  // Append documents if they exist
  if (ChallanDoc) {
    formData.append('ChallanDoc', {
      uri: ChallanDoc.uri,
      type: ChallanDoc.type, // Ensure correct MIME type is set
      name: ChallanDoc.name,
    });
  }
  
  if (InvoiceDoc) {
    formData.append('InvoiceDoc', {
      uri: InvoiceDoc.uri,
      type: InvoiceDoc.type, // Ensure correct MIME type is set
      name: InvoiceDoc.name,
    });
  }
  
  // Now you can send formData in your API request
  console.log('sending Data', formData);
  
  // Submit the FormData to the provided URL
  try {
    const response = await fetch('https://exim.tranzol.com/api/LoadingChallan/FinishFileUpload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure this for FormData
        Authorization: `Basic ${apiTokenReceived}`,
 
      },
    });
console.log('Api Response',response)
    if (response.ok) {
      const responseText = await response.text(); // Get raw response text
      console.log('Server Response:', responseText); // Log the success message
      Alert.alert('Success', responseText); // Show an alert with the server's message
      navigation.navigate('FGLoading')
    } else {
      console.error('Server returned an error:', response.status, response.statusText);
      Alert.alert('Error', `Server error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error submitting data:', error);
    Alert.alert('Error', 'Failed to submit data');
  }
};


const HandleNext1 = async () => {
  try {
    setIsStep1Visible(true);   // ✅ Correct setter
    setFirstSetp(false);     // ✅ Correct setter
  } catch (err) {
    Alert.alert('Error', 'In moving on to step 2');
    console.log(err);
  }
};

const HandleNext = async () => {
  // Perform validation before proceeding
  if (!ChallanNo) {
    Alert.alert('Validation Error', 'Challan No is Mandatory');
    return;
  }

  if (!FreightRate) {
    Alert.alert('Validation Error', 'Freight Rate is Mandatory');
    return;
  }
 {/* if (!selectedDate) {
    Alert.alert('Validation Error', 'Please Select Load Date');
    return false;
  }*/}

  const postData1 = {
    ChallanNo: ChallanNo ? ChallanNo.toString() : null,
    ewayBillNo1: ewayBillNo1 || '',
    ewayBillNo2: ewayBillNo2 || '',
    ewayBillNo3: ewayBillNo3 || '',
    clientInvoiceNo1: clientInvoice1 || '',
    clientInvoiceNo2: clientInvoice2 || '',
    clientInvoiceNo3: clientInvoice3 || '',
    gpsNo: GpsNo || '',
    delNo: DelNo || '',
    freightTigerNo: FreightTigerNo ? FreightTigerNo.toString() : '',
    freightRate: FreightRate ? parseFloat(FreightRate) : null,
    cash: Cash ? parseInt(Cash) : null,
    bankAmount: BankAmount ? parseInt(BankAmount) : null,
    hsd: HSD ? parseFloat(HSD) : null,
    detention: detention ? parseInt(detention) : null,
    pumpId: PumpId ? PumpId : null,
    accountholderName: acName || '',
    ifscCode: Ifsc || '',
    otherExpense: otherExpence ? parseFloat(otherExpence) : 0,
  };

  setData1(postData1);
  
  // Delay navigation to ensure state is updated before moving to the next step
  setTimeout(() => {
    setIsStep1Visible(false);
    setIsStep3(true);
  
  }, 100);
  console.log('data1',data1)
};

  const closeAlert = () => {
    setShowAlert(false);
  };
//////////////Next page Method /////////////////////////////////////////////////////////////////////




const HandlePrevious = async () => {
  try {
    setIsStep1Visible(true);
    setIsStep3(false);
  } catch (error) {
    console.error('Error retrieving data from local storage', error);
    Alert.alert('Error', 'Failed to load data');
  }
};
const HandleReset = async () => {
  try {
    // Remove the saved data from AsyncStorage
    await AsyncStorage.removeItem('formDataStep1');
    
    // Reset all state values to empty or default values
    setChallanNo('');
    setEwayBillNo1('');
    setEwayBillNo2('');
    setEwayBillNo3('');
    setClientInvoice1('');
    setClientInvoice2('');
    setClientInvoice3('');
    setGpsNo('');
    setSlipNo('');
    setStoNo('');
    setDelNo('');
    setFreightTigerNo('');
    setFreightRate(null); // assuming this is a number
    setCash(null);        // assuming this is a number
    setBankAmount(null);  // assuming this is a number
    setHSD(null);         // assuming this is a number
    setDetention(null);   // assuming this is a number
    setPumpId(null);   // assuming this is an ID or a value that can be null
    setAcName('');
    setIfsc('');
    setOtherExpence(null); // assuming this is a number

    console.log('Form reset and local storage cleared');
  } catch (error) {
    console.error('Error resetting data', error);
    Alert.alert('Error', 'Failed to reset data');
  }
};

//////////////*****************DROP DOWN APIS  *///////////////////////////////////////////////////////////////

useEffect(() => {
  if (searchPump) {
    fetchPump(searchPump);
  }
}, [searchPump]);
const fetchPump = async (search) => {
  try {
    console.log('Fetching Association with search:', search);
    const encodedSearch = encodeURIComponent(search);
    const url = `https://exim.tranzol.com/api/DropDown/Pumpname?search=${encodedSearch}`;
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

      if (data.PumpList) {
        // Corrected to use VehicleNoList
        const pumpData = data.PumpList.map((pump) => ({
          label: pump.PumpName,
          value: pump.Id,
        }));
        setpumpData(pumpData);
      } else {
        console.log('PUMP missing in the response');
      }
    } else {
      console.log('Error in fetching PUMP no:', response.status);
    }
  } catch (error) {
    console.log('Error in fetching pump no:', error);
  }
};

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
        Authorization: `Basic ${apiTokenReceived}`,
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
        Authorization: `Basic ${apiTokenReceived}`,
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
            Authorization: `Basic ${apiTokenReceived}`,
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
useEffect(() => {
  if (searchLoading) {
    fetchLoading(searchLoading);
  }
}, [searchLoading]);
useEffect(() => {
  if (searchUnloading) {
    fetchUnLoading(searchUnloading);
  }
}, [searchUnloading]);
useEffect(() => {
  if (searchMaterial) {
    fetchMaterial(searchMaterial);
  }
}, [searchMaterial]);
const fetchMaterial = async (search) => {
  try {
    console.log('Fetching loading with search:', search);
    const encodedSearch = encodeURIComponent(search);
    const url = `https://exim.tranzol.com/api/DropDown/Material?search=${encodedSearch}`;
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
      
      if (data.MaterialList) {
        const loadData = data.MaterialList.map((load) => ({
          label: load.MaterialName,
          value: load.Id,
        }));
        setMaterialDate(loadData);
         
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
const fetchUnLoading = async (search) => {
  try {
    console.log('Fetching loading with search:', search);
    const encodedSearch = encodeURIComponent(search);
    const url = `https://exim.tranzol.com/api/DropDown/UnloadingPoint?search=${encodedSearch}`;
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
      
      if (data.UnloadingPoints) {
        const loadData = data.UnloadingPoints.map((load) => ({
          label: load.Unloading,
          value: load.Id,
        }));
        setUnloadingData(loadData);
         
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

const fetchLoading = async (search) => {
  try {
    console.log('Fetching loading with search:', search);
    const encodedSearch = encodeURIComponent(search);
    const url = `https://exim.tranzol.com/api/DropDown/LoadingPoint?search=${encodedSearch}`;
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
      
      if (data.LoadingPoints) {
        const loadData = data.LoadingPoints.map((load) => ({
          label: load.Loading,
          value: load.Id,
        }));
        setLoadingData(loadData);
         
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
  const toggleSwitch = () => setIsOtherAccount(prev => !prev);
  return (
    <ScrollView style={{backgroundColor: 'white',paddingVertical:30,width:'100%'}}>
      <View style={{justifyContent:'center',alignItems:'center',width:'100%',flex:1}}>
        
         <StepIndicator
        isFirstStep={isFirstStep}
        isStep1Visible={isStep1Visible}
        isStep3={isStep3}
      />
      
      {isFirstStep?(
  <View style={styles.container}>
    
       
       <View style={styles.levelContainer}>
         <SelectButton onSelect={setSelected} isFirstSelected={selected} />
          <Text style={styles.levelText}>
           Challan No <Text style={{color: 'red'}}>*</Text>
         </Text>
         <View style={[styles.inputContainer,{marginBottom:15}]}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '80%',
               marginRight: 20,
             }}
             value={ChallanNo}
             placeholder={'Enter Challan No'}
             autoCorrect={false}
             onChangeText={text => setChallanNo(text)}
           />
         </View>
         </View>
             <View style={styles.levelContainer}>
         <View style={{marginTop:10}}>
         <CardType2
         heading='VEHICLE DETAILS'
         title='VEHICLE NO'
         value='MH12AB1234'
         borderTopLeftRadius={15}
         borderTopRightRadius={15}
         />
              <CardType2
         
         title='Verification'
         value='Yes'
         />
              <CardType2
         
         title='Validity'
         value='25-05-2026'
         borderBottomLeftRadius={16}
         borderBottomRightRadius={16}
         />
         </View>
         <View style={{marginTop:10,elevation:4}}>
            {loading? (
            <Searching/>
          ):(
            <>
          <CardType2
          heading='OWNER DETAILS'
          title='Name'
          value='Dummy Name'
               borderTopLeftRadius={15}
         borderTopRightRadius={15}
          />
            <CardType2
        title="Address"
        value="123, Dummy Street, Test City, 567890"
      />
      <CardType2
        title="Primary Contact"
        value="9876543210"
        isNVerify={true}
      />
      <CardType2
        title="Secondary Contact"
        value="9123456789"
          isNVerify={true}
      />
      <CardType2
  heading="BANK DETAILS"
  title="Account Number"
  value="123451234"
/>
<CardType2
  title="IFSC Code"
  value="HDFC0001234"
/>
<CardType2
  title="Bank Name"
  value="HDFC Bank"
/>

      <CardType2
        title="PAN No"
        value="ABCDE1234F"
          borderBottomLeftRadius={16}
         borderBottomRightRadius={16}
      />
    </> )}
         </View>
         <View style={{marginTop:10,marginBottom:10}}>
          <CardType2
  heading="DRIVER DETAILS"
  title="Name"
  value="John Doe"
        borderTopLeftRadius={15}
         borderTopRightRadius={15}
/>
<CardType2
  title="Primary Contact"
  value="9876543210"
  isNVerify={true}
/>
<CardType2
  title="Secondary Contact"
  value="9123456789"
  isNVerify={true}
/>
<CardType2
  title="Address"
  value="123 Transport Lane, Test City"
/>
<CardType2
  title="DL No"
  value="DL1234567890"
          borderBottomLeftRadius={16}
         borderBottomRightRadius={16}
/>

         </View>
         <View style={{marginTop:10,marginBottom:20}}>
          <CardType2
  heading="JOB DETAILS"
  title="Loading"
  value={JobDetails?.LoadingPoint? JobDetails.LoadingPoint : 'N/A'}
          borderTopLeftRadius={15}
         borderTopRightRadius={15}
/>

<CardType2
  title="Unloading"
  value={JobDetails?.UnloadingPoint? JobDetails.UnloadingPoint :'N/A'}
/>

<CardType2
  title="Consignor"
  value={JobDetails?.ConsignorName? JobDetails.ConsignorName :'N/A'}
/>

<CardType2
  title="Consignee"
  value={JobDetails?.ConsigneeName? JobDetails.ConsigneeName : 'N/A'}
/>

<CardType2
  title="Material"
  value={JobDetails?.MaterialName? JobDetails.MaterialName :'N/A'}
    borderBottomLeftRadius={16}
         borderBottomRightRadius={16}
/>

         </View>
        </View>
         
             <View style={{flexDirection:'row',justifyContent:'space-between',
          alignItems:'center',gap:130,paddingBottom:50
        }}>
        <TouchableOpacity
        onPress={HandleReset}
        style={[styles.btn,{marginBottom:50}]}>
        <Text style={styles.btntext}>Reset</Text>
      </TouchableOpacity>
<TouchableOpacity
  onPress={HandleNext1}
  style={[styles.btn,{marginBottom:50}]}>
  <Text style={styles.btntext}>Next</Text>
</TouchableOpacity>
</View>
       </View>
       
      ) :
      
      isStep1Visible? (
       <View style={styles.container}>
       <View style={styles.levelContainer}>
       {openQRScanner1 && (
           <View style={{flex:1}}>
           <CustomQRCode/>
           </View>
         )}
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
           Identification Information
         </Text>
       
       
 
         
         <Text style={styles.levelText}>E-Way Bill No 1</Text>
         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',
             paddingHorizontal: 15,
           }}>
         <View style={styles.inputContainerforbtn}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '60%',
               marginRight: 20,
               
             }}
             placeholder={'Enter E-Way Bill No 1'}
             autoCorrect={false}
            value={ewayBillNo1}
            onChangeText={text =>setEwayBillNo1(text)}
           />
             <TouchableOpacity onPress={()=>navigation.navigate('externalscanner',{field:1})}>
           <Image
             style={{width:50,height:50,}}
             source={require('../assets/scannere.jpg')}
           />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate('QRScanner',{field:1})}>
           <Image
             style={styles.rightIcon}
             source={require('../assets/qr-code.png')}
           />
           
           </TouchableOpacity>
          
           </View>
          
         </View>
       
        
         <Text style={styles.levelText}>Client Invoice 1</Text>
         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',
             paddingHorizontal: 15,
           }}>
         <View style={styles.inputContainerforbtn}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '60%',
               marginRight: 20,
             }}
             value={clientInvoice1}
             placeholder={'Client Invoice 1'}
             autoCorrect={false}
             onChangeText={text => setClientInvoice1(text)}
           />
            <TouchableOpacity onPress={()=>navigation.navigate('externalscanner',{field:2})}>
           <Image
             style={{width:50,height:50,}}
             source={require('../assets/scannere.jpg')}
           />
           </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('QRScanner',{field:2})}>
           <Image
             style={styles.rightIcon}
             source={require('../assets/qr-code.png')}
           />
           </TouchableOpacity>
         </View>
 
         </View>
 
    

<Text style={styles.levelText}>Load Date
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
            value={materialValue}
            placeholder={'Enter Material Value'}
            autoCorrect={false}
            onChangeText={text => setMaterialValue(text)}
            
            
          />
        </View>     
         <Text style={styles.levelText}>Del No</Text>
         <View style={styles.inputContainer}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '80%',
               marginRight: 20,
             }}
             placeholder={'Enter Del No'}
             autoCorrect={false}
             onChangeText={text => setDelNo(text)}
             value={DelNo}
           />
         </View>
         <Text style={styles.levelText}>GPS No</Text>
         <View style={styles.inputContainer}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '80%',
               marginRight: 20,
             }}
             placeholder={'Enter GPS No'}
             autoCorrect={false}
             onChangeText={text => setGpsNo(text)}
             value={GpsNo}
           />
         </View>
 
         <Text style={styles.levelText}>Freight Tiger No </Text>
         <View style={styles.inputContainerend}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '80%',
               marginRight: 20,
             }}
             placeholder={'Enter Freight Tiger No'}
             autoCorrect={false}
             onChangeText={text => setFreightTigerNo(text)}
             value={FreightTigerNo}
             
           />
         </View>
         <Text
           style={{
             fontSize: 18,
             marginBottom: 8,
             marginTop: 8,
             color: darkBlue,
             textAlign: 'center',
             fontFamily: 'PoppinsBold',
           }}>
           Financial Information
         </Text>
         <Text style={styles.levelText}>Freight Rate<Text style={{color: 'red'}}>*</Text></Text>
         <View style={styles.inputContainer}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '100%',
             }}
             placeholder={'0.00'}
             autoCorrect={false}
             onChangeText={text => setFreightRate(text)}
             value={FreightRate}
             keyboardType='numeric'
           />
         </View>
         <Text style={styles.levelText}>Cash</Text>
         <View style={styles.inputContainer}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '100%',
             }}
             placeholder={'0.00'}
             autoCorrect={false}
             onChangeText={text => setCash(text)}
             value={Cash}
             keyboardType='numeric'
           />
         </View>
         <Text style={styles.levelText}>Petrol pump</Text>
         <Dropdown
   style={styles.dropdown}
   placeholderStyle={styles.placeholderStyle}
   selectedTextStyle={styles.selectedTextStyle}
   inputSearchStyle={styles.inputSearchStyle}
   itemTextStyle={{color: 'black'}}
   data={pumpData}  // Updated job data from API
   search
   maxHeight={300}
   labelField="label"
   valueField="value"
   placeholder={'Select Petrol Pump'}
   value={PumpName}
   onFocus={() => setIsFocus(true)}
   onBlur={() => setIsFocus(false)}
   onChange={item => {
     setPumpName(item.value);
     setPumpId(item.value)  // Set selected job number
    // setSelectedVehicleNo(item.label)
     //console.log('Selected Driver ID:', item.value,selectedVehicleNo,);  // Log the selected job ID
     setIsFocus(false);
   }}
   onChangeText={text => {
     setSearchPump(text);
     console.log('pump search',searchPump)
   }}
 />
         <Text style={styles.levelText}>HSD</Text>
         <View style={styles.inputContainer}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '100%',
             }}
             placeholder={'0.00'}
             autoCorrect={false}
             onChangeText={text => setHSD(text)}
             value={HSD}
             keyboardType='numeric'
           />
         </View>
         <Text style={styles.levelText}>Other Expense</Text>
         <View style={styles.inputContainer}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '100%',
             }}
             placeholder={'Other Expense'}
             autoCorrect={false}
             onChangeText={text => setOtherExpence(text)}
             value={otherExpence}
              keyboardType='numeric'
           />
         </View>
         <Text style={styles.levelText}>Detention</Text>
         <View style={styles.inputContainer}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '100%',
             }}
             placeholder={'Enter Detention'}
             autoCorrect={false}
             onChangeText={text => setDetention(text)}
             value={detention}
             keyboardType='numeric'
           />
         </View>
 
         <Text style={styles.levelText}>Bank Amount</Text>
         <View style={styles.inputContainerend}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '100%',
             }}
             placeholder={'0.00'}
             autoCorrect={false}
             onChangeText={text => setBankAmount(text)}
             value={BankAmount}
             keyboardType='numeric'
           />
         </View>
    <View style={styles.togglecontainer}>
      <Text style={styles.togglelabel}>Other Account</Text>
      <Switch
        value={isOtherAccount}
        onValueChange={toggleSwitch}
        thumbColor={isOtherAccount ? 'white' : '#f4f3f4'}
        trackColor={{ false: '#ccc', true: darkBlue || '#4682B4' }}
        ios_backgroundColor="#ccc"
      />
    </View>
{isOtherAccount && (
  <>
         <Text style={styles.levelText}>Account Holder Name</Text>
         <View style={styles.inputContainerend}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '100%',
             }}
             placeholder={'Enter A/C Holder Name'}
             autoCorrect={false}
             onChangeText={text => setAcName(text)}
             value={acName}
           />
         </View>
         <Text style={styles.levelText}>Account No</Text>
         <View style={styles.inputContainerend}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '100%',
             }}
             placeholder={'Enter Account No'}
             autoCorrect={false}
             onChangeText={text => setAccountNo(text)}
             value={AccountNo}
             
           />
         </View>
         <Text style={styles.levelText}>IFSC Code</Text>
         <View style={styles.inputContainerend}>
           <TextInput
             placeholderTextColor={'#6c6f73'}
             style={{
               color: 'black',
               fontSize: 15,
               width: '100%',
             }}
             placeholder={'Enter IFSC Code'}
             autoCorrect={false}
             onChangeText={text => setIfsc(text)}
             value={Ifsc}
            
           />
           
         </View> 
         </>)}
       </View>
     </View>
      ) : isStep3 ? (
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
       


{!jobNo &&    
(
  <>
<Text style={styles.levelText}>
        Loading Point
        </Text>
       
        
        <Dropdown
  style={styles.dropdown}
  placeholderStyle={{color:'black'}}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  itemTextStyle={{color: 'black'}}
  
  data={loadingData}  // Updated job data from API
  
  search
  maxHeight={300}
  labelField="label"  // Field for displaying label in dropdown
  valueField="value"  // Field for value in dropdown
  
  placeholder={loadingPoint}
  
  // This ensures the dropdown shows the value from the server or user selection
  value={loadingPoint}  // Value from the server or selected
  
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  
  onChange={item => {
    
    setLoadingPointId(item.value);  // Set the selected loading point ID
    setLoadingPoint(item.value);  // Update loadingPoint state with selected value
    
    console.log('Selected Loading ID:', item.value);
    setIsFocus(false);
  }}

  // If you want to handle search input
  onChangeText={text => {
    setSearchLoading(text);  // Update search term if needed
  }}
/>
<Text style={styles.levelText}>
        Unloading Point
        </Text>
       
        
        <Dropdown
  style={styles.dropdown}
  placeholderStyle={{color:'black'}}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  itemTextStyle={{color: 'black'}}
  
  data={unloadingData}  // Updated job data from API
  
  search
  maxHeight={300}
  labelField="label"  // Field for displaying label in dropdown
  valueField="value"  // Field for value in dropdown
  
  placeholder={unLoadingPoint}
  
  // This ensures the dropdown shows the value from the server or user selection
  value={loadingPoint}  // Value from the server or selected
  
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  
  onChange={item => {
    setJobNo(item.value);  // Set the selected job number
    setUnLoadingPointId(item.value);  // Set the selected loading point ID
    setUnLoadingPoint(item.value);  // Update loadingPoint state with selected value
    
    console.log('Selected UnLoading ID:', item.value);
    setIsFocus(false);
  }}

  // If you want to handle search input
  onChangeText={text => {
    setSearchUnloading(text);  // Update search term if needed
  }}
/>
        
<Text style={styles.levelText}>
        Material
        </Text>
       
        
        <Dropdown
  style={styles.dropdown}
  placeholderStyle={{color:'black'}}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  itemTextStyle={{color: 'black'}}
  
  data={materialData}  // Updated job data from API
  
  search
  maxHeight={300}
  labelField="label"  // Field for displaying label in dropdown
  valueField="value"  // Field for value in dropdown
  
  placeholder={materialType}
  
  // This ensures the dropdown shows the value from the server or user selection
  value={materialType}  // Value from the server or selected
  
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  
  onChange={item => {
//setJobNo(item.value);  // Set the selected job number
    setMaterialId(item.value);  // Set the selected loading point ID
    setMaterialType(item.value);  // Update loadingPoint state with selected value
    
    console.log('Selected Material ID:', item.value);
    setIsFocus(false);
  }}

  // If you want to handle search input
  onChangeText={text => {
    setSearchMaterial(text);  // Update search term if needed
  }}
/>
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
            //onChangeText={text => setGrossWt(text)}
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
        </>
        )}
          <Text style={styles.levelText}>Gross Weight
          
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
             keyboardType='numeric'
             value={grossWt}
          />
        </View>
        <Text style={styles.levelText}>Tare Weight
       
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
            keyboardType='numeric'
            value={tierWt}
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
            keyboardType='numeric'
            value={netWt}
          />
        </View>
        <Text style={styles.levelText}>Guarantee Weight
       
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
            placeholder={'Enter Guarantee WT'}
            autoCorrect={false}
            onChangeText={text => setGuaranteeWt(text)
            
            }
            keyboardType='numeric'
            value={guaranteewt}
          />
        </View>

        <Text style={styles.levelText}>Truck Source
        <Text style={{color: 'red'}}> *</Text>
        </Text>
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
          Broker  
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
          Association 
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

<Text style={styles.levelText}>Attachments</Text>

{/* Custom file picker for InvoiceDoc */}

<CustomImagePicker 
  title='Choose Client Invoice'
  onFileSelected={(file) => setInvoiceDoc(file)} // Set the file in state
  showFileDetails={true} // Show file details
/>

{/* Custom file picker for ChallanDoc */}
<CustomImagePicker
  title='Choose Challan'
  onFileSelected={(file) => setChallanDoc(file)} // Set the file in state
  showFileDetails={true} 
/>
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
            value={remarks}
          />
        </View>
      </View>
       </View>
      ):(
        <View>

        </View>
      )}
      {isStep1Visible? (
        <View style={{flexDirection:'row',justifyContent:'space-between',
          alignItems:'center',gap:130,paddingBottom:50
        }}>
        <TouchableOpacity
        onPress={()=>{setFirstSetp(true)
          setIsStep1Visible(false);
        }}
        style={[styles.btn,{marginBottom:50}]}>
        <Text style={styles.btntext}>Previous</Text>
      </TouchableOpacity>
<TouchableOpacity
  onPress={HandleNext}
  style={[styles.btn,{marginBottom:50}]}>
  <Text style={styles.btntext}>Next</Text>
</TouchableOpacity>
</View>
      ): isStep3?(
<View style={{flexDirection:'row',justifyContent:'space-between',
  alignItems:'center',gap:130,paddingBottom:50
}}>
  <TouchableOpacity
  onPress={HandlePrevious}
  style={styles.btn}>
    <Text style={[styles.btntext,{fontSize:14}]}>
      Previous
    </Text>
  </TouchableOpacity>
  <TouchableOpacity 
  onPress={HandleSubmit}
  disabled={isLoading}
  style={styles.btn}>
    {isLoading? (
            <ActivityIndicator size="small" color="white" />

    ):(
    <Text style={styles.btntext}>Submit</Text>)}
  </TouchableOpacity>
</View>
      ):(
        <View></View>
      )}
      </View>
     
      
    </ScrollView>
  );
};

export default NewChalan;