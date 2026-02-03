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
  ScrollView,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';

const LIST_API =
  'http://eximapi1.tranzol.com/api/VehicleExpenseBooking/PendingApprovalList';

const SUBMIT_API =
  'http://eximapi1.tranzol.com/api/VehicleExpenseBooking/Approve';

const PendingApprovalScreen = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [approveAmount, setApproveAmount] = useState('');
  const [approveRemarks, setApproveRemarks] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  // 🔹 Fetch List
  const fetchPendingList = async () => {
    try {
      setLoading(true);
      const res = await fetch(LIST_API);
      const json = await res.json();
      setList(json || []);
    } catch (e) {
      Alert.alert('Error', 'Failed to load pending approvals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingList();
  }, []);

  // 🔍 Search Filter
  const filteredList = useMemo(() => {
    if (!search) return list;
    return list.filter(item =>
      item.vehicleNo?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, list]);

  // 📤 Submit Approval (PLAIN TEXT RESPONSE)
const handleSubmit = async () => {
  if (!approveAmount) {
    Alert.alert('Validation', 'Please enter approve amount');
    return;
  }

  const payload = {
    id: selectedItem.id,
    statusId: 4,
    approveAmount: Number(approveAmount),
    approveRemarks: approveRemarks,
  };

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

    console.log('Status Code:', res.status);

    // ✅ Read response safely
    let responseText = '';
    try {
      const blob = await res.blob();
      responseText = await blob.text();
    } catch {
      responseText = '';
    }

    console.log('Approve API Response:', responseText);

    if (res.ok) {
      Alert.alert(
        'Success',
        responseText?.trim() || 'Approve Successfully',
      );
      setModalVisible(false);
      setApproveAmount('');
      setApproveRemarks('');
      fetchPendingList();
    } else {
      Alert.alert(
        'Server Error',
        responseText?.trim() || 'Approval failed',
      );
    }
  } catch (error) {
    console.log('Approve API Error:', error);
    Alert.alert('Error', 'Network or server error');
  } finally {
    setSubmitLoading(false);
  }
};



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
      <Text style={styles.cell}>{item.remarks || '-'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Pending Expense Approvals</Text>

      {/* 🔍 Search */}
      <TextInput
        placeholder="Search by Vehicle No"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        placeholderTextColor="#9CA3AF"
      />

      {/* 📊 Grid */}
      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView horizontal>
          <View style={{ width: 900 }}>
            {/* Header */}
            <View style={styles.headerRow}>
              <Text style={styles.headerCellVehicle}>Vehicle No</Text>
              <Text style={styles.headerCell}>Expense Type</Text>
              <Text style={styles.headerCell}>Location</Text>
              <Text style={styles.headerCell}>Request Amount</Text>
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
                <Text style={styles.modalText}>
                  Vehicle: {selectedItem.vehicleNo}
                </Text>
                <Text style={styles.modalText}>
                  Expense Type: {selectedItem.expenseType}
                </Text>
                <Text style={styles.modalText}>
                  Location: {selectedItem.location}
                </Text>

                <Text style={styles.modalText}>
                  Requested Amount: ₹ {selectedItem.requestAmount}
                </Text>
<Text style={styles.modalText}>
                  Remarks: {selectedItem.remarks || '-'}
                </Text>
              </>
            )}

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
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
  cancelBtn: {
    marginTop: 12,
  },
  cancelText: {
    textAlign: 'center',
    color: '#EF4444',
    fontWeight: '600',
  },
});

export default PendingApprovalScreen;
