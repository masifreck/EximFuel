import {View, Text, TextInput, Image,TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {Alert} from 'react-native';
import { styles } from './StylesStep1';
import CustomQRCode from './CustomQRCode';
import { darkBlue } from './constant';
const Step1 = ({helloMessage ,PEwayBillNo,
  PEwayBillNo2,
  PEwayBillNo3,
  PclientInvoice1,PclientInvoice2,PclientInvoice3}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const [ChallanNo, setChallanNo] = useState('');
 // const [EwayBillNo, setEwayBillNo] = useState('');

  const [GpsNo, setGpsNo] = useState('');
  const [SlipNo, setSlipNo] = useState('');
  const [StoNo, setStoNo] = useState('');
  const [DelNo, setDelNo] = useState('');
  const [FreightTigerNo, setFreightTigerNo] = useState('');
  const [FreightRate, setFreightRate] = useState('0.00');
  const [Cash, setCash] = useState('0.00');
  const [HSD, setHSD] = useState('0.00');
  const [BankAmount, setBankAmount] = useState('0.00');
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

  const [otherExpence,setOtherExpence]=useState('');
  const [detention,setDetention]=useState('')
 
  const [openQRScanner1,setOpenQRScanner1]=useState(false);

  const [ewayBillNo1,setEwayBillNo1]=useState('')
  const [ewayBillNo2,setEwayBillNo2]=useState('');
  const [ewayBillNo3,setEwayBillNo3]=useState('');


const HandleInput2=()=>{
  setInputVisible2(!inputVisible2)
  setClientInvoice2('')
}
const HandleInput3=()=>{
  setInputVisible3(!inputVisible3)
  setClientInvoice3('')
}
const HandleEwaybill2 = () => {
  setIsVisibleEWaybill2(prevState => !prevState); // Toggle the value between true and false
  console.log('Button pressed, toggling Eway bill visibility');
};

// If you want to log the updated value, use useEffect:
useEffect(() => {
  console.log('EWaybill2 visibility changed:', isVisibleEWaybill2);
}, [isVisibleEWaybill2]);

const HandleEwaybill3 = () => {
  setIsVisibleEWaybill3(prevState => !prevState); // Toggle the value between true and false
  console.log('Button pressed, toggling Eway bill 3 visibility');
};

// If you want to log the updated value, use useEffect:
useEffect(() => {
  console.log('EWaybill3 visibility changed:', isVisibleEWaybill3);
}, [isVisibleEWaybill3]);

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

  const fetchchallandata = () => {
    navigation.navigate('NewChalan', {
      ChallanNo: ChallanNo,
      ewayBillNo1: ewayBillNo1,
      ewayBillNo2:ewayBillNo2,
      ewayBillNo3:ewayBillNo3,
      clientInvoice1:clientInvoice1,
      clientInvoice2:clientInvoice2,
      clientInvoice3:clientInvoice3,
      GpsNo: GpsNo,
      SlipNo: SlipNo,
      StoNo: StoNo,
      DelNo: DelNo,
      FreightTigerNo: FreightTigerNo,
      FreightRate: FreightRate,
      Cash: Cash,
      HSD: HSD,
      Bank: BankAmount,
      PumpId:PumpId,
      acName:acName,
      detention:detention,
      Ifsc:Ifsc,
      otherExpence:otherExpence,

    });
  };
  useEffect(()=>{
    if(otherExpence){
      fetchchallandata()
    }
  },[otherExpence])
  useEffect(()=>{
    if(Ifsc){
      fetchchallandata()
    }
  },[Ifsc])
useEffect(()=>{
  if(detention){
    fetchchallandata()
  }
},[detention])
  useEffect(()=>{
    if(acName){
      fetchchallandata()
    }
  },[acName])
  useEffect(()=>{
    if(clientInvoice1){
fetchchallandata()
    }
  },[clientInvoice1])
  useEffect(()=>{
    if(clientInvoice2){
      fetchchallandata()
    }
  },[clientInvoice2])
  useEffect(()=>{
    if(clientInvoice3){
      fetchchallandata()
    }
  },[clientInvoice3])
  useEffect(()=>{
    if(PumpId){
      fetchchallandata()
    }
  },[PumpId])
  useEffect(()=>{
    if(ewayBillNo2){
      fetchchallandata()
    }
  },[ewayBillNo2])
  useEffect(()=>{
    if(ewayBillNo3){
      fetchchallandata()
    }
  },[ewayBillNo3])
  useEffect(() => {
    if (ChallanNo) {
      fetchchallandata();
    }
  }, [ChallanNo]);

  useEffect(() => {
    if (ewayBillNo1) {
      fetchchallandata();
    }
  }, [ewayBillNo1]);
  useEffect(()=>{
    if (PEwayBillNo){
      setEwayBillNo1(PEwayBillNo)
    }
    if (PEwayBillNo2){
      setEwayBillNo2(PEwayBillNo2)
    }
    if (PEwayBillNo3){
      setEwayBillNo3(PEwayBillNo3)
    }
   if (PclientInvoice1){
    setClientInvoice1(PclientInvoice1)
   } 
   if (PclientInvoice2){
    setClientInvoice2(PclientInvoice2)
   } 
   if (PclientInvoice3){
    setClientInvoice3(PclientInvoice3)
   } 
  },[PEwayBillNo,
    ,PEwayBillNo2,
    PEwayBillNo3,
    PclientInvoice1,PclientInvoice2,PclientInvoice3])

  useEffect(() => {
    if (GpsNo) {
      fetchchallandata();
    }
  }, [GpsNo]);
  useEffect(() => {
    if (SlipNo) {
      fetchchallandata();
    }
  }, [SlipNo]);
  useEffect(() => {
    if (StoNo) {
      fetchchallandata();
    }
  }, [StoNo]);
  useEffect(() => {
    if (FreightTigerNo) {
      fetchchallandata();
    }
  }, [FreightTigerNo]);

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
    if (HSD) {
      fetchchallandata();
    }
  }, [HSD]);

  useEffect(() => {
    if (BankAmount) {
      fetchchallandata();
    }
  }, [BankAmount]);


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
  const [isLoading, setIsLoading] = useState(false); 
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
          Authorization: 'Basic YWRtaW46YWRtaW5AMDc=',
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

  return (
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
        <Text style={styles.levelText}>
          Challan No <Text style={{color: 'red'}}>*</Text>
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
            placeholder={'Enter Challan No'}
            autoCorrect={false}
            onChangeText={text => setChallanNo(text)}
          />
        </View>
      

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
              width: '80%',
              marginRight: 20,
              
            }}
            placeholder={'Enter E-Way Bill No 1'}
            autoCorrect={false}
           value={ewayBillNo1}
           onChangeText={text =>setEwayBillNo1(text)}
          />
          <TouchableOpacity onPress={()=>navigation.navigate('QRScanner',{field:1})}>
          <Image
            style={styles.rightIcon}
            source={require('../assets/qr-code.png')}
          />
          </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
marginLeft:10,
              alignItems: 'center',
              justifyContent: 'center',
          }}
            onPress={() => HandleEwaybill2()}
          >
  

<Image style={{width: 40, height: 40}} source={imageSource3} />

           
          </TouchableOpacity>
        </View>
        {isVisibleEWaybill2 && (
          <>
          <Text style={styles.levelText}>E-Way Bill No 2</Text>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',
            paddingHorizontal: 15,
          }}>
            
            <View style={styles.inputContainerforbtn}>
  <TextInput
    placeholderTextColor={'#6c6f73'}
    style={{
      color: 'black',
      fontSize: 15,
      width: '80%',
      marginRight: 20,
    }}
    value={ewayBillNo2}
    placeholder={'Enter E-Way Bill No  2'}
    autoCorrect={false}
    onChangeText={text => setEwayBillNo2(text)}
  />
   <TouchableOpacity onPress={()=>navigation.navigate('QRScanner',{field:5})}>
          <Image
            style={styles.rightIcon}
            source={require('../assets/qr-code.png')}
          />
          </TouchableOpacity>
</View>
<TouchableOpacity
    style={{
     
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:10
       
    }}
    onPress={() => HandleEwaybill3()}
  >
    <Image style={{ width: 40, height: 40 }} source={imageSource4} />
  </TouchableOpacity>
  </View>
            </>
        )}
         {isVisibleEWaybill3 && (
          <>
            <Text style={styles.levelText}>E-Way Bill No 3</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '80%',
                  marginRight: 20,
                }}
                value={ewayBillNo3}
                placeholder={'Enter E-Way Bill No 3'}
                autoCorrect={false}
                onChangeText={text => setEwayBillNo3(text)}
              />
              
                <TouchableOpacity onPress={()=>navigation.navigate('QRScanner',{field:6})}>
          <Image
            style={styles.rightIcon}
            source={require('../assets/qr-code.png')}
          />
          </TouchableOpacity>
             
            </View>
            </>
        )}
       
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
              width: '80%',
              marginRight: 20,
            }}
            value={clientInvoice1}
            placeholder={'Client Invoice 1'}
            autoCorrect={false}
            onChangeText={text => setClientInvoice1(text)}
          />
             <TouchableOpacity onPress={()=>navigation.navigate('QRScanner',{field:2})}>
          <Image
            style={styles.rightIcon}
            source={require('../assets/qr-code.png')}
          />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
            style={{
marginLeft:10,
              alignItems: 'center',
              justifyContent: 'center',
          }}
            onPress={() => HandleInput2()}
          >
  

<Image style={{width: 40, height: 40}} source={imageSource} />

           
          </TouchableOpacity>
        </View>

        {inputVisible2 && (
          <>
          <Text style={styles.levelText}>Client Invoice 2</Text>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',
            paddingHorizontal: 15,
          }}>
            
            <View style={styles.inputContainerforbtn}>
  <TextInput
    placeholderTextColor={'#6c6f73'}
    style={{
      color: 'black',
      fontSize: 15,
      width: '80%',
      marginRight: 20,
    }}
    value={clientInvoice2}
    placeholder={'Client Invoice 2'}
    autoCorrect={false}
    onChangeText={text => setClientInvoice2(text)}
  />
   <TouchableOpacity onPress={()=>navigation.navigate('QRScanner',{field:3})}>
          <Image
            style={styles.rightIcon}
            source={require('../assets/qr-code.png')}
          />
          </TouchableOpacity>
</View>
<TouchableOpacity
    style={{
     
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:10
       // optional, for padding around the image
    }}
    onPress={() => HandleInput3()}
  >
    <Image style={{ width: 40, height: 40 }} source={imageSource2} />
  </TouchableOpacity>
  </View>
            </>
        )}
         {inputVisible3 && (
          <>
            <Text style={styles.levelText}>Client Invoice 3</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '80%',
                  marginRight: 20,
                }}
                value={clientInvoice3}
                placeholder={'Client Invoice 3'}
                autoCorrect={false}
                onChangeText={text => setClientInvoice3(text)}
              />
              
                <TouchableOpacity onPress={()=>navigation.navigate('QRScanner',{field:4})}>
          <Image
            style={styles.rightIcon}
            source={require('../assets/qr-code.png')}
          />
          </TouchableOpacity>
             
            </View>
            </>
        )}
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
          />
        </View>

        <Text style={styles.levelText}>Freight Tiger No <Text style={{color: 'red'}}>*</Text></Text>
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
            onChangeText={text => setFreightRate(parseInt(text, 10))}
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
            onChangeText={text => setCash(parseInt(text, 10))}
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
  }}
/>
        <Text style={styles.levelText}>HSD<Text style={{color: 'red'}}>*</Text></Text>
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
            onChangeText={text => setHSD(parseInt(text, 10))}
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
            onChangeText={text => setOtherExpence(parseInt(text, 10))}
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
            onChangeText={text => setDetention(parseInt(text, 10))}
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
            onChangeText={text => setBankAmount(parseInt(text, 10))}
          />
        </View>
        <Text style={styles.levelText}>Account Holder Name/PAN No</Text>
        <View style={styles.inputContainerend}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={{
              color: 'black',
              fontSize: 15,
              width: '100%',
            }}
            placeholder={'Enter A/C Holder Name/PAN No'}
            autoCorrect={false}
            onChangeText={text => setAcName(text)}
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
          />
        </View>
      </View>
    </View>
  );
};



export default Step1;
