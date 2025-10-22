import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Camera,
  useCameraPermission,
  useCodeScanner,
  useCameraDevice,
} from 'react-native-vision-camera';

import RNRestart from 'react-native-restart';
import LottieView from 'lottie-react-native';

const wW = Dimensions.get('screen').width;
const wH = Dimensions.get('screen').height;

const CustomQRCode = ({ route }) => {
  const navigation = useNavigation();
  const [cameraActive, setCameraActive] = useState(true);
  const [ScannedData, setScannedData] = useState('');
  const [torchOn, setTorchOn] = useState(false); // ✅ torch state

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
      { cancelable: false },
    );
  };

  async function checkAndRequestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (granted) {
        return PermissionsAndroid.RESULTS.GRANTED;
      } else {
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
        } else {
          Alert.alert(
            'Permission Denied',
            'You denied camera access. This app requires camera access to function properly.',
            [{ text: 'OK' }],
            { cancelable: false },
          );
        }
        return requestResult;
      }
    } catch (error) {
      console.error(`Error checking/requesting camera permission: ${error}`);
      return PermissionsAndroid.RESULTS.DENIED;
    }
  }

  // ✅ Scanner
const codeScanner = useCodeScanner({
  codeTypes: ['qr'],
  onCodeScanned: codes => {
    const scannedValue = codes[0].value;
    // console.log('QR CODE:', scannedValue);
    // console.log('Field No:', route.params.field);

    setCameraActive(false);
    setScannedData(scannedValue);

    let params = {};
    switch (route.params.field) {
      case 1:
        params = { scannedEwayBillNo: scannedValue };
        navigation.navigate('NewChalan', params);
        break;
      case 2:
        params = { scannedClientInvoice1: scannedValue };
        navigation.navigate('NewChalan', params);
        break;
      case 7:
        params = { scannedValue: scannedValue };
        navigation.navigate('Unloading', params);
        break;
      default:
        console.log('Invalid field value');
        Alert.alert(
          'Error',
          'Invalid field value provided',
          [{ text: 'OK' }],
          { cancelable: false },
        );
        break;
    }
  },
});


  const NoCameraErrorView = () => (
    <View style={styles.centerView}>
      <Text style={styles.permissionText}>Allow Camera Permission</Text>
      <TouchableOpacity onPress={showAlert}>
        <Text style={{ color: 'black' }}>Allow</Text>
      </TouchableOpacity>
    </View>
  );

  if (!hasPermission) {
    return <NoCameraErrorView />;
  }

  if (device === null) {
    return <NoCameraErrorView />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={[StyleSheet.absoluteFill, { flex: 1, width: wW, height: wH, zIndex: 10 }]}
        device={device}
        isActive={cameraActive}
        codeScanner={codeScanner}
        torch={torchOn ? 'on' : 'off'} // ✅ torch control
      />

      {/* ✅ Torch Toggle Button */}
      <TouchableOpacity
        style={styles.torchButton}
        onPress={() => setTorchOn(prev => !prev)}>
        <Text style={styles.torchText}>{torchOn ? 'Torch Off' : 'Torch On'}</Text>
      </TouchableOpacity>

      <LottieView
        source={require('../assets/scanning.json')}
        autoPlay
        loop
        style={styles.lottieOverlay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lottieOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: wW,
    height: wH,
    zIndex: 20,
  },
  torchButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#000000aa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 30,
  },
  torchText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    color: '#276A76',
    textAlign: 'center',
    fontSize: 15,
    textTransform: 'uppercase',
    fontFamily: 'PoppinsBold',
    marginTop: 5,
    letterSpacing: 1,
  },
});

export default CustomQRCode;
