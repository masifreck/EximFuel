import React, {useState, useRef, useEffect, act} from 'react';
import ImageData from '../components/ImageData';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import CustomAlert from '../components/CustomAlert';
import { styles } from './PrintChallanStyle';
import { Dropdown } from 'react-native-element-dropdown';
import { dropdownData } from '../components/DropDownData';
import { darkBlue } from '../components/constant';


const PrintChallan = ({navigation}) => {


const [selectedPrint,setSelectedPrint]=useState("1")
  const [IsLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [ChallanNo, setChallanNo] = useState('E-2526-');
  const [fetchedData, setFetchedData] = useState({});
  const [fadeAnim] = useState(new Animated.Value(0));
  const [hasBorder, setHasBorder] = useState(false); // State for border
  const [errorMessage, seterrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      hideToast();
    }, 5000);
    setHasBorder(true);
  };

  const hideToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setHasBorder(false);
    });
    setShowToast(false);
  };
  const 
  fetchData = async (action) => {
    setIsLoading(true);
    if (ChallanNo.length !== 0) {
      try {
        const url = `https://exim.tranzol.com/api/LoadingChallan/GetFinishGoods?challanNo=${ChallanNo}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Basic YWRtaW46YWRtaW5AMDc=`,
            
          },
          redirect: 'follow',
        });

        if (response.ok) {
          setIsLoading(false);
          const data = await response.json();
          if (data.apiResult.Result === null) {
            seterrorMessage('Challan Number Not Found');
            handleShowToast();
            console.log('error');
          } else {
navigation.navigate('qrcode', { 
  qrValue: `${data.apiResult.Result.ChallanNo}`, 
  // |${data.apiResult.Result.LoadDate}|${data.apiResult.Result.VehicleNo}
  fetchedData: data.apiResult.Result, 
  selectedPrint ,
  action
});
          }
        } else {
          setIsLoading(false);
          console.log('Error Fetching Challan Details');
          seterrorMessage('Error Fetching Challan Details');
          setShowAlert(true);
        }
      } catch (error) {
        setIsLoading(false);
        console.log('An error occurred:', error); 
        seterrorMessage('Check Internet Connection');
        setShowAlert(true);
      }
    } else {
      seterrorMessage('Enter Challan Number');
      handleShowToast();
    }
  };
  
  const handleSubmit = (action) => {
    if (ChallanNo.length === 0) {
      seterrorMessage('Enter Challan Number');
      handleShowToast();
    } else {
      fetchData(action);
    }
  };
  const resetInputs = () => {
    setChallanNo(''); // Reset the panNumber input field
  };
  const closeAlert = () => {
    // Function to close the alert
    setShowAlert(false);
    resetInputs();
  };
  const handleSelect = (item) => {
    setSelectedPrint(item.value);
    console.log('Selected Value:', item.value);
  };
 

  return (
    
    <ScrollView>
      
        <View style={styles.container}>
          <View
            style={{ 
              height: 200,
              width: '50%',
              alignItems: 'center',
              borderRadius: 10,
              shadowColor: 'black', // Set shadow color to blue
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 10, // This is for Android
            }}>
            <Image source={require('../assets/gg.png')} style={styles.image} />
          </View>
        
    
          <View
            style={[
              styles.inputContainer,
              {
                borderWidth: hasBorder ? 0.9 : 0,
                borderColor: hasBorder ? 'red' : 'transparent',
                backgroundColor: hasBorder ? 'red' : '#9894e6',
              },
            ]}>
            <Image
              style={styles.leftIcon}
              source={require('../assets/id-card.png')}
            />
            <TextInput
              style={[styles.input]}
              placeholderTextColor='black'
              placeholder="Enter Challan Number"
              value={ChallanNo}
              onChangeText={text => setChallanNo(text)}
            />
          </View>

          <Dropdown
          itemTextStyle={{color:'black'}}
          selectedTextStyle={{color:'black',fontWeight:'bold'}}
          search={true}
        value={selectedPrint}
        data={dropdownData}
        labelField="label"
        valueField="value"
        style={styles.dropdown}
        onChange={handleSelect} // Method to handle selected value
      />
       {IsLoading ? (
        <View  style={{marginTop:20}}>
        <ActivityIndicator size='medium'color={darkBlue}/>
        </View>
        ):(
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%'}}>
        
          <>
<TouchableOpacity style={styles.submitButton} onPress={()=>handleSubmit('print')}>
            <Text style={styles.buttonText}> 🖨️ Print</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={()=>handleSubmit('share')}>
            <Text style={styles.buttonText}> 📤 Share</Text>
          </TouchableOpacity>
          </>
          </View>
       )}
        </View>
    <CustomAlert
        visible={showAlert}
        message={errorMessage}
        onClose={closeAlert}
      />
      {showToast && (
        <Animated.View
          style={[styles.toastContainer, {opacity: fadeAnim, zIndex: 999}]}>
          <Text style={styles.toastText}>{errorMessage}</Text>
        </Animated.View>
      )}
    </ScrollView>
  );
};


export default PrintChallan;
