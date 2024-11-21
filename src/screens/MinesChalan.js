import {View, Text, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {ScrollView} from 'react-native-gesture-handler';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import MinesStep1 from '../components/MinesStep1';
import MinesStep2 from '../components/MinesStep2';
import MinesStep3 from '../components/MinesStep3';
import MinesStep4 from '../components/MinesStep4';
import {Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApiToken from '../components/Token';
import CustomAlert from '../components/CustomAlert';
const MinesChalan = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data1, setdata1] = useState('');
  const [data2, setdata2] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [IsLoading, setIsLoading] = useState(false);
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

  onNextStep = () => {
    console.log('called next step');
  };
  onNextStep1 = () => {
    console.log('called next step1====================');
  };
  onPaymentStepComplete = () => {
    console.log('step 1 completed!');
    const {
      ChallanNo,
      Cash,
      LoadDate,
      FreightRate,
      BankAmount,
      TruckSource,
      TareWt,
      GrossWt,
      value3,
      NetWt,
      LoadType,
      DieselAdvance,
      BankTransfer,
      GuarnteeWt,
    } = route.params ?? {};

    const postData1 = {
      ChallanNo: ChallanNo,
      LoadDate: LoadDate,
      TruckSource: TruckSource,
      FreightRate: FreightRate,
      Cash: Cash,
      VehicleId: value3,
      TareWt: TareWt,
      GrossWt: GrossWt,
      NetWt: NetWt,
      BankAmount: BankAmount,
      LoadType: LoadType,
      DieselAdvance: DieselAdvance,
      BankTransfer: BankTransfer,
      GuarnteeWt: GuarnteeWt,
    };
    setdata1(postData1);
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    setIsLoading(true);
    const {
      value1,
      value2,
      ClientInvoiceNo,
      ClientInvoiceNo1,
      ClientInvoiceNo2,
      ClientInvoiceNo3,
      ClientInvoiceNo4,
      ClientInvoiceNo5,
      ClientInvoiceNo6,
      ClientInvoiceNo7,
      ClientInvoiceNo8,
      ClientInvoiceNo9,
      ClientInvoiceNo10,
      EwayBillNo,
      EwayBillNo1,
      EwayBillNo2,
      EwayBillNo3,
      EwayBillNo4,
      EwayBillNo5,
      EwayBillNo6,
      EwayBillNo7,
      EwayBillNo8,
      EwayBillNo9,
      EwayBillNo10,

      STONo,
      DelNo,
      GPSNo,
      TPNo,
      PumpId,
      InvoiceNo,
      MaterialValue,
      TotalLoose,
      Package,
      CurrentLocation,
      Remarks,
    } = route.params ?? {};

    const postData2 = {
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
      EwayBillNo10: EwayBillNo10,

      ClientInvoiceNo: ClientInvoiceNo,
      ClientInvoiceNo1: ClientInvoiceNo1,
      ClientInvoiceNo2: ClientInvoiceNo2,
      ClientInvoiceNo3: ClientInvoiceNo3,
      ClientInvoiceNo4: ClientInvoiceNo4,
      ClientInvoiceNo5: ClientInvoiceNo5,
      ClientInvoiceNo6: ClientInvoiceNo6,
      ClientInvoiceNo7: ClientInvoiceNo7,
      ClientInvoiceNo8: ClientInvoiceNo8,
      ClientInvoiceNo9: ClientInvoiceNo9,
      ClientInvoiceNo10: ClientInvoiceNo10,
      STONo: STONo,
      DelNo: DelNo,
      GPSNo: GPSNo,
      InvoiceNo: InvoiceNo,
      TPNo: TPNo,
      DriverId: value2,
      JobId: value1,
      PumpId: PumpId,
      MaterialValue: MaterialValue,
      TotalLoose: TotalLoose,
      TotalBag: Package,
      CurrentLocation: CurrentLocation,
      Remarks: Remarks,
    };
    console.log(postData2);
    const mergedData = {...data1, ...postData2};
    console.log('Merged Data:', mergedData);
    const filteredData = Object.fromEntries(
      Object.entries(mergedData).filter(([_, value]) => value !== ''),
    );
    console.log('Filtered Data:', filteredData);
    fetch('https://Exim.Tranzol.com/api/LoadingChallan/Create', {
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
      .then(response => {
        if (response.status === 200 || response.status === 500) {
          // If status is 200, proceed to the next .then block
          console.log(
            'entered response===================================================',
          );
          return response.json();
        } else {
          const errorMessage = 'Kindly Give All Inputs';
          setErrorMessage(errorMessage);
          setShowAlert(true);
        }
      })
      .then(data => {
        if (data.apiResult.Result !== null) {
          const errorMessage = 'Registration Successfull';
          setErrorMessage(errorMessage);
          setShowAlert(true);
          console.log('Response Data::::::', data);
        } else {
          console.log('Response Data::::::', data);
          if (data.Error === 'The TruckSource field is required.') {
            const errorMessage = 'Truck Soruce Mandatory';
            console.log(errorMessage);
            setErrorMessage(errorMessage);
            setShowAlert(true);
          } else if (data.Error === 'Challan No is already exists.') {
            const errorMessage = 'Challan No Already Existed';
            console.log(errorMessage);
            setErrorMessage(errorMessage);
            setShowAlert(true);
          } else if (data.Error === 'The LoadDate field is required.') {
            const errorMessage = 'Load Date Error';
            console.log(errorMessage);
            setErrorMessage(errorMessage);
            setShowAlert(true);
          } else {
            const errorMessage = 'Fill The Mandatory Fields';
            console.log(errorMessage);
            setErrorMessage(errorMessage);
            setShowAlert(true);
          }
        }
      })
      .catch(error => {
        console.log('An error occurred:', error);
        const errorMessage = 'Kindly Check Network';
        setErrorMessage(errorMessage);
        setShowAlert(true);
      });
  };
  const closeAlert = () => {
    setShowAlert(false);
    redirect();
  };
  const redirect = () => {
    navigation.navigate('MinesLoading');
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {IsLoading ? (
        <LoadingIndicator />
      ) : (
        <ProgressSteps>
          <ProgressStep label="Step 1" onNext={onPaymentStepComplete}>
            <MinesStep1 />
          </ProgressStep>

          <ProgressStep
            label="Step 2"
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}>
            <MinesStep4 />
          </ProgressStep>
        </ProgressSteps>
      )}
      <CustomAlert
        visible={showAlert}
        message={errorMessage}
        onClose={closeAlert}
      />
    </ScrollView>
  );
};

export default MinesChalan;
