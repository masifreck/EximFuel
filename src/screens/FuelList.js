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
  ScrollView,Image,FlatList
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fi } from 'date-fns/locale';

const SUBMIT_API =
  'http://eximapi1.tranzol.com/api/Fuel/FuelDetailRequest';

const FuelList = () => {
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
const [rate, setrate] = useState('');
const [ltr, setltr] = useState('');

 const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
const currentDate = getCurrentDate();

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
const handleSubmit = async (appFuelRequestId) => {
  if (!fuelAmount) {
    Alert.alert('Validation', 'Please enter approve amount');
    return;
  }

  if (!appFuelRequestId) {
    Alert.alert('Validation', 'Invalid action');
    return;
  }

  if (!username) {
    Alert.alert('Error', 'User not identified. Please login again.');
    return;
  }

  const payload = {
    appFuelRequestId,
   fuelLoadDate: new Date().toISOString(),
    rate:Number(rate),
    ltr:Number(ltr),
    fuelAmount: Number(fuelAmount),
    remarks: remarks?.trim() || '',
  };

  //console.log('Submit Payload:', payload);

  try {
    setSubmitLoading(true);

    const res = await fetch(SUBMIT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
      body: JSON.stringify(payload),
    });

    // ✅ READ RESPONSE ONCE
    const responseText = await res.text();

    if (res.ok) {
      Alert.alert(
        'Success',
        responseText || 'Insert successfully'
      );

      setrate('');
      setltr('');
      setfuelAmount('');
      setremarks('');
        fetchDetails(appFuelRequestId)
    } else {
      // 🔥 THIS WILL SHOW:
      // "Approve amount is not greater than request amount !!!"
      Alert.alert(
        'Validation Error',
        responseText || 'Approval failed'
      );
    }
  } catch (error) {
    console.log('Approve API Error:', error);
    Alert.alert('Error', 'Network or server error');
  } finally {
    setSubmitLoading(false);
  }
};

const IMAGE_PREFIX = 'https://flex.tranzol.com/upload';

const getParsedAttachments = (attachment) => {
  try {
    return attachment
      ? JSON.parse(attachment).map(item => ({
          ...item,
          fullUrl: `${IMAGE_PREFIX}/${item.Filename}`,
        }))
      : [];
  } catch {
    return [];
  }
};

const [fetchDetailsLoading, setFetchDetailsLoading] = useState(false);
const [details, setDetails] = useState([]);

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
const TOTAL_COLS = 17;
const TABLE_WIDTH = COL_WIDTH * TOTAL_COLS;
const AttachmentImage = ({ uri, onPress }) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <TouchableOpacity onPress={onPress} style={styles.imageWrapper}>
      {loading && (
        <View style={styles.imageLoader}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      <Image
        source={{ uri }}
        style={styles.attachmentImage}
        onLoadEnd={() => setLoading(false)}
      />
    </TouchableOpacity>
  );
};
const parsedAttachments = React.useMemo(
  () => getParsedAttachments(selectedItem?.attachment),
  [selectedItem]
);



const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={styles.headerCell}>Date</Text>
    <Text style={styles.headerCell}>Amount</Text>
    <Text style={styles.headerCell}>rate</Text>
    <Text style={styles.headerCell}>Liters</Text>
    <Text style={styles.headerCell}>Remarks</Text>
  </View>
);

const renderItem = ({ item }) => (
  <View style={styles.tableRow}>
    <Text style={styles.rowCell}>
      {new Date(item.fuelLoadDate).toLocaleDateString()}
    </Text>

    <Text style={styles.rowCell}>₹ {item.fuelAmount}</Text>

    <Text style={styles.rowCell}>{item.rate}</Text>

    <Text style={styles.rowCell}>{item.ltr}</Text>

    <Text style={styles.rowCell}>{item.remarks || '-'}</Text>
  </View>
);



  // 📊 Grid Row
const renderRow = ({ item }) => (
  <TouchableOpacity
    style={[styles.tableRow, { width: TABLE_WIDTH }]}
    onPress={() => {
      setSelectedItem(item);
      setModalVisible(true);
      fetchDetails(item.id);
    }}
  >
    <Text style={styles.valueBlock}>{item.vehicleNo || '-'}</Text>
    <Text style={styles.valueBlock}>{item.loadingPoints || '-'}</Text>
    <Text style={styles.valueBlock}>{item.unloadingPoints || '-'}</Text>
    <Text style={styles.valueBlock}>₹ {item.requestAmount}</Text>
    <Text style={styles.valueBlock}>
      {item.fuelDate ? item.fuelDate.split('T')[0] : '-'}
    </Text>
    <Text style={styles.valueBlock}>{item.balanceAmount || '-'}</Text>
    <Text style={styles.valueBlock}>{item.allottedKm || '-'}</Text>
    <Text style={styles.valueBlock}>{item.allottedMileage || '-'}</Text>
    <Text style={styles.valueBlock}>{item.allottedDieselRate || '-'}</Text>
    <Text style={styles.valueBlock}>{item.allottedTotalLtr || '-'}</Text>
    <Text style={styles.valueBlock}>{item.allottedAmount || '-'}</Text>
    <Text style={styles.valueBlock}>{item.netWt || '-'}</Text>
    <Text style={styles.valueBlock}>{item.fixedAmount || '-'}</Text>
    <Text style={styles.valueBlock}>{item.fixedLtr || '-'}</Text>
    <Text style={styles.valueBlock}>{item.fixedMileage || '-'}</Text>
    <Text style={styles.valueBlock}>{item.fixedDistance || '-'}</Text>
    <Text style={styles.valueBlock}>{item.remarks || '-'}</Text>
  </TouchableOpacity>
);



  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Add More Fuel Details</Text>

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
  <Text style={styles.headerBlock}>Vehicle No</Text>
  <Text style={styles.headerBlock}>Loading P.</Text>
  <Text style={styles.headerBlock}>Unloading P.</Text>
  <Text style={styles.headerBlock}>Request Amt</Text>
  <Text style={styles.headerBlock}>Fuel Date</Text>
  <Text style={styles.headerBlock}>Balance Amt</Text>
  <Text style={styles.headerBlock}>Allotted Km</Text>
  <Text style={styles.headerBlock}>Allotted Mi</Text>
  <Text style={styles.headerBlock}>A. Diesel Rate</Text>
  <Text style={styles.headerBlock}>A. Total Ltr</Text>
  <Text style={styles.headerBlock}>Allotted Amt</Text>
  <Text style={styles.headerBlock}>Net Wt</Text>
  <Text style={styles.headerBlock}>Fixed Amt</Text>
  <Text style={styles.headerBlock}>Fixed Ltr</Text>
  <Text style={styles.headerBlock}>Fixed Mileage</Text>
  <Text style={styles.headerBlock}>Fixed Distance</Text>
  <Text style={styles.headerBlock}>Remarks</Text>
</View>

    {/* ROWS */}
<ScrollView horizontal showsHorizontalScrollIndicator>
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
    <Modal visible={modalVisible} transparent animationType="slide">
  <View style={styles.modalBackdrop}>
    <View style={styles.modalCard}>

      {/* TITLE (fixed) */}
      <Text style={styles.modalTitle}>Check & Add More Details</Text>
  <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.cancelBtn}
        >
          <Text style={styles.cancelText}>❌</Text>

        </TouchableOpacity>
      {/* SCROLLABLE CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.modalScrollContent}
      >

        {selectedItem && (
          <>
            <View style={styles.detailLine}>
              <Text style={styles.detailKey}>Vehicle</Text>
              <Text style={styles.detailValue}>{selectedItem.vehicleNo}</Text>
            </View>

            <View style={styles.detailLine}>
              <Text style={styles.detailKey}>Loading Points</Text>
              <Text style={styles.detailValue}>{selectedItem.loadingPoints}</Text>
            </View>

            <View style={styles.detailLine}>
              <Text style={styles.detailKey}>Unloading Points</Text>
              <Text style={styles.detailValue}>{selectedItem.unloadingPoints}</Text>
            </View>

            <View style={styles.detailLine}>
              <Text style={styles.detailKey}>Requested Amt</Text>
              <Text style={styles.detailValue}>₹ {selectedItem.requestAmount}</Text>
            </View>
             <View style={styles.detailLine}>
              <Text style={styles.detailKey}>balanceLtr</Text>
              <Text style={styles.detailValue}>₹ {selectedItem.balanceLtr}</Text>
            </View>
             <View style={styles.detailLine}>
              <Text style={styles.detailKey}>balanceAmount</Text>
              <Text style={styles.detailValue}>₹ {selectedItem.balanceAmount}</Text>
            </View>

            {/* <View style={styles.detailLine}>
              <Text style={styles.detailKey}>Created By</Text>
              <Text style={styles.detailValue}>{selectedItem.createdBy}</Text>
            </View> */}

            <View style={styles.detailLine}>
              <Text style={styles.detailKey}>Created On</Text>
              <Text style={styles.detailValue}>
                {new Date(selectedItem.fuelDate).toLocaleString()}
              </Text>
            </View>

            <View style={styles.detailLine}>
              <Text style={styles.detailKey}>Remarks</Text>
              <Text style={styles.detailValue}>
                {selectedItem.remarks || '-'}
              </Text>
            </View>
          </>
        )}

        {/* ATTACHMENTS */}
        <View style={styles.attachmentContainer}>
          {parsedAttachments.map((item, index) => (
            <AttachmentImage
              key={index}
              uri={item.fullUrl}
              onPress={() => {
                setPreviewImage(item.fullUrl);
                setImageModalVisible(true);
              }}
            />
          ))}
        </View>

        {/* LOADER */}
 {!fetchDetailsLoading && details.length > 0 && (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator
  >
    {/* THIS VIEW DEFINES TABLE WIDTH */}
    <View style={{ minWidth: 600 }}>
      
      <TableHeader />

      <FlatList
        data={details}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        scrollEnabled={false}   // 🔑 VERY IMPORTANT
        removeClippedSubviews={false}
      />

    </View>
  </ScrollView>
)}

        {/* INPUTS */}
        <Text style={{ marginTop: 20, fontWeight: '600', color: '#111827', fontSize: 16 ,
            textAlign: 'center'
        }}>
  📝⛽ ADD NEW FUEL DETAILS
</Text>
<Text style={styles.label}>Fuel Amount ⛽💰</Text>
        <TextInput
          placeholder="fuel Amount"
          keyboardType="numeric"
          value={fuelAmount}
          onChangeText={setfuelAmount}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
<Text style={styles.label}>fuel Load Date 📅</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={currentDate}
        editable={false}
      />
      <Text style={styles.label}>Fuel Rate 📦</Text>
       <TextInput
          placeholder="Fuel Rate"
          value={rate}
          onChangeText={setrate}
          style={[styles.input]}
          keyboardType='numeric'
          placeholderTextColor="#9CA3AF"
        />
        <Text style={styles.label}>Liters 🧪</Text>
         <TextInput
          placeholder="LTR."
          value={ltr}
          onChangeText={setltr}
          style={[styles.input]}
          keyboardType='numeric'
          placeholderTextColor="#9CA3AF"
        />
        <Text style={styles.label}>Remarks 📝</Text>
        <TextInput
          placeholder="Remarks"
          value={remarks}
          onChangeText={setremarks}
          style={[styles.input, { height: 80 }]}
          multiline
          placeholderTextColor="#9CA3AF"
        />

        {/* ACTION BUTTONS */}
        {submitLoading ? (
          <ActivityIndicator size="small" color="#2563EB" />
        ) : (
       
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => handleSubmit(selectedItem.id)}
            >
              <Text style={styles.submitText}>SUMBIT</Text>
            </TouchableOpacity>
        )}

      

      </ScrollView>
    </View>
  </View>
</Modal>

      <Modal
  visible={imageModalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setImageModalVisible(false)}
>
  <View style={styles.imageModalWrapper}>
    <TouchableOpacity
      style={styles.closeBtn}
      onPress={() => setImageModalVisible(false)}
    >
      <Text style={styles.closeText}>✕</Text>
    </TouchableOpacity>

    <Image
      source={{ uri: previewImage }}
      style={styles.fullImage}
      resizeMode="contain"
    />
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
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
    marginBottom: 3,
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
    padding: 12,
    marginTop: 10,
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

closeBtn: {
  position: 'absolute',
  top: 40,
  right: 20,
  zIndex: 10,
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
});

export default FuelList;
