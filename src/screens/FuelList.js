import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  StatusBar,
  ScrollView,Image,FlatList,Dimensions
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';


const FuelList = ({navigation}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [fuelAmount, setfuelAmount] = useState('');
  const [remarks, setremarks] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const [imageModalVisible, setImageModalVisible] = useState(false);
const [previewImage, setPreviewImage] = useState('');
const [username, setUsername] = useState('');
const [isAdmin, setIsAdmin] = useState(false);
const [selectedDate, setSelectedDate] = useState(null);
const [showDatePicker, setShowDatePicker] = useState(false);

const [appFuelRequestId, setAppFuelRequestId] = useState(null);
const [fuelLoadDate, setfuelLoadDate] = useState(null);
const [addNewDetails ,setAddNewDetails]=useState(false);
const [rate, setrate] = useState('');
const [ltr, setltr] = useState('');
const [lastEdited, setLastEdited] = useState(null);

 const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
const currentDate = getCurrentDate();
useEffect(() => {
  const amt = parseFloat(fuelAmount);
  const r = parseFloat(rate);
  const l = parseFloat(ltr);

  // ✅ Calculate Litres (Amount / Rate)
  if (
    lastEdited === 'amount' &&
    !isNaN(amt) &&
    !isNaN(r) &&
    r > 0
  ) {
    const result = (amt / r).toFixed(2);
    setltr(result.toString());
  }

  // ✅ Calculate Amount (Litres * Rate)
  if (
    lastEdited === 'ltr' &&
    !isNaN(l) &&
    !isNaN(r)
  ) {
    const result = (l * r).toFixed(2);
    setfuelAmount(result.toString());
  }

}, [fuelAmount, rate, ltr, lastEdited]);
useEffect(() => {
  const getUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('userId');
       const admin = await AsyncStorage.getItem('isAdmin');
      // console.log('Admin Status:', admin);
        if (admin === 'true') {
        setIsAdmin(true);
      }
      if (storedUsername) {
        setUsername(storedUsername);
      }
    
    } catch (error) {
      console.log('Failed to load username', error);
    }
  };

  getUserData();
}, []);
const onDateChange = (event, date) => {
  setShowDatePicker(false);

  if (date) {
    const formattedDate = date.toISOString().split('T')[0]; // yyyy-mm-dd
    setSelectedDate(formattedDate);
  }
};

let url = 'http://eximapi1.tranzol.com/api/Fuel/GetAllFuelList'
  const fetchPendingList = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setList(json || []);
    } catch (e) {
      Alert.alert('Error', 'Failed to load pending approvals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!username) return;

  const timer = setTimeout(() => {
    fetchPendingList();
  }, 400); 

  return () => clearTimeout(timer); 
}, [username, selectedDate]);

  // 🔍 Search Filter
  const filteredList = useMemo(() => {
    if (!search) return list;
    return list.filter(item =>
      item.vehicleNo?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, list]);

  // 📤 Submit Approval (PLAIN TEXT RESPONSE)


const fetchDetails = async (id) => {
  if (!id) return;

  setFetchDetailsLoading(true);
  setDetails([]); // clear old data

  try {
    const res = await fetch(
      `http://eximapi1.tranzol.com/api/Fuel/GetFuelDetails?AppFuelRequestId=${id}`
    );

    const json = await res.json();
//console.log('Fetched Details:', json);
    if (res.ok && Array.isArray(json)) {
      setDetails(json);
    } else {
      Alert.alert('Error', 'No fuel details found');
    }
  } catch (error) {
    console.log('Failed to fetch details', error);
    Alert.alert('Error', 'Something went wrong');
  } finally {
    setFetchDetailsLoading(false);
  }
};

const COL_WIDTH = 140;
const TOTAL_COLS = 20;
const TABLE_WIDTH = COL_WIDTH * TOTAL_COLS;




  // 📊 Grid Row
const renderRow = ({ item }) => (
  <TouchableOpacity
    style={[styles.tableRow, { width: TABLE_WIDTH }]}
    onPress={() => {
   navigation.navigate('fuellistdetails',{item:item})
    }}
  >
    <Text style={styles.valueBlock} >{item.loadType}</Text>
     <Text style={styles.valueBlock} >{item.fuelCardType}</Text>
    <Text style={styles.valueBlock}>{item.vehicleNo || '-'}</Text>

    <Text style={styles.valueBlock}>{item.guarantorName || '-'}</Text>
    <Text style={styles.valueBlock}>{item.cardNo || '-'}</Text>
    <Text style={styles.valueBlock}>{item.driverName || '-'}</Text>
    <Text style={styles.valueBlock}>{item.driverContactNo || '-'}</Text>

    <Text style={styles.valueBlock}>{item.loadingPoints || '-'}</Text>
    <Text style={styles.valueBlock}>{item.unloadingPoints || '-'}</Text>
    <Text style={styles.valueBlock}> {item.balanceLtr}</Text>
  <Text style={styles.valueBlock}>{item.netWt || '-'}</Text>
  <Text style={styles.valueBlock}>{item.fixedDistance || '-'}</Text>
  <Text style={styles.valueBlock}>{item.fixedMileage || '-'}</Text>
 <Text style={styles.valueBlock}>{item.fixedLtr || '-'}</Text>

    <Text style={styles.valueBlock}>
      {item.bookingDate ? item.bookingDate.split('T')[0] : '-'}
    </Text>
      <Text style={styles.valueBlock}>{item.allottedAmount || '-'}</Text>
 <Text style={styles.valueBlock}>{item.allottedDieselRate || '-'}</Text>
 <Text style={styles.valueBlock}>{item.allottedTotalLtr || '-'}</Text>
    <Text style={styles.valueBlock}>{item.driverCashAdvance || '-'}</Text>
    <Text style={styles.valueBlock}>{item.remarks || '-'}</Text>
  </TouchableOpacity>
);



  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

    <View style={styles.headerContainer}>
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={styles.backBtn}
    activeOpacity={0.7}
  >
    <Image 
    style={styles.backIcon}
    source={require('../assets/arrow.png')}
    />
  </TouchableOpacity>

  <Text style={styles.title}>
    ⛽ Add More Fuel Details
  </Text>
</View>

      {/* 🔍 Search */}
      <View style={styles.searchContainer}>
  <TextInput
    placeholder="Search by Vehicle No"
    value={search}
    onChangeText={setSearch}
    style={styles.searchInput}
    placeholderTextColor="#9CA3AF"
  />

  {/* <TouchableOpacity
    style={styles.dateBox}
    onPress={() => setShowDatePicker(true)}
  >
    <Text style={styles.dateText}>
      {selectedDate ? selectedDate : '📅 Date'}
    </Text>
  </TouchableOpacity> */}
</View>

{showDatePicker && (
  <DateTimePicker
    value={selectedDate ? new Date(selectedDate) : new Date()}
    mode="date"
    display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
    onChange={onDateChange}
  />
)}


      {/* 📊 Grid */}
      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView
  horizontal
  showsHorizontalScrollIndicator
>
  <View style={{ minWidth: TABLE_WIDTH, marginTop: 20 }}>

    {/* HEADER */}
    <View style={styles.tableHeaderRow}>
      <Text style={styles.headerBlock}>load Type</Text>
      <Text style={styles.headerBlock}>fuelCardType</Text>
  <Text style={styles.headerBlock}>Vehicle No</Text>

    <Text style={styles.headerBlock}>guarantorName</Text>
  <Text style={styles.headerBlock}>cardNo</Text>
  <Text style={styles.headerBlock}>driverName</Text>
  <Text style={styles.headerBlock}>driverMob.No</Text>

  <Text style={styles.headerBlock}>Loading P.</Text>
  <Text style={styles.headerBlock}>Unloading P.</Text>
  <Text style={styles.headerBlock}>balanceLtr</Text>
  <Text style={styles.headerBlock}>Net Wt</Text>
  <Text style={styles.headerBlock}>Fixed Dis.</Text>
  <Text style={styles.headerBlock}>Fixed Mileage</Text>
  <Text style={styles.headerBlock}>Fixed Ltr</Text>
   <Text style={styles.headerBlock}>B. Date</Text>
 <Text style={styles.headerBlock}>Allotted Amt</Text>
   <Text style={styles.headerBlock}>A. Diesel Rate</Text>
  <Text style={styles.headerBlock}>A. Total Ltr</Text>
  <Text style={styles.headerBlock}>D. CashAdvance</Text>
  <Text style={styles.headerBlock}>Remarks</Text>
</View>

    {/* ROWS */}
<ScrollView horizontal showsHorizontalScrollIndicator
  keyboardShouldPersistTaps="handled" >
  <View style={{ minWidth: TABLE_WIDTH, marginTop: 20 }}>
    
    {/* HEADER */}
    <View style={[styles.tableHeaderRow, { width: TABLE_WIDTH }]} />

    {/* BODY */}
    <FlashList
      data={filteredList}
      renderItem={renderRow}
      estimatedItemSize={60}
      keyExtractor={item => item.id.toString()}
      scrollEnabled
      showsVerticalScrollIndicator
      ListEmptyComponent={
        <Text style={styles.empty}>No pending approvals</Text>
      }
    />

  </View>
</ScrollView>


  </View>
</ScrollView>

      )}

      {/* 🔲 Modal */}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 12,
  },
headerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E7EB',
  marginBottom: 10,
},

backBtn: {
  position: 'absolute',
  left: 12,
  padding: 8,
},

backIcon: {
  width: 30,
  height: 30,
},

title: {
  fontSize: 17,
  fontWeight: '600',
  color: '#111827',
},
  search: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
tableHeaderRow: {
  flexDirection: 'row',
  backgroundColor: '#2563EB',
  borderBottomWidth: 1,
  borderColor: '#E5E7EB',
},

headerBlock: {
  width: 140,
  padding: 6,
  color: '#fff',
  fontWeight: '700',
  fontSize: 12,
  textAlign: 'left',
  flexShrink: 0,
  flexWrap: 'wrap',
},

tableRow: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderBottomWidth: 1,
  borderColor: '#E5E7EB',
},

valueBlock: {
  width: 140,
  padding: 6,
  fontSize: 12,
  color: '#374151',
  textAlign: 'left',
  flexShrink: 0,
  flexWrap: 'wrap',
},

 row: {
  flexDirection: 'row',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderColor: '#E5E7EB',
  backgroundColor: '#fff',
},



cell: {
  width: 140,
  paddingHorizontal: 5,
  color: '#374151',
  fontSize: 12,
  textAlign: 'left',
},

headerCell: {
  width: 140,
  color: '#fff',
  fontWeight: '700',
  paddingHorizontal: 5,
  fontSize: 12,
  textAlign: 'left',
},

  headerCellVehicle: {
    width: 140,
    color: '#fff',
    fontWeight: '700',
    paddingHorizontal: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: '#111827',
  },
  dateBox: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E7EB',
  },
  dateText: {
    color: '#374151',
    fontSize: 14,
  },
    label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 1,
    marginTop: 10,
  },
  cellVehicle: {
    width: 140,
    paddingHorizontal: 5,
    fontWeight: '600',
    color: '#111827',
  },
  cellAmount: {   
    width: 140,
    paddingHorizontal: 10,
    fontWeight: '700',
    color: '#2563EB',
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#6B7280',
  },

modalBackdrop: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalCard: {
  width: '92%',
  maxHeight: '90%',   // 🔑 prevents clipping
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 16,
},

modalScrollContent: {
  paddingBottom: 20,
},

modalTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 12,
},

  modalText: {
    marginBottom: 6,
    color: '#374151',
  },
  detailLine: {
  flexDirection: 'row',
  marginBottom: 8,
},

detailKey: {
  width: 140,          // fixed space for alignment
  fontWeight: '600',
  color: '#374151',
},

detailValue: {
  flex: 1,
  color: '#111827',
},

  input: {
    width:'90%',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 6,
    paddingHorizontal:12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#111827',
  },
  submitBtn: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width:'90%',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 16,
},

submitText: {
  color: '#fff',
  fontWeight: '600',
},

rejectText: {
  color: '#fff',
  fontWeight: '600',
},
modalHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},
  cancelBtn: {
    marginTop: 18,
  },
  cancelText: {
    textAlign: 'center',
    color: '#EF4444',
    fontWeight: '600',
    position: 'absolute',
    top: -60,
    right: 0,
    fontSize: 22,
    zIndex: 10,
  },
  attachmentContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 12,
},

attachmentImage: {
  width: 80,
  height: 80,
  borderRadius: 8,
  marginRight: 8,
  marginBottom: 8,
  backgroundColor: '#E5E7EB',
},

imageModalWrapper: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.9)',
  justifyContent: 'center',
  alignItems: 'center',
},
 disabledInput: {
    backgroundColor: '#eee',
    color: '#777',
  },
fullImage: {
  width: '100%',
  height: '85%',
},

imageModalWrapper: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.95)',
},

closeBtn: {
  position: 'absolute',
  top: 40,
  right: 20,
  zIndex: 10,
},

closeText: {
  fontSize: 22,
  color: '#FFFFFF',
},

closeText: {
  color: '#fff',
  fontSize: 28,
  fontWeight: 'bold',
},
attachmentContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 12,
},

imageWrapper: {
  width: 80,
  height: 80,
  marginRight: 8,
  marginBottom: 8,
},

attachmentImage: {
  width: '100%',
  height: '100%',
  borderRadius: 8,
},

imageLoader: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: '#F3F4F6',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  zIndex: 1,
},

loadingText: {
  fontSize: 10,
  color: '#6B7280',
  marginTop: 4,
},
  loaderContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#6B7280',
  },
  detailCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    elevation: 3,
  },
  dateText: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },


  remarks: {
    marginTop: 8,
    color: '#374151',
    fontStyle: 'italic',
  },
  
  emptyText: {
    color: '#9CA3AF',
  },
   tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingVertical: 10,
  },
  headerCell: {
    width: 120,              // 🔑 fixed width = horizontal scroll works
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    textAlign:'left'
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  rowCell: {
    width: 120,              // 🔑 MUST match header width
    textAlign: 'center',
    color: '#111827',
  },
    button1: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },

  addBtn1: {
    backgroundColor: '#2563EB', // blue
  },

  closeBtn1: {
    backgroundColor: '#DC2626', // red
  },

  buttonText1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  closeText1: {
    color: '#FFFFFF',
  },
    actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 16,
},

submitBtn: {
  flex: 1,
  backgroundColor: '#2563EB',
  paddingVertical: 12,
  borderRadius: 8,
  marginRight: 8,
  alignItems: 'center',
},

rejectBtn: {
  flex: 1,
  backgroundColor: '#DC2626',
  paddingVertical: 12,
  borderRadius: 8,
  marginLeft: 8,
  alignItems: 'center',
},

submitText: {
  color: '#fff',
  fontWeight: '600',
},

rejectText: {
  color: '#fff',
  fontWeight: '600',
},
});

export default FuelList;
