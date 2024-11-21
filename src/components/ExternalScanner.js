import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ExternalScanner = ({ route }) => {
  const [qrValue, setQRValue] = useState('');
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const debouncedQRValue = useDebounce(qrValue, 1000); // Debounce for 1 second
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle different field cases
  useEffect(() => {
    const handleNavigation = () => {
      let params = {};

      switch (route.params.field) {
        case 1:
          params = { scannedEwayBillNo: debouncedQRValue };
          break;
        case 2:
          params = { scannedClientInvoice1: debouncedQRValue };
          break;
        case 3:
          params = { scannedClientInvoice2: debouncedQRValue };
          break;
        case 4:
          params = { scannedClientInvoice3: debouncedQRValue };
          break;
        case 5:
          params = { scannedEwayBillNo2: debouncedQRValue };
          break;
        case 6:
          params = { scannedEwayBillNo3: debouncedQRValue };
          break;
        default:
          console.log('Invalid field value');
          break;
      }

      if (debouncedQRValue) {
        navigation.navigate('NewChalan', params);
      }
    };

    if (debouncedQRValue) {
      handleNavigation();
    } else if (!debouncedQRValue) {
      // Clear existing timeout if the QR value is empty
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    } else {
      const newTimeoutId = setTimeout(() => {
        handleNavigation();
      }, 2000);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setTimeoutId(newTimeoutId);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [debouncedQRValue]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          ref={inputRef}
          value={qrValue}
          onChangeText={(t) => setQRValue(t)}
          style={styles.input}
          placeholder="Scan or Enter QR Code"
          multiline={true}
          textAlignVertical="top"
          scrollEnabled={true}
        />
      </ScrollView>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    color: 'gray',
    minHeight: 150,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    lineHeight: 20,
    fontSize: 14,
  },
});

export default ExternalScanner;
