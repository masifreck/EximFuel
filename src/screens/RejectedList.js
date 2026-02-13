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
  ScrollView,Image,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const SUBMIT_API =
  'http://eximapi1.tranzol.com/api/VehicleExpenseBooking/Approve';

const RejectedList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [approveAmount, setApproveAmount] = useState('');
  const [approveRemarks, setApproveRemarks] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const [imageModalVisible, setImageModalVisible] = useState(false);
const [previewImage, setPreviewImage] = useState('');
const [username, setUsername] = useState('');
const [isAdmin, setIsAdmin] = useState(false);
const [selectedDate, setSelectedDate] = useState(null);
const [showDatePicker, setShowDatePicker] = useState(false);

useEffect(() => {
  const getUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('userId');
       const admin = await AsyncStorage.getItem('isAdmin');
       console.log('Admin Status:', admin);
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

let url = isAdmin
  ? `http://eximapi1.tranzol.com/api/VehicleExpenseBooking/PendingApprovalList?statusId=5`
  : `http://eximapi1.tranzol.com/api/VehicleExpenseBooking/PendingApprovalList?userId=${username}&statusId=5`;

if (selectedDate) {
  url += `&bookingDate=${selectedDate}`;
}

  //console.log('List API URL:', url);
  // 🔹 Fetch List
  const fetchPendingList = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      //console.log('Fetched List:', json);
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
const handleSubmit = async (statusId) => {
  if (!approveAmount) {
    Alert.alert('Validation', 'Please enter approve amount');
    return;
  }

  if (!statusId) {
    Alert.alert('Validation', 'Invalid action');
    return;
  }

  if (!username) {
    Alert.alert('Error', 'User not identified. Please login again.');
    return;
  }

  const payload = {
    id: selectedItem.id,
    statusId,
    userId: Number(username),
    approveAmount: Number(approveAmount),
    approveRemarks: approveRemarks?.trim() || '',
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

   // console.log('HTTP Status:', res.status);
    //console.log('Server Message:', responseText);

    if (res.ok) {
      Alert.alert(
        'Success',
        responseText || 'Approve Successfully'
      );

      setModalVisible(false);
      setApproveAmount('');
      setApproveRemarks('');
      fetchPendingList();
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
      <Text style={styles.cell}>{item.location}</Text>
      <Text style={styles.cellAmount}>₹ {item.requestAmount}</Text>
      <Text style={styles.cell}>{item.createdBy }</Text>
      <Text style={styles.cell}>{item.approver }</Text>
      <Text style={styles.cell}>{item.remarks || '-'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Rejected Expense Approvals</Text>

      {/* 🔍 Search */}
      <View style={styles.searchContainer}>
  <TextInput
    placeholder="Search by Vehicle No"
    value={search}
    onChangeText={setSearch}
    style={styles.searchInput}
    placeholderTextColor="#9CA3AF"
  />

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
              <Text style={styles.headerCell}>Location</Text>
              <Text style={styles.headerCell}>Request Amount</Text>
              <Text style={styles.headerCell}>Created By</Text>
              <Text style={styles.headerCell}>approver</Text>
              <Text style={styles.headerCell}>Remarks</Text>
            </View>

            {/* Rows */}
            <FlashList
              data={filteredList}
              renderItem={renderRow}
              estimatedItemSize={50}
              keyExtractor={item => item.id.toString()}
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
    <Text style={styles.detailKey}>Location</Text>
    <Text style={styles.detailValue}>{selectedItem.location}</Text>
  </View>

  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>Requested Amt</Text>
    <Text style={styles.detailValue}>₹ {selectedItem.requestAmount}</Text>
  </View>

  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>Created By</Text>
    <Text style={styles.detailValue}>{selectedItem.createdBy}</Text>
  </View>

  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>Approver</Text>
    <Text style={styles.detailValue}>{selectedItem.approver}</Text>
  </View>

  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>Created On</Text>
    <Text style={styles.detailValue}>
      {new Date(selectedItem.createdOn).toLocaleString()}
    </Text>
  </View>

  <View style={styles.detailLine}>
    <Text style={styles.detailKey}>Remarks</Text>
    <Text style={styles.detailValue}>{selectedItem.remarks || '-'}</Text>
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



            <TextInput
              placeholder="Approve Amount"
              keyboardType="numeric"
              value={approveAmount}
              onChangeText={setApproveAmount}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />

            <TextInput
              placeholder="Approve Remarks"
              value={approveRemarks}
              onChangeText={setApproveRemarks}
              style={[styles.input, { height: 80 }]}
              multiline
                placeholderTextColor="#9CA3AF"
            />

           {submitLoading ? (
  <ActivityIndicator size="small" color="#2563EB" />
) : (
  <View style={styles.actionRow}>
    {/* APPROVE */}
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={() => handleSubmit(4)}
    >
      <Text style={styles.submitText}>Approve</Text>
    </TouchableOpacity>

    {/* REJECT */}
    <TouchableOpacity
      style={styles.rejectBtn}
      onPress={() => handleSubmit(5)}
    >
      <Text style={styles.rejectText}>Reject</Text>
    </TouchableOpacity>
  </View>
)}


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

  input: {
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

});

export default RejectedList;
