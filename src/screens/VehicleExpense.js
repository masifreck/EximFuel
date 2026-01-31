import React, { useState, useCallback } from 'react';
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
import CustomImagePicker from '../components/CustomeImagePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VehicleExpense = ({ navigation }) => {
      const [vehicleList, setVehicleList] = useState([]);
const [selectedVehicle, setSelectedVehicle] = useState(null);

const [vehicleSearchText, setVehicleSearchText] = useState('');
const [vehicleLoading, setVehicleLoading] = useState(false);

        const [driverName, setDriverName] = useState('');
        const [driverContact, setDriverContact] = useState('');
        const [remarks, setRemarks] = useState('');
        const [requsestAmount, setRequestAmount] = useState('');
            const [expenseType, setExpenseType] = useState(null);
const [expenseTypeData, setExpenseTypeData] = useState([]);
const [expenseTypeLoading, setExpenseTypeLoading] = useState(false);

const [location, setLocation] = useState(null);
const [locationData, setLocationData] = useState([]);
const [locationLoading, setLocationLoading] = useState(false);


            const [Attachments, setAttachments] = useState([]);
            const [submitLoading, setSubmitLoading] = useState(false);
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

   
const fetchExpenseTypeList = async (searchText) => {
  try {
    setExpenseTypeLoading(true);

    const response = await fetch(
      `http://eximapi1.tranzol.com/api/ExpenseType?search=${searchText}`
    );

    const data = await response.json();
    //console.log('ExpenseType API:', data);

    const formattedData = data
      .filter(item => item.jobType) // ✅ safety check
      .map(item => ({
        label: item.jobType, // ✅ CORRECT KEY
        value: item.id,
        
      }));

    setExpenseTypeData(formattedData);
  } catch (error) {
    Alert.alert('❌ Error', 'Failed to fetch expense types');
  } finally {
    setExpenseTypeLoading(false);
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


const handleAttachment = useCallback(image => {
        setAttachments(image);
      }, []);

      const validateForm = () => {
  if (!selectedVehicle) {
    Alert.alert('⚠️ Validation', 'Please select vehicle');
    return false;
  }
  if (!expenseType) {
    Alert.alert('⚠️ Validation', 'Please select expense type');
    return false;
  }
  if (!location) {
    Alert.alert('⚠️ Validation', 'Please select location');
    return false;
  }
  if (!requsestAmount || isNaN(requsestAmount)) {
    Alert.alert('⚠️ Validation', 'Please enter valid amount');
    return false;
  }
  if (!remarks) {
    Alert.alert('⚠️ Validation', 'Please enter remarks');
    return false;
  }
  return true;
};


const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    setSubmitLoading(true);

    const storedUserId = await AsyncStorage.getItem('userId');
    if (!storedUserId) {
      Alert.alert('❌ Error', 'User not logged in');
      return;
    }

    const formData = new FormData();
    formData.append('ExpenseTypeId', expenseType);
    formData.append('InsertUserId', storedUserId);
    formData.append('LocationId', location);
    formData.append('RequestAmount', requsestAmount);
    formData.append('VehicleId', selectedVehicle);
    formData.append('Remarks', remarks);

    const response = await fetch(
      'http://eximapi1.tranzol.com/api/VehicleExpenseBooking',
      {
        method: 'POST',
        body: formData,
      }
    );
//console.log('submitting form data:', formData);
    // ⚠️ API may return JSON OR plain text
    const rawText = await response.text();
//console.log('Submission Response:', rawText);
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = null;
    }

    // ✅ SUCCESS CASE
    if (
      response.ok &&
      parsed?.message &&
      parsed.message.toLowerCase().includes('insert')
    ) {
      Alert.alert('✅ Success', parsed.message);

      // optional reset
      navigation.goBack()
      return;
    }

    // ❌ BACKEND / FK ERROR (plain text)
    Alert.alert('❌ Submission Failed', rawText);

  } catch (error) {
    Alert.alert('❌ Error', error.message || 'Something went wrong');
  } finally {
    setSubmitLoading(false);
  }
};


  return (
    
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    <Text style={styles.label}>Select Vehicle 🚛</Text>

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
    <Text style={styles.label}>Select Expense Type 💰</Text>

<Dropdown
  style={styles.dropdown}
  data={expenseTypeData}
  search
  labelField="label"
  valueField="value"
  placeholder="Search Expense Type"
  value={expenseType}

  onChange={item => {
    setExpenseType(item.value);
  }}

  onChangeText={text => {
    const upperText = text.toUpperCase(); // ✅ force uppercase display

    // 🔁 re-trigger search with uppercase text
    if (upperText.length >= 3) {
      fetchExpenseTypeList(upperText);
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
    expenseTypeLoading ? (
      <ActivityIndicator size="small" color="#2563EB" />
    ) : null
  }
/>

<Text style={styles.label}>Select Location 📍</Text>

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

  <Text style={styles.label}>Request Amount 💰</Text>
             <TextInput
               style={styles.input}
               placeholderTextColor="#9CA3AF"  
               keyboardType="numeric"
               placeholder="Enter Request Amount"
               value={requsestAmount}
               onChangeText={setRequestAmount}
             />
                         <Text style={styles.label}>Remarks 📝</Text>
             <TextInput
  style={[styles.input, styles.remarksInput]}
  placeholder="Enter remarks (optional)"
  placeholderTextColor="#9CA3AF"
  multiline
  value={remarks}
  onChangeText={setRemarks}
/>

             
                          <View style={{flexDirection: 'row', justifyContent: 'space-evenly',marginTop:20}}>  
             <CustomImagePicker
                           bgImage={require('../assets/upload-file.png')}
                           title="Add Attachments   📎"
                           onImagePicked={handleAttachment}
                           imageData={Attachments}
                             width={80}
                         />
                         </View>
               <TouchableOpacity
  style={[
    styles.submitBtn,
    submitLoading && { opacity: 0.7 }
  ]}
  onPress={handleSubmit}
  disabled={submitLoading}
>
  {submitLoading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.submitText}>Submit ✅</Text>
  )}
</TouchableOpacity>


    </ScrollView>
  )
}
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
remarksInput: {
  height: 120,              // ✅ more height
  minHeight: 120,
  textAlignVertical: 'top', // ✅ multiline starts from top (Android fix)
  paddingTop: 12,
  paddingHorizontal: 12,
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
export default VehicleExpense