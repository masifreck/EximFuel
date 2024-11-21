// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Animated,
//   ActivityIndicator,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {TextInput} from 'react-native-gesture-handler';
// import {useNavigation} from '@react-navigation/native';
// import CustomAlert from '../components/CustomAlert';
// import useApiToken from '../components/Token';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const MinesLoading = () => {
//   const [apiTokenReceived, setapiTokenReceived] = useState(null);
//   AsyncStorage.getItem('Token')
//     .then(token => {
//       setapiTokenReceived(token);
//       console.log('Retrieved token:', token);
//     })
//     .catch(error => {
//       const TokenReceived = useApiToken();
//       setapiTokenReceived(TokenReceived);
//       console.log('Received token', apiTokenReceived);
//       console.log('Error retrieving token:', error);
//     });
//   const navigation = useNavigation();
//   const [challanNumber, setchallanNumber] = useState('');
//   const [minesDetails, setminesDetails] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(''); // Initialize state for error message
//   const [showAlert, setShowAlert] = useState(false);

//   const [showToast, setShowToast] = useState(false);
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [hasBorder, setHasBorder] = useState(false); // State for border
//   const handleShowToast = () => {
//     setShowToast(true);

//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 0,
//       useNativeDriver: true,
//     }).start();

//     setTimeout(() => {
//       hideToast();
//     }, 5000);
//     setHasBorder(true);
//   };

//   const hideToast = () => {
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start(() => {
//       setHasBorder(false);
//     });
//     setShowToast(false);
//   };
//   const resetInputs = () => {
//     setchallanNumber(''); // Reset the panNumber input field
//   };
//   const closeAlert = () => {
//     // Function to close the alert
//     setShowAlert(false);
//   };
//   const handleShowDetails = async () => {
//     if (challanNumber.length !== 0) {
//       try {
//         const url = `https://Exim.Tranzol.com/api/LoadingChallan/GetUpdateChallan?challanNo=${challanNumber}`;
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             Authorization: `Basic ${apiTokenReceived}`,
//             clientId: 'TRANZOLBOSS',
//             clientSecret: 'TRANZOLBOSSPAN',
//           },
//           redirect: 'follow',
//         });

//         if (response.ok) {
//           const data = await response.json();

//           if (data.error) {
//             setErrorMessage(data.error);
//             console.log('API Response Error:', errorMessage);
//             setErrorMessage(errorMessage);
//             setShowAlert(true);
//             resetInputs();
//           } else {
//             console.log(data);
//             setminesDetails(data);
//             if (data.apiResult.Result === null) {
//               const errorMessage = 'Challan Number Not Found';
//               setErrorMessage(errorMessage);
//               handleShowToast();
//             } else if (data.apiResult.Result.EChallanNo === null) {
//               const errorMessage = 'Challan Number Not Found';
//               setErrorMessage(errorMessage);
//               handleShowToast();
//             } else {
//               navigation.navigate('ShowMinesDetails', {
//                 minesDetails: data,
//               });
//               resetInputs();
//             }
//           }
//         } else {
//           setErrorMessage('Error fetching vehicle details');
//           const errorMessage = 'Error fetching driver details';
//           setErrorMessage(errorMessage);
//           setShowAlert(true);
//           resetInputs();
//         }
//       } catch (error) {
//         setErrorMessage('Network Error');
//         setShowAlert(true);
//         resetInputs();
//       }
//     } else {
//       setErrorMessage('Enter Challan Number');
//       handleShowToast();
//     }
//   };
//   const handleShowDetails1 = async () => {
//     if (challanNumber.length !== 0) {
//       try {
//         const url = `https://Exim.Tranzol.com/api/LoadingChallan/GetUpdateChallan?challanNo=${challanNumber}`;
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             Authorization: `Basic ${apiTokenReceived}`,
//             clientId: 'TRANZOLBOSS',
//             clientSecret: 'TRANZOLBOSSPAN',
//           },
//           redirect: 'follow',
//         });

//         if (response.ok) {
//           const data = await response.json();

//           if (data.error) {
//             setErrorMessage(data.error);
//             console.log('API Response Error:', errorMessage);
//             setErrorMessage(errorMessage);
//             setShowAlert(true);
//             resetInputs();
//           } else {
//             console.log(data);
//             setminesDetails(data);
//             if (data.apiResult.Result.Id === 0) {
//               const errorMessage = 'Challan Number Not Found';
//               setErrorMessage(errorMessage);
//               handleShowToast();
//             } else {
//               navigation.navigate('MinesUpdateScreen', {
//                 minesDetails: data,
//               });
//               resetInputs();
//             }
//           }
//         } else {
//           setErrorMessage('Error fetching vehicle details');
//           const errorMessage = 'Error fetching driver details';
//           setErrorMessage(errorMessage);
//           setShowAlert(true);
//           resetInputs();
//         }
//       } catch (error) {
//         setErrorMessage('Network Error');
//         setShowAlert(true);
//         resetInputs();
//       }
//     } else {
//       setErrorMessage('Enter Challan Number');
//       handleShowToast();
//     }
//   };
//   return (
//     <ScrollView>
//       <View
//         style={{
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginTop: '30%',
//           marginBottom: 20,
//         }}>
//         <View
//           style={{
//             height: 200,
//             width: '50%',
//             alignItems: 'center',
//             borderRadius: 10,
//             shadowColor: 'black', // Set shadow color to blue
//             shadowOffset: {width: 0, height: 2},
//             shadowOpacity: 0.5,
//             shadowRadius: 3,
//             elevation: 10, // This is for Android
//           }}>
//           <Image
//             source={require('../assets/mine-loading.png')}
//             style={{
//               height: 200,
//               width: '100%',
//               backgroundColor: '#453D98ff',
//               borderRadius: 10,
//             }}
//           />
//         </View>

//         <View
//           style={[
//             styles.inputContainer,
//             {
//               borderWidth: hasBorder ? 0.9 : 0,
//               borderColor: hasBorder ? 'red' : 'transparent',
//               backgroundColor: hasBorder ? 'red' : '#9894e6',
//             },
//           ]}>
//           <Image
//             style={styles.leftIcon}
//             source={require('../assets/id-card.png')}
//           />
//           <TextInput
//             placeholderTextColor={'black'}
//             style={{
//               paddingTop: 13,
//               paddingLeft: 30,
//               letterSpacing: 0.5,
//               color: 'black',
//               fontSize: 15,
//               width: 250,
//               fontFamily: 'PoppinsSemiBold',
//             }}
//             placeholder={'Enter Challan Number'}
//             autoCorrect={false}
//             keyboardType="numeric"
//             value={challanNumber}
//             onChangeText={text => setchallanNumber(text)}
//             // maxLength={10}
//             // value={userId}
//             // onChangeText={handleUserIdChange}
//           />
//         </View>

//         <TouchableOpacity style={styles.button} onPress={handleShowDetails}>
//           <Text style={styles.text}>Show Challan Details</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button1} onPress={handleShowDetails1}>
//           <Text style={styles.text}>Update Challan Details</Text>
//         </TouchableOpacity>
//         <View
//           style={{
//             flexDirection: 'column',
//             alignItems: 'center',
//             alignContent: 'center',
//           }}>
//           <Text
//             style={{
//               color: 'black',
//               fontSize: 14,
//               fontFamily: 'PoppinsMedium',
//             }}>
//             For New Challan Entry !
//           </Text>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('MinesChalan');
//             }}>
//             <Text
//               style={{
//                 color: '#453D98ff',
//                 fontSize: 14,
//                 // fontWeight: '500',
//                 fontFamily: 'PoppinsBold',
//               }}>
//               Click Here.
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <CustomAlert
//         visible={showAlert}
//         message={errorMessage}
//         onClose={closeAlert}
//       />
//       {showToast && (
//         <Animated.View
//           style={[styles.toastContainer, {opacity: fadeAnim, zIndex: 999}]}>
//           <Text style={styles.toastText}>{errorMessage}</Text>
//         </Animated.View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     height: 55,
//     width: 300,
//     backgroundColor: '#9894e6',
//     // backgroundColor:"black",
//     alignContent: 'center',
//     flexDirection: 'row',
//     paddingHorizontal: 15,
//     borderRadius: 10,
//     // borderWidth: 0.5,
//     alignItems: 'center',
//     marginTop: 30,
//     justifyContent: 'center',
//   },
//   leftIcon: {
//     position: 'absolute',
//     left: 0,
//     height: 25,
//     width: 25,
//     margin: 10,
//     tintColor: 'black',
//   },
//   button: {
//     backgroundColor: '#453D98ff',
//     borderRadius: 5,
//     marginTop: 30,
//     marginBottom: 20,
//     height: 50,
//     width: 300,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button1: {
//     backgroundColor: '#453D98ff',
//     borderRadius: 5,
//     marginTop: 10,
//     marginBottom: 20,
//     height: 50,
//     width: 300,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     color: 'white',
//     textAlign: 'center',
//     // fontWeight: 'bold',
//     fontSize: 16,
//     letterSpacing: 0.5,
//     fontFamily: 'PoppinsSemiBold',
//   },
//   toastContainer: {
//     borderRadius: 5,
//     position: 'absolute',
//     bottom: '27%', // Center vertically
//     left: '26%', // Center horizontally
//     transform: [{translateX: -50}, {translateY: -50}], // Center both horizontally and vertically
//   },
//   toastText: {
//     color: 'red',
//     fontSize: 10,
//     textAlign: 'center',
//     fontFamily: 'PoppinsMedium',
//     shadowColor: 'black', // Set shadow color to blue
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.5,
//     shadowRadius: 3,
//     elevation: 10, // This is for Android
//   },
// });

// export default MinesLoading;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Button,
  Platform,
  Animated,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  Touchable,
  Pressable,
  Modal,
  PermissionsAndroid,
  Alert,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CustomAlert from '../components/CustomAlert';
import {CustomRequestOptionsAdmin} from '../components/CustomRequestOptions';
import useApiToken from '../components/Token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import CustomDropbox from '../components/CustomDropbox';
import CustomInput from '../components/CustomInput';

import {
  Camera,
  useCameraPermission,
  useCodeScanner,
  useCameraDevice,
} from 'react-native-vision-camera';
import RNRestart from 'react-native-restart';
import {it} from 'date-fns/locale';
const MinesLoading = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const showAlert = () => {
    Alert.alert(
      'Info',
      'Restart App after Permissions',
      [
        {
          text: 'OK',
          onPress: () => checkAndRequestCameraPermission(),
        },
      ],
      {cancelable: false},
    );
  };
  async function checkAndRequestCameraPermission() {
    console.log('restart kindly===========================================');
    console.log(
      PermissionsAndroid.RESULTS.GRANTED,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    try {
      // Check if the permission is already granted
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (granted) {
        console.log('Camera permission already granted');
        return PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // If permission is not granted, request it
        const requestResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'Note : After Accepting, It restarts',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
          RNRestart.restart();
          console.log('Camera permission granted');
          console.log(
            'restart kindly===========================================',
          );
          console.log(
            PermissionsAndroid.RESULTS.GRANTED,
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
        } else {
          console.log('Camera permission denied');
          // Optionally, you can show an alert to inform the user
          Alert.alert(
            'Permission Denied',
            'You denied camera access. This app requires camera access to function properly.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }

        return requestResult;
      }
    } catch (error) {
      console.error(`Error checking/requesting camera permission: ${error}`);
      return PermissionsAndroid.RESULTS.DENIED;
    }
  }
  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();
  const [ScannedData, setScannedData] = useState('');
  const [cameraActive, setCameraActive] = useState(false); // State to manage camera activation

  const [ScannedData1, setScannedData1] = useState('');
  const [cameraActive1, setCameraActive1] = useState(false);

  const [ScannedData2, setScannedData2] = useState('');
  const [cameraActive2, setCameraActive2] = useState(false);

  const NoCameraErrorView = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: '#276A76',
          textAlign: 'center',
          fontSize: 15,

          textTransform: 'uppercase',
          fontFamily: 'PoppinsBold',
          marginTop: 5,
          letterSpacing: 1,
        }}>
        Allow Camera Permission
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#276A76',
          borderRadius: 5,
          marginVertical: '5%',
          height: 50,
          width: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={showAlert}>
        <Text style={styles.text}>Allow</Text>
      </TouchableOpacity>
    </View>
  );

  if (!hasPermission) {
    // Handle permission denied case
    console.log('Permission denied');
    return <NoCameraErrorView />;
  }

  if (device === null) {
    // Handle no camera device found case
    console.log('No camera device found');
    return <NoCameraErrorView />;
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      const scannedValue = codes[0].value;
      console.log(scannedValue);
      setCameraActive(false);
      setScannedData(scannedValue);
    },
  });
  const codeScanner1 = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      const scannedValue = codes[0].value;
      console.log(scannedValue);
      setCameraActive1(false);
      setScannedData1(scannedValue);
    },
  });

  const codeScanner2 = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      const scannedValue = codes[0].value;
      console.log(scannedValue);
      setCameraActive2(false);
      setScannedData2(scannedValue);
    },
  });

  useEffect(() => {
    if (ScannedData.length !== 0) {
      const separatedData = ScannedData.split('|');
    }
  }, [ScannedData]);

  // Dialog.show({
  //   type: ALERT_TYPE.SUCCESS,
  //   title: 'Success',
  //   textBody: 'Congrats! this is dialog box success',
  //   button: 'close',
  // });
  // Toast.show({
  //   type: ALERT_TYPE.SUCCESS,
  //   title: 'Success',
  //   textBody: 'Congrats! this is toast notification success',
  // });
  // ================================================
  const navigation = useNavigation();

  const [ChallanType, setChallanType] = useState('');
  const [ChallanData, setChallanData] = useState([
    {label: 'E-Challan', Value: '1'},
    {label: 'Manual Challan', Value: '2'},
  ]);
  const [JobData, setJobData] = useState([
    {label: 'Job-1', Value: '1'},
    {label: 'Job-2', Value: '2'},
  ]);

  const [screen1, setscreen1] = useState(true);
  const [screen2, setscreen2] = useState(false);
  const [screen3, setscreen3] = useState(false);
  const [screen4, setscreen4] = useState(false);
  const [screen5, setscreen5] = useState(false);
  const [screen6, setscreen6] = useState(false);

  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer SnlvdGk6SnlvdGlAMTIz');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  // Screen-1============================================================================================================================================
  const [vehicleNo, setVehicleNo] = useState('1234512346');
  const [output, setoutput] = useState(null);
  // Vehicle Data=============================================
  const data = [
    {label: 'Vehicle No', value: screen2 ? output.VehicleNo || '' : ''},
    {label: 'Vehicle Tyre', value: screen2 ? output.VehicleTyre || '' : ''},
    {label: 'Owner Name', value: screen2 ? output.OwnerName || '' : ''},
    {label: 'Chassis No', value: screen2 ? output.ChassicNo || '' : ''},
    {label: 'Engine No', value: screen2 ? output.EngineNo || '' : ''},
    {label: 'Road Tax No', value: screen2 ? output.RoadTaxNo || '' : ''},
    {
      label: 'State Permit No',
      value: screen2 ? output.StatePermitNo || '' : '',
    },
    {label: 'Fitness No', value: screen2 ? output.FitnessNo || '' : ''},
    {label: 'Pollution No', value: screen2 ? output.PollutionNo || '' : ''},
  ];
  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  const handleVehicle = () => {
    fetch(
      `https://Exim.Tranzol.com/api/VehicleApi/GetVehicleByNo?vehicleNo=${vehicleNo}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (vehicleNo.length !== 0) {
          if (result.apiResult.Result.VehicleNo === null) {
            setVehicleNo('');
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: 'Error',
              textBody: 'Vehicle Number Not Registered',
              button: 'close',
            });
          } else {
            setoutput(result.apiResult.Result);
          }
        } else {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Error',
            textBody: 'Enter Vehicle Number',
          });
        }

        console.log(result);
      })
      .catch(error => console.error(error));
  };
  useEffect(() => {
    if (output) {
      setVehicleNo('');
      setscreen1(false);
      setscreen2(true);
      setscreen3(false);
      setscreen4(false);
      setscreen5(false);
      setscreen6(false);
    }
  }, [output]);

  // Screen-2============================================================================================================================================
  const [dlNumber, setdlNumber] = useState('123451234512345');
  const [dlData, setdlData] = useState([]);

  const DriverDetails = [
    {label: 'DL Number', value: screen3 ? dlData.DLNumber || '' : ''},
    {label: 'Driver Name', value: screen3 ? dlData.DriverName || '' : ''},
    {label: 'Engine No', value: screen3 ? dlData.EngineNo || '' : ''},
    {label: 'Pan No', value: screen3 ? dlData.PanNo || '' : ''},
    {label: 'Dob', value: screen3 ? dlData.Dob || '' : ''},
    {label: 'Driver Email', value: screen3 ? dlData.DriverEmail || '' : ''},
    {
      label: 'Primary Contact',
      value: screen3 ? dlData.PrimaryContactNo || '' : '',
    },
    {
      label: 'SecondaryContact',
      value: screen3 ? dlData.SecondaryContactNo || '' : '',
    },
    {label: 'DriverAddress', value: screen3 ? dlData.DriverAddress || '' : ''},
  ];

  const handleDriver = () => {
    fetch(
      `https://Exim.Tranzol.com/api/OwnerApi/GetDriver?licenseNo=123451234512345`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (dlNumber.length !== 0) {
          if (result.apiResult.Result.DLNumber === null) {
            console.log(result);
            setdlNumber('');
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: 'Error',
              textBody: 'DL Number Not Registered',
              button: 'close',
            });
          } else {
            setdlData(result.apiResult.Result);
          }
        } else {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Error',
            textBody: 'Enter DL Number',
          });
        }

        console.log(result);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    console.log('entered', dlData);
    if (dlData.length !== 0) {
      setscreen1(false);
      setscreen2(false);
      setscreen3(true);
      setscreen4(false);
      setscreen5(false);
      setscreen6(false);
    }
  }, [dlData]);

  // Screen-4 data============================================================================
  const [ChallanNo, setChallanNo] = useState('');

  // Screen-5 data======================================================================================

  const [Consigner, setConsigner] = useState('');
  const [Cosignee, setCosignee] = useState('');
  const [LoadingPoint, setLoadingPoint] = useState('');
  const [UnloadingPoint, setUnloadingPoint] = useState('');
  const [jobNumber, setjobNumber] = useState('');
  const [jobNumberSearch, setjobNumberSearch] = useState('24/032');
  const [jobNumberData, setjobNumberData] = useState([]);

  useEffect(() => {
    if (jobNumberSearch !== '') {
      console.log(
        'entered ra ungamma',
        `https://Exim.Tranzol.com/api/DropDown/JobNo?search=${jobNumberSearch}`,
      );
      fetch(
        `https://Exim.Tranzol.com/api/DropDown/JobNo?search=${jobNumberSearch}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          // console.log('undefined data ', result.JobList);
          const mappeddata = result.JobList.map(item => ({
            value: item.Id,
            label: item.JobNo,
            Load: item.Loading,
            Unload: item.Unloading,
            Name: item.Name,
          }));
          console.log(mappeddata);
          setjobNumberData(mappeddata);
          // console.log(mappeddata);
        })
        .catch(error => console.log(error));
    }
  }, [jobNumberSearch]);

  useEffect(() => {
    console.log(jobNumber);
    console.log(Consigner, LoadingPoint, UnloadingPoint);
  }, [jobNumber]);
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
  // Screen-6 data======================================================================================

  const [FreightRate, setFreightRate] = useState('');
  const [FreightAmount, setFreightAmount] = useState('');
  const [Cash, setCash] = useState('');
  const [BankPayment, setBankPayment] = useState('');

  const [BankAC, setBankAC] = useState('');
  const [IFSC, setIFSC] = useState('');

  const [BankName, setBankName] = useState('');
  const [BankNameSearch, setBankNameSearch] = useState('bank');
  const [BankNameData, setBankNameData] = useState([]);

  const [PaymentProcess, setPaymentProcess] = useState('');
  const [ProcessData, setProcessData] = useState([
    {label: 'Yes', Value: 'yes'},
    {label: 'No', Value: 'No'},
  ]);

  useEffect(() => {
    if (BankNameSearch !== '' && BankNameSearch.length > 3) {
      fetch(
        `https://Exim.Tranzol.com/api/OwnerApi/GetBankNameList?search=${BankNameSearch}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          const mappeddata = result.apiResult.Result.map(item => ({
            value: item.Id,
            label: item.Name,
          }));
          console.log(mappeddata);
          setBankNameData(mappeddata);
          // console.log(mappeddata);
        })
        .catch(error => console.log(error));
    }
  }, [BankNameSearch]);

  const [PumpId, setPumpId] = useState('');
  const [pumpsearch, setpumpsearch] = useState('pump');
  const [pumpData, setpumpData] = useState([]);

  useEffect(() => {
    if (pumpsearch !== '' && pumpsearch.length > 3) {
      fetch(
        `https://Exim.Tranzol.com/api/DropDown/Pumpname?search=${pumpsearch}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          const mappeddata = result.PumpList.map(item => ({
            value: item.Id,
            label: item.PumpName,
          }));
          console.log(mappeddata);
          setpumpData(mappeddata);
          // console.log(mappeddata);
        })
        .catch(error => console.log(error));
    }
  }, [pumpsearch]);

  return (
    // Page-1=================================================================
    <AlertNotificationRoot>
      <View style={styles.container}>
        {screen1 && (
          <>
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
              <Image
                source={require('../assets/Truck.png')}
                style={styles.truckImage}
              />
            </View>

            <View style={[styles.inputContainer]}>
              <Image
                style={styles.leftIcon}
                source={require('../assets/delivery-truck.png')}
              />
              <TextInput
                placeholderTextColor={'black'}
                style={styles.input}
                placeholder={'Enter Vehicle Number'}
                autoCorrect={false}
                value={vehicleNo}
                onChangeText={text => setVehicleNo(text)}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, {marginTop: 30}]}
              onPress={handleVehicle}>
              <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
          </>
        )}
        {screen2 && (
          <View style={{height: '100%', width: '100%', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 25,
                // marginBottom: 8,

                color: '#453D98ff',
                fontFamily: 'PoppinsBold',
                textAlign: 'center',
              }}>
              Vehicle Details
            </Text>
            <View style={styles.levelContainer}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                // ListHeaderComponent={
                //   <View style={styles.header}>
                //     <View>
                //       <Image
                //         style={styles.img}
                //         source={require('../assets/driver.png')}
                //       />
                //     </View>
                //   </View>
                // }
              />
            </View>
            <View style={{alignSelf: 'center', justifyContent: 'flex-start'}}>
              <View style={[styles.inputContainer]}>
                <Image
                  style={styles.leftIcon}
                  source={require('../assets/delivery-truck.png')}
                />
                <TextInput
                  placeholderTextColor={'black'}
                  style={styles.input}
                  placeholder={'Enter DL Number'}
                  autoCorrect={false}
                  value={dlNumber}
                  onChangeText={text => setdlNumber(text)}
                />
              </View>
              <TouchableOpacity
                style={[styles.button, {marginTop: 30}]}
                onPress={
                  // setscreen1(false);
                  // setscreen2(false);
                  // setscreen3(true);
                  // setscreen4(false);
                  // setscreen5(false);
                  // setscreen6(false);
                  handleDriver
                }>
                <Text style={styles.buttonText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {screen3 && (
          <View style={{height: '100%', width: '100%', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 25,
                // marginBottom: 8,

                color: '#453D98ff',
                fontFamily: 'PoppinsBold',
                textAlign: 'center',
              }}>
              Driver Details
            </Text>
            <View style={styles.levelContainer}>
              <FlatList
                data={DriverDetails}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                // ListHeaderComponent={
                //   <View style={styles.header}>
                //     <View>
                //       <Image
                //         style={styles.img}
                //         source={require('../assets/driver.png')}
                //       />
                //     </View>
                //   </View>
                // }
              />
            </View>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'flex-start',
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#453D98ff',
                  fontFamily: 'PoppinsBold',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                Challan Type
              </Text>
              <CustomDropbox
                labelText="Challan Type"
                dropData={ChallanData}
                placeholdername={'Select Challan Type'}
                showSearch={false}
                value={ChallanType}
                onChange={item => {
                  setChallanType(item.value);
                }}
              />
              <TouchableOpacity
                style={[styles.button, {marginTop: 40, alignSelf: 'center'}]}
                onPress={() => {
                  setscreen1(false);
                  setscreen2(false);
                  setscreen3(false);
                  setscreen4(true);
                  setscreen5(false);
                  setscreen6(false);
                }}>
                <Text style={styles.buttonText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {screen4 && (
          <ScrollView style={{backgroundColor: '#453D98ff', width: '100%'}}>
            <View
              style={{
                // height: '100%',
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#453D98ff',
              }}>
              <Text
                style={{
                  fontSize: 25,
                  // marginBottom: 8,

                  color: 'white',
                  fontFamily: 'PoppinsBold',
                  textAlign: 'center',
                }}>
                Enter Details
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  borderRadius: 5,
                }}>
                <CustomInput
                  labelText="Challan Number"
                  placeholdername={'Enter Challan Number'}
                  value={ChallanNo}
                  onChangeText={item => {
                    setChallanNo(item);
                  }}
                />
                <Text
                  style={{
                    alignItems: 'flex-start',
                    padding: 5,
                    marginLeft: '5%',
                    color: 'black',
                    fontSize: 13,
                    fontFamily: 'PoppinsMedium',
                  }}>
                  TP Number <Text style={{color: 'red'}}>*</Text>
                </Text>
                <View
                  style={{
                    height: 50,
                    width: '90%',
                    backgroundColor: '#cedff0',
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    alignItems: 'center',
                    borderColor: 'black',
                    alignSelf: 'center',
                    // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                    // borderColor:
                    //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                  }}>
                  <TextInput
                    placeholderTextColor={'#6c6f73'}
                    style={{
                      color: 'black',
                      fontSize: 15,
                      width: '90%',
                    }}
                    placeholder={'TP Number'}
                    autoCorrect={false}
                    editable={false}
                    keyboardType="numeric"
                    // value={}
                    // onChangeText={text => setEway1(text)}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setCameraActive(!cameraActive);
                    }}>
                    <Image
                      style={{height: 30, width: 30, marginRight: 5}}
                      source={require('../assets/qr-code.png')}
                    />
                  </TouchableOpacity>
                </View>
                {/* Camera Start================================================================================================================================ */}
                {cameraActive && (
                  <View
                    style={{
                      width: '50%',
                      aspectRatio: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'red',
                      marginHorizontal: 'auto',
                      marginTop: 10,
                    }}>
                    <Camera
                      style={StyleSheet.absoluteFill}
                      device={device}
                      isActive={cameraActive}
                      codeScanner={codeScanner}
                    />
                  </View>
                )}
                {/* Camera End================================================================================================================================ */}
                <CustomInput
                  labelText="Test Scanned Data"
                  isaddress={true}
                  placeholdername={'Scan First'}
                  value={ScannedData}
                />
                <CustomInput
                  labelText="Vehicle Number"
                  placeholdername={'Enter Challan Number'}
                  value={ChallanNo}
                  onChangeText={item => {
                    setChallanNo(item);
                  }}
                />
                <CustomInput
                  labelText="Owner Name"
                  placeholdername={'Owner Name'}
                  value={ChallanNo}
                  onChangeText={item => {
                    setChallanNo(item);
                  }}
                />
                <CustomInput
                  labelText="A/C Details"
                  placeholdername={'A/C Details'}
                  value={ChallanNo}
                  onChangeText={item => {
                    setChallanNo(item);
                  }}
                />
                <CustomInput
                  labelText="Load Date"
                  placeholdername={'DD-MM-YYYY'}
                  value={ChallanNo}
                  onChangeText={item => {
                    setChallanNo(item);
                  }}
                />
                <CustomInput
                  labelText="Gross WT"
                  placeholdername={'0.00'}
                  keyboardTypename="numeric"
                  value={ChallanNo}
                  onChangeText={item => {
                    setChallanNo(item);
                  }}
                />
                <CustomInput
                  labelText="Net WT"
                  placeholdername={'0.00'}
                  keyboardTypename="numeric"
                  value={ChallanNo}
                  onChangeText={item => {
                    setChallanNo(item);
                  }}
                />
                <CustomInput
                  labelText="Tyre WT"
                  placeholdername={'0.00'}
                  keyboardTypename="numeric"
                  value={ChallanNo}
                  isend={true}
                  onChangeText={item => {
                    setChallanNo(item);
                  }}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    marginTop: 40,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                  },
                ]}
                onPress={() => {
                  setscreen1(false);
                  setscreen2(false);
                  setscreen3(false);
                  setscreen4(false);
                  setscreen5(true);
                  setscreen6(false);
                }}>
                <Text style={[styles.buttonText, {color: '#453D98ff'}]}>
                  Enter
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {screen5 && (
          <ScrollView style={{backgroundColor: '#453D98ff', width: '100%'}}>
            <View
              style={{
                // height: '100%',
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#453D98ff',
              }}>
              <Text
                style={{
                  fontSize: 25,
                  // marginBottom: 8,

                  color: 'white',
                  fontFamily: 'PoppinsBold',
                  textAlign: 'center',
                }}>
                Enter Details
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  borderRadius: 5,
                }}>
                <CustomDropbox
                  labelText="Job No"
                  // isend={true}
                  dropData={jobNumberData}
                  placeholdername={'Select Job Number'}
                  value={jobNumber}
                  // dropposition={'top'}
                  onChange={item => {
                    // console.log(jobNumberSearch);
                    // setjobNumberSearch(jobNumberSearch);
                    setjobNumber(item.value);
                    setLoadingPoint(item.Load);
                    setUnloadingPoint(item.Unload);
                    setConsigner(item.Name);
                    setCosignee(item.Name);
                  }}
                  onChangeText={t => {
                    console.log('theda ikkadera ungamma', t);
                    setjobNumberSearch(t);
                  }}
                />
                <CustomInput
                  labelText="Cosignee"
                  placeholdername={'Cosignee'}
                  value={Cosignee}
                  // onChangeText={item => {
                  //   setChallanNo(item);
                  // }}
                />
                <CustomInput
                  labelText="Consigner"
                  placeholdername={'Consigner'}
                  value={Consigner}
                  // onChangeText={item => {
                  //   setChallanNo(item);
                  // }}
                />
                <CustomInput
                  labelText="Loading Point"
                  placeholdername={'Loading Point'}
                  value={LoadingPoint}
                  // onChangeText={item => {
                  //   setChallanNo(item);
                  // }}
                />
                <CustomInput
                  labelText="Unloading Point"
                  placeholdername={'Unloading Point'}
                  value={UnloadingPoint}
                  // onChangeText={item => {
                  //   setChallanNo(item);
                  // }}
                />
                <CustomInput
                  labelText="Type Of Material"
                  placeholdername={'Type Of Material'}
                  // value={ChallanNo}
                  // onChangeText={item => {
                  //   setChallanNo(item);
                  // }}
                />

                <Text
                  style={{
                    alignItems: 'flex-start',
                    padding: 5,
                    marginLeft: '5%',
                    color: 'black',
                    fontSize: 13,
                    fontFamily: 'PoppinsMedium',
                  }}>
                  Manage Invoice No<Text style={{color: 'red'}}>*</Text>
                </Text>
                <View
                  style={{
                    height: 50,
                    width: '90%',
                    backgroundColor: '#cedff0',
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    alignItems: 'center',
                    borderColor: 'black',
                    alignSelf: 'center',
                    marginBottom: 20,
                    // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                    // borderColor:
                    //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                  }}>
                  <TextInput
                    placeholderTextColor={'#6c6f73'}
                    style={{
                      color: 'black',
                      fontSize: 15,
                      width: '80%',
                    }}
                    placeholder={'Add/Remove'}
                    editable={false}
                  />
                  <TouchableOpacity onPress={cnshow1}>
                    <Image
                      style={{height: 30, width: 30, marginRight: 5}}
                      source={require('../assets/minus.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={cnshow}>
                    <Image
                      style={{height: 30, width: 30, marginRight: 5}}
                      source={require('../assets/add.png')}
                    />
                  </TouchableOpacity>
                </View>

                {cn1 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      Invoice No 1 <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'Invoice No 1'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity
                        onPress={() => {
                          setCameraActive1(!cameraActive1);
                        }}>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    {cameraActive1 && (
                      <View
                        style={{
                          width: '50%',
                          aspectRatio: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'red',
                          marginHorizontal: 'auto',
                          marginTop: 10,
                        }}>
                        <Camera
                          style={StyleSheet.absoluteFill}
                          device={device}
                          isActive={cameraActive1}
                          codeScanner={codeScanner1}
                        />
                      </View>
                    )}
                    <CustomInput
                      labelText="Test Scanned Data"
                      isaddress={true}
                      placeholdername={'Scan First'}
                      value={ScannedData1}
                    />
                    <CustomInput
                      labelText="Invoice Date"
                      placeholdername={'Invoice Date'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                    <CustomInput
                      labelText="Invoice Value"
                      placeholdername={'Invoice Value'}
                      isend={true}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                  </>
                )}
                {cn2 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      Invoice No 2 <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'Invoice No 2'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="Invoice Date"
                      placeholdername={'Invoice Date'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                    <CustomInput
                      labelText="Invoice Value"
                      placeholdername={'Invoice Value'}
                      isend={true}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                  </>
                )}
                {cn3 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      Invoice No 3 <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'Invoice No 3'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="Invoice Date"
                      placeholdername={'Invoice Date'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                    <CustomInput
                      labelText="Invoice Value"
                      placeholdername={'Invoice Value'}
                      isend={true}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                  </>
                )}
                {cn4 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      Invoice No 4 <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'Invoice No 4'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="Invoice Date"
                      placeholdername={'Invoice Date'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                    <CustomInput
                      labelText="Invoice Value"
                      placeholdername={'Invoice Value'}
                      isend={true}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                  </>
                )}
                {cn5 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      Invoice No 5 <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'Invoice No 5'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="Invoice Date"
                      placeholdername={'Invoice Date'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                    <CustomInput
                      labelText="Invoice Value"
                      placeholdername={'Invoice Value'}
                      isend={true}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                  </>
                )}
                {cn6 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      Invoice No 6 <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'Invoice No 6'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="Invoice Date"
                      placeholdername={'Invoice Date'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                    <CustomInput
                      labelText="Invoice Value"
                      placeholdername={'Invoice Value'}
                      isend={true}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                  </>
                )}
                {cn7 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      Invoice No 7 <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'Invoice No 7'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="Invoice Date"
                      placeholdername={'Invoice Date'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                    <CustomInput
                      labelText="Invoice Value"
                      placeholdername={'Invoice Value'}
                      isend={true}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                  </>
                )}
                {cn8 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      Invoice No 8 <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'Invoice No 8'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="Invoice Date"
                      placeholdername={'Invoice Date'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                    <CustomInput
                      labelText="Invoice Value"
                      placeholdername={'Invoice Value'}
                      isend={true}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                  </>
                )}
                {cn9 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      Invoice No 9 <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'Invoice No 9'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="Invoice Date"
                      placeholdername={'Invoice Date'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                    <CustomInput
                      labelText="Invoice Value"
                      placeholdername={'Invoice Value'}
                      isend={true}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                    />
                  </>
                )}

                <Text
                  style={{
                    alignItems: 'flex-start',
                    padding: 5,
                    marginLeft: '5%',
                    color: 'black',
                    fontSize: 13,
                    fontFamily: 'PoppinsMedium',
                  }}>
                  Manege E-Way Bill No <Text style={{color: 'red'}}>*</Text>
                </Text>
                <View
                  style={{
                    height: 50,
                    width: '90%',
                    backgroundColor: '#cedff0',
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    alignItems: 'center',
                    borderColor: 'black',
                    alignSelf: 'center',
                    marginBottom: 20,
                  }}>
                  <TextInput
                    placeholderTextColor={'#6c6f73'}
                    style={{
                      color: 'black',
                      fontSize: 15,
                      width: '80%',
                    }}
                    placeholder={'Add/Remove'}
                    editable={false}
                  />
                  <TouchableOpacity onPress={ebshow1}>
                    <Image
                      style={{height: 30, width: 30, marginRight: 5}}
                      source={require('../assets/minus.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ebshow}>
                    <Image
                      style={{height: 30, width: 30, marginRight: 5}}
                      source={require('../assets/add.png')}
                    />
                  </TouchableOpacity>
                </View>
                {eb1 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      E-Way Bill No<Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'E-Way Bill No'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity
                        onPress={() => {
                          setCameraActive2(!cameraActive2);
                        }}>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>

                    {cameraActive2 && (
                      <View
                        style={{
                          width: '50%',
                          aspectRatio: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'red',
                          marginHorizontal: 'auto',
                          marginTop: 10,
                        }}>
                        <Camera
                          style={StyleSheet.absoluteFill}
                          device={device}
                          isActive={cameraActive2}
                          codeScanner={codeScanner2}
                        />
                      </View>
                    )}
                    <CustomInput
                      labelText="Test Scanned Data"
                      isaddress={true}
                      placeholdername={'Scan First'}
                      value={ScannedData2}
                    />

                    <CustomInput
                      labelText="E-Way Bill Validity"
                      placeholdername={'E-Way Bill Validity'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                      isend={true}
                    />
                  </>
                )}
                {eb2 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      E-Way Bill No 2<Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'E-Way Bill No 2'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="E-Way Bill 2 Validity"
                      placeholdername={'E-Way Bill Validity'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                      isend={true}
                    />
                  </>
                )}
                {eb3 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      E-Way Bill No 3<Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'E-Way Bill No 3'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="E-Way Bill 3 Validity"
                      placeholdername={'E-Way Bill Validity'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                      isend={true}
                    />
                  </>
                )}
                {eb4 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      E-Way Bill No 4<Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'E-Way Bill No 4'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="E-Way Bill 4 Validity"
                      placeholdername={'E-Way Bill Validity'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                      isend={true}
                    />
                  </>
                )}
                {eb5 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      E-Way Bill No 5<Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'E-Way Bill No 5'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="E-Way Bill 5 Validity"
                      placeholdername={'E-Way Bill Validity'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                      isend={true}
                    />
                  </>
                )}
                {eb6 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      E-Way Bill No 6<Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'E-Way Bill No 6'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="E-Way Bill 6 Validity"
                      placeholdername={'E-Way Bill Validity'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                      isend={true}
                    />
                  </>
                )}
                {eb7 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      E-Way Bill No 7<Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'E-Way Bill No 7'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="E-Way Bill 7 Validity"
                      placeholdername={'E-Way Bill Validity'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                      isend={true}
                    />
                  </>
                )}
                {eb8 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      E-Way Bill No 8<Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'E-Way Bill No 8'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="E-Way Bill 8 Validity"
                      placeholdername={'E-Way Bill Validity'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                      isend={true}
                    />
                  </>
                )}
                {eb9 && (
                  <>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        padding: 5,
                        marginLeft: '5%',
                        color: 'black',
                        fontSize: 13,
                        fontFamily: 'PoppinsMedium',
                      }}>
                      E-Way Bill No 8 9<Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        backgroundColor: '#cedff0',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: 'black',
                        alignSelf: 'center',
                        // borderWidth: Eway1 === null && hasBorderPage1 ? 0.9 : 0,
                        // borderColor:
                        //   Eway1 === null && hasBorderPage1 ? 'red' : 'transparent',
                      }}>
                      <TextInput
                        placeholderTextColor={'#6c6f73'}
                        style={{
                          color: 'black',
                          fontSize: 15,
                          width: '90%',
                        }}
                        placeholder={'E-Way Bill No 9'}
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={12}
                        value={ChallanNo}
                        onChangeText={text => setEway1(text)}
                      />

                      <TouchableOpacity>
                        <Image
                          style={{height: 30, width: 30, marginRight: 5}}
                          source={require('../assets/qr-code.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      labelText="E-Way Bill 9 Validity"
                      placeholdername={'E-Way Bill Validity'}
                      value={ChallanNo}
                      onChangeText={item => {
                        setChallanNo(item);
                      }}
                      isend={true}
                    />
                  </>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    marginTop: 40,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                  },
                ]}
                onPress={() => {
                  setscreen1(false);
                  setscreen2(false);
                  setscreen3(false);
                  setscreen4(false);
                  setscreen5(false);
                  setscreen6(true);
                }}>
                <Text style={[styles.buttonText, {color: '#453D98ff'}]}>
                  Enter
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
        {screen6 && (
          <ScrollView style={{backgroundColor: '#453D98ff', width: '100%'}}>
            <View
              style={{
                // height: '100%',
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#453D98ff',
              }}>
              <Text
                style={{
                  fontSize: 25,
                  // marginBottom: 8,

                  color: 'white',
                  fontFamily: 'PoppinsBold',
                  textAlign: 'center',
                }}>
                Enter Details
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  borderRadius: 5,
                }}>
                <CustomInput
                  labelText="Freight Rate"
                  placeholdername={'0.00'}
                  keyboardTypename="numeric"
                  value={FreightRate}
                  onChangeText={item => {
                    setFreightRate(item);
                  }}
                />
                <CustomInput
                  labelText="Freight Amount"
                  placeholdername={'0.00'}
                  keyboardTypename="numeric"
                  value={FreightAmount}
                  onChangeText={item => {
                    setFreightAmount(item);
                  }}
                />
                <CustomInput
                  labelText="Cash"
                  placeholdername={'0.00'}
                  keyboardTypename="numeric"
                  value={Cash}
                  onChangeText={item => {
                    setCash(item);
                  }}
                />
                <CustomInput
                  labelText="Bank Payment"
                  placeholdername={'0.00'}
                  keyboardTypename="numeric"
                  value={BankPayment}
                  onChangeText={item => {
                    setBankPayment(item);
                  }}
                />
                <CustomInput
                  labelText="Bank A/C"
                  placeholdername={'Enter A/C Number'}
                  value={BankAC}
                  keyboardTypename="numeric"
                  onChangeText={item => {
                    setBankAC(item);
                  }}
                />
                <CustomInput
                  labelText="IFSC Code"
                  placeholdername={'Enter IFSC Code'}
                  value={IFSC}
                  onChangeText={item => {
                    setIFSC(item);
                  }}
                />
                <CustomDropbox
                  labelText="Bank Name"
                  dropData={BankNameData}
                  placeholdername={'Select BankName'}
                  value={BankName}
                  dropposition={'top'}
                  onChange={item => {
                    setBankName(item.value);
                  }}
                  onChangeText={t => {
                    console.log('theda ikkadera ungamma', t);
                    setBankNameSearch(t);
                  }}
                />
                <CustomDropbox
                  labelText="Proceed With Above Bank Account?"
                  dropData={ProcessData}
                  placeholdername={'Yes/No'}
                  showSearch={false}
                  value={PaymentProcess}
                  onChange={item => {
                    setPaymentProcess(item.value);
                  }}
                />
                <CustomInput
                  labelText="HSD Payment"
                  placeholdername={'0.00'}
                  keyboardTypename="numeric"
                  value={ChallanNo}
                  onChangeText={item => {
                    setChallanNo(item);
                  }}
                />
                <CustomDropbox
                  labelText="Pump Name"
                  isend={true}
                  dropData={pumpData}
                  placeholdername={'Select Pump'}
                  value={PumpId}
                  onChange={item => {
                    setPumpId(item.value);
                  }}
                  onChangeText={t => {
                    console.log('theda ikkadera ungamma', t);
                    setpumpsearch(t);
                  }}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    marginTop: 40,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                  },
                ]}
                onPress={() => {
                  Alert.alert(
                    'Success',
                    'Submitted',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          // navigation.navigate('Home');
                          setscreen1(true);
                          setscreen2(false);
                          setscreen3(false);
                          setscreen4(false);
                          setscreen5(false);
                          setscreen6(false);
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }}>
                <Text style={[styles.buttonText, {color: '#453D98ff'}]}>
                  Enter
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  truckImage: {
    height: 200,
    width: '100%',
    backgroundColor: '#453D98ff',
    borderRadius: 10,
  },
  inputContainer: {
    height: 55,
    width: 300,
    backgroundColor: '#9894e6',
    // backgroundColor:"black",
    alignContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  input: {
    paddingTop: 13,
    paddingLeft: 30,
    letterSpacing: 0.5,
    color: 'black',
    fontSize: 15,
    width: 250,
    fontFamily: 'PoppinsSemiBold',
  },
  button: {
    backgroundColor: '#453D98ff',
    borderRadius: 5,
    marginBottom: 20,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: 'PoppinsSemiBold',
  },

  levelContainer: {
    backgroundColor: 'white',
    width: '97%',
    // margin: 10,
    borderRadius: 5,
    // marginBottom:"40%"
    height: '50%',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  blackList: {
    height: 28,
    width: 28,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  driverInfo: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  nameTxt: {
    fontSize: 28,
    fontWeight: '700',
    color: 'black',
    padding: 6,
  },
  emailTxt: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    padding: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  label: {
    fontWeight: '900',
    fontSize: 17,
    color: 'black',
    flex: 1,
  },
  value: {
    fontWeight: '500',
    fontSize: 17,
    marginLeft: 5,
    color: '#363432',
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'red',
  },
});
export default MinesLoading;
