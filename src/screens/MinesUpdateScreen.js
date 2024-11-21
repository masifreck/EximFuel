import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation, useRoute} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import CustomAlert from '../components/CustomAlert';
import useApiToken from '../components/Token';
import LoadingIndicator from '../components/LoadingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MinesUpdateScreen = () => {
  const route = useRoute();
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
  const {minesDetails} = route.params;
  const FetchminesDetails = minesDetails.apiResult.Result;
  const navigation = useNavigation();
  console.log(FetchminesDetails);
  const [Id, setId] = useState(FetchminesDetails.Id.toString());
  const [EChallanNo, setEChallanNo] = useState(FetchminesDetails.EChallanNo);
  const [ChallanNo, setChallanNo] = useState(
    FetchminesDetails.ChallanNo !== null ? FetchminesDetails.ChallanNo : '',
  );
  const [TruckSource, setTruckSource] = useState(
    FetchminesDetails.TruckSource !== null ? FetchminesDetails.TruckSource : '',
  );

  const [EwayBillNo, setEwayBillNo] = useState(
    FetchminesDetails.EwayBillNo !== null ? FetchminesDetails.EwayBillNo : '',
  );
  const [EwayBillNo1, setEwayBillNo1] = useState(
    FetchminesDetails.EwayBillNo1 !== null ? FetchminesDetails.EwayBillNo1 : '',
  );
  const [EwayBillNo2, setEwayBillNo2] = useState(
    FetchminesDetails.EwayBillNo2 !== null ? FetchminesDetails.EwayBillNo2 : '',
  );
  const [EwayBillNo3, setEwayBillNo3] = useState(
    FetchminesDetails.EwayBillNo3 !== null ? FetchminesDetails.EwayBillNo3 : '',
  );
  const [EwayBillNo4, setEwayBillNo4] = useState(
    FetchminesDetails.EwayBillNo4 !== null ? FetchminesDetails.EwayBillNo4 : '',
  );
  const [EwayBillNo5, setEwayBillNo5] = useState(
    FetchminesDetails.EwayBillNo5 !== null ? FetchminesDetails.EwayBillNo5 : '',
  );
  const [EwayBillNo6, setEwayBillNo6] = useState(
    FetchminesDetails.EwayBillNo6 !== null ? FetchminesDetails.EwayBillNo6 : '',
  );
  const [EwayBillNo7, setEwayBillNo7] = useState(
    FetchminesDetails.EwayBillNo7 !== null ? FetchminesDetails.EwayBillNo7 : '',
  );
  const [EwayBillNo8, setEwayBillNo8] = useState(
    FetchminesDetails.EwayBillNo8 !== null ? FetchminesDetails.EwayBillNo8 : '',
  );
  const [EwayBillNo9, setEwayBillNo9] = useState(
    FetchminesDetails.EwayBillNo9 !== null ? FetchminesDetails.EwayBillNo9 : '',
  );
  const [TPNo, setTPNo] = useState(
    FetchminesDetails.TPNo !== null ? FetchminesDetails.TPNo : '',
  );
  // const [LoadDate, setLoadDate] = useState(FetchminesDetails.LoadDate);
  const [FreightRate, setFreightRate] = useState(
    FetchminesDetails.FreightRate !== null
      ? FetchminesDetails.FreightRate.toString()
      : '',
  );
  const [LoadType, setLoadType] = useState(
    FetchminesDetails.LoadType !== null ? FetchminesDetails.LoadType : '',
  );
  const [GuarnteeWt, setGuarnteeWt] = useState(
    FetchminesDetails.GuarnteeWt !== null
      ? FetchminesDetails.GuarnteeWt.toString()
      : '',
  );
  const [GrossWt, setGrossWt] = useState(
    FetchminesDetails.GrossWt !== null
      ? FetchminesDetails.GrossWt.toString()
      : '',
  );
  const [TareWt, setTareWt] = useState(
    FetchminesDetails.TareWt !== null
      ? FetchminesDetails.TareWt.toString()
      : '',
  );
  const [NetWt, setNetWt] = useState(
    FetchminesDetails.NetWt !== null ? FetchminesDetails.NetWt.toString() : '',
  );
  const [Cash, setCash] = useState(
    FetchminesDetails.Cash !== null ? FetchminesDetails.Cash.toString() : '',
  );
  const [DieselAdvance, setDieselAdvance] = useState(
    FetchminesDetails.DieselAdvance !== null
      ? FetchminesDetails.DieselAdvance.toString()
      : '',
  );
  const [BankTransfer, setBankTransfer] = useState(
    FetchminesDetails.BankTransfer !== null
      ? FetchminesDetails.BankTransfer.toString()
      : '',
  );
  const [ClientInvoiceNo, setClientInvoiceNo] = useState(
    FetchminesDetails.ClientInvoiceNo !== null
      ? FetchminesDetails.ClientInvoiceNo
      : '',
  );
  const [ClientInvoiceNo1, setClientInvoiceNo1] = useState(
    FetchminesDetails.ClientInvoiceNo1 !== null
      ? FetchminesDetails.ClientInvoiceNo1
      : '',
  );
  const [ClientInvoiceNo2, setClientInvoiceNo2] = useState(
    FetchminesDetails.ClientInvoiceNo2 !== null
      ? FetchminesDetails.ClientInvoiceNo2
      : '',
  );
  const [ClientInvoiceNo3, setClientInvoiceNo3] = useState(
    FetchminesDetails.ClientInvoiceNo3 !== null
      ? FetchminesDetails.ClientInvoiceNo3
      : '',
  );
  const [ClientInvoiceNo4, setClientInvoiceNo4] = useState(
    FetchminesDetails.ClientInvoiceNo4 !== null
      ? FetchminesDetails.ClientInvoiceNo4
      : '',
  );
  const [ClientInvoiceNo5, setClientInvoiceNo5] = useState(
    FetchminesDetails.ClientInvoiceNo5 !== null
      ? FetchminesDetails.ClientInvoiceNo5
      : '',
  );
  const [ClientInvoiceNo6, setClientInvoiceNo6] = useState(
    FetchminesDetails.ClientInvoiceNo6 !== null
      ? FetchminesDetails.ClientInvoiceNo6
      : '',
  );
  const [ClientInvoiceNo7, setClientInvoiceNo7] = useState(
    FetchminesDetails.ClientInvoiceNo7 !== null
      ? FetchminesDetails.ClientInvoiceNo7
      : '',
  );
  const [ClientInvoiceNo8, setClientInvoiceNo8] = useState(
    FetchminesDetails.ClientInvoiceNo8 !== null
      ? FetchminesDetails.ClientInvoiceNo8
      : '',
  );
  const [ClientInvoiceNo9, setClientInvoiceNo9] = useState(
    FetchminesDetails.ClientInvoiceNo9 !== null
      ? FetchminesDetails.ClientInvoiceNo9
      : '',
  );
  const [CurrentLocation, setCurrentLocation] = useState(
    FetchminesDetails.CurrentLocation !== null
      ? FetchminesDetails.CurrentLocation
      : '',
  );
  const [STONo, setSTONo] = useState(
    FetchminesDetails.STONo !== null ? FetchminesDetails.STONo : '',
  );
  const [Remarks, setRemarks] = useState(
    FetchminesDetails.Remarks !== null ? FetchminesDetails.Remarks : '',
  );
  const [DelNo, setDelNo] = useState(
    FetchminesDetails.DelNo !== null ? FetchminesDetails.DelNo : '',
  );
  const [GPSNo, setGPSNo] = useState(
    FetchminesDetails.GPSNo !== null ? FetchminesDetails.GPSNo : '',
  );
  const [MaterialValue, setMaterialValue] = useState(
    FetchminesDetails.MaterialValue !== null
      ? FetchminesDetails.MaterialValue
      : '',
  );
  const [TotalLoose, setTotalLoose] = useState(
    FetchminesDetails.TotalLoose !== null ? FetchminesDetails.TotalLoose : '',
  );
  const [totalbags, settotalbags] = useState(
    FetchminesDetails.TotalBag !== null ? FetchminesDetails.TotalBag : '',
  );
  const [vehicleNoValue, setVehicleNoValue] = useState(
    FetchminesDetails.VehicleNo,
  );
  const [jobNoValue, setJobNoValue] = useState(FetchminesDetails.JobNo);
  const [driverNameValue, setDriverNameValue] = useState(
    FetchminesDetails.DriverName,
  );
  const [pumpNameValue, setPumpNameValue] = useState(
    FetchminesDetails.PumpName,
  );
  const [errorMessage, setErrorMessage] = useState(''); // Initialize state for error message
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => {
    // Function to close the alert
    navigation.navigate('MinesLoading');
    setShowAlert(false);
  };

  const [isFocus, setIsFocus] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);

  // calander==================
  let formattedDate = new Date(FetchminesDetails.LoadDate)
    .toISOString()
    .split('T')[0];
  let formattedDate1 = new Date(FetchminesDetails.LoadDate).toLocaleDateString(
    'en-GB',
  );
  const [selectedStartDate, setSelectedStartDate] = useState(formattedDate1);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [convselectedStartDate, setconvSelectedStartDate] =
    useState(formattedDate);

  const handleOkPress = () => {
    setCalendarVisible(false);
  };
  const onDateChange = date => {
    const selectedFormattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
    setSelectedStartDate(selectedFormattedDate);
    console.log(selectedStartDate);
  };
  useEffect(() => {
    const parts = selectedStartDate.split('/');
    const [day, month, year] = parts;
    const convertedDate = `${year}-${month}-${day}`;
    setconvSelectedStartDate(convertedDate);
    // console.log(convselectedStartDate);
  }, [selectedStartDate]);
  //calander===================

  // handleshow=========================================================================================================================
  const onSubmit = () => {
    const mergedData = {
      Id: Id,
      EChallanNo: EChallanNo,
      ChallanNo: ChallanNo,
      LoadDate: convselectedStartDate,
      TruckSource: TruckSource,
      FreightRate: FreightRate,
      Cash: Cash,
      TareWt: TareWt,
      GrossWt: GrossWt,
      NetWt: NetWt,
      LoadType: LoadType,
      DieselAdvance: DieselAdvance,
      BankTransfer: BankTransfer,
      GuarnteeWt: GuarnteeWt,
      EwayBillNo: EwayBillNo,
      EwayBillNo1: EwayBillNo1,
      EwayBillNo2: EwayBillNo2,
      EwayBillNo3: EwayBillNo3,
      EwayBillNo4: EwayBillNo4,
      EwayBillNo5: EwayBillNo5,
      EwayBillNo6: EwayBillNo6,
      EwayBillNo7: EwayBillNo7,
      EwayBillNo8: EwayBillNo8,
      EwayBillNo9: EwayBillNo9,

      STONo: STONo,
      DelNo: DelNo,
      GPSNo: GPSNo,
      TPNo: TPNo,
      ClientInvoiceNo: ClientInvoiceNo,
      ClientInvoiceNo2: ClientInvoiceNo2,
      ClientInvoiceNo1: ClientInvoiceNo1,
      ClientInvoiceNo3: ClientInvoiceNo3,
      ClientInvoiceNo4: ClientInvoiceNo4,
      ClientInvoiceNo5: ClientInvoiceNo5,
      ClientInvoiceNo6: ClientInvoiceNo6,
      ClientInvoiceNo7: ClientInvoiceNo7,
      ClientInvoiceNo8: ClientInvoiceNo8,
      ClientInvoiceNo9: ClientInvoiceNo9,
      MaterialValue: MaterialValue,
      TotalBag: totalbags,
      TotalLoose: TotalLoose,
      CurrentLocation: CurrentLocation,
      Remarks: Remarks,

      VehicleId: VehicleId,
      DriverId: DriverId,
      JobId: JobId,
      PumpId: PumpId,
    };

    console.log('Merged Data:', mergedData);
    const filteredData = Object.fromEntries(
      Object.entries(mergedData).filter(([_, value]) => value !== ''),
    );
    console.log('Filtered Data:', filteredData);
    fetch('https://Exim.Tranzol.com/api/LoadingChallan/UpdateChallan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${apiTokenReceived}`,
        clientId: 'TRANZOLBOSS',
        clientSecret: 'TRANZOLBOSSPAN',
      },
      redirect: 'follow',
      body: JSON.stringify(filteredData),
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);
        const jsonObject = JSON.parse(result); // Parsing the result as JSON
        const result1 = jsonObject.apiResult.Result;
        if (result1 === 'Update successfully') {
          setErrorMessage('Update successfull!');
          setShowAlert(true);
        } else {
          setErrorMessage('Something Went Wrong');
          setShowAlert(true);
        }
      })
      .catch(error => {
        console.log('An error occurred:', error);
        setErrorMessage(error);
        setShowAlert(true);
      });
  };
  // =====================================================================================================

  const data2 = [
    {label: 'ASSOCIATION', value: 'ASSOCIATION'},
    {label: 'MARKET', value: 'MARKET'},
  ];
  const data4 = [
    {label: 'LOOSE', value: 'LOOSE'},
    {label: 'BAG', value: 'BAG'},
  ];
  // ==============================================================
  const [PumpId, setPumpId] = useState(FetchminesDetails.PumpId);
  const [pumpsearch, setpumpsearch] = useState('behera');
  const [pumpData, setpumpData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://Exim.Tranzol.com/api/DropDown/Pumpname?search=${pumpsearch}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${apiTokenReceived}`,
            clientId: 'TRANZOLBOSS',
            clientSecret: 'TRANZOLBOSSPAN',
          },
          redirect: 'follow',
        });

        if (response.ok) {
          const data = await response.json();
          // setPumpList(data.PumpList);
          if (data.PumpList !== null) {
            const dummy = data.PumpList.map(pump => ({
              label: pump.PumpName,
              value: pump.Id, // Assuming Id is a number; convert to string if needed
            }));
            setpumpData(dummy);
          } else {
            console.log('hehehehehehhe');
          }
        } else {
          console.log('Error fetching vehicle details');
        }
      } catch (error) {
        console.log('An error occurred');
      }
    };
    const delayedFetch = setTimeout(() => {
      fetchData();
    }, 100);
    return () => clearTimeout(delayedFetch);
  }, [pumpsearch]);

  useEffect(() => {
    if (pumpsearch) {
      console.log(pumpsearch);
    }
  }, [pumpsearch]);
  // ==============================================================
  const [JobId, setJobId] = useState(FetchminesDetails.JobId);
  const [data1, setData1] = useState([]);
  const [jobnumber, setjobnumber] = useState('24/032');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://Exim.Tranzol.com/api/DropDown/JobNo?search=${jobnumber}`,
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
          const formattedData = result.JobList.map(job => ({
            label: job.JobNo,
            value: job.Id, // Assuming Id is a number; convert to string if needed
          }));
          setData1(formattedData);
        } else {
          console.log('Unexpected API response:', result);
        }
      } catch (error) {
        console.log('Error fetching Job numbers:', error);
      }
    };
    fetchData();
  }, [jobnumber]);
  // ========================================================================
  const [drivername, setdrivername] = useState('');
  const [DriverId, setDriverId] = useState(FetchminesDetails.DriverId);
  const [data5, setData5] = useState([]);

  const fetchData1 = async () => {
    try {
      const response = await fetch(
        `https://Exim.Tranzol.com/api/OwnerApi/GetDriverList?name=${drivername}`,
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
        console.log('came not1');

        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();

      if (result) {
        const formattedData = result.apiResult.Result.map(driver => ({
          label: driver.DriverName,
          value: driver.Id, // Assuming Id is a number; convert to string if needed
        }));
        setData5(formattedData);
      } else {
        console.log('Unexpected API response:', result);
      }
    } catch (error) {
      console.log('Error fetching Job numbers:', error);
    }
  };

  useEffect(() => {
    if (drivername) {
      fetchData1();
    }
  }, [drivername]);

  //==============================================================================================
  const [vehicleno, setvehicleno] = useState('');
  const [VehicleId, setVehicleId] = useState(FetchminesDetails.VehicleId);
  const [data3, setData3] = useState([]);

  const fetchData3 = async () => {
    try {
      const response = await fetch(
        `https://Exim.Tranzol.com/api/VehicleApi/GetVehicleList?vehicleNo=${vehicleno}`,
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
        const formattedData = result.apiResult.Result.map(vehicle => ({
          label: vehicle.VehicleNo,
          value: vehicle.Id, // Assuming Id is a number; convert to string if needed
        }));
        setData3(formattedData);
      } else {
        console.log('Unexpected API response:', result);
      }
    } catch (error) {
      console.log('Error fetching Job numbers:', error);
    }
  };

  useEffect(() => {
    if (vehicleno) {
      console.log(VehicleId);
      fetchData3();
    }
  }, [vehicleno]);

  useEffect(() => {
    if (apiTokenReceived && data5 && data1 && data3 && pumpData) {
      setIsLoading(false);
    }
  }, [apiTokenReceived]);
  return (
    <ScrollView>
      {IsLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
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
              Challan Info
            </Text>
            <Text style={styles.levelText}>Challan No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter Challan No'}
                autoCorrect={false}
                value={ChallanNo}
                editable={false}
                onChangeText={text => setChallanNo(text)}
              />
            </View>

            <Text style={styles.levelText}>
              Truck Source <Text style={{color: 'red'}}>*</Text>
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black'}}
              data={data2}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Select Truck Source'}
              searchPlaceholder="Search"
              value={TruckSource}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setTruckSource(item.value);
                setIsFocus(false);
              }}
            />

            <Text style={styles.levelText}>TP No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter TPNo'}
                autoCorrect={false}
                value={TPNo}
                onChangeText={text => setTPNo(text)}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 8,
                marginTop: 8,
                color: '#453D98ff',
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Freight Info
            </Text>
            <Text style={styles.levelText}>Freight Rate</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter FreightRate'}
                autoCorrect={false}
                value={FreightRate}
                onChangeText={text => setFreightRate(text)}
              />
            </View>
            <Text style={styles.levelText}>
              Load Date <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input1}
                placeholder={'DD-MM-YYYY'}
                autoCorrect={false}
                value={selectedStartDate}
                editable={false}
                // onChangeText={text => setLoadDate(text)}
              />
              <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                <Image
                  style={styles.rightIcon}
                  source={require('../assets/calendar.png')}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.levelText}>
              Load Type <Text style={{color: 'red'}}>*</Text>
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black'}}
              data={data4}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Select Load Type'}
              value={LoadType}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setLoadType(item.value);
                setIsFocus(false);
              }}
            />

            <Text style={styles.levelText}>Guarntee WT</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter GuarnteeWt'}
                autoCorrect={false}
                value={GuarnteeWt}
                onChangeText={text => setGuarnteeWt(text)}
              />
            </View>

            <Text style={styles.levelText}>Gross WT</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter GrossWt'}
                autoCorrect={false}
                value={GrossWt}
                onChangeText={text => setGrossWt(text)}
              />
            </View>

            <Text style={styles.levelText}>Tare WT</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter TareWt'}
                autoCorrect={false}
                value={TareWt}
                onChangeText={text => setTareWt(text)}
              />
            </View>

            <Text style={styles.levelText}>Net WT</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter NetWt'}
                autoCorrect={false}
                value={NetWt}
                onChangeText={text => setNetWt(text)}
              />
            </View>

            <Text
              style={{
                fontSize: 18,
                marginBottom: 8,
                marginTop: 8,
                color: '#453D98ff',
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Payment Info
            </Text>
            <Text style={styles.levelText}>Cash</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter Cash'}
                autoCorrect={false}
                value={Cash}
                onChangeText={text => setCash(text)}
              />
            </View>

            <Text style={styles.levelText}>DieselAdvance</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter DieselAdvance'}
                autoCorrect={false}
                value={DieselAdvance}
                onChangeText={text => setDieselAdvance(text)}
              />
            </View>

            <Text style={styles.levelText}>BankTransfer</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter BankTransfer'}
                autoCorrect={false}
                value={BankTransfer}
                onChangeText={text => setBankTransfer(text)}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 8,
                marginTop: 8,
                color: '#453D98ff',
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Additional Info
            </Text>
            <Text style={styles.levelText}>EwayBill No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter EwayBillNo'}
                autoCorrect={false}
                value={EwayBillNo}
                onChangeText={text => setEwayBillNo(text)}
              />
            </View>
            <Text style={styles.levelText}>EwayBill No1</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter EwayBillNo1'}
                autoCorrect={false}
                value={EwayBillNo1}
                onChangeText={text => setEwayBillNo1(text)}
              />
            </View>
            <Text style={styles.levelText}>EwayBill No2</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter EwayBillNo2'}
                autoCorrect={false}
                value={EwayBillNo2}
                onChangeText={text => setEwayBillNo2(text)}
              />
            </View>
            <Text style={styles.levelText}>EwayBill No3</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter EwayBillNo3'}
                autoCorrect={false}
                value={EwayBillNo3}
                onChangeText={text => setEwayBillNo3(text)}
              />
            </View>

            <Text style={styles.levelText}>EwayBill No4</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter EwayBillNo4'}
                autoCorrect={false}
                value={EwayBillNo4}
                onChangeText={text => setEwayBillNo4(text)}
              />
            </View>

            <Text style={styles.levelText}>EwayBill No5</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter EwayBillNo5'}
                autoCorrect={false}
                value={EwayBillNo5}
                onChangeText={text => setEwayBillNo5(text)}
              />
            </View>

            <Text style={styles.levelText}>EwayBill No6</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter EwayBillNo6'}
                autoCorrect={false}
                value={EwayBillNo6}
                onChangeText={text => setEwayBillNo6(text)}
              />
            </View>

            <Text style={styles.levelText}>EwayBill No7</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter EwayBillNo7'}
                autoCorrect={false}
                value={EwayBillNo7}
                onChangeText={text => setEwayBillNo7(text)}
              />
            </View>

            <Text style={styles.levelText}>EwayBill No8</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter EwayBillNo8'}
                autoCorrect={false}
                value={EwayBillNo8}
                onChangeText={text => setEwayBillNo8(text)}
              />
            </View>

            <Text style={styles.levelText}>EwayBill No9</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter EwayBillNo9'}
                autoCorrect={false}
                value={EwayBillNo9}
                onChangeText={text => setEwayBillNo9(text)}
              />
            </View>

            <Text style={styles.levelText}>ClientInvoice No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter ClientInvoiceNo'}
                autoCorrect={false}
                value={ClientInvoiceNo}
                onChangeText={text => setClientInvoiceNo(text)}
              />
            </View>
            <Text style={styles.levelText}>ClientInvoice No 1</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter ClientInvoiceNo1'}
                autoCorrect={false}
                value={ClientInvoiceNo1}
                onChangeText={text => setClientInvoiceNo1(text)}
              />
            </View>
            <Text style={styles.levelText}>ClientInvoice No 2</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter ClientInvoiceNo2'}
                autoCorrect={false}
                value={ClientInvoiceNo2}
                onChangeText={text => setClientInvoiceNo2(text)}
              />
            </View>
            <Text style={styles.levelText}>ClientInvoice No 3</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter EwayBillNo3'}
                autoCorrect={false}
                value={ClientInvoiceNo3}
                onChangeText={text => setClientInvoiceNo3(text)}
              />
            </View>

            <Text style={styles.levelText}>ClientInvoice No 4</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter ClientInvoiceNo4'}
                autoCorrect={false}
                value={ClientInvoiceNo4}
                onChangeText={text => setClientInvoiceNo4(text)}
              />
            </View>

            <Text style={styles.levelText}>ClientInvoice No 5</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter ClientInvoiceNo5'}
                autoCorrect={false}
                value={ClientInvoiceNo5}
                onChangeText={text => setClientInvoiceNo5(text)}
              />
            </View>

            <Text style={styles.levelText}>ClientInvoice No 6</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter ClientInvoiceNo6'}
                autoCorrect={false}
                value={ClientInvoiceNo6}
                onChangeText={text => setClientInvoiceNo6(text)}
              />
            </View>

            <Text style={styles.levelText}>ClientInvoice No 7</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter ClientInvoiceNo7'}
                autoCorrect={false}
                value={ClientInvoiceNo7}
                onChangeText={text => setClientInvoiceNo7(text)}
              />
            </View>

            <Text style={styles.levelText}>ClientInvoice No 8</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter ClientInvoiceNo8'}
                autoCorrect={false}
                value={ClientInvoiceNo8}
                onChangeText={text => setClientInvoiceNo8(text)}
              />
            </View>

            <Text style={styles.levelText}>ClientInvoice No 9</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter ClientInvoiceNo9'}
                autoCorrect={false}
                value={ClientInvoiceNo9}
                onChangeText={text => setClientInvoiceNo9(text)}
              />
            </View>
            <Text style={styles.levelText}>CurrentLocation</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter CurrentLocation'}
                autoCorrect={false}
                value={CurrentLocation}
                onChangeText={text => setCurrentLocation(text)}
              />
            </View>

            <Text style={styles.levelText}>STO No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter STONo'}
                autoCorrect={false}
                value={STONo}
                onChangeText={text => setSTONo(text)}
              />
            </View>

            <Text style={styles.levelText}>Remarks</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter Remarks'}
                autoCorrect={false}
                value={Remarks}
                onChangeText={text => setRemarks(text)}
              />
            </View>

            <Text style={styles.levelText}>Del No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter DelNo'}
                autoCorrect={false}
                value={DelNo}
                onChangeText={text => setDelNo(text)}
              />
            </View>

            <Text style={styles.levelText}>GPS No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter GPSNo'}
                autoCorrect={false}
                value={GPSNo}
                onChangeText={text => setGPSNo(text)}
              />
            </View>

            <Text style={styles.levelText}>MaterialValue</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter MaterialValue'}
                autoCorrect={false}
                value={MaterialValue}
                onChangeText={text => setMaterialValue(text)}
              />
            </View>

            <Text style={styles.levelText}>Total Bags</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter Total Bags'}
                autoCorrect={false}
                value={totalbags}
                onChangeText={text => settotalbags(text)}
              />
            </View>
            <Text style={styles.levelText}>TotalLoose</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.input}
                placeholder={'Enter Total Loose'}
                autoCorrect={false}
                value={TotalLoose}
                onChangeText={text => setTotalLoose(text)}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 8,
                marginTop: 8,
                color: '#453D98ff',
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Link Information
            </Text>
            <Text style={styles.levelText}>
              Vehicle Number <Text style={{color: 'red'}}>*</Text>
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black'}}
              data={data3}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? vehicleNoValue : '...'}
              searchPlaceholder="Enter Vehicle Number"
              value={vehicleNoValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setVehicleId(item.value);
                setIsFocus(false);
              }}
              onChangeText={text => setvehicleno(text)}
            />
            <Text style={styles.levelText}>Driver Name</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black'}}
              data={data5}
              search
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? driverNameValue : '...'}
              searchPlaceholder="Enter Driver Name"
              value={driverNameValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setDriverId(item.value);
                setIsFocus(false);
              }}
              onChangeText={text => setdrivername(text)}
            />
            <Text style={styles.levelText}>Job Number</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black'}}
              data={data1}
              search
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? jobNoValue : '...'}
              searchPlaceholder="Enter Job Name"
              // value={}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setJobId(item.value);
                setIsFocus(false);
              }}
              onChangeText={text => setjobnumber(text)}
            />
            <Text style={styles.levelText}>Petrol pump</Text>
            <Dropdown
              style={[styles.dropdownend]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black'}}
              data={pumpData}
              search
              maxHeight={500}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? pumpNameValue : '...'}
              searchPlaceholder="Enter Petrol Pump Name"
              value={pumpNameValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setPumpId(item.value);
                setIsFocus(false);
              }}
              onChangeText={text => setpumpsearch(text)}
            />
          </View>

          <Modal
            transparent={true}
            animationType="fade"
            visible={calendarVisible}>
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
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.text}>Submit</Text>
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
// onPress={handleShowDetails}
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '90%',
    borderColor: 'black',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: '#e6eff0',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  dropdownend: {
    height: 50,
    width: '90%',
    borderColor: 'black',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: '#e6eff0',
    paddingHorizontal: 15,
    marginBottom: 50,
  },
  input: {
    color: 'black',
    fontSize: 15,
    width: '100%',
  },
  input1: {
    color: 'black',
    fontSize: 15,
    width: '85%',
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
  },

  container: {
    alignItems: 'center',
    // justifyContent:'center',
    flex: 1,
    flexDirection: 'column',
  },
  levelContainer: {
    backgroundColor: '#fcfafb',
    width: '90%',
    margin: 10,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'gray',

    // alignItems: 'center',
    // justifyContent: 'center'
  },
  MandatoryText: {
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
    fontSize: 10,
    fontFamily: 'PoppinsRegular',
  },
  levelText: {
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
    fontSize: 13,
    fontFamily: 'PoppinsMedium',
  },
  Uploadimg: {
    height: 30,
    width: 30,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  inputContainer: {
    height: 50,
    width: '90%',
    backgroundColor: '#e6eff0',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    borderColor: 'black',
    alignSelf: 'center',
  },
  inputContainerend: {
    height: 50,
    width: '90%',
    backgroundColor: '#e6eff0',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    borderColor: 'black',
    alignSelf: 'center',
    marginBottom: 20,
  },
  rightIcon: {
    height: 20,
    width: 20,
    margin: '15%',
  },
  rightIconFile: {
    height: 30,
    width: 30,
    margin: '15%',
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
  button: {
    backgroundColor: '#453D98ff',
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 20,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '15%',
  },

  text: {
    color: 'white',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: 'PoppinsSemiBold',
  },
});
export default MinesUpdateScreen;
