              import {
  ScrollView,
  ActivityIndicator,
  Alert,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Switch,Modal
} from 'react-native';
import React, {useState, useEffect,useCallback} from 'react';
import {data, LoadtypeData} from '../components/DropDownData';
import {useRoute} from '@react-navigation/native';
import CalendarModal from '../components/Calander';
import {darkBlue, inputbgColor, textColor} from '../components/constant';
import {Dropdown} from 'react-native-element-dropdown';
import {styles} from './NewChallanStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import CustomImagePicker from '../components/CustomeImagePicker';
import StepIndicator from '../FGLoading/StepIndicator';
import CardType2 from '../FGLoading/CardType2';
import Searching from '../components/Searching';
import {decode as atob, encode as btoa} from 'base-64';
import RegisterConsignor from './RegisterConsignor';
import RegisterConsignee from './RegisterConsignee';


const NewChalan = ({navigation, route}) => {
const [apiTokenReceived, setapiTokenReceived] = useState(null);

useEffect(() => {
  const getToken = async () => {
    try {
      let token = await AsyncStorage.getItem('Token');
      if (!token) {
        token = useApiToken(); // fallback if not in AsyncStorage
      }
      setapiTokenReceived(token);
    } catch (err) {
      console.log('Error getting token:', err);
    }
  };
  getToken();
}, []);

  if (!global.atob) {
    global.atob = atob;
  }
  if (!global.btoa) {
    global.btoa = btoa;
  }
  const { params } = useRoute();

const { params: { JobDetails: routeJobDetails, VEHICLENO: routeVEHICLENO, DLNo: routeDLNo, Id: routeId, challan: routeChallan } = {} } = useRoute();

const [JobDetails, setJobDetails] = useState(routeJobDetails || '');
const [VEHICLENO, setVEHICLENO] = useState(routeVEHICLENO || '');
const [DLNo, setDLNo] = useState(routeDLNo || '');
const [Id, setId] = useState(routeId || '');
const [challan, setChallan] = useState(routeChallan || '');

  useEffect(() => {
    if (
      !JobDetails.label ||                              // null / undefined
      (Array.isArray(JobDetails) && JobDetails.length === 0) || // empty array
      (typeof JobDetails === 'object' && Object.keys(JobDetails).length === 0) // empty object
    ) {
      setIsNotJobDetails(true);
    } else {
      setIsNotJobDetails(false);
    }
  }, [JobDetails.label]);
  //console.log("Job Details from route:", JobDetails);
  // console.log("Vehicle No:", VEHICLENO);
  // console.log("Vehicle ID:", VEHICLEID);
  // console.log("id:", Id);
const [ChallanNo,setChallanNo] = useState('');
  const [data1, setData1] = useState({});
const [AId,setAId]=useState(null);
  const [isStep1Visible, setIsStep1Visible] = useState(false);
  const [isFirstStep, setFirstSetp] = useState(true);
  const [isStep3, setIsStep3] = useState(false);
  const [GpsNo, setGpsNo] = useState('');
  const [SlipNo, setSlipNo] = useState('')
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
  const [PumpName, setPumpName] = useState('');
  const [acName, setAcName] = useState('');
  const [AccountNo, setAccountNo] = useState('');
  const [Ifsc, setIfsc] = useState('');
  const [clientInvoice1, setClientInvoice1] = useState('');
  const [clientInvoice2, setClientInvoice2] = useState('');
  const [clientInvoice3, setClientInvoice3] = useState('');
  const [isVisibleEWaybill2, setIsVisibleEWaybill2] = useState(false);
const [evalidity,setEvaildity]=useState(null);
const [openvalidtymodal,setvaliditymodal]=useState(false)

  const [otherExpence, setOtherExpence] = useState(0);
  const [detention, setDetention] = useState('');

  const [openQRScanner1, setOpenQRScanner1] = useState(false);

  const [brokerName, setBrokerName] = useState('');
  const [associationName, setAssociationName] = useState('');

  const [jobId, setJobId] = useState('');
  const [jobNo,setJobNo]=useState('');
  const [searchJob,setSearchJob]=useState('');
  const [JobData, setJobData] = useState([]);

  const [ownerId, setOwnerId] = useState('');
  const [truckSource, setTruckSource] = useState('');

  const [loadingPointId, setLoadingPointId] = useState('');
  const [searchLoadingPoint, setSearchLoadingPoint] = useState('');
  const [loadingPointData, setLoadingPointData] = useState([]);

  const [unloadingPointId, setUnLoadingPointId] = useState('');
  const [searchUnloadingPoint, setSearchUnloadingPoint] = useState('');
  const [unloadingPointData, setUnloadingPointData] = useState([]);

  const [vehicleId, setVehicleId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [brokerId, setBrokerId] = useState('');
  const [associationId, setAssociationId] = useState('');

  const [consigneeId, setConsigneeId] = useState(null);
  const [searchConsignee, setSearchConsignee] = useState('');
  const [consigneeData, setConsigneeData] = useState([]);

  const [consignorId, setConsignorId] = useState(null);
  const [searchConsignor, setSearchConsignor] = useState('');
  const [consignorData, setConsignorData] = useState([]);

  const [VehicleType, setVehicleType] = useState('');
  const [hasBorder, setHasBorder] = useState(false);
  const [grossWt, setGrossWt] = useState('');
  const [tierWt, setTierWt] = useState('');
  const [netWt, setNetWt] = useState('');
  const [loadType, setLoadType] = useState('');
  const [materialValue, setMaterialValue] = useState('');
  const [remarks, setRemarks] = useState('');

  const [materialId, setMaterialId] = useState('');
  const [materialsearch, setmaterialsearch] = useState('');
  const [materialData, setmaterialData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); //27/02/2024
  const [guaranteewt, setGuaranteeWt] = useState('');

  const [ewayBillNo1, setEwayBillNo1] = useState('');

  const [ChallanDoc, setChallanDoc] = useState();
  const [InvoiceDoc, setInvoiceDoc] = useState();
   const [VehicleWithDriverImage,setVehicleWithDriverImage]=useState();
   const [ChassisImage,setChassisImage]=useState();
   const [EWayBillPhoto,setEWayBillPhoto]=useState();

  const [isOtherAccount, setIsOtherAccount] = useState(false);
   const [isNotJobDetails,setIsNotJobDetails]=useState(false);

   const [modalVisibleConsignor, setModalVisibleConsignor] = useState(false);
 const [modalVisibleConsignee, setModalVisibleConsignee] = useState(false);

 const fetchJob = async (search) => {
    try {
    //  console.log('Fetching jobs with search:', search);
      const encodedSearch = encodeURIComponent(search);
      const url = `https://exim.tranzol.com/api/DropDown/Jobno?search=${encodedSearch}`;
      //console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
        Authorization: `Basic ${apiTokenReceived}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
     //   console.log('API Response:', data);
        
        if (data.JobList) {
          const jobData = data.JobList.map((job) => ({
            label: job.JobNo,
            value: job.JobId,            
          }));
          setJobData(jobData);
         //  console.log('Job data set:', jobData);
        } else {
         // console.log('JobList is missing in the response');
        }
      } else {
        console.log('Error in fetching Job no:', response.status);
      }
    } catch (error) {
      console.log('Error in fetching job no:', error);
    }
  };
  useEffect(() => {
    if (searchJob) {
      fetchJob(searchJob);
    }
  }, [searchJob]);
  useEffect(() => {}, [isVisibleEWaybill2]);

  const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDetails2, setJobDetails2] = useState({});
  const [driverData2, setDriverData2] = useState({});
  const [IsCommercial, setIsCommercial] = useState(false);
  const [IsVerified, setIsVerified] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [unloadCont,setUnloadCont]=useState('');
 const [rcValues, setRcValues] = useState([]);
  useEffect(() => {
    const fetchAllDetails = async () => {
      if (!apiTokenReceived) return;

      try {
        setLoadingDetails(true);

        // ================= VEHICLE → OWNER DETAILS =================
        if (VEHICLENO) {
          try {
            const encodedVehicle = encodeURIComponent(VEHICLENO);

            // --------- 1. Get vehicle details (verification & commercial) ---------
            const vehicleUrl1 = `https://Exim.Tranzol.com/api/VehicleApi/GetVehicleByNo?vehicleNo=${encodedVehicle}`;
            const vehicleRes1 = await fetch(vehicleUrl1, {
              method: 'GET',
              headers: {Authorization: `Basic ${apiTokenReceived}`},
            });
 let vehicle1Data = null;
    if (vehicleRes1.ok) {
      const vehicleData1 = await vehicleRes1.json();
      const vehicleList1 = vehicleData1?.apiResult?.Result || [];
    //  console.log('vehicle data',vehicleList1) 
    setRcValues(vehicleList1?.VehicleRC? vehicleList1.VehicleRC : 'N/A')
     setIsCommercial(vehicleList1.IsCommercial)
      setIsVerified(vehicleList1.IsVerified)
    }



            // --------- 2. Always call second Vehicle API for PAN number ---------
            const vehicleUrl2 = `https://exim.tranzol.com/api/DropDown/VehicleNo?search=${encodedVehicle}`;
            const vehicleRes2 = await fetch(vehicleUrl2, {
              method: 'GET',
              headers: {Authorization: `Basic ${apiTokenReceived}`},
            });

            let PANNumber = null;

            if (vehicleRes2.ok) {
              const vehicleData2 = await vehicleRes2.json();
              //console.log("Vehicle Data 2:", vehicleData2);
              const vehicleList2 = vehicleData2?.VehicleNoList || [];
              if (vehicleList2.length > 0) {
                PANNumber = vehicleList2[0]?.PANNumber;
                setVehicleId(vehicleList2[0]?.VehicleId);
                setOwnerId(vehicleList2[0]?.OwnerId);
              }
            }

            // --------- 3. Call Owner API if PANNumber exists ---------
            if (PANNumber) {
              const ownerUrl = `https://Exim.Tranzol.com/api/OwnerApi/GetOwner?panNo=${PANNumber}`;
              const ownerRes = await fetch(ownerUrl, {
                method: 'GET',
                headers: {Authorization: `Basic ${apiTokenReceived}`},
              });

              if (ownerRes.ok) {
                const ownerData = await ownerRes.json();
                // console.log("Owner Data:", ownerData);
                setOwnerData(ownerData?.apiResult?.Result || {});
              }
            }
          } catch (error) {
            console.error('Error fetching vehicle/owner details:', error);
            Alert.alert('Error', 'Failed to fetch vehicle or owner details.');
          }
        }

        // ================= JOB DETAILS =================
       

        // ================= DRIVER DETAILS =================
        if (DLNo) {
          const encodedSearch = encodeURIComponent(DLNo);
          const driverUrl = `https://exim.tranzol.com/api/OwnerApi/GetDriver?licenseNo=${encodedSearch}`;
          const driverRes = await fetch(driverUrl, {
            method: 'GET',
            headers: {Authorization: `Basic ${apiTokenReceived}`},
          });

          if (driverRes.ok) {
            const driverData = await driverRes.json();
            if (driverData?.apiResult?.Result) {
              setDriverData2(driverData.apiResult.Result);
              setDriverId(driverData.apiResult.Result.Id);
              //  console.log("Driver Data:", driverData2);
            }
          }
        }
      } catch (error) {
      //  console.error('Error fetching details:', error);
        Alert.alert('Error', 'Failed to fetch details. Please try again.');
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchAllDetails();
  }, [VEHICLENO, JobDetails, DLNo, apiTokenReceived, Id]);
const fetchJobNo = useCallback(
  async (jobNo) => {
    if (!apiTokenReceived) {
   //   console.log('Token not ready yet!');
      return;
    }

//    console.log('Inside fetchJobNo with jobNo:', jobNo);

    try {
      const jobUrl = `https://exim.tranzol.com/api/DropDown/Jobno?search=${jobNo}`;
      const jobRes = await fetch(jobUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${apiTokenReceived}`,
        },
      });

      if (jobRes.ok) {
        const jobData = await jobRes.json();
       // console.log('Job with job no Data:', jobData);

        if (jobData?.JobList?.length > 0) {
          const job = jobData.JobList[0];
          setJobId(job.JobId);
          setJobDetails2(job);
          setLoadingPointId(job.LoadingPointId);
          setUnLoadingPointId(job.UnloadingPointId);
          setConsignorId(job.ConsignorId);
          setConsigneeId(job.ConsigneeId);
          setMaterialId(job.MaterialId);
         // console.log('Job set successfully ✅');
        }
      } else {
        console.log('Error fetching job, status:', jobRes.status);
      }
    } catch (err) {
      console.error('Error fetching job:', err);
    }
  },
  [apiTokenReceived] // Depend on token so function always sees latest
);

useEffect(() => {
  if (params?.JobDetails?.label && apiTokenReceived) {
   // console.log('Calling fetchJobNo from route:', params.JobDetails.label);
    fetchJobNo(params.JobDetails.label);
    setJobNo(params.JobDetails.label);
  }
}, [params?.JobDetails?.label, apiTokenReceived, fetchJobNo]);



//
  useEffect(()=>{
    if(jobNo){
      try{
          fetchJobNo(jobNo)
      }catch(error){
        Alert.alert('Error In Job Fetch',error)
      }
    }
  },[jobNo])

  const convertDateFormat = dateString => {
    const [day, month, year] = dateString.split('/'); // Split by "/"
    return `${year}-${month}-${day}`; // Rearrange to "YYYY-MM-DD"
  };

  const covertDateFormat2=dateString=>{
    const [month,day,year]=dateString.split('/')
    return    `${year}-${month}-${day}`
  }

  useEffect(() => {
    if (grossWt && tierWt) {
      let net = parseFloat(grossWt) - parseFloat(tierWt);
      if (!isNaN(net)) {
        setNetWt(net.toFixed(3)); // ✅ keep only 3 digits after decimal
      } else {
        setNetWt('');
      }
    } else {
      setNetWt('');
    }
  }, [grossWt, tierWt]);

  useEffect(() => {
    try {
      if (route.params?.scannedClientInvoice1) {
        const token = route.params.scannedClientInvoice1;

        // ✅ Check format before decoding
        if (token.split('.').length !== 3) {
          Alert.alert('Invalid QR Code', 'Scanned QR code is incomplete.');
         // console.log('⚠️ Invalid JWT format:', token);
          return;
        }

        try {
        //  console.log('Decoding JWT:', token);
          const clientInvoice1 = jwtDecode(token);

          if (!clientInvoice1?.data) {
            Alert.alert('Invalid QR Code', 'No data field inside JWT payload.');
            return;
          }

          const lm = JSON.parse(clientInvoice1.data);
          const formattedDate = convertDateFormat(lm.DocDt);

          setClientInvoice1(lm.DocNo);
          setSelectedDate(formattedDate);
          setMaterialValue(String(lm.TotInvVal));
        } catch (error) {
          Alert.alert('Invalid QR Code', 'Unable to decode JWT.');
          //console.log('Error decoding JWT:', error);
        }
      }

      if (route.params?.scannedEwayBillNo) {
       // console.log('Scanned Eway Bill No:', route.params.scannedEwayBillNo);
      const scannedData = route.params.scannedEwayBillNo.split('/');
const ewayBillNo = scannedData[0];
const evalidRaw = scannedData.slice(2).join('/'); 
const evalide = evalidRaw?.split(' ')[0];
console.log('raw e validity',evalide)
 const formattedDate = covertDateFormat2(evalide);
        setEwayBillNo1(ewayBillNo);
        setEvaildity(formattedDate);

      }
    } catch (error) {
      console.error('Error decoding JWT or processing QR code:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred while processing the QR code.',
      );
    }
  }, [route.params?.scannedEwayBillNo, route.params?.scannedClientInvoice1]);

  const [searchBroker, setSearchBroker] = useState('');
  const [searchAssociation, setSearchAssociation] = useState('');
  const [brokerData, setBrokerData] = useState([]);
  const [associationData, setAssociationData] = useState([]);
  const [searchPump, setSearchPump] = useState('');
const [STONo,setSTONo]=useState('');
const [SealNo,setSealNo]=useState('')
  const onSubmitSteps = () => {
    // Perform all validation checks
  if (!FreightRate) {
      Alert.alert('Validation Error', 'Freight Rate is Mandatory');
      return;
    }

    return true; // Return true if all validations pass
  };
const deleteAlloments = async(Id)=>{
  if(!Id) {
    Alert.alert("Error","No Allotment ID found for deletion.")
    return;
  }
     try {
              const response = await fetch(
                `https://Exim.Tranzol.com/api/LoadingChallan/DeletePreLoading?id=${Id}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                      Authorization: `Basic ${apiTokenReceived}`,
                  },
                }
              );
  
              const result = await response.text(); // API returns plain text
  
              // if (result.includes("Delete successfully")) {
              //   //Alert.alert("✅ Success", "Allotment deleted successfully.");
              //   console.log("Delete successful:", result);
              // } else {
              //   Alert.alert("⚠️ Failed", "Deletion was not successful.");
              //   console.warn("Unexpected response:", result);
              // }
            } catch (error) {
              Alert.alert("❌ Error", "Failed to delete allotment.");
              console.error("Error deleting PreLoading:", error);
            }
}
const [isLoading ,setIsLoading] = useState(false);

  const HandleSubmit = async () => {
    const isValid = onSubmitSteps();
    if (!isValid) return; // Stop if validation fails
    setIsLoading(true);
    const postData = {
      ChallanNo :challan || '',
      EwayBillNo1: ewayBillNo1 || '',
      ClientInvoiceNo1: clientInvoice1 || '',
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
      EValidity : evalidity || null,
      UnloadingContact: unloadCont || '',
      MaterialValues: materialValue || '',
      TareWt: tierWt ? parseFloat(tierWt) : 0,
      GrossWt: grossWt ? parseFloat(grossWt) : 0,
      NetWt: netWt ? parseFloat(netWt) : 0,
      STONo : STONo || '',
      SealNo:SealNo || '',
      TruckSource: truckSource || '',
      OwnerId: ownerId ? parseInt(ownerId, 10) : null,
      LoadingPointId: loadingPointId ? parseInt(loadingPointId, 10) : null,
      UnloadingPointId: unloadingPointId
        ? parseInt(unloadingPointId, 10)
        : null,
      MaterialId: materialId ? parseInt(materialId, 10) : null,
      GuaranteeWt: guaranteewt ? parseFloat(guaranteewt) : 0,
      Remarks: remarks || '',
      AccountNo: AccountNo ? AccountNo : 0,
    };

    // Convert postData to FormData
    const formData = new FormData();
    Object.keys(postData).forEach(key => {
      if (postData[key] !== null) {
        formData.append(key, postData[key]); // Append values as is
      }
    });

    //Append documents if they exist
    if (ChallanDoc) {
      formData.append('ChallanDoc', {
        uri: ChallanDoc.uri,
        type: ChallanDoc.type, // Ensure correct MIME type is set
        name: ChallanDoc.name || 'challan.jpg', // Provide a default name if none
      });
    }

    if (InvoiceDoc) {
      formData.append('InvoiceDoc', {
        uri: InvoiceDoc.uri,
        type: InvoiceDoc.type, // Ensure correct MIME type is set
        name: InvoiceDoc.name || 'invoice.jpg', // Provide a default name if none
      });
    }
    if (EWayBillPhoto) {
      formData.append('EWayBillPhoto', {
        uri: EWayBillPhoto.uri,
        type: EWayBillPhoto.type, // Ensure correct MIME type is set
        name: EWayBillPhoto.name || 'ewaybill.jpg', // Provide a default name if none
      });
    }
        if (ChassisImage) {
      formData.append('ChassisImage', {
        uri: ChassisImage.uri,
        type: ChassisImage.type, // Ensure correct MIME type is set
        name: ChassisImage.name || 'chassis.jpg', // Provide a default name if none
      });
    }
        if (VehicleWithDriverImage) {
      formData.append('VehicleWithDriverImage', {
        uri: VehicleWithDriverImage.uri,
        type: VehicleWithDriverImage.type, // Ensure correct MIME type is set
        name: VehicleWithDriverImage.name || 'vehicle.jpg', // Provide a default name if none
      });
    }
    // Now you can send formData in your API request
   // console.log('sending Data', formData);

    // Submit the FormData to the provided URL
    try {
      const response = await fetch(
        'https://exim.tranzol.com/api/LoadingChallan/FinishFileUpload',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Basic ${apiTokenReceived}`,
          },
        },
      );
const responseText = await response.text();
      if (response.ok  && responseText.includes('Insert successfully')) {
        

        deleteAlloments(Id)
         navigation.navigate('success', {
      message: `✅ Operation completed successfully! 🎉

📦 Challan No: ${challan} | 🧾 Job No: ${jobNo} | 🚛 Vehicle No: ${VEHICLENO}`,
    });

      } else {
        console.error(
          'Server returned an error:',
          response.status,
          response.statusText,
        );
        Alert.alert('Error', `Server error: ${response.statusText}`);
        console.log('Response details:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Failed to submit data'); 
    } finally {
      setIsLoading(false);
    }
  };

  const HandleNext1 = async () => {
    try {
       if (!challan) {
    Alert.alert('Validation Error', 'Challan No is mandatory');
    return;
  }

  // if (!IsVerified) {
  //   Alert.alert(
  //     'Error',
  //     'Vehicle Verification is required before proceeding!'
  //   );
  //   return;
  // }

  // if (!IsCommercial) {
  //   Alert.alert(
  //     'Error',
  //     'This action is only allowed for Commercial entries!'
  //   );
  //   return;
  // }
  if(!consigneeId){
    Alert.alert('Validation Error', 'Please Select Consignee');
    return;
  };
  if(!consignorId){
    Alert.alert('Validation Error', 'Please Select Consignor');
    return;
  };
  if(!materialId){
    Alert.alert('Validation Error', 'Please Select Material');
    return;
  };
  if(!loadingPointId){
    Alert.alert('Validation Error', 'Please Select Loading Point');
    return;
  };
  if(!unloadingPointId){
    Alert.alert('Validation Error', 'Please Select Unloading Point');
    return;
  };

      setIsStep1Visible(true); // ✅ Correct setter
      setFirstSetp(false); // ✅ Correct setter
    } catch (err) {
      Alert.alert('Error', 'In moving on to step 2');
      console.log(err);
    }
  };

  const HandleNext = async () => {
    // Perform validation before proceeding
    if (!vehicleId) {
      Alert.alert('Validation Error', 'Please Select Vehicle No');
      return false;
    }
    if (!selectedDate) {
      Alert.alert('Validation Error', 'Load Date is Mandatory');
      return;
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
  setIsStep1Visible(false);
      setIsStep3(true);
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
      setEwayBillNo1('');
     
      setClientInvoice1('');
      setClientInvoice2('');
      setClientInvoice3('');
      setGpsNo('');
      setSlipNo('');
      setSTONo('');
      setDelNo('');
      setFreightTigerNo('');
      setFreightRate(null); // assuming this is a number
      setCash(null); // assuming this is a number
      setBankAmount(null); // assuming this is a number
      setHSD(null); // assuming this is a number
      setDetention(null); // assuming this is a number
      setPumpId(null); // assuming this is an ID or a value that can be null
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

const fetchDropdownData = async (endpoint, key, labelKey, valueKey, setData) => {
  try {
    const encodedSearch = encodeURIComponent(endpoint.search || '');
    const url = `https://exim.tranzol.com/api/DropDown/${endpoint.name}?search=${encodedSearch}`;
   // console.log('Request URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${apiTokenReceived}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('API Response:', data);

      if (Array.isArray(data[key])) {
        const formattedData = data[key].map(item => ({
          label: item[labelKey],
          value: item[valueKey],
        }));
        setData(formattedData);
      } else {
        console.log(`${key} missing in the response`);
        setData([]);
      }
    } else {
      console.log(`Error fetching ${endpoint.name}:`, response.status);
    }
  } catch (error) {
    console.log(`Error fetching ${endpoint.name}:`, error);
  }
};
useEffect(() => {
  if (searchPump) {
    fetchDropdownData(
      { name: 'Pumpname', search: searchPump },
      'PumpList',
      'PumpName',
      'Id',
      setpumpData
    );
  }
}, [searchPump]);

useEffect(() => {
  if (searchAssociation) {
    fetchDropdownData(
      { name: 'association', search: searchAssociation },
      'Association',
      'Association',
      'Id',
      setAssociationData
    );
  }
}, [searchAssociation]);

useEffect(() => {
  if (searchBroker) {
    fetchDropdownData(
      { name: 'Broker', search: searchBroker },
      'BrokerList',
      'PartyName',
      'Id',
      setBrokerData
    );
  }
}, [searchBroker]);

useEffect(() => {
  if (searchConsignee) {
    fetchDropdownData(
      { name: 'Consignee', search: searchConsignee },
      'Consignee',
      'CName',
      'Id',
      setConsigneeData
    );
  }
}, [searchConsignee]);

useEffect(() => {
  if (searchConsignor) {
    fetchDropdownData(
      { name: 'Consignor', search: searchConsignor },
      'Consignor',
      'CName',
      'Id',
      setConsignorData
    );
  }
}, [searchConsignor]);

useEffect(() => {
  if (searchLoadingPoint) {
    fetchDropdownData(
      { name: 'LoadingPoint', search: searchLoadingPoint },
      'LoadingPoints',
      'Loading',
      'Id',
      setLoadingPointData
    );
  }
}, [searchLoadingPoint]);

useEffect(() => {
  if (searchUnloadingPoint) {
    fetchDropdownData(
      { name: 'UnloadingPoint', search: searchUnloadingPoint },
      'UnloadingPoints',
      'Unloading',
      'Id',
      setUnloadingPointData
    );
  }
}, [searchUnloadingPoint]);

useEffect(() => {
  if (materialsearch) {
    fetchDropdownData(
      { name: 'Material', search: materialsearch },
      'MaterialList',
      'MaterialName',
      'Id',
      setmaterialData
    );
  }
}, [materialsearch]);


  const [isJobEdit,setJobEdit]=useState(false);
  const JobEditToggle =()=>{
    setJobEdit(prev=>!prev)
  }
  const toggleSwitch = () => setIsOtherAccount(prev => !prev);
  return (
    <ScrollView
      style={{backgroundColor: 'white', paddingVertical: 30, width: '100%'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          flex: 1,
        }}>
        <StepIndicator
          isFirstStep={isFirstStep}
          isStep1Visible={isStep1Visible}
          isStep3={isStep3}
        />

        {isFirstStep ? (
          <View style={styles.container}>
            <Text
              style={{
                color: textColor,
                margin: 10,
                fontSize: 14,
                marginRight: 'auto',
                fontWeight:'bold'
              }}>
              E-Challan
            </Text>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight:'bold',
                width: '100%',
                height: 50,
                backgroundColor: inputbgColor,
                borderRadius: 12,
                elevation: 4,
                fontSize: 16,
                marginBottom: 10,
                padding: 10,
                paddingLeft:20
              }}
              numberOfLines={2}
              placeholder={
                ''
              }
              value={challan}
              editable={false}
              
            />

            {loadingDetails ? (
              <>
                <ActivityIndicator size={'large'} color={darkBlue} />
              </>
            ) : (
              <View style={{width:'100%'}}>
                <View style={{marginTop: 10}}>
                  <CardType2
                    heading="VEHICLE DETAILS"
                    title="VEHICLE NO"
                    value={VEHICLENO ? VEHICLENO : ' '}
                    borderTopLeftRadius={15}
                    borderTopRightRadius={15}
                  />
                  <CardType2
                    title="Verification"
                    value={IsVerified ? 'Yes' : 'No'}
                  />

                  <CardType2
                    title="Commercial"
                    value={IsCommercial ? 'Yes' : 'No'}
                    borderBottomLeftRadius={16}
                    borderBottomRightRadius={16}
                  />
                </View>
                <View style={{marginTop: 10, elevation: 4}}>
                  {loading ? (
                    <Searching />
                  ) : (
                    <>
                      <CardType2
                        heading="OWNER DETAILS"
                        title="Name"
                        value={ownerData?.OwnerName || ' '}
                        borderTopLeftRadius={15}
                        borderTopRightRadius={15}
                      />

                      <CardType2
                        title="Address"
                        value={ownerData?.Address || ' ' + ' ' + ownerData?.StateName || '' + ' '
                        +  ownerData?.ZipCode || ''
                        }
                      />

                      <CardType2
                        title="Primary Contact"
                        value={ownerData?.PrimaryMobileNo || ' '}
                        //  isNVerify={true}
                      />

                      <CardType2
                        title="Secondary Contact"
                        value={ownerData?.SecondaryNo || ' '}
                        //  isNVerify={true}
                      />

                      <CardType2
                        heading="BANK DETAILS"
                        title="Account Number"
                        value={ownerData?.AccountNo || ' '}
                      />

                      <CardType2
                        title="IFSC Code"
                        value={ownerData?.IFSCCode || ' '}
                      />

                      <CardType2
                        title="Bank Name"
                        value={ownerData?.BankNameName || ' '}
                      />

                      <CardType2
                        title="PAN No"
                        value={ownerData?.PanNo || ' '}
                        borderBottomLeftRadius={16}
                        borderBottomRightRadius={16}
                      />
                    </>
                  )}
                </View>
                <View style={{marginTop: 10, marginBottom: 10}}>
                  <>
                    <CardType2
                      heading="DRIVER DETAILS"
                      title="Name"
                      value={driverData2?.DriverName ?? ' '}
                      borderTopLeftRadius={15}
                      borderTopRightRadius={15}
                    />

                    <CardType2
                      title="Primary Contact"
                      value={driverData2?.PrimaryContactNo ?? ' '}
                    />

                    <CardType2
                      title="Secondary Contact"
                      value={driverData2?.SecondaryContactNo ?? ' '}
                    />

                    <CardType2
                      title="Address"
                      value={driverData2?.DriverAddress ?? ' '
                        + ' ' + driverData2?.StateName ?? '' + ' '
                        +  driverData2?.ZipCode ?? ''
                      }
                    />

                    <CardType2
                      title="DL No"
                      value={driverData2?.DLNumber ?? ' '}
                      borderBottomLeftRadius={16}
                      borderBottomRightRadius={16}
                    />
                  </>
                </View>
                      <Modal visible={modalVisibleConsignor} 
                                      animationType="slide" transparent>
                        <View style={styles.modalOverlay}>
                          <View style={styles.modalBox}>
                            <RegisterConsignor
                              onSuccess={data => console.log('Saved:', data)}
                              onClose={() => setModalVisibleConsignor(false)}
                            />
                          </View>
                        </View>
                      </Modal>
                         <Modal visible={modalVisibleConsignee} 
                                      animationType="slide" transparent>
                        <View style={styles.modalOverlay}>
                          <View style={styles.modalBox}>
                            <RegisterConsignee
                              onSuccess={data => console.log('Saved:', data)}
                              onClose={() => setModalVisibleConsignee(false)}
                            />
                          </View>
                        </View>
                      </Modal>
              {isJobEdit && (
                <>
                <View style={{zIndex:10}}>
                   <Text style={styles.levelText}>
                Select Job No
              </Text>
              <Dropdown
                style={[{height: 50,borderRadius:12,borderWidth:1,borderColor:'#ccc',elevation:4,paddingHorizontal:15,fontSize:13,color:'black'
                  ,marginBottom:10,backgroundColor: inputbgColor}, isFocus && {borderColor: darkBlue}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: 'black'}}
                data={JobData}
                maxHeight={300}
                search
                labelField="label"
                valueField="value"
                placeholder={'Select Job No'}
                value={jobId}
                onChange={item => {
                  setJobId(item.value);
                  setJobNo(item.label)
                  setIsFocus(false);
                  setJobEdit(false);
                }}
                  onChangeText={text => {
    setSearchJob(text);  // Update searchTerm as user types
  }}
              />
              </View>
                </>
              )}

              {isNotJobDetails ? (
                <>
                      <View>
                   <Text style={styles.levelText}>
                Select Consignor <Text style={{color:'red'}}>*</Text>
              </Text>
               <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Dropdown
                style={[{width:'80%',height: 50,borderRadius:12,borderWidth:1,borderColor:'#ccc',elevation:4,paddingHorizontal:15,fontSize:13,color:'black'
                  ,marginBottom:10,backgroundColor: inputbgColor}, isFocus && {borderColor: darkBlue}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: 'black'}}
                data={consignorData}
                maxHeight={300}
                search
                labelField="label"
                valueField="value"
                placeholder={'Select Consignor'}
                value={consigneeId}
                onChange={item => {
                  setConsignorId(item.value);
                  setIsFocus(false);
                }}
                  onChangeText={text => {
    setSearchConsignor(text);  // Update searchTerm as user types
  }}
              />
               <TouchableOpacity onPress={()=>setModalVisibleConsignor(true)}>
                <Image style={{width:50,height:50}} source={require('../assets/add.png')} />
              </TouchableOpacity>
              </View>
              </View>
              <View>
                   <Text style={styles.levelText}>
                Select Consignee <Text style={{color:'red'}}>*</Text>
              </Text>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Dropdown
                style={[{width:'80%',height: 50,borderRadius:12,borderWidth:1,borderColor:'#ccc',elevation:4,paddingHorizontal:15,fontSize:13,color:'black'
                  ,marginBottom:10,backgroundColor: inputbgColor}, isFocus && {borderColor: darkBlue}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: 'black'}}
                data={consigneeData}
                maxHeight={300}
                search
                labelField="label"
                valueField="value"
                placeholder={'Select Consignee'}
                value={consigneeId}
                onChange={item => {
                  setConsigneeId(item.value);
                  setIsFocus(false);
                }}
                  onChangeText={text => {
    setSearchConsignee(text);  // Update searchTerm as user types
  }}
              />
               <TouchableOpacity onPress={()=>setModalVisibleConsignee(true)}>
                <Image style={{width:50,height:50}} source={require('../assets/add.png')} />
              </TouchableOpacity>
              </View>
              </View>
              <View>
                   <Text style={styles.levelText}>
                Select Loading Point <Text style={{color:'red'}}>*</Text>
              </Text>
              <Dropdown
                style={[{height: 50,borderRadius:12,borderWidth:1,borderColor:'#ccc',elevation:4,paddingHorizontal:15,fontSize:13,color:'black'
                  ,marginBottom:10,backgroundColor: inputbgColor}, isFocus && {borderColor: darkBlue}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: 'black'}}
                data={loadingPointData}
                maxHeight={300}
                search
                labelField="label"
                valueField="value"
                placeholder={'Select Loading Point'}
                value={loadingPointId}
                onChange={item => {
                  setLoadingPointId(item.value);
                  setIsFocus(false);
                }}
                  onChangeText={text => {
    setSearchLoadingPoint(text);  // Update searchTerm as user types
  }}
              />
              </View>
              <View>
                   <Text style={styles.levelText}>
                Select Unloading Point <Text style={{color:'red'}}>*</Text>
              </Text>
             
              <Dropdown
                style={[{height: 50,borderRadius:12,borderWidth:1,borderColor:'#ccc',elevation:4,paddingHorizontal:15,fontSize:13,color:'black'
                  ,marginBottom:10,backgroundColor: inputbgColor}, isFocus && {borderColor: darkBlue}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: 'black'}}
                data={unloadingPointData}
                maxHeight={300}
                search
                labelField="label"
                valueField="value"
                placeholder={'Select Unloading Point'}
                value={unloadingPointId}
                onChange={item => {
                  setUnLoadingPointId(item.value);
                  setIsFocus(false);
                }}
                  onChangeText={text => {
    setSearchUnloadingPoint(text);  // Update searchTerm as user types
  }}
              />
             
              </View>
              <View>
                   <Text style={styles.levelText}>
                Select Material <Text style={{color:'red'}}>*</Text>
              </Text>
              <Dropdown
                style={[{height: 50,borderRadius:12,borderWidth:1,borderColor:'#ccc',elevation:4,paddingHorizontal:15,fontSize:13,color:'black'
                  ,marginBottom:10,backgroundColor: inputbgColor}, isFocus && {borderColor: darkBlue}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: 'black'}}
                data={materialData}
                maxHeight={300}
                search
                labelField="label"
                valueField="value"
                placeholder={'Select Material'}
                value={materialId}
                onChange={item => {
                  setMaterialId(item.value);
                  setIsFocus(false);
                }}
                  onChangeText={text => {
    setmaterialsearch(text);  // Update searchTerm as user types
  }}
              />
              </View>
</>
              ):(
<View style={{marginTop: 10, marginBottom: 20}}>
                      <TouchableOpacity 
                      onPress={JobEditToggle}
                      style={{position:'absolute',top:10,right:10,width:50,height:25,zIndex:10}} >
                    <Image
                    source={require('../assets/pencil.png')}
                    style={{width: '100%', height: 25, resizeMode: 'contain'}}
                  />
                  </TouchableOpacity>  
                  <CardType2
                    heading="JOB DETAILS"
                    title="Job No"
                    value={jobNo ? jobNo : ' '}
                    borderTopLeftRadius={15}
                    borderTopRightRadius={15}
                  />
                  <CardType2
                    title="Loading"
                    value={
                      jobDetails2?.LoadingPoint ? jobDetails2.LoadingPoint : ' '
                    }
                  />

                  <CardType2
                    title="Unloading"
                    value={
                      jobDetails2?.UnloadingPoint
                        ? jobDetails2.UnloadingPoint
                        : ' '
                    }
                  />

                  <CardType2
                    title="Consignor"
                    value={
                      jobDetails2?.ConsignorName
                        ? jobDetails2.ConsignorName
                        : ' '
                    }
                  />

                  <CardType2
                    title="Consignee"
                    value={
                      jobDetails2?.ConsigneeName
                        ? jobDetails2.ConsigneeName
                        : ' '
                    }
                  />

                  <CardType2
                    title="Material"
                    value={
                      jobDetails2?.MaterialName ? jobDetails2.MaterialName : ' '
                    }
                    borderBottomLeftRadius={16}
                    borderBottomRightRadius={16}
                  />
                </View>
              )}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 130,
                    paddingBottom: 50,
                  }}>
                  <TouchableOpacity
                    onPress={HandleReset}
                    style={[styles.btn, {marginBottom: 50}]}>
                    <Text style={styles.btntext}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
            onPress={() => {
  HandleNext1();
}}

                    style={[styles.btn, {marginBottom: 50}]}>
                    <Text style={styles.btntext}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ) : isStep1Visible ? (
          <View style={styles.container}>
            <View style={styles.levelContainer}>
              {openQRScanner1 && (
                <View style={{flex: 1}}>
                  <CustomQRCode />
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

              <Text style={styles.levelText}>E-Way Bill No </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                    onChangeText={text => setEwayBillNo1(text)}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('externalscanner', {field: 1})
                    }>
                    <Image
                      style={{width: 50, height: 50}}
                      source={require('../assets/scannere.jpg')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('QRScanner', {field: 1})
                    }>
                    <Image
                      style={styles.rightIcon}
                      source={require('../assets/qr-code.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
 <Text style={styles.levelText}>
                E-Validity Date
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderWidth: hasBorder ? 0.9 : 0,
                    borderColor: hasBorder ? 'red' : 'transparent',
                  },
                ]}>
                {/* Display the selected date in the TextInput */}
                <TextInput
                  placeholderTextColor={'#6c6f73'}
                  style={{
                    color: 'black',
                    fontSize: 15,
                    width: '85%',
                    marginRight: 20,
                  }}
                  value={evalidity} // Bind selected date to TextInput value
                  placeholder={'YYYY-MM-DD'} // Default placeholder
                  autoCorrect={false}
                  editable={false} // Non-editable since date is selected via the calendar
                />

                {/* Calendar icon to trigger the modal */}
                <TouchableOpacity onPress={() => setvaliditymodal(true)}>
                  <Image
                    style={styles.rightIcon}
                    source={require('../assets/calendar.png')}
                  />
                </TouchableOpacity>
              </View>

              {/* CalendarModal Component */}
              <CalendarModal
                visible={openvalidtymodal}
                onClose={() => setvaliditymodal(false)}
                onSelect={(date, convDate) => {
                  setEvaildity(convDate); // Set the formatted date (YYYY-MM-DD)
                  setvaliditymodal(false);
                }}
              />
              <Text style={styles.levelText}>Client Invoice </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('externalscanner', {field: 2})
                    }>
                    <Image
                      style={{width: 50, height: 50}}
                      source={require('../assets/scannere.jpg')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('QRScanner', {field: 2})
                    }>
                    <Image
                      style={styles.rightIcon}
                      source={require('../assets/qr-code.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.levelText}>
                Load Date
                <Text style={{color: 'red'}}> *</Text>
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
                  value={selectedDate} // Bind selected date to TextInput value
                  placeholder={'YYYY-MM-DD'} // Default placeholder
                  autoCorrect={false}
                  editable={false} // Non-editable since date is selected via the calendar
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
                  setSelectedDate(convDate); // Set the formatted date (YYYY-MM-DD)
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
                Other Details
              </Text>
                 <Text style={styles.levelText}>Unloading Contact</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholderTextColor={'#6c6f73'}
                  style={{
                    color: 'black',
                    fontSize: 15,
                    width: '80%',
                    marginRight: 20,
                  }}
                  placeholder={'Enter Unloading Contact'}
                  autoCorrect={false}
                  onChangeText={text => setUnloadCont(text)}
                  keyboardType="numeric"
                  value={unloadCont}
                />
              </View>
              <Text style={styles.levelText}>Gross Weight</Text>
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
                  keyboardType="numeric"
                  value={grossWt}
                />
              </View>
              <Text style={styles.levelText}>Tare Weight</Text>
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
                  keyboardType="numeric"
                  value={tierWt}
                />
              </View>
              <Text style={styles.levelText}>
                Net Weight
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
                  keyboardType="numeric"
                  value={netWt}
                  editable={false}
                />
              </View>
              <Text style={styles.levelText}>Guarantee Weight</Text>
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
                  onChangeText={text => setGuaranteeWt(text)}
                  keyboardType="numeric"
                  value={guaranteewt}
                />
              </View>
<Text style={styles.levelText}>STO No.</Text>
               <View style={styles.inputContainer}>
                <TextInput
                  placeholderTextColor={'#6c6f73'}
                  style={{
                    color: 'black',
                    fontSize: 15,
                    width: '80%',
                    marginRight: 20,
                  }}
                  placeholder={'Enter STO No.'}
                  autoCorrect={false}
                  onChangeText={text => setSTONo(text)}
                  value={STONo}
                />
              </View>
<Text style={styles.levelText}>Seal No.</Text>
               <View style={styles.inputContainer}>
                <TextInput
                  placeholderTextColor={'#6c6f73'}
                  style={{
                    color: 'black',
                    fontSize: 15,
                    width: '80%',
                    marginRight: 20,
                  }}
                  placeholder={'Enter Seal No.'}
                  autoCorrect={false}
                  onChangeText={text => setSealNo(text)}
                  value={SealNo}
                />
              </View>

              <Text style={styles.levelText}>
                Truck Source
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
                  console.log('Truck Source', truckSource, item.value);
                  setIsFocus(false);
                }}
              />

              <Text style={styles.levelText}>Broker</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: 'black'}}
                data={brokerData} // Updated job data from API
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
                  setBrokerId(item.value); // Set selected job number
                  // setSelectedVehicleNo(item.label)
                  //console.log('Selected Driver ID:', item.value,selectedVehicleNo,);  // Log the selected job ID
                  setIsFocus(false);
                }}
                onChangeText={text => {
                  setSearchBroker(text);
                }}
              />

              <Text style={styles.levelText}>Association</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: 'black'}}
                data={associationData} // Updated job data from API
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
                  setAssociationId(item.value); // Set selected job number
                  // setSelectedVehicleNo(item.label)
                  console.log('Selected association ID:', item.value); // Log the selected job ID
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
                style={[styles.dropdown,{marginBottom:10}]}
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
                Financial Information
              </Text>
              <Text style={styles.levelText}>
                Freight Rate<Text style={{color: 'red'}}>*</Text>
              </Text>
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
                  keyboardType="numeric"
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
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.levelText}>Petrol pump</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: 'black'}}
                data={pumpData} // Updated job data from API
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
                  setPumpId(item.value); // Set selected job number
                  // setSelectedVehicleNo(item.label)
                  //console.log('Selected Driver ID:', item.value,selectedVehicleNo,);  // Log the selected job ID
                  setIsFocus(false);
                }}
                onChangeText={text => {
                  setSearchPump(text);
                  console.log('pump search', searchPump);
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
                  keyboardType="numeric"
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
                  keyboardType="numeric"
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
                  keyboardType="numeric"
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
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.togglecontainer}>
                <Text style={styles.togglelabel}>Other Account</Text>
                <Switch
                  value={isOtherAccount}
                  onValueChange={toggleSwitch}
                  thumbColor={isOtherAccount ? 'white' : '#f4f3f4'}
                  trackColor={{false: '#ccc', true: darkBlue || '#4682B4'}}
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
                      keyboardType="numeric"
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
                </>
              )}
            
              {/* <Text style={styles.levelText}>Attachments</Text> */}

              {/* Custom file picker for InvoiceDoc */}
<View style={{flexDirection:'row',justifyContent:'space-evenly',gap:10}}>
              <CustomImagePicker 
  title='Choose Client Invoice'
  onImagePicked={(file) => setInvoiceDoc(file)} // Set the file in state
  showFileDetails={true} 
  imageData={InvoiceDoc}
  bgImage={require('../assets/invoice.png')}
/>


<CustomImagePicker
width={80}
  title='Choose Challan'
  onImagePicked={(file) => setChallanDoc(file)} // Set the file in state
  imageData={ChallanDoc}
  bgImage={require('../assets/lr.png')}
/>
</View>
<View style={{flexDirection:'row',justifyContent:'space-evenly',gap:10}}>
           <CustomImagePicker 
  title='E-Way Bill Photo'
  onImagePicked={(file) => setEWayBillPhoto(file)} // Set the file in state
  showFileDetails={true} 
  imageData={EWayBillPhoto}
  bgImage={require('../assets/eway-bill-img.png')}
/>
           <CustomImagePicker 
  title='Chassis Photo'
  onImagePicked={(file) => setChassisImage(file)} // Set the file in state
  showFileDetails={true} 
  imageData={ChassisImage}
  bgImage={require('../assets/chasis.png')}
/>
</View>
           <CustomImagePicker 
  title='Driver with Vehicle Photo'
  onImagePicked={(file) => setVehicleWithDriverImage(file)} // Set the file in state
  showFileDetails={true} 
  imageData={VehicleWithDriverImage}
  bgImage={require('../assets/driverwithvehicle.png')}
/>
              <Text style={styles.levelText}>Remarks</Text>
              <View style={[styles.inputContainer, {height: 100, marginBottom: 20}]}>
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
        ) : (
          <View></View>
        )}
        {isStep1Visible ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 130,
              paddingBottom: 50,
            }}>
            <TouchableOpacity
              onPress={() => {
                setFirstSetp(true);
                setIsStep1Visible(false);
              }}
              style={[styles.btn, {marginBottom: 50}]}>
              <Text style={styles.btntext}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={HandleNext}
              style={[styles.btn, {marginBottom: 50}]}>
              <Text style={styles.btntext}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : isStep3 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 130,
              paddingBottom: 50,
            }}>
            <TouchableOpacity onPress={HandlePrevious} style={styles.btn}>
              <Text style={[styles.btntext, {fontSize: 14}]}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={HandleSubmit}
              disabled={isLoading}
              style={styles.btn}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.btntext}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </ScrollView>
  );
};

export default NewChalan;