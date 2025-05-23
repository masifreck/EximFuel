// utils/getCurrentCoordinates.js

import { Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export const getCurrentCoordinates = async () => {
  const permissionType = Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  });

  try {
    let permissionStatus = await check(permissionType);

    if (permissionStatus === RESULTS.DENIED || permissionStatus === RESULTS.LIMITED) {
      permissionStatus = await request(permissionType);
    }

    if (permissionStatus === RESULTS.GRANTED) {
      return await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            reject(new Error('Failed to fetch location: ' + error.message));
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            forceRequestLocation: true,
            showLocationDialog: true,
          }
        );
      });
    } else if (permissionStatus === RESULTS.BLOCKED) {
      Alert.alert(
        'Location Permission Blocked',
        'Please enable location access in your settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: openSettings },
        ]
      );
      throw new Error('Location permission blocked');
    } else {
      throw new Error('Location permission denied');
    }
  } catch (error) {
    throw error;
  }
};
