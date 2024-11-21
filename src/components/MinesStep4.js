import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApiToken from './Token';
// const CustomInput = ({ placeholder, value, onChangeText }) => (
//   <View style={[styles.inputContainer, {marginTop: 10}]}>
//     <TextInput
//       placeholderTextColor={'#6c6f73'}
//       style={{
//         color: 'black',
//         fontSize: 15,
//         width: '90%',
//       }}
//       placeholder={placeholder}
//       autoCorrect={false}
//       value={value}
//       keyboardType="numeric"
//       onChangeText={onChangeText}
//     />
//   </View>
// );

const MinesStep4 = () => {
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
  const navigation = useNavigation();
  const [STONo, setSTONo] = useState('');
  const [DelNo, setDelNo] = useState('');
  const [GPSNo, setGPSNo] = useState('');
  const [InvoiceNo, setInvoiceNo] = useState('');
  const [TPNo, setTPNo] = useState('');
  const [EwayBillNo, setEwayBillNo] = useState('');
  const [EwayBillNo1, setEwayBillNo1] = useState('');
  const [EwayBillNo2, setEwayBillNo2] = useState('');
  const [EwayBillNo3, setEwayBillNo3] = useState('');
  const [EwayBillNo4, setEwayBillNo4] = useState('');
  const [EwayBillNo5, setEwayBillNo5] = useState('');
  const [EwayBillNo6, setEwayBillNo6] = useState('');
  const [EwayBillNo7, setEwayBillNo7] = useState('');
  const [EwayBillNo8, setEwayBillNo8] = useState('');
  const [EwayBillNo9, setEwayBillNo9] = useState('');

  const [ClientInvoiceNo, setClientInvoiceNo] = useState('');
  const [ClientInvoiceNo1, setClientInvoiceNo1] = useState('');
  const [ClientInvoiceNo2, setClientInvoiceNo2] = useState('');
  const [ClientInvoiceNo3, setClientInvoiceNo3] = useState('');
  const [ClientInvoiceNo4, setClientInvoiceNo4] = useState('');
  const [ClientInvoiceNo5, setClientInvoiceNo5] = useState('');
  const [ClientInvoiceNo6, setClientInvoiceNo6] = useState('');
  const [ClientInvoiceNo7, setClientInvoiceNo7] = useState('');
  const [ClientInvoiceNo8, setClientInvoiceNo8] = useState('');
  const [ClientInvoiceNo9, setClientInvoiceNo9] = useState('');

  const [bags, setbags] = useState('');
  const [loose, setloose] = useState('');
  const [material, setmaterial] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [currentlocation, setcurrentlocation] = useState(false);
  const [Remarks, setRemarks] = useState(false);
  // ////////////////////////////////////////////////////////////////////////////////////////////

  const [eb1, seteb1] = useState(false);
  const [eb2, seteb2] = useState(false);
  const [eb3, seteb3] = useState(false);
  const [eb4, seteb4] = useState(false);
  const [eb5, seteb5] = useState(false);
  const [eb6, seteb6] = useState(false);
  const [eb7, seteb7] = useState(false);
  const [eb8, seteb8] = useState(false);
  const [eb9, seteb9] = useState(false);

  const [number, setnumber] = useState(0);

  const ebshow = () => {
    switch (number) {
      case 0:
        seteb1(true);
        setnumber(1);
        break;
      case 1:
        seteb2(true);
        setnumber(2);
        break;
      case 2:
        seteb3(true);
        setnumber(3);
        break;
      case 3:
        seteb4(true);
        setnumber(4);
        break;
      case 4:
        seteb5(true);
        setnumber(5);
        break;
      case 5:
        seteb6(true);
        setnumber(6);
        break;
      case 6:
        seteb7(true);
        setnumber(7);
        break;
      case 7:
        seteb8(true);
        setnumber(8);
        break;
      case 8:
        seteb9(true);
        setnumber(9);
        break;
    }
  };
  const ebshow1 = () => {
    switch (number) {
      case 9:
        seteb9(false);
        setnumber(8);
        break;
      case 8:
        seteb8(false);
        setnumber(7);
        break;
      case 7:
        seteb7(false);
        setnumber(6);
        break;
      case 6:
        seteb6(false);
        setnumber(5);
        break;
      case 5:
        seteb5(false);
        setnumber(4);
        break;
      case 4:
        seteb4(false);
        setnumber(3);
        break;
      case 3:
        seteb3(false);
        setnumber(2);
        break;
      case 2:
        seteb2(false);
        setnumber(1);
        break;
      case 1:
        seteb1(false);
        setnumber(0);
        break;
    }
  };
  const [cn1, setcn1] = useState(false);
  const [cn2, setcn2] = useState(false);
  const [cn3, setcn3] = useState(false);
  const [cn4, setcn4] = useState(false);
  const [cn5, setcn5] = useState(false);
  const [cn6, setcn6] = useState(false);
  const [cn7, setcn7] = useState(false);
  const [cn8, setcn8] = useState(false);
  const [cn9, setcn9] = useState(false);
  const [number1, setnumber1] = useState(0);

  const cnshow = () => {
    switch (number1) {
      case 0:
        setcn1(true);
        setnumber1(1);
        break;
      case 1:
        setcn2(true);
        setnumber1(2);
        break;
      case 2:
        setcn3(true);
        setnumber1(3);
        break;
      case 3:
        setcn4(true);
        setnumber1(4);
        break;
      case 4:
        setcn5(true);
        setnumber1(5);
        break;
      case 5:
        setcn6(true);
        setnumber1(6);
        break;
      case 6:
        setcn7(true);
        setnumber1(7);
        break;
      case 7:
        setcn8(true);
        setnumber1(8);
        break;
      case 8:
        setcn9(true);
        setnumber1(9);
        break;
    }
  };
  const cnshow1 = () => {
    switch (number1) {
      case 9:
        setcn9(false);
        setnumber1(8);
        break;
      case 8:
        setcn8(false);
        setnumber1(7);
        break;
      case 7:
        setcn7(false);
        setnumber1(6);
        break;
      case 6:
        setcn6(false);
        setnumber1(5);
        break;
      case 5:
        setcn5(false);
        setnumber1(4);
        break;
      case 4:
        setcn4(false);
        setnumber1(3);
        break;
      case 3:
        setcn3(false);
        setnumber1(2);
        break;
      case 2:
        setcn2(false);
        setnumber1(1);
        break;
      case 1:
        setcn1(false);
        setnumber1(0);
        break;
    }
  };

  useEffect(() => {
    console.log('Number has changed:', number);
    // You can perform any action here that needs to be done when 'number' changes
  }, [number]);

  // =========================================
  const [PumpId, setPumpId] = useState('');
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
              label: pump.PumpName.toString(),
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
  // ==========================================
  const [value1, setValue1] = useState(null);
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
            label: job.JobNo.toString(),
            value: job.Id, // Assuming Id is a number; convert to string if needed
          }));
          setData1(formattedData);
        } else {
          console.log('Unexpected API response:', result);
        }
      } catch (error) {
        console.log('Error fetching Job numbers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [jobnumber]);
  // ========================================================================
  const [drivername, setdrivername] = useState('');
  const [value2, setValue2] = useState('');
  const [data2, setData2] = useState([]);

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
          label: driver.DriverName.toString(),
          value: driver.Id, // Assuming Id is a number; convert to string if needed
        }));
        setData2(formattedData);
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

  const fetchchallandata = () => {
    navigation.navigate('MinesChalan', {
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
      STONo: STONo,
      DelNo: DelNo,
      GPSNo: GPSNo,
      InvoiceNo: InvoiceNo,
      TPNo: TPNo,
      value2: value2,
      value1: value1,
      PumpId: PumpId,
      MaterialValue: material,
      TotalLoose: loose,
      Package: bags,
      CurrentLocation: currentlocation,
      Remarks: Remarks,
    });
  };
  useEffect(() => {
    if (EwayBillNo) {
      fetchchallandata();
    }
  }, [EwayBillNo]);

  useEffect(() => {
    if (STONo) {
      fetchchallandata();
    }
  }, [STONo]);

  useEffect(() => {
    if (DelNo) {
      fetchchallandata();
    }
  }, [DelNo]);
  useEffect(() => {
    if (Remarks) {
      fetchchallandata();
    }
  }, [Remarks]);

  useEffect(() => {
    if (GPSNo) {
      fetchchallandata();
    }
  }, [GPSNo]);

  useEffect(() => {
    if (InvoiceNo) {
      fetchchallandata();
    }
  }, [InvoiceNo]);

  useEffect(() => {
    if (TPNo) {
      fetchchallandata();
    }
  }, [TPNo]);
  useEffect(() => {
    if (value1) {
      fetchchallandata();
    }
  }, [value1]);

  useEffect(() => {
    if (PumpId) {
      fetchchallandata();
    }
  }, [PumpId]);
  useEffect(() => {
    if (bags) {
      fetchchallandata();
    }
  }, [bags]);
  useEffect(() => {
    if (material) {
      fetchchallandata();
    }
  }, [material]);
  useEffect(() => {
    if (value2) {
      fetchchallandata();
    }
  }, [value2]);
  useEffect(() => {
    if (currentlocation) {
      fetchchallandata();
    }
  }, [currentlocation]);

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
            color: '#453D98ff',
            textAlign: 'center',
            fontFamily: 'PoppinsBold',
          }}>
          Documentation
        </Text>
        <Text style={styles.levelText}>Client Invoice No</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
            }}
            placeholder={'Client Invoice No'}
            autoCorrect={false}
            value={ClientInvoiceNo}
            onChangeText={text => setClientInvoiceNo(text.toString())}
          />
          <TouchableOpacity onPress={cnshow}>
            <Image
              style={styles.rightIcon}
              source={require('../assets/add.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={cnshow1}>
            <Image
              style={styles.rightIcon}
              source={require('../assets/minus.png')}
            />
          </TouchableOpacity>
        </View>
        {cn1 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'Client Invoice No 1'}
              autoCorrect={false}
              value={ClientInvoiceNo1}
              onChangeText={text => setClientInvoiceNo1(text.toString())}
            />
          </View>
        )}
        {cn2 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'Client Invoice No 2'}
              autoCorrect={false}
              value={ClientInvoiceNo2}
              onChangeText={text => setClientInvoiceNo2(text.toString())}
            />
          </View>
        )}

        {cn3 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'Client Invoice No 3'}
              autoCorrect={false}
              value={ClientInvoiceNo3}
              onChangeText={text => setClientInvoiceNo3(text.toString())}
            />
          </View>
        )}

        {cn4 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'Client Invoice No 4'}
              autoCorrect={false}
              value={ClientInvoiceNo4}
              onChangeText={text => setClientInvoiceNo4(text.toString())}
            />
          </View>
        )}

        {cn5 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'Client Invoice No 5'}
              autoCorrect={false}
              value={ClientInvoiceNo5}
              onChangeText={text => setClientInvoiceNo5(text.toString())}
            />
          </View>
        )}

        {cn6 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'Client Invoice No 6'}
              autoCorrect={false}
              value={ClientInvoiceNo6}
              onChangeText={text => setClientInvoiceNo6(text.toString())}
            />
          </View>
        )}

        {cn7 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'Client Invoice No 7'}
              autoCorrect={false}
              value={ClientInvoiceNo7}
              onChangeText={text => setClientInvoiceNo7(text.toString())}
            />
          </View>
        )}

        {cn8 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'Client Invoice No 8'}
              autoCorrect={false}
              value={ClientInvoiceNo8}
              onChangeText={text => setClientInvoiceNo8(text.toString())}
            />
          </View>
        )}

        {cn9 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'Client Invoice No 9'}
              autoCorrect={false}
              value={ClientInvoiceNo9}
              onChangeText={text => setClientInvoiceNo9(text.toString())}
            />
          </View>
        )}

        <Text style={styles.levelText}>E-Way Bill No</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
            }}
            placeholder={'E-Way Bill No'}
            autoCorrect={false}
            value={EwayBillNo}
            onChangeText={text => setEwayBillNo(text.toString())}
          />
          <TouchableOpacity onPress={ebshow}>
            <Image
              style={styles.rightIcon}
              source={require('../assets/add.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={ebshow1}>
            <Image
              style={styles.rightIcon}
              source={require('../assets/minus.png')}
            />
          </TouchableOpacity>
        </View>
        {eb1 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'E-Way Bill No 1'}
              autoCorrect={false}
              value={EwayBillNo1}
              onChangeText={text => setEwayBillNo1(text.toString())}
            />
          </View>
        )}
        {eb2 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'E-Way Bill No 2'}
              autoCorrect={false}
              value={EwayBillNo2}
              onChangeText={text => setEwayBillNo2(text.toString())}
            />
          </View>
        )}
        {eb3 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'E-Way Bill No 3'}
              autoCorrect={false}
              value={EwayBillNo3}
              onChangeText={text => setEwayBillNo3(text.toString())}
            />
          </View>
        )}

        {eb4 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'E-Way Bill No 4'}
              autoCorrect={false}
              value={EwayBillNo4}
              onChangeText={text => setEwayBillNo4(text.toString())}
            />
          </View>
        )}

        {eb5 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'E-Way Bill No 5'}
              autoCorrect={false}
              value={EwayBillNo5}
              onChangeText={text => setEwayBillNo5(text.toString())}
            />
          </View>
        )}

        {eb6 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'E-Way Bill No 6'}
              autoCorrect={false}
              value={EwayBillNo6}
              onChangeText={text => setEwayBillNo6(text.toString())}
            />
          </View>
        )}

        {eb7 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'E-Way Bill No 7'}
              autoCorrect={false}
              value={EwayBillNo7}
              onChangeText={text => setEwayBillNo7(text.toString())}
            />
          </View>
        )}

        {eb8 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'E-Way Bill No 8'}
              autoCorrect={false}
              value={EwayBillNo8}
              onChangeText={text => setEwayBillNo8(text.toString())}
            />
          </View>
        )}

        {eb9 && (
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <TextInput
              placeholderTextColor={'#6c6f73'}
              style={{
                color: 'black',
                fontSize: 15,
                width: '90%',
              }}
              placeholder={'E-Way Bill No 9'}
              autoCorrect={false}
              value={EwayBillNo9}
              onChangeText={text => setEwayBillNo9(text.toString())}
            />
          </View>
        )}

        <Text style={styles.levelText}>GPS Device No</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'GPS Device No'}
            autoCorrect={false}
            value={GPSNo}
            onChangeText={text => setGPSNo(text.toString())}
          />
        </View>
        <Text style={styles.levelText}>Del No</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Enter Del No'}
            autoCorrect={false}
            value={DelNo}
            onChangeText={text => setDelNo(text.toString())}
          />
        </View>
        <Text style={styles.levelText}>TP No</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'TP No'}
            autoCorrect={false}
            value={TPNo}
            onChangeText={text => setTPNo(text.toString())}
          />
        </View>
        <Text style={styles.levelText}>STO No</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'STO No'}
            autoCorrect={false}
            value={STONo}
            onChangeText={text => setSTONo(text.toString())}
          />
        </View>
        <Text style={styles.levelText}>Total Bags</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Total Bags'}
            autoCorrect={false}
            keyboardType="numeric"
            onChangeText={text => setbags(text)}
          />
        </View>
        <Text style={styles.levelText}>Total Loose</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Total Loose'}
            autoCorrect={false}
            keyboardType="numeric"
            onChangeText={text => setloose(text)}
          />
        </View>
        <Text style={styles.levelText}>Material Value</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Material Value'}
            autoCorrect={false}
            keyboardType="numeric"
            onChangeText={text => setmaterial(text)}
          />
        </View>
        <Text style={styles.levelText}>Current Location</Text>
        <View style={styles.inputContainerend}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Enter Current Location'}
            autoCorrect={false}
            onChangeText={text => setcurrentlocation(text)}
          />
        </View>
        <Text style={styles.levelText}>Remarks</Text>
        <View style={styles.inputContainerend}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Enter Remarks'}
            autoCorrect={false}
            onChangeText={text => setRemarks(text)}
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

        <Text style={styles.levelText}>Driver Name</Text>
        <Dropdown
          style={styles.dropdownend}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: 'black'}}
          data={data2}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Driver Name' : '...'}
          searchPlaceholder="Enter Driver Name"
          value={value2}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue2(item.value);
            setIsFocus(false);
          }}
          onChangeText={text => setdrivername(text)}
        />
        <Text style={styles.levelText}>Job Number</Text>
        <Dropdown
          style={styles.dropdownend}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: 'black'}}
          data={data1}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Job Number' : '...'}
          searchPlaceholder="Enter Job Name"
          value={value1}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue1(item.value);
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
          placeholder={!isFocus ? 'Search Petrol Pump' : '...'}
          searchPlaceholder="Enter Petrol Pump Name"
          value={PumpId}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setPumpId(item.value);
            setIsFocus(false);
          }}
          onChangeText={text => setpumpsearch(text)}
        />
      </View>
    </View>
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
    backgroundColor: '#e6eff0',
    paddingHorizontal: 15,
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
    marginBottom: 20,
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

  MandatoryText: {
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
    fontSize: 10,
    fontFamily: 'PoppinsRegular',
  },
  rightIcon: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
});

export default MinesStep4;
