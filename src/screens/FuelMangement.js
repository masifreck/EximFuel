import { se } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,ActivityIndicator,Modal,Image
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { loadType, CardType } from '../components/DropDownData';
const FuelManagementScreen = ({ navigation }) => {
  const [loadTypeId, setloadTypeId] = useState(null);
  const [fuelCardTypeId, setfuelCardTypeId] = useState(null);
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
const [amount, setAmount] = useState(0);
const [balancekm, setBalanceKm] = useState('');
const [loading, setLoading] = useState(false);
const [showSourceModal, setShowSourceModal] = useState(false);
const [showDestinationModal, setShowDestinationModal] = useState(false);

const [guarantorId, setguarantorId]=useState(null);
const [guarantorName, setguarantorName]=useState('');
const [fuelCardId, setfuelCardId]=useState(null);
const [cardNo, setcardNo] = useState('');
const [driverId, setdriverId]=useState(null);

const [driverCashAdvance, setdriverCashAdvance]=useState(0)
const [sourceText, setSourceText] = useState('');
const [destinationText, setDestinationText] = useState('');

const [postSourceLoading, setPostSourceLoading] = useState(false);
const [postDestinationLoading, setPostDestinationLoading] = useState(false);

  const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
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
      driverId : item.driverId,
      contactNo: item.contactNo,
      guarantorId : item.guarantorId,
      guarantorName : item.guarantorName,
      fuelCardId : item.fuelCardId,
      cardNo : item.cardNo

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
          sourceId: location,
          destinationId: destination,
          netWt: Number(netwt),
        }),
      }
    );

    // ✅ Read as TEXT first
    const responseText = await response.text();
   // console.log('Fixed Rules Raw Response:', responseText);

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

    // ✅ Set values
    setDistance(String(data.distance ?? ''));
    setMileage(String(data.mileage ?? ''));
    setTotalLitre(String(data.totalDieselLtr ?? ''));

  } catch (error) {
    console.log('Fixed Details Error:', error);
    Alert.alert('❌ Error', 'Failed to fetch fixed details');
  }
};

const submitSource = async () => {
  if (!sourceText.trim()) {
    Alert.alert('Error', 'Enter source');
    return;
  }

  try {
    setPostSourceLoading(true);

    const res = await fetch(
      'http://eximapi1.tranzol.com/api/Source',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loadingPoints: sourceText }),
      }
    );

    const textResponse = await res.text();

    if (textResponse.includes('Create Successfully')) {
      Alert.alert('Success', 'Source created successfully');
      setShowSourceModal(false);
      setSourceText('');
    }
  } catch (err) {
    Alert.alert('Error', 'Something went wrong');
  } finally {
    setPostSourceLoading(false);
  }
};
const submitDestination = async () => {
  if (!destinationText.trim()) {
    Alert.alert('Error', 'Enter destination');
    return;
  }

  try {
    setPostDestinationLoading(true);

    const res = await fetch(
      'http://eximapi1.tranzol.com/api/Destination',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unloadingPoints: destinationText }),
      }
    );

    const textResponse = await res.text();

    if (textResponse.includes('Create Successfully')) {
      Alert.alert('Success', 'Destination created successfully');
      setShowDestinationModal(false);
      setDestinationText('');
    }
  } catch (err) {
    Alert.alert('Error', 'Something went wrong');
  } finally {
    setPostDestinationLoading(false);
  }
};


useEffect(() => {
  if (!location || !destination || !netwt) return;

  //console.log('Waiting before fetching fixed details...');

  const timer = setTimeout(() => {
    console.log('Fetching fixed details...');
    fetchFixedDetails(location, destination, netwt);
  }, 800); // ⏳ wait 800ms

  // cleanup if user types again
  return () => clearTimeout(timer);

}, [location, destination, netwt]);

useEffect(() => {
  if (fuelQty && dieselRate){
  const qty = Number(fuelQty) || 0;
  const rate = Number(dieselRate) || 0;

  // Calculate
  const rawAmount = qty * rate;

  // Round to 2 decimals (safe)
  const roundedAmount = Math.round(rawAmount * 100) / 100;

  setAmount(roundedAmount);
  }

}, [fuelQty, dieselRate]);

  // 🧪 Dummy Trip Data
 
  const validateFuelData = () => {
    if(!loadTypeId) return 'Please select load type';
    if (!fuelCardTypeId) return 'please select fuel card type';
    if (!selectedVehicle) return 'Please select a vehicle';
  if (!location) return 'Source is required';
  if (!destination) return 'Destination is required';
  if (!netwt) return 'Net weight is required';
  // if (!distance || !mileage || !totalLitre)
  //   return 'Fixed rule data not available';
  // if (!allottedKm) return 'Please enter allotted KM';
 // if (!mileage2) return 'Please enter alloted mileage';
  if (!dieselRate) return 'Please enter alloted diesel rate';
  if (!fuelQty) return 'Please enter alloted total litre';
  if (!amount) return 'Please enter alloted amount';
  return null;
 
};


 const handleSubmit = async () => {
  const errorMsg = validateFuelData();
  if (errorMsg) {
    Alert.alert('⚠️ Validation', errorMsg);
    return;
  }
const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      Alert.alert('❌ Error', 'User not logged in');
      return;
    }
  try {
    setLoading(true);

    const payload = {
      loadTypeId: loadTypeId,
      fuelCardTypeId: fuelCardTypeId,
      vehicleId: selectedVehicle,
guarantorId: guarantorId || null,
fuelCardId : fuelCardId || null,
      driverId : driverId || null,
      sourceId: location,
      destinationId: destination,
      netWt: Number(netwt),
      fixedDistance: Number(distance),
      fixedMileage: Number(mileage),
      fixedLtr: Number(totalLitre),
      bookingDate : currentDate,
      allottedAmount: Number(amount || 0),
       allottedDieselRate: Number(dieselRate || 0),
      allottedTotalLtr: Number(fuelQty || 0),
      driverCashAdvance: driverCashAdvance,
      remarks: remarks || '',
      inserUserId: Number(userId),
    };

  // console.log('Fuel Payload:', payload);

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
    //console.log('Fuel API Raw Response:', text);

    // 🔹 Handle plain text success
    if (text.includes('Insert successfully')) {
      Alert.alert('✅ Success', text);
      navigation.goBack()
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

    Alert.alert('Eroor', text || 'something went wrong');

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
    <View style={styles.headerContainer}>
  {/* GO BACK ICON */}
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={styles.backBtn}
    activeOpacity={0.7}
  >
    <Image
      source={require('../assets/arrow.png')}
      style={styles.backIcon}
      resizeMode="contain"
    />
  </TouchableOpacity>

  {/* TITLE */}
  <Text style={styles.header}>⛽ Fuel Management</Text>
</View>

      {/* 🔽 Trip Dropdown */}
      <Text style={styles.label}>Select Load Type 🚛</Text>
      <Dropdown
        style={styles.dropdown}
        data={loadType}
        labelField="label"
        valueField="value"
        placeholder="Choose Load Type"
        value={loadTypeId}
        onChange={(item)=>setloadTypeId(item.value)}
         itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
 
      />
            <Text style={styles.label}>Fuel Card  Type 💳</Text>
      <Dropdown
        style={styles.dropdown}
        data={CardType}
        labelField="label"
        valueField="value"
        placeholder="Choose Fuel Card Type"
        value={fuelCardTypeId}
        onChange={(item) => setfuelCardTypeId(item.value)}
         itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}

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
  ]}
  onChange={item => {
    setSelectedVehicle(item.value);

    // auto-fill driver details
    setDriverName(item.driverName ?? '');
    setdriverId(item.driverId ?? null);
    setDriverContact(item.contactNo ?? '');
    setguarantorId(item.guarantorId ?? null);
    setguarantorName(item.guarantorName ?? "");
    setfuelCardId(item.fuelCardId ?? null);
    setcardNo(item.cardNo ?? '');
  }}
 itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholderText}
  onChangeText={text => {

    if (text.length >= 3) {
      fetchVehicleList(text);
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
    <Text style={styles.cardTitle}> Details 👨‍✈️</Text>

    <View style={styles.cardRow}>
      <Text style={styles.cardLabel}>Name</Text>
      <Text style={styles.cardValue}>{driverName}</Text>
    </View>

    <View style={styles.cardRow}>
      <Text style={styles.cardLabel}>Contact</Text>
      <Text style={styles.cardValue}>{driverContact}</Text>
    </View>
       <View style={styles.cardRow}>
      <Text style={styles.cardLabel}>guarantor Name</Text>
      <Text style={styles.cardValue}>{guarantorName}</Text>
    </View>
       <View style={styles.cardRow}>
      <Text style={styles.cardLabel}>card No</Text>
      <Text style={styles.cardValue}>{cardNo}</Text>
    </View>
  </View>
)}


      {/* Source */}
      <View style={styles.dropdownRow}>
        <View style={{ flex: 1 }}>
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
         if (text.length >= 3) {
           fetchLocationList(text);
         }
       }}
     
       itemTextStyle={styles.dropdownItemText}
       selectedTextStyle={styles.selectedText}
       placeholderStyle={styles.placeholderText}
       inputSearchStyle={[
         styles.searchText,
       ]}
     
       renderRightIcon={() =>
         locationLoading ? (
           <ActivityIndicator size="small" color="#2563EB" />
         ) : null
       }
     />
     </View>
      <TouchableOpacity
    style={styles.plusBtn}
    onPress={() => setShowSourceModal(true)}
  >
    <Text style={styles.plusText}>➕</Text>
  </TouchableOpacity>
</View>
<Modal visible={showSourceModal} transparent animationType="slide">
  <View style={styles.addPointOverlay}>
    <View style={styles.addPointCard}>

      {/* Header */}
      <View style={styles.addPointHeader}>
        <Text style={styles.addPointTitle}>Add Source</Text>

        <TouchableOpacity onPress={() => setShowSourceModal(false)}>
           <Icon   style={{
    position: 'absolute',
    top: -50,
    right: 0,
    zIndex: 10,
  }}
 name="close" size={30} color="#f8260b" />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Enter Source"
        value={sourceText}
        onChangeText={setSourceText}
        style={styles.addPointInput}
      />

      {postSourceLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <TouchableOpacity
          style={styles.addPointSubmitBtn}
          onPress={submitSource}
        >
          <Text style={styles.addPointSubmitText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
</Modal>


      {/* Destination */}
      <View style={styles.dropdownRow}>
        <View style={{ flex: 1 }}>
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
    if (text.length >= 3) {
      fetchDestinationList(text);
    }
  }}

  inputSearchStyle={[
    styles.searchText,
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
      </View>
         <TouchableOpacity
    style={styles.plusBtn}
    onPress={() => setShowDestinationModal(true)}
  >
    <Text style={styles.plusText}>➕</Text>
  </TouchableOpacity>

</View>
<Modal visible={showDestinationModal} transparent animationType="slide">
  <View style={styles.addPointOverlay}>
    <View style={styles.addPointCard}>

      <View style={styles.addPointHeader}>
        <Text style={styles.addPointTitle}>Add Destination</Text>

        <TouchableOpacity onPress={() => setShowDestinationModal(false)}>
          <Icon   style={{
    position: 'absolute',
    top: -50,
    right: 0,
    zIndex: 10,
  }}
 name="close" size={30} color="#f8260b" />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Enter Destination"
        value={destinationText}
        onChangeText={setDestinationText}
        style={styles.addPointInput}
      />

      {postDestinationLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <TouchableOpacity
          style={styles.addPointSubmitBtn}
          onPress={submitDestination}
        >
          <Text style={styles.addPointSubmitText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
</Modal>


      {/* Material */}
      {/* <Text style={styles.label}>Material  🧱</Text>
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
    if (text.length >= 3) {
      fetchMaterialList(text);
    }
  }}

  inputSearchStyle={[
    styles.searchText,
  ]}
         itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholderText}
  
    renderRightIcon={() =>
      materialLoading ? (
        <ActivityIndicator size="small" color="#2563EB" />
      ) : null
    }
      /> */}
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
{/* <Text style={styles.label}>Allotted KM 🛣️</Text>
<TextInput
  style={styles.input}
  placeholderTextColor="#9CA3AF"  
  placeholder="Enter Allotted KM"
  keyboardType="numeric"
  value={allottedKm}
  onChangeText={setAllottedKm}
/> */}

{/* Mileage 2 */}
{/* <Text style={styles.label}>Alloted Mileage  🔁</Text>
<TextInput
  style={styles.input}
  placeholderTextColor="#9CA3AF"  
  placeholder="Enter Mileage "
  keyboardType="numeric"
  value={mileage2}
  onChangeText={setMileage2}
/> */}

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
  placeholder="Auto Calculated"
  value={amount ? amount.toFixed(2) : ''}
  editable={false}
/>
    

      {/* <Text style={styles.label}>Balance Km 💰</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        keyboardType="numeric"
        placeholder="Enter Balance Km"
        value={balancekm}
        onChangeText={setBalanceKm}
        editable={false}
      /> */}

      {/* 🔢 Fuel Quantity */}
      {/* 🔢 Balance Fuel */}
{/* <Text style={styles.label}>Total ltr. 🛢️</Text>
<TextInput
style={[styles.input, styles.disabledInput]}
  keyboardType="numeric"
  placeholder="Enter Total ltr"
  value={balanceFuel}
  onChangeText={setBalanceFuel}
  editable={false}
/>

    

        {/* Balance (Non-editable) */}
      {/* <Text style={styles.label}>Balance Amount💰</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value="auto calculated"
        editable={false}
      />  */}
  <Text style={styles.label}>Driver Cash Advance 💰</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#9CA3AF"  
        keyboardType="numeric"
        placeholder="Enter Driver Cash Advance"
        value={driverCashAdvance}
        onChangeText={setdriverCashAdvance}
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
headerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 14,
  backgroundColor: '#FFFFFF',
  borderBottomWidth: 1,
  borderBottomColor: '#E5E7EB',
},

backBtn: {
  position: 'absolute',
  left: 12,
  padding: 8,
},

backIcon: {
  width: 22,
  height: 22,

},

header: {
  fontSize: 18,
  fontWeight: '700',
  color: '#2563EB',
},



  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 10,
    marginLeft:10
  },

  dropdown: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    height: 45,
    width: '100%',
    
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
dropdownRow: {
    flexDirection: 'row',
    
    marginBottom: 12,
    justifyContent: 'space-between',
     alignItems: 'center',
  },

  plusBtn: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    marginTop: 35
  },
  plusText: {
    fontSize: 18,
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
  fontSize: 12,
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
    paddingHorizontal: 14,
    paddingVertical:10,
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
  addPointOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addPointCard: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    elevation: 6,
  },

  addPointTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 14,
    color: '#111827',
  },

  addPointInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 18,
    color: '#111827',
  },

  addPointSubmitBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  addPointSubmitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
