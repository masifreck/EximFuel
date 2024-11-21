import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApiToken from './Token';
const deviceWidth = Dimensions.get('window').width;

const MinesStep2 = () => {
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
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const TruckSourceData = [
    {label: 'Association', value: 'Association'},
    {label: 'Market', value: 'Market'},
  ];
  // Toast Message ===================================================================================
  const [showToast, setShowToast] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  // For new border with red border line
  const [hasBorder, setHasBorder] = useState(false); // State for border
  const handleShowToast = () => {
    setShowToast(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      hideToast();
    }, 500);
    setHasBorder(true);
  };

  const hideToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowToast(false);
    });
  };

  // pump id================================================================================
  const [pumpsearch, setpumpsearch] = useState('behera');
  const [PumpList, setPumpList] = useState([]);
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
            console.log('exicuted');
            const dummy = data.PumpList.map((pump, index) => ({
              label: pump.PumpName,
              value: index.toString(),
            }));
            setpumpData(dummy);
          } else {
            console.log('hehehehehehhe');
          }
        } else {
          console.log('Error fetching vehicle details');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    const delayedFetch = setTimeout(() => {
      fetchData();
    }, 3000);
    return () => clearTimeout(delayedFetch);
  }, [pumpsearch]);

  console.log(' data goes here', pumpData);

  useEffect(() => {
    if (pumpsearch) {
      console.log(pumpsearch);
    }
  }, [pumpsearch]);
  // challan no ============================================================================
  const [ChallanNo, setChallanNo] = useState('');
  const [LoadDate, setLoadDate] = useState('');
  const [TruckSource, setTruckSource] = useState('');

  const [TareWt, setTareWt] = useState('');
  const [NetWt, setNetWt] = useState('');
  const [GrossWt, setGrossWt] = useState('');
  const [FreightRate, setFreightRate] = useState('');
  const [Cash, setCash] = useState('');

  const [Diesel, setDiesel] = useState('');

  const [vehicleNo, setvehicleNo] = useState('');
  const [BankAmount, setBankAmount] = useState('');
  const [LoadType, setLoadType] = useState('');

  // const [JobId, setJobId] = useState('');
  // const [OwnerId, setOwnerId] = useState('');
  // const [DriverId, setDriverId] = useState('');

  const fetchchallandata = () => {
    navigation.navigate('MinesChalan', {
      ChallanNo: ChallanNo,
      LoadDate: LoadDate,
      TruckSource: TruckSource,
      FreightRate: FreightRate,
      TareWt:TareWt,
      GrossWt:GrossWt,
      NetWt:NetWt,
      Cash:Cash,
      BankAmount:BankAmount,
      LoadType:LoadType,
    });
  };
  useEffect(() => {
    if (ChallanNo) {
      fetchchallandata();
    }
  }, [ChallanNo]);

 
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
          Identification
        </Text>

        <Text style={styles.levelText}>
          Challan No <Text style={{color: 'red'}}>*</Text>
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            value={ChallanNo}
            onChangeText={text => setChallanNo(text)}
            placeholder={'Enter Challan No'}
            autoCorrect={false}
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
          Logistics Details
        </Text>

        <Text style={styles.levelText}>
          Load Date <Text style={{color: 'red'}}>*</Text>
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'YYYY-MM-DD'}
            autoCorrect={false}
            value={LoadDate}
            onChangeText={text => setLoadDate(text)}
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
          data={TruckSourceData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
          value={TruckSource}
          onChange={item => {
            setTruckSource(item.value);
            setIsFocus(false);
          }}
        />
        <Text
          style={{
            fontSize: 18,
            marginBottom: 8,
            marginTop: 8,
            color: '#453D98ff',
            textAlign: 'center',
            fontFamily: 'PoppinsBold',
          }}>
          Financial Information
        </Text>
        <Text style={styles.levelText}>Freight Rate</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Freight Rate'}
            autoCorrect={false}
            onChangeText={text => setFreightRate(text)}
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
            placeholder={'Cash'}
            autoCorrect={false}
            onChangeText={text => setCash(text)}
          />
        </View>
        <Text style={styles.levelText}>HSD</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'HSD'}
            autoCorrect={false}
            onChangeText={text => setHSD(text)}
          />
        </View>

        <Text style={styles.levelText}>Bank Amount</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Bank Amount'}
            autoCorrect={false}
            onChangeText={text => setBankAmount(text)}
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
          Reference Information
        </Text>
       
        <Text style={styles.levelText}>Petrol pump</Text>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: 'black'}}
          data={pumpData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Enter Petrol Pump' : '...'}
          searchPlaceholder="Search..."
          value={PumpId}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setPumpId(item.value);
            setIsFocus(false);
          }}
          onChangeText={text => setpumpsearch(text)}
        />
        {/* <Text style={styles.levelText}>Driver Id</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Driver Id'}
            onChangeText={text => setDriverId(text)}
          />
        </View> */}
        {/* <Text style={styles.levelText}>Owner Id</Text>
        <View style={styles.inputContainerend}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Owner Id'}
            onChangeText={text => setOwnerId(text)}
          />
        </View> */}
      </View>
      {showToast && (
        <Animated.View
          style={[styles.toastContainer, {opacity: fadeAnim, zIndex: 999}]}>
          <Text style={styles.toastText}>Fill All Mandatory Fields</Text>
        </Animated.View>
      )}
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
  rightIcon: {
    height: 25,
    width: 25,
  },
  rightIconFile: {
    height: 30,
    width: 30,
    margin: '15%',
  },
  toastContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: '65%', // Center vertically
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

export default MinesStep2;
