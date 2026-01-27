import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const FuelManagementScreen = ({ navigation }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [fuelQty, setFuelQty] = useState('');
  const [remarks, setRemarks] = useState('');
const [balanceFuel, setBalanceFuel] = useState('');

 const [vehicle, setVehicle] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [material, setMaterial] = useState(null);
  const [distance, setDistance] = useState('');

  const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
const currentDate = getCurrentDate();


  const vehicleData = [
    { label: 'MH12 AB 1234', value: 'MH12AB1234' },
    { label: 'MH14 CD 5678', value: 'MH14CD5678' },
  ];

  const sourceData = [
    { label: 'Mumbai', value: 'Mumbai' },
    { label: 'Pune', value: 'Pune' },
  ];

  const destinationData = [
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Jaipur', value: 'Jaipur' },
  ];

  const materialData = [
    { label: 'Steel', value: 'Steel' },
    { label: 'Cement', value: 'Cement' },
  ];

  // 🧪 Dummy Trip Data
  const tripData = [
    {
      label: 'Trip No: TRP-101',
      value: 'TRP-101',
      
    },
    {
      label: 'Trip No: TRP-102',
      value: 'TRP-102',
     
    },
  ];

  const handleSubmit = () => {
    if (!selectedTrip || !balanceFuel || !fuelQty) {
      Alert.alert('⚠️ Required', 'Please select trip and enter fuel quantity');
      return;
    }

    Alert.alert(
      '✅ Success',
      'Fuel details submitted successfully ⛽',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 🔝 Header */}
      <Text style={styles.header}>Fuel Management ⛽</Text>

      {/* 🔽 Trip Dropdown */}
      <Text style={styles.label}>Select Trip 🚛</Text>
      <Dropdown
        style={styles.dropdown}
        data={tripData}
        search
        labelField="label"
        valueField="value"
        placeholder="Choose Trip Number"
        value={selectedTrip?.value}
        onChange={(item) => setSelectedTrip(item)}
      />
<Text style={styles.label}>Select Vehicle No 🚚</Text>
         <Dropdown
        style={styles.dropdown}
          search
        data={vehicleData}
        labelField="label"
        valueField="value"
        placeholder="Select Vehicle No"
        value={vehicle}
        onChange={item => setVehicle(item.value)}
      />

      {/* Source */}
      <Text style={styles.label}>Source Location 📍</Text>
      <Dropdown
        style={styles.dropdown}
        data={sourceData}
          search
        labelField="label"
        valueField="value"
        placeholder="Select Source"
        value={source}
        onChange={item => setSource(item.value)}
      />

      {/* Destination */}
      <Text style={styles.label}>Destination Location 🏁</Text>
      <Dropdown
        style={styles.dropdown}
          search
        data={destinationData}
        labelField="label"
        valueField="value"
        placeholder="Select Destination"
        value={destination}
        onChange={item => setDestination(item.value)}
      />

      {/* Material */}
      <Text style={styles.label}>Material Type 🧱</Text>
      <Dropdown
        style={styles.dropdown}
          search
        data={materialData}
        labelField="label"
        valueField="value"
        placeholder="Select Material"
        value={material}
        onChange={item => setMaterial(item.value)}
      />

      {/* Distance */}
      <Text style={styles.label}>Distance (KM) 📏</Text>
      <TextInput
        style={styles.input}
          search
        placeholder="Enter Distance (KM)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />

      {/* Load Date (Current, Non-editable) */}
      <Text style={styles.label}>Load Date 📅</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={currentDate}
        editable={false}
      />

      {/* Balance (Non-editable) */}
      <Text style={styles.label}>Balance 💰</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value="auto calculated"
        editable={false}
      />


      {/* 🔢 Fuel Quantity */}
      {/* 🔢 Balance Fuel */}
<Text style={styles.label}>Balance Fuel (Litres) 🛢️</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  placeholder="Enter balance fuel"
  value={balanceFuel}
  onChangeText={setBalanceFuel}
/>

      <Text style={styles.label}>Fuel Quantity (Litres) ⛽</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter fuel quantity"
        value={fuelQty}
        onChangeText={setFuelQty}
      />

      {/* 💬 Remarks */}
      <Text style={styles.label}>Remarks 📝</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter remarks"
        multiline
        value={remarks}
        onChangeText={setRemarks}
      />

      {/* 🚀 Submit */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit ✅</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#F4F6FA',
  padding: 20,

  // ✨ Extra styling
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 6,
},


  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 15,
  },

  dropdown: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    
  },

  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    elevation: 3,
  },

  detailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111',
  },

  detailText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    elevation: 2,
  },

  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  disabledInput: {
    backgroundColor: '#eee',
    color: '#777',
  },

  submitBtn: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
    elevation: 4,
    marginBottom: 30,
  },

  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default FuelManagementScreen;
