import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApiToken from './Token';
import { darkBlue } from './constant';
const deviceWidth = Dimensions.get('window').width;

const MinesStep1 = () => {
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
  //=========================================================================

  const [vehicleno, setvehicleno] = useState('');
  const [value3, setValue3] = useState('');
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
          label: vehicle.VehicleNo.toString(),
          value: vehicle.Id, // Assuming Id is a number; convert to string if needed
        }));
        setData3(formattedData);
      } else {
        console.log('Unexpected API response:', result);
      }
    } catch (error) {
      console.log('Error fetching Job numbers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (vehicleno) {
      console.log(value3);
      fetchData3();
    }
  }, [vehicleno]);
  //=========================================================================
  // calander==================
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [convselectedStartDate, setconvSelectedStartDate] = useState(null);
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
    // console.log(selectedStartDate);
  };
  useEffect(() => {
    const parts = selectedStartDate.split('/');
    const [day, month, year] = parts;
    const convertedDate = `${year}/${month}/${day}`;
    setconvSelectedStartDate(convertedDate);
    // console.log(convselectedStartDate);
  }, [selectedStartDate]);
  //calander===================
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const data2 = [
    {label: 'ASSOCIATION', value: 'ASSOCIATION'},
    {label: 'MARKET', value: 'MARKET'},
  ];
  const data4 = [
    {label: 'LOOSE', value: 'LOOSE'},
    {label: 'BAG', value: 'BAG'},
  ];
  const [ChallanNo, setChallanNo] = useState('');
  const [LoadDate, setLoadDate] = useState('');
  const [TruckSource, setTruckSource] = useState('');
  const [TareWt, setTareWt] = useState('0.00');
  const [NetWt, setNetWt] = useState('0.00');
  const [GuarnteeWt, setGuarnteeWt] = useState('0.00');
  const [GrossWt, setGrossWt] = useState('0.00');
  const [FreightRate, setFreightRate] = useState('0.00');
  const [Cash, setCash] = useState('0.00');

  const [BankAmount, setBankAmount] = useState('');
  const [LoadType, setLoadType] = useState('');

  const [Diesel, setDiesel] = useState('0.00');
  const [bankTransfer, setbankTransfer] = useState('0.00');

  const [isFocus, setIsFocus] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const fetchchallandata = () => {
    navigation.navigate('MinesChalan', {
      ChallanNo: ChallanNo,
      LoadDate: convselectedStartDate,
      TruckSource: TruckSource,
      FreightRate: FreightRate,
      Cash: Cash,
      TareWt: TareWt,
      GuarnteeWt: GuarnteeWt,
      GrossWt: GrossWt,
      NetWt: NetWt,
      BankAmount: BankAmount,
      LoadType: LoadType,
      DieselAdvance: Diesel,
      BankTransfer: bankTransfer,
      value3: value3,
    });
  };
  useEffect(() => {
    if (TareWt && GrossWt) {
      const add = GrossWt - TareWt;
      if (add === 0) {
        setNetWt('0');
      } else {
        setNetWt(add.toString());
        console.log('exec', NetWt);
      }
    }
  }, [TareWt, GrossWt]);
  useEffect(() => {
    if (NetWt) {
      fetchchallandata();
    }
  }, [NetWt]);
  useEffect(() => {
    if (LoadType) {
      fetchchallandata();
    }
  }, [LoadType]);

  useEffect(() => {
    if (ChallanNo) {
      fetchchallandata();
    }
  }, [ChallanNo]);
  useEffect(() => {
    if (GuarnteeWt) {
      fetchchallandata();
    }
  }, [GuarnteeWt]);

  useEffect(() => {
    if (LoadDate) {
      fetchchallandata();
    }
  }, [LoadDate]);

  useEffect(() => {
    if (TruckSource) {
      fetchchallandata();
    }
  }, [TruckSource]);

  useEffect(() => {
    if (FreightRate) {
      fetchchallandata();
    }
  }, [FreightRate]);

  useEffect(() => {
    if (Cash) {
      fetchchallandata();
    }
  }, [Cash]);

  useEffect(() => {
    if (TareWt) {
      fetchchallandata();
    }
  }, [TareWt]);

  useEffect(() => {
    if (BankAmount) {
      fetchchallandata();
    }
  }, [BankAmount]);

  useEffect(() => {
    if (GrossWt) {
      fetchchallandata();
    }
  }, [GrossWt]);
  useEffect(() => {
    if (bankTransfer) {
      fetchchallandata();
    }
  }, [bankTransfer]);
  useEffect(() => {
    if (Diesel) {
      fetchchallandata();
    }
  }, [Diesel]);
  useEffect(() => {
    if (value3) {
      console.log(value3);
      fetchchallandata();
    }
  }, [value3]);

  return (
    <View style={styles.container}>
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
          General Details
        </Text>
        <Text style={styles.MandatoryText}>
          Mandatory Fields<Text style={{color: 'red'}}>*</Text>
        </Text>

        <Text style={styles.levelText}>
          Challan No <Text style={{color: 'red'}}>*</Text>
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={styles.input}
            placeholder={'Enter Challan No'}
            autoCorrect={false}
            value={ChallanNo}
            onChangeText={text => setChallanNo(text)}
          />
        </View>
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
          placeholder={!isFocus ? 'Select Vehicle Number' : '...'}
          searchPlaceholder="Enter Vehicle Number"
          value={value3}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue3(item.value);
            setIsFocus(false);
          }}
          onChangeText={text => setvehicleno(text)}
        />
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
            onChangeText={text => setLoadDate(text)}
          />
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <Image
              style={styles.rightIcon}
              source={require('../assets/calendar.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.levelText}>Guarntee WT</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={styles.input}
            placeholder={'Enter Gross WT'}
            autoCorrect={false}
            value={GuarnteeWt}
            keyboardType="numeric"
            onChangeText={text => setGuarnteeWt(text)}
          />
        </View>
        <Text style={styles.levelText}>Gross WT</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={styles.input}
            placeholder={'Enter Gross WT'}
            autoCorrect={false}
            value={GrossWt}
            keyboardType="numeric"
            onChangeText={text => setGrossWt(text)}
          />
        </View>
        <Text style={styles.levelText}>Tare WT</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={styles.input}
            placeholder={'Enter Tare WT'}
            autoCorrect={false}
            value={TareWt}
            keyboardType="numeric"
            onChangeText={text => setTareWt(text)}
          />
        </View>
        <Text style={styles.levelText}>
          Net WT <Text style={{color: 'red'}}>*</Text>
        </Text>
        <View style={styles.inputContainerend}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={styles.input}
            placeholder={'Enter Net WT'}
            autoCorrect={false}
            value={NetWt}
            keyboardType="numeric"
            onChangeText={text => setNetWt(text)}
          />
        </View>
      </View>

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
          Financial Details
        </Text>
        <Text style={styles.levelText}>
          Freight Rate <Text style={{color: 'red'}}>*</Text>
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={styles.input}
            placeholder={'0.00'}
            autoCorrect={false}
            keyboardType="numeric"
            onChangeText={text => setFreightRate(text)}
          />
        </View>
        <Text style={styles.levelText}>Cash Advance</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={styles.input}
            placeholder={'0.00'}
            autoCorrect={false}
            keyboardType="numeric"
            onChangeText={text => setCash(text)}
          />
        </View>
        <Text style={styles.levelText}>Diesel Advance</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={styles.input}
            placeholder={'0.00'}
            autoCorrect={false}
            keyboardType="numeric"
            onChangeText={text => setDiesel(text)}
          />
        </View>
        <Text style={styles.levelText}>Bank Transfer</Text>
        <View style={styles.inputContainerend}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={styles.input}
            placeholder={'0.00'}
            autoCorrect={false}
            keyboardType="numeric"
            onChangeText={text => setbankTransfer(text)}
          />
        </View>
      </View>
      <Modal transparent={true} animationType="fade" visible={calendarVisible}>
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
    backgroundColor: darkBlue,
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
    color: darkBlue,
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
});

export default MinesStep1;
