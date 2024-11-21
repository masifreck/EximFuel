import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import RNRestart from 'react-native-restart';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const DocumentScanner = () => {
  const [photo, setPhoto] = useState(null);
  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();
  const navigation = useNavigation(); // Initialize navigation

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
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted) {
        console.log('Camera permission already granted');
        return PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const requestResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'Note: After Accepting, it restarts',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
          RNRestart.restart();
          console.log('Camera permission granted');
        } else {
          Alert.alert(
            'Permission Denied',
            'You denied camera access. This app requires camera access to function properly.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
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

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'authorized');
    };

    requestCameraPermission();
  }, []);

  const takePhoto = async () => {
    if (device == null) return;

    const photo = await Camera.takePhoto({
      qualityPrioritization: 'quality',
      flash: 'off',
      skipMetadata: true,
    });
    setPhoto(photo);
    // Navigate back after taking the photo
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const NoCameraErrorView = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.errorText}>Allow Camera Permission</Text>
      <TouchableOpacity onPress={showAlert}>
        <Text>Allow</Text>
      </TouchableOpacity>
    </View>
  );

  if (!hasPermission) {
    console.log('Permission denied');
    return <NoCameraErrorView />;
  }

  if (device === null) {
    console.log('No camera device found');
    return <NoCameraErrorView />;
  }

  return (
    <View style={styles.container}>
      {device != null ? (
        <Camera style={styles.camera} device={device} isActive={true} />
      ) : (
        <Text>Loading camera...</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {photo && (
        <View style={styles.photoContainer}>
          <Text>Photo Taken:</Text>
          <Text>{photo.path}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  photoContainer: {
    marginTop: 20,
  },
  errorText: {
    color: '#276A76',
    textAlign: 'center',
    fontSize: 15,
    textTransform: 'uppercase',
    fontFamily: 'PoppinsBold',
    marginTop: 5,
    letterSpacing: 1,
  },
});

export default DocumentScanner;
