import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApiToken from './Token';
const MinesStep3 = () => {
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
  // const data1 = [
  //   {label: 'abcd', value: '1'},
  //   {label: 'acdjhcu', value: '2'},
  //   {label: 'sdjhbsh', value: '3'},
  //   {label: 'sduhbcbb', value: '4'},
  //   {label: 'cducbsucbsd', value: '5'},
  //   {label: 'sabuubsuds', value: '6'},
  //   {label: 'cuyguy', value: '7'},
  //   {label: 'cdyucbib', value: '8'},
  // ];
  const data2 = [
    {label: 'Owner', value: '1'},
    {label: 'Other', value: '2'},
  ];

  const [value2, setValue2] = useState(null);

  const [isFocus, setIsFocus] = useState(false);
  const [PumpList, setPumpList] = useState([]);

  // const [StoNo, setStoNo] = useState('');
  // const [LoadDate, setLoadDate] = useState('');
  // const [DelNo, setDelNo] = useState('');
  // const [GPSNo, setGPSNo] = useState('');
  // const [GrossWt, setGrossWt] = useState('');
  // const [TareWt, setTareWt] = useState('');
  // const [NetWt, setNetWt] = useState('');
  // const [FreightRate, setFreightRate] = useState('');
  // const [InvoiceNo, setInvoiceNo] = useState('');
  // const [TPNo, setTPNo] = useState('');
  // "Id": 56,
  // "ChallanNo": "Tesct",

  // "JobId": 12,
  // "": 0,
  // "": 0,
  // "DriverId": 0,
  // "TruckSource": "Market",
  // "AccountNo": null,

  // "EwayBillNo": null,
  // "Remarks": "Hello",

  // "PartyName": null,
  // "CurrentLocation": null,
  // "IFSC": null,
  // "BankAmount": 0.0,
  // "Cash": 0.0,
  // "HSD": 0.0,

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          'https://Exim.Tranzol.com/api/DropDown/Pumpname?search=pump';
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
          console.log('API Response:', data.PumpList);
          setPumpList(data.PumpList);
        } else {
          console.error('Error fetching vehicle details');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchData();
  }, []);

  // Process the fetched PumpList to create data1
  const pumpNames = PumpList.map(pump => pump.PumpName);
  const data1 = pumpNames.map((name, index) => ({
    label: name,
    value: (index + 1).toString(),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.levelContainer}>
        <Text
          style={{
            color: 'green',
            fontWeight: '900',
            marginTop: 10,
            textAlign: 'center',
          }}>
          Documentation
        </Text>

        <Text style={styles.levelText}>Eway BillNo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Eway BillNo'}
            autoCorrect={false}
          />
        </View>
        <Text style={styles.levelText}>Sto No</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Sto No'}
            autoCorrect={false}
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
            placeholder={'Del No'}
            autoCorrect={false}
          />
        </View>
        <Text style={styles.levelText}>GPS No</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Enter GPS No'}
            autoCorrect={false}
          />
        </View>

        {/* <Text style={styles.levelText}>Petrol pump</Text>
        <Dropdown
        
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: 'black'}}
          data={data1}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Enter Petrol Pump' : '...'}
          searchPlaceholder="Search..."
          value={value2}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue2(item.value);
            setIsFocus(false);
          }}
        /> */}
        <Text style={styles.levelText}>Invoice No</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Invoice No'}
            autoCorrect={false}
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
          />
        </View>
        {/* <Text style={styles.levelText}>Pay To</Text>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: 'black'}}
          data={data2}
          // search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select ' : '...'}
          searchPlaceholder="Search..."
          value={value2}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue2(item.value);
            setIsFocus(false);
          }}
        /> */}
        <Text
          style={{
            color: 'green',
            fontWeight: '900',
            marginTop: 10,
            textAlign: 'center',
          }}>
          Weight Information
        </Text>
        <Text style={styles.levelText}>Gross Wt</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Gross Wt'}
            autoCorrect={false}
          />
        </View>

        <Text style={styles.levelText}>Tare Wt</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Tare Wt'}
            autoCorrect={false}
          />
        </View>

        <Text style={styles.levelText}>Net Wt</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Net Wt'}
            autoCorrect={false}
          />
        </View>
        <Text
          style={{
            color: 'green',
            fontWeight: '900',
            marginTop: 10,
            textAlign: 'center',
          }}>
          Location Information
        </Text>

        <Text style={styles.levelText}>Current Location</Text>
        <View style={[styles.inputContainer, {marginBottom: 30}]}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '80%',
              marginRight: 30,
            }}
            placeholder={'Your Current location'}
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.rightIcon}
              source={require('../assets/location.png')}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'green',
            fontWeight: '900',
            marginTop: 10,
            textAlign: 'center',
          }}>
          Additional Remarks
        </Text>
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
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '90%',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: '#e6eff0',
    paddingHorizontal: 15,
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
    fontSize: 12,
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
    borderWidth: 0.5,
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
    borderWidth: 0.5,
    alignItems: 'center',
    borderColor: 'black',
    alignSelf: 'center',
    marginBottom: 20,
  },
  rightIcon: {
    height: 25,
    width: 25,
  },
});

export default MinesStep3;
