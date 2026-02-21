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
  ScrollView,Image,Dimensions
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import ImageZoom from 'react-native-image-pan-zoom';

const { width, height } = Dimensions.get('window');

const ExpenseReport = ({navigation}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [imageModalVisible, setImageModalVisible] = useState(false);
const [previewImage, setPreviewImage] = useState('');
const [username, setUsername] = useState('');
const [selectedDate, setSelectedDate] = useState(() => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
});
const [showDatePicker, setShowDatePicker] = useState(false);
const STATUS_OPTIONS = [
  { label: 'Pending', value: 1 },
  { label: 'Approved', value: 4 },
  { label: 'Rejected', value: 5 },
  {label : 'No Filter', value: null}
];

const [status, setStatus] = useState(null);
useEffect(() => {
  const getUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('userId');
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

let url = `http://eximapi1.tranzol.com/api/VehicleExpenseBooking/ExpenseBookingReport?bookingDate=${selectedDate}`
if (status) {
  url += `&statusId=${status}`;
}
//console.log('status id',status)

 // console.log('List API URL:', url);
  // 🔹 Fetch List
  const fetchPendingList = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      console.log('Fetched List:', json);
      setList(json || []);
    } catch (e) {
      // Alert.alert('Error', e.message || 'Failed to fetch data');
      // console.log('Fetch error:', e);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedDate) return;
  const timer = setTimeout(() => {
    fetchPendingList();
  }, 400); 

  return () => clearTimeout(timer); 
}, [username, selectedDate, status]);

  // 🔍 Search Filter
const filteredList = useMemo(() => {
  if (!Array.isArray(list)) return [];

  if (!search?.trim()) return list;

  const keyword = search.toLowerCase();

  return list.filter(item =>
    item.vehicleNo?.toLowerCase().includes(keyword)
  );
}, [search, list]);


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


  // 📊 Grid Row
  const renderRow = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}>
      <Text style={styles.cellVehicle}>{item.vehicleNo}</Text>
      <Text style={styles.cell}>{item.expenseType}</Text>
      <Text style={styles.cell}>{item.bookingDate? item.bookingDate.split('T')[0] : ''}</Text>
      <Text style={styles.cellAmount}>₹ {item.requestAmount}</Text>
      <Text style={styles.cell}>{item.chequeNo || '-'}</Text>
      <Text style={styles.cell}>{item.paymentDate? item.paymentDate.split('T')[0] : '-'}</Text>
      <Text style={styles.cell}>{item.loadingPoints }</Text>
      <Text style={styles.cell}>{item.approveAmount }</Text>
      <Text style={styles.cell}>{item.statusType || '-'}</Text>
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
      source={require('../assets/arrow.png')}
      style={styles.backIcon}
      resizeMode="contain"
    />
  </TouchableOpacity>

  <Text style={styles.title}>
    📊 Vehicle Expense Report
  </Text>
</View>

      {/* 🔍 Search */}
<View style={styles.searchContainer}>
  <TextInput
    placeholder="Search Vehicle No..."
    value={search}
    onChangeText={setSearch}
    style={styles.searchInput}
    placeholderTextColor="#9CA3AF"
  />

  {/* Status Dropdown */}
  <View style={{ position: 'relative' }}>
 <Dropdown
  data={STATUS_OPTIONS}
  labelField="label"
  valueField="value"
  value={status}
  placeholder="Select Status"
  onChange={item => setStatus(item.value)}
  
 // mode="modal"                 // 🔥 KEY FIX
  dropdownPosition="auto"       // prevents clipping
  maxHeight={220}

  style={styles.dropdown}
  containerStyle={styles.dropdownContainer}
  selectedTextStyle={styles.selectedText}
  placeholderStyle={styles.placeholder}
  itemTextStyle={styles.itemText}
/>

  </View>

  {/* Date Picker */}
  <TouchableOpacity
    style={styles.dateBox}
    onPress={() => setShowDatePicker(true)}
  >
    <Text style={styles.dateText}>
      {selectedDate ? selectedDate : '📅 Date'}
    </Text>
  </TouchableOpacity>
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
        <ScrollView horizontal>
          <View style={{ width: 900, marginTop:20 }}>
            {/* Header */}
            <View style={styles.headerRow}>
              <Text style={styles.headerCellVehicle}>Vehicle No</Text>
              <Text style={styles.headerCell}>Expense Type</Text>
              <Text style={styles.headerCell}>booking Date</Text>
              <Text style={styles.headerCell}>Request Amount</Text>
              <Text style={styles.headerCell}>cheque No</Text>
              <Text style={styles.headerCell}>payment Date</Text>
              <Text style={styles.headerCell}>loading P.</Text>
              <Text style={styles.headerCell}>approve Amt.</Text>
              <Text style={styles.headerCell}>statusType</Text>
            </View>

            {/* Rows */}
            <FlashList
              data={filteredList}
              renderItem={renderRow}
              estimatedItemSize={50}
              keyExtractor={(item, index) =>
  `${item.vehicleNo}-${item.bookingDate}-${index}`
}

              ListEmptyComponent={
                <Text style={styles.empty}>No pending approvals</Text>
              }
            />
          </View>
        </ScrollView>
      )}

      {/* 🔲 Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Approve Expense</Text>

            {selectedItem && (
<>
  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>Vehicle</Text>
    <Text style={styles.detailValue}>{selectedItem.vehicleNo}</Text>
  </View>

  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>Expense Type</Text>
    <Text style={styles.detailValue}>{selectedItem.expenseType}</Text>
  </View>

  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>loadingPoints</Text>
    <Text style={styles.detailValue}>{selectedItem.loadingPoints}</Text>
  </View>

  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>Requested Amt</Text>
    <Text style={styles.detailValue}>₹ {selectedItem.requestAmount}</Text>
  </View>
<View style={styles.detailLine}>
    <Text style={styles.detailKey}>Cheque No</Text>
    <Text style={styles.detailValue}>{selectedItem.chequeNo || '-'}</Text>
  </View>
<View style={styles.detailLine}>
    <Text style={styles.detailKey}>Payment Date</Text>
    <Text style={styles.detailValue}>  {new Date(selectedItem.paymentDate).toLocaleString()}</Text>
  </View>

  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>ApproveAmount</Text>
    <Text style={styles.detailValue}>{selectedItem.approveAmount}</Text>
  </View>

  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>Booking Date</Text>
    <Text style={styles.detailValue}>
      {new Date(selectedItem.bookingDate).toLocaleString()}
    </Text>
  </View>

  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>StatusType</Text>
    <Text style={styles.detailValue}>{selectedItem.statusType || '-'}</Text>
  </View>
</>


            )}
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
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
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
    {/* CLOSE */}
    <TouchableOpacity
      style={styles.closeBtn}
      onPress={() => setImageModalVisible(false)}
    >
      <Text style={styles.closeText}>✕</Text>
    </TouchableOpacity>

    <ImageZoom
      cropWidth={width}
      cropHeight={height}
      imageWidth={width}
      imageHeight={height}
      enableCenterFocus={true}
      minScale={1}
      maxScale={4}
    >
      <Image
        source={{ uri: previewImage }}
        style={{ width, height }}
        resizeMode="contain"
      />
    </ImageZoom>
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
  headerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 14,
  backgroundColor: '#FFFFFF',
  borderBottomWidth: 1,
  borderBottomColor: '#E5E7EB',
  marginBottom: 6,
},

backBtn: {
  position: 'absolute',
  left: 12,
  padding: 8,
},

backIcon: {
  width: 22,
  height: 22,
  tintColor: '#111827',
},

title: {
  fontSize: 17,
  fontWeight: '600',
  color: '#111827',
  textAlign: 'center',
},
  search: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    paddingVertical: 10,
  },
  headerCell: {
    width: 160,
    color: '#fff',
    fontWeight: '700',
    paddingHorizontal: 10,
  },
  headerCellVehicle: {
    width: 140,
    color: '#fff',
    fontWeight: '700',
    paddingHorizontal: 10,
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
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  cell: {
    width: 160,
    paddingHorizontal: 10,
    color: '#374151',
  },
  cellVehicle: {
    width: 140,
    paddingHorizontal: 10,
    fontWeight: '600',
    color: '#111827',
  },
  cellAmount: {
    width: 160,
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
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



  cancelBtn: {
    marginTop: 18,
  },
  cancelText: {
    textAlign: 'center',
    color: '#EF4444',
    fontWeight: '600',
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
  borderRadius: 8,},

  dropdown: {
  height: 44,
  width:110,
  borderWidth: 1,
  borderColor: '#D1D5DB',
  borderRadius: 6,
  paddingHorizontal: 8,
},

dropdownContainer: {
  borderRadius: 8,
  elevation: 10,   // Android
  zIndex: 9999,    // iOS
},

selectedText: {
  fontSize: 14,
  color: '#111827',
},

itemText: {
  fontSize: 14,
  color: '#374151',
},

placeholder: {
  color: '#9CA3AF',
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

});

export default ExpenseReport;
