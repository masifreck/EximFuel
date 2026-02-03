import { se } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,ActivityIndicator
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const FuelManagementScreen = ({ navigation }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [fuelQty, setFuelQty] = useState('');
  const [remarks, setRemarks] = useState('');
const [balanceFuel, setBalanceFuel] = useState('');

 const [vehicleList, setVehicleList] = useState([]);
const [selectedVehicle, setSelectedVehicle] = useState(null);
const [vehicleLoading, setVehicleLoading] = useState(false);
const [driverName, setDriverName] = useState('');
const [driverContact, setDriverContact] = useState('');

  const [location, setLocation] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);

  const [destination, setDestination] = useState(null);
  const [destinationData, setDestinationData] = useState([]);
  const [destinationLoading, setDestinationLoading] = useState(false);

  const [material, setMaterial] = useState(null);
  const [materailData, setMaterialData] = useState([]);
  const [materialLoading, setMaterialLoading] = useState(false);

  const [distance, setDistance] = useState('');

  const [mileage, setMileage] = useState('');
const [allottedKm, setAllottedKm] = useState('');
const [netwt, setNetwt] = useState('');
const [mileage2, setMileage2] = useState('');
const [dieselRate, setDieselRate] = useState('');
const [totalLitre, setTotalLitre] = useState('');
const [amount, setAmount] = useState('');
const [balancekm, setBalanceKm] = useState('');
const [loading, setLoading] = useState(false);
  const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
const currentDate = getCurrentDate();

const fetchVehicleList = async (searchText) => {
  try {
    setVehicleLoading(true);

    const response = await fetch(
      `http://eximapi1.tranzol.com/api/Vehicle?search=${searchText}`
    );

    const data = await response.json();
//console.log(data)
    const formattedVehicles = data.map(item => ({
      label: item.vehicleNo,
      value: item.id,
      driverName: item.driverName,
      contactNo: item.contactNo,
    }));

    setVehicleList(formattedVehicles);
  } catch (error) {
    Alert.alert('❌ Error', 'Failed to fetch vehicles');
  } finally {
    setVehicleLoading(false);
  }
};

const fetchLocationList = async (searchText) => {
  try {
    setLocationLoading(true);

    const response = await fetch(
      `http://eximapi1.tranzol.com/api/Source?search=${searchText}`
    );

    const data = await response.json();
   // console.log('Location API:', data);

    const formattedData = data
      .filter(item => item.loadingPoints) // ✅ prevent crash
      .map(item => ({
        label: item.loadingPoints,
        value: item.id
      }));

    setLocationData(formattedData);
  } catch (error) {
    Alert.alert('❌ Error', 'Failed to fetch locations');
  } finally {
    setLocationLoading(false);
  }
};

const fetchDestinationList = async (searchText) => {
  try {
    setDestinationLoading(true);

    const response = await fetch(
      `http://eximapi1.tranzol.com/api/Destination?search=${searchText}`
    );

    const data = await response.json();
   // console.log('Location API:', data);

    const formattedData = data
      .filter(item => item.unloadingPoints) // ✅ prevent crash
      .map(item => ({
        label: item.unloadingPoints,
        value: item.id
      }));

    setDestinationData(formattedData);
  } catch (error) {
    Alert.alert('❌ Error', 'Failed to fetch locations');
  } finally {
    setDestinationLoading(false);
  }
};
const fetchMaterialList = async (searchText) => {
  try {
    setMaterialLoading(true);

    const response = await fetch(
      `http://eximapi1.tranzol.com/api/Material?search=${searchText}`
    );

    const data = await response.json();
   // console.log('Location API:', data);

    const formattedData = data
      .filter(item => item.materialName) // ✅ prevent crash
      .map(item => ({
        label: item.materialName,
        value: item.id
      }));

    setMaterialData(formattedData);
  } catch (error) {
    Alert.alert('❌ Error', 'Failed to fetch locations');
  } finally {
    setMaterialLoading(false);
  }
};

const fetchFixedDetails = async (Location, destination, netwt) => {
  try {
    console.log('Fetching fixed details...');

    const response = await fetch(
      'http://eximapi1.tranzol.com/api/FixedRules',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          sourceId: Location,
          destinationId: destination,
          netWt: Number(netwt),
        }),
      }
    );

    console.log('Status:', response.status);

    // ✅ Read as TEXT first
    const responseText = await response.text();
    console.log('Fixed Rules Raw Response:', responseText);

    // ❌ Server sent plain text
    if (!responseText.trim().startsWith('{')) {
      Alert.alert('Error', responseText);
      setDistance('');
      setMileage('');
      setTotalLitre('');
      return;
    }

    // ✅ Safe JSON parse
    const data = JSON.parse(responseText);

    console.log('Fixed Details Parsed:', data);

    // ✅ Set values
    setDistance(String(data.distance ?? ''));
    setMileage(String(data.mileage ?? ''));
    setTotalLitre(String(data.totalDieselLtr ?? ''));

  } catch (error) {
    console.log('Fixed Details Error:', error);
    Alert.alert('❌ Error', 'Failed to fetch fixed details');
  }
};



useEffect(() => {
  if (!location || !destination || !netwt) return;

  console.log('Waiting before fetching fixed details...');

  const timer = setTimeout(() => {
    console.log('Fetching fixed details...');
    fetchFixedDetails(location, destination, netwt);
  }, 800); // ⏳ wait 800ms

  // cleanup if user types again
  return () => clearTimeout(timer);

}, [location, destination, netwt]);



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
  const validateFuelData = () => {
  if (!location) return 'Source is required';
  if (!destination) return 'Destination is required';
  if (!vehicleId) return 'Vehicle is required';
  if (!netWt) return 'Net weight is required';
  if (!distance || !mileage || !totalLitre)
    return 'Fixed rule data not available';
  return null;
};


 const handleSubmit = async () => {
  const errorMsg = validateFuelData();
  if (errorMsg) {
    Alert.alert('⚠️ Validation', errorMsg);
    return;
  }

  try {
    setLoading(true);

    const payload = {
      sourceId: location,
      destinationId: destination,
      vehicleId: vehicleId,

      fixedDistance: Number(distance),
      fixedMileage: Number(mileage),
      fixedLtr: Number(totalLitre),
      fixedAmount: Number(fixedAmount || 0),

      requestAmount: Number(requestAmount || 0),

      allottedKm: Number(allottedKm || 0),
      allottedMileage: Number(allottedMileage || 0),
      allottedDieselRate: Number(allottedDieselRate || 0),
      allottedTotalLtr: Number(allottedTotalLtr || 0),
      allottedAmount: Number(allottedAmount || 0),

      netWt: Number(netWt),
      remarks: remarks || '',
      inserUserId: Number(userId),
    };

    console.log('Fuel Payload:', payload);

    const response = await fetch(
      'http://eximapi1.tranzol.com/api/Fuel',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const text = await response.text();
    console.log('Fuel API Raw Response:', text);

    // 🔹 Handle plain text success
    if (text.includes('Successfully')) {
      Alert.alert('✅ Success', text);
      return;
    }

    // 🔹 Try JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      Alert.alert('Server Response', text || 'Unexpected response');
      return;
    }

    Alert.alert('Success', 'Fuel submitted successfully');

  } catch (error) {
    console.log('Fuel API Error:', error);
    Alert.alert('❌ Error', 'Failed to submit fuel request');
  } finally {
    setLoading(false);
  }
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
  data={vehicleList}
  search
  labelField="label"
  valueField="value"
  placeholder="Search Vehicle Number"
  value={selectedVehicle}
 inputSearchStyle={[
    styles.searchText,
    { textTransform: 'uppercase' } // ✅ shows uppercase in input
  ]}
  onChange={item => {
    setSelectedVehicle(item.value);

    // auto-fill driver details
    setDriverName(item.driverName ?? '');
    setDriverContact(item.contactNo ?? '');
  }}
 itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholderText}
  onChangeText={text => {
    const upperText = text.toUpperCase(); // ✅ FORCE UPPERCASE

    if (upperText.length >= 3) {
      fetchVehicleList(upperText);
    }
  }}

  renderRightIcon={() =>
    vehicleLoading ? (
      <ActivityIndicator size="small" color="#2563EB" />
    ) : null
  }
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
       data={locationData}
       search
       labelField="label"
       valueField="value"
       placeholder="Search Location"
       value={location}
     
       onChange={item => {
         setLocation(item.value);
       }}
     
       onChangeText={text => {
         const upperText = text.toUpperCase(); // ✅ show + search uppercase
     
         if (upperText.length >= 3) {
           fetchLocationList(upperText);
         }
       }}
     
       itemTextStyle={styles.dropdownItemText}
       selectedTextStyle={styles.selectedText}
       placeholderStyle={styles.placeholderText}
       inputSearchStyle={[
         styles.searchText,
         { textTransform: 'uppercase' } // ✅ visible uppercase
       ]}
     
       renderRightIcon={() =>
         locationLoading ? (
           <ActivityIndicator size="small" color="#2563EB" />
         ) : null
       }
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
         onChangeText={text => {
    const upperText = text.toUpperCase(); // ✅ force uppercase display

    // 🔁 re-trigger search with uppercase text
    if (upperText.length >= 3) {
      fetchDestinationList(upperText);
    }
  }}

  inputSearchStyle={[
    styles.searchText,
    { textTransform: 'uppercase' } // ✅ shows uppercase in input
  ]}
         itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholderText}
  renderRightIcon={() =>
      destinationLoading ? (
        <ActivityIndicator size="small" color="#2563EB" />
      ) : null
    }
      />

      {/* Material */}
      <Text style={styles.label}>Material  🧱</Text>
      <Dropdown
        style={styles.dropdown}
          search
        data={materailData}
        labelField="label"
        valueField="value"
        placeholder="Select Material"
        value={material}
        onChange={item => setMaterial(item.value)}
         onChangeText={text => {
    const upperText = text.toUpperCase(); // ✅ force uppercase display

    // 🔁 re-trigger search with uppercase text
    if (upperText.length >= 3) {
      fetchMaterialList(upperText);
    }
  }}

  inputSearchStyle={[
    styles.searchText,
    { textTransform: 'uppercase' } // ✅ shows uppercase in input
  ]}
         itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholderText}
  
    renderRightIcon={() =>
      materialLoading ? (
        <ActivityIndicator size="small" color="#2563EB" />
      ) : null
    }
      />
<Text style={styles.label}>Booking Date 📅</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={currentDate}
        editable={false}
      />

 <Text style={styles.label}>Net Wt.📏</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#9CA3AF"
        placeholder="Enter Net Wt."
        keyboardType="numeric"
        value={netwt}
        onChangeText={setNetwt}
      />
      {/* Distance */}
      <Text style={styles.label}>Fixed Actual (KM) 📏</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        placeholderTextColor="#9CA3AF"
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
      <Text style={styles.label}>Balance Amount💰</Text>
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
     <TouchableOpacity
  style={[
    styles.submitBtn,
    loading && { opacity: 0.6 },
  ]}
  onPress={handleSubmit}
  disabled={loading}
>
  {loading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.submitText}>Submit ✅</Text>
  )}
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
