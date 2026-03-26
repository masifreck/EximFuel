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
import CustomImagePicker from '../components/CustomeImagePicker';
import { DeffType } from '../components/DropDownData';
import CalendarModal from '../components/Calander';
const FuelDeff = ({navigation}) => {

     const [vehicleList, setVehicleList] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [vehicleLoading, setVehicleLoading] = useState(false);
    const [deffTypeId, setDeffTypeId]=useState(null);
    
    const [CurrentOdoM, setCurrentOdoM]=useState('');
    const [pOdoM, setPOdoM]=useState('');
    const [TotalKm, setTotalKm]=useState('');
    const [DeffLtr, setDeffLtr]=useState('');
    const [inStock, setInStock]=useState('');
   const [remarks, setRemarks] = useState('');
const [loading, setLoading]=useState(false);
const [dateModalVisible, setDateModalVisible] = useState(false);
const [requestDate, setRequestDate] = useState('');

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDateSelect = (displayDate, formattedDate) => {
  console.log('Display:', displayDate);      // DD/MM/YYYY
  console.log('Formatted:', formattedDate);  // ✅ YYYY-MM-DD

  setRequestDate(formattedDate); // ✅ store this
};

   const handleFileSelected = (files) => {
        // console.log('Selected files:', files);
      setSelectedFiles(files);
      };
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
    
        }));
    
        setVehicleList(formattedVehicles);
      } catch (error) {
        Alert.alert('❌ Error', 'Failed to fetch vehicles');
      } finally {
        setVehicleLoading(false);
      }
    };
  return (
  <>

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
   <Text style={styles.header}>🛢️ Deff Oil</Text>
 </View>

 <Text style={styles.label}>Deff Type 💳</Text>
       <Dropdown
         style={styles.dropdown}
         data={DeffType}
         labelField="label"
         valueField="value"
         placeholder="Choose Deff Type"
         value={deffTypeId}
         onChange={(item) => setDeffTypeId(item.value)}
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
<Text style={styles.label}>Request Date 📅</Text>

<TouchableOpacity
  style={styles.input}
  onPress={() => setDateModalVisible(true)}
>
  <Text style={{ color: requestDate ? '#111827' : '#9CA3AF' }}>
    {requestDate || 'Select Date'}
  </Text>
</TouchableOpacity>

 <Text style={styles.label}>Current Odo Meter 🚗📍</Text>
       <TextInput
         style={styles.input}
         placeholderTextColor="#9CA3AF"
         placeholder="Enter Current Odo Meter"
         keyboardType="numeric"
         value={CurrentOdoM}
         onChangeText={setCurrentOdoM}
       />
     <Text style={styles.label}>Previous Odo Meter 🔙📍</Text>
             <TextInput
               style={styles.input}
               placeholderTextColor="#9CA3AF"
               placeholder="Enter Previous Odo Meter"
               keyboardType="numeric"
               value={pOdoM}
               onChangeText={setPOdoM}
             />
            <Text style={styles.label}>Total KM 🛣️📏</Text>
                   <TextInput
                     style={styles.input}
                     placeholderTextColor="#9CA3AF"
                     placeholder="Enter Total Km"
                     keyboardType="numeric"
                     value={TotalKm}
                     onChangeText={setTotalKm}
                   />
            <Text style={styles.label}>Deff Ltr 🛢️📦</Text>
                         <TextInput
                           style={styles.input}
                           placeholderTextColor="#9CA3AF"
                           placeholder="Enter Deff Ltr."
                           keyboardType="numeric"
                           value={DeffLtr}
                           onChangeText={setDeffLtr}
                         />
                      <Text style={styles.label}>In Stock Available 📦✅</Text>
                               <TextInput
                                 style={styles.input}
                                 placeholderTextColor="#9CA3AF"
                                 placeholder="Enter In Stock"
                                 keyboardType="numeric"
                                 value={inStock}
                                 onChangeText={setInStock}
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

             
                         <CustomImagePicker onFileSelected={handleFileSelected} 
               selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
              />
<CalendarModal
  visible={dateModalVisible}
  onClose={() => setDateModalVisible(false)}
  onSelect={handleDateSelect}
/>
     {/* 🚀 Submit */}
     <TouchableOpacity
  style={[
    styles.submitBtn,
    loading && { opacity: 0.6 },
  ]}

  disabled={loading}
>
  {loading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.submitText}>Submit ✅</Text>
  )}
</TouchableOpacity>

    </ScrollView>

    </>
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
remarksInput: {
  height: 120,              // ✅ more height
  minHeight: 120,
  textAlignVertical: 'top', // ✅ multiline starts from top (Android fix)
  paddingTop: 12,
  paddingHorizontal: 12,
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

export default FuelDeff