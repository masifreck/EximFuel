import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  Button,
  Alert, PermissionsAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Camera,
  useCameraPermission,
  useCodeScanner,
  useCameraDevice,
} from 'react-native-vision-camera';

import RNRestart from 'react-native-restart';
const wW = Dimensions.get('screen').width;
const wH = Dimensions.get('screen').height;
import LottieView from 'lottie-react-native';
const isFine = wW < 400;

const CustomQRCode = ({route}) => {
  const navigation = useNavigation();
  const [cameraActive, setCameraActive] = useState(true);
  const [ScannedData, setScannedData] = useState('')
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();


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

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      const scannedValue = codes[0].value;
      console.log('QR CODE:', scannedValue);
  
      // Log the field number from route.params
      console.log('Field No:', route.params.field);
  
      setCameraActive(false);
      setScannedData(scannedValue);
  
      let params = {};
      switch (route.params.field) {
        case 1:
          params = { scannedEwayBillNo: scannedValue };
          break;
        case 2:
          params = { scannedClientInvoice1: scannedValue };
          break;
        case 3:
          params = { scannedClientInvoice2: scannedValue };
          break;
        case 4:
          params = { scannedClientInvoice3: scannedValue };
          break;
          case 5:
          params = { scannedEwayBillNo2: scannedValue };
          break;
          case 6:
          params = { scannedEwayBillNo3: scannedValue };
          break;
          case 7:
            params = {scannedValue:scannedValue}
            navigation.navigate('Unloading',params);
            break;
        default:
          console.log('Invalid field value');
          break;
      }
  
      navigation.navigate('NewChalan', params);
    },
  });
  
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
      <TouchableOpacity style={{}} onPress={showAlert}>
        <Text style={{color:'black'}}>Allow</Text>
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

  return ( 

      <View style={{flex:1}}> 
  <Camera
              style={[StyleSheet.absoluteFill,{flex:1,width:wW,
                height:wH,zIndex:10
              }]}
              device={device}
              isActive={cameraActive}
              codeScanner={codeScanner}
            /> 
              <LottieView
        source={require('../assets/scanning.json')} // your Lottie file
        autoPlay
        loop
        style={styles.lottieOverlay}
      />
      </View>
     

  );
};
const styles=StyleSheet.create({
    lottieOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: wW,
    height: wH,
    zIndex: 20, // ensure it's above the camera
  },
})


export default CustomQRCode;
