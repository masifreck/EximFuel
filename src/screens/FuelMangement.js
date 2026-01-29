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
const [driverName, setDriverName] = useState('');
const [driverContact, setDriverContact] = useState('');

  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [material, setMaterial] = useState(null);
  const [distance, setDistance] = useState('');

  const [mileage, setMileage] = useState('');
const [allottedKm, setAllottedKm] = useState('');
const [mileage2, setMileage2] = useState('');
const [dieselRate, setDieselRate] = useState('');
const [totalLitre, setTotalLitre] = useState('');
const [amount, setAmount] = useState('');
const [balancekm, setBalanceKm] = useState('');

  const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
const currentDate = getCurrentDate();


  const vehicleData = [
  {
    label: 'MH12 AB 1234',
    value: 'MH12AB1234',
    driverName: 'Ramesh Kumar',
    driverContact: '9876543210',
  },
  {
    label: 'MH14 CD 5678',
    value: 'MH14CD5678',
    driverName: 'Suresh Patil',
    driverContact: '9123456789',
  },
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
         itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholderText}
  inputSearchStyle={styles.searchText}
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
  onChange={item => {
    setVehicle(item.value);
    setDriverName(item.driverName);
    setDriverContact(item.driverContact);
  }}
   itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholderText}
  inputSearchStyle={styles.searchText}
/>
{driverName !== '' && (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Driver Details 👨‍✈️</Text>

    <View style={styles.cardRow}>
      <Text style={styles.cardLabel}>Name</Text>
      <Text style={styles.cardValue}>{driverName}</Text>
    </View>

    <View style={styles.cardRow}>
      <Text style={styles.cardLabel}>Contact</Text>
      <Text style={styles.cardValue}>{driverContact}</Text>
    </View>
  </View>
)}


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
         itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholderText}
  inputSearchStyle={styles.searchText}
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
         itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholderText}
  inputSearchStyle={styles.searchText}
      />

      {/* Material */}
      <Text style={styles.label}>Material  🧱</Text>
      <Dropdown
        style={styles.dropdown}
          search
        data={materialData}
        labelField="label"
        valueField="value"
        placeholder="Select Material"
        value={material}
        onChange={item => setMaterial(item.value)}
         itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholderText}
  inputSearchStyle={styles.searchText}
      />
<Text style={styles.label}>Load Date 📅</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={currentDate}
        editable={false}
      />

      {/* Distance */}
      <Text style={styles.label}>Fixed Actual (KM) 📏</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
          search
        placeholder="Enter Actual (KM)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
        editable={false}
      />

      {/* Mileage */}
<Text style={styles.label}>Fixed Mileage  ⛽</Text>
<TextInput
 style={[styles.input, styles.disabledInput]}
  placeholder="Enter Mileage"
  keyboardType="numeric"
  value={mileage}
  editable={false}
  onChangeText={setMileage}
/>

{/* Total Litre */}
<Text style={styles.label}>Fixed Total ltr. 🛢️</Text>
<TextInput
  style={[styles.input, styles.disabledInput]}
  placeholder="Enter Total ltr."
  keyboardType="numeric"
  value={totalLitre}
  onChangeText={setTotalLitre}
  editable={false}
/>
{/* Allotted KM */}
<Text style={styles.label}>Allotted KM 🛣️</Text>
<TextInput
  style={styles.input}
  placeholderTextColor="#9CA3AF"  
  placeholder="Enter Allotted KM"
  keyboardType="numeric"
  value={allottedKm}
  onChangeText={setAllottedKm}
/>

{/* Mileage 2 */}
<Text style={styles.label}>Alloted Mileage  🔁</Text>
<TextInput
  style={styles.input}
  placeholderTextColor="#9CA3AF"  
  placeholder="Enter Mileage 2"
  keyboardType="numeric"
  value={mileage2}
  onChangeText={setMileage2}
/>

{/* Diesel Rate */}
<Text style={styles.label}>Alloted Diesel Rate (₹/L) 💰</Text>
<TextInput
  style={styles.input}
  placeholderTextColor="#9CA3AF"  
  placeholder="Enter Diesel Rate"
  keyboardType="numeric"
  value={dieselRate}
  onChangeText={setDieselRate}
/>


  <Text style={styles.label}>Alloted Total ltr. ⛽</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#9CA3AF"  
        keyboardType="numeric"
        placeholder="Enter alloted ltr"
        value={fuelQty}
        onChangeText={setFuelQty}
      />
      
<Text style={styles.label}>Alloted Amount 💰</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#9CA3AF"  
        keyboardType="numeric"
        placeholder="Enter Amount"
        value={amount}
        onChangeText={setAmount}
      />
    

      <Text style={styles.label}>Balance Km 💰</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        keyboardType="numeric"
        placeholder="Enter Balance Km"
        value={balancekm}
        onChangeText={setBalanceKm}
        editable={false}
      />

      {/* 🔢 Fuel Quantity */}
      {/* 🔢 Balance Fuel */}
<Text style={styles.label}>Total ltr. 🛢️</Text>
<TextInput
style={[styles.input, styles.disabledInput]}
  keyboardType="numeric"
  placeholder="Enter Total ltr"
  value={balanceFuel}
  onChangeText={setBalanceFuel}
  editable={false}
/>

    

        {/* Balance (Non-editable) */}
      <Text style={styles.label}>Balance Amtount 💰</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value="auto calculated"
        editable={false}
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
dropdownItemText: {
  color: '#111827',   // item text color (list items)
  fontSize: 14,
},

selectedText: {
  color: '#2563EB',   // selected value color
  fontSize: 14,
  fontWeight: '600',
},

placeholderText: {
  color: '#9CA3AF',   // placeholder text color
  fontSize: 14,
},

searchText: {
  color: '#111827',   // search input text color
  fontSize: 14,
},
card: {
  backgroundColor: '#FFFFFF',
  borderRadius: 14,
  padding: 16,
  marginTop: 16,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
},

cardTitle: {
  fontSize: 16,
  fontWeight: '700',
  marginBottom: 12,
  color: '#1F2937',
},

cardRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 6,
},

cardLabel: {
  fontSize: 14,
  color: '#6B7280',
},

cardValue: {
  fontSize: 14,
  fontWeight: '600',
  color: '#111827',
},


  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    elevation: 2,
    color: '#111827',
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
