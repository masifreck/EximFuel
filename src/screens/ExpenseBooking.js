import React, { useState, useCallback } from 'react';
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
import CustomImagePicker from '../components/CustomeImagePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
const ExpenseBooking = () => {
    const [vehicle, setVehicle] = useState(null);
    const [driverName, setDriverName] = useState('');
    const [driverContact, setDriverContact] = useState('');
    const [subExpense, setSubExpense] = useState(null);
const [invoiceNo, setInvoiceNo] = useState('');
const [remarks, setRemarks] = useState('');

    const [expenseType, setExpenseType] = useState(null);
const [requsestAmount, setRequestAmount] = useState('');
 const [distance, setDistance] = useState('');
   const [invoiceDate, setInvoiceDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
const [Attachments, setAttachments] = useState([]);
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
const expenseTypeData = [
  { label: 'Fuel ⛽', value: 'fuel' },
  { label: 'Toll 🛣️', value: 'toll' },
  { label: 'Food 🍽️', value: 'food' },
  { label: 'Vehicle Repair 🔧', value: 'repair' },
  { label: 'Parking 🅿️', value: 'parking' },
  { label: 'Other 💼', value: 'other' },
];
   
const subExpenseData = [
  { label: 'Diesel ⛽', value: 'diesel' },
  { label: 'Petrol ⛽', value: 'petrol' },
  { label: 'Fastag 🛣️', value: 'fastag' },
  { label: 'Food 🍽️', value: 'food' },
  { label: 'Repair 🔧', value: 'repair' },
  { label: 'Other 💼', value: 'other' },
];

const handleSubmit = () => {
    if (!vehicle) {
        Alert.alert('Error', 'Please select a vehicle number.');
        return;
    }

    if (!expenseType) {
        Alert.alert('Error', 'Please select an expense type.');
        return;
    }
    if (!requsestAmount) {
        Alert.alert('Error', 'Please enter the request amount.');
        return;
    }
   Alert.alert(
         '✅ Success',
         'Expense details submitted successfully ',
         [
           {
             text: 'OK',
             onPress: () => navigation.goBack(),
           },
         ],
       );
    // Reset form
    setVehicle(null);   
    setDriverName('');
    setDriverContact('');
    setExpenseType(null);
    setRequestAmount('');
  };
const handleAttachment = useCallback(image => {
        setAttachments(image);
      }, []);

        const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);

    if (selectedDate) {
      setInvoiceDate(selectedDate);
    }
  };

  const formatDate = date => {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };
  return (
     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
    <Text style={styles.label}>Load Date 📅</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={currentDate}
            editable={false}
          />
<Text style={styles.label}>Expense Type 💰</Text>
<Dropdown
  style={styles.dropdown}
  data={expenseTypeData}
  search
  labelField="label"
  valueField="value"
  placeholder="Select Expense Type"
  value={expenseType}
  onChange={item => setExpenseType(item.value)}
   itemTextStyle={styles.dropdownItemText}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholderText}
  inputSearchStyle={styles.searchText}
/>
<Text style={styles.label}>Sub Expense 💼</Text>
<Dropdown
  style={styles.dropdown}
  data={subExpenseData}
  search
  labelField="label"
  valueField="value"
  placeholder="Select Sub Expense"
  value={subExpense}
  onChange={item => setSubExpense(item.value)}
  placeholderStyle={styles.placeholderText}
  selectedTextStyle={styles.selectedText}
  itemTextStyle={styles.dropdownItemText}
/>
<Text style={styles.label}>Invoice No 🧾</Text>
<TextInput
  style={styles.input}
  placeholder="Enter Invoice Number"
  placeholderTextColor="#9CA3AF"
  value={invoiceNo}
  onChangeText={setInvoiceNo}
/>
<Text style={styles.label}>Invoice Date 📅</Text>

      {/* 📅 TextInput */}
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select Invoice Date"
          placeholderTextColor="#9CA3AF"
          value={formatDate(invoiceDate)}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {/* 📆 Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={invoiceDate || new Date()}
          mode="date"
          display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
          onChange={onChangeDate}
          maximumDate={new Date()} // future dates disabled
        />
      )}
      
    <Text style={styles.label}> (KM) 📏</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#9CA3AF"  
        placeholder="Enter (KM)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
        
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
   <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit ✅</Text>
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
export default ExpenseBooking