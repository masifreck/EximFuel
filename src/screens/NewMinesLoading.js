import React, { useEffect, useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import MinesInput from '../components/MinesInput';
import { darkBlue, inputbgColor } from '../components/constant';
import { useNavigation, useRoute } from '@react-navigation/native';

const NewMinesLoading = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [tpScan, setTpScan] = useState('');
  const [challan, setChallan] = useState('');
  const [truckNo, setTruckNo] = useState('');
  const [cash, setCash] = useState('');
  const [amount, setAmount] = useState('');
  const [hsdAmt, setHsdAmt] = useState('');
  const [pumpName, setPumpName] = useState('');
  const [slipNo, setSlipNo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('QR VALUE', route.params?.scannedValue1);

    if (route.params?.scannedValue1) {
      setTpScan(route.params?.scannedValue1);
    }

    if (route.params?.scannedValue2) {
      setChallan(route.params?.scannedValue2);
    }
  }, [route.params?.scannedValue1, route.params?.scannedValue2]);

  // 👉 Submit Handler
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload = {
        TPNo: tpScan,
        VehicleNo: truckNo,
        ChallanNo: challan,
        Cash: Number(cash) || 0,
        Amount: Number(amount) || 0,
        HsdAmount: Number(hsdAmt) || 0,
        PumpName: pumpName,
        SlipNo: slipNo,
      };

      console.log('Submitting payload:', payload);

      const response = await fetch(
        'https://Exim.Tranzol.com/api/LoadingChallan/CreateLoadingRowMetrial',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log('API Response:', result);

      if (result?.apiResult?.StatusCode === 0) {
        Alert.alert('Success', 'Loading row material saved successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Something went wrong while saving data');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* TP Scan */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={tpScan}
          onChangeText={setTpScan}
          placeholder="TP No"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate('QRScanner2', { field: 1 })}
        >
          <Text style={styles.scanText}>TP Scan</Text>
        </TouchableOpacity>
      </View>

      {/* Challan */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={challan}
          onChangeText={setChallan}
          placeholder="Challan No"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate('QRScanner2', { field: 2 })}
        >
          <Text style={styles.scanText}>Challan Scan</Text>
        </TouchableOpacity>
      </View>

      {/* Truck No */}
      <MinesInput
        value={truckNo}
        onChangeText={setTruckNo}
        placeholder="Enter Truck No"
        label="Truck No"
        iconName="bus"
        width="70%"
      />

      {/* Cash */}
      <MinesInput
        value={cash}
        onChangeText={setCash}
        placeholder="Enter Cash"
        label="Cash"
        iconName="cash"
        width="70%"
        keyboardType="numeric"
      />

      {/* Amount */}
      <MinesInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter Amount"
        label="Amount"
        iconName="wallet"
        width="70%"
        keyboardType="numeric"
      />

      {/* HSD Amt */}
      <MinesInput
        value={hsdAmt}
        onChangeText={setHsdAmt}
        placeholder="Enter HSD Amount"
        label="HSD Amt"
        iconName="flame"
        width="70%"
        keyboardType="numeric"
      />

      {/* Pump Name */}
      <MinesInput
        value={pumpName}
        onChangeText={setPumpName}
        placeholder="Enter Pump Name"
        label="Pump Name"
        iconName="business-outline"
        width="70%"
      />

      {/* Slip No */}
      <MinesInput
        value={slipNo}
        onChangeText={setSlipNo}
        placeholder="Enter Slip No"
        label="Slip No"
        iconName="receipt"
        width="70%"
      />

      {/* Submit */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '70%',
    backgroundColor: inputbgColor,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  scanButton: {
    width: 65,
    backgroundColor: darkBlue,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  submitButton: {
    width: 150,
    backgroundColor: darkBlue,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',

  },
});

export default NewMinesLoading;
