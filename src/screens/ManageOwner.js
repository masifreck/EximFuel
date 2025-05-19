import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet, TouchableOpacity
} from 'react-native';
import { FlashList } from '@shopify/flash-list';

const dummyOwners = [
  {
    Id: null,
    Name: 'First Owner Name',
    PanNo: 'test01pan',
    DOB: '1995-06-30',
    Tds: 1,
    AdharNo: '123569',
    PMobileNo: '9648433287',
    SMobileNo: 'SecondaryNo',
    IFSC: 'IFSC',
    AccountNo: 'AccountNo',
    BankId: '1',
    Account: 3,
    Email: 'Email',
    Address: 'Address',
    Status: 'Pending',
  },
    {
    Id: null,
    Name: 'Second  Owner Name',
    PanNo: 'test02pan',
    DOB: '1995-06-30',
    Tds: 1,
    AdharNo: '123569',
    PMobileNo: '9648433287',
    SMobileNo: 'SecondaryNo',
    IFSC: 'IFSC',
    AccountNo: 'AccountNo',
    BankId: '1',
    Account: 3,
    Email: 'Email',
    Address: 'Address',
    Status: 'Pending',
  },
    {
    Id: null,
    Name: 'Update Owner',
    PanNo: 'test06pan',
    DOB: '1995-06-30',
    Tds: 1,
    AdharNo: '123569',
    PMobileNo: '9648433287',
    SMobileNo: 'SecondaryNo',
    IFSC: 'IFSC',
    AccountNo: 'AccountNo',
    BankId: '1',
    Account: 3,
    Email: 'Email',
    Address: 'Address',
    Status: 'Pending',
  },
  {
    Id: null,
    Name: 'Another Owner',
    PanNo: 'samplePAN2',
    DOB: '1993-04-10',
    Tds: 1,
    AdharNo: '654321',
    PMobileNo: '9998887770',
    SMobileNo: 'SecondaryNo2',
    IFSC: 'IFSC1234',
    AccountNo: '123456789',
    BankId: '2',
    Account: 2,
    Email: 'another@email.com',
    Address: 'Another Address',
    Status: 'Approved',
  },
];

const ManageOwner = () => {
  const [search, setSearch] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredOwners = dummyOwners.filter(
    item =>
      item.Name.toLowerCase().includes(search.toLowerCase()) ||
      item.PanNo.toLowerCase().includes(search.toLowerCase())
  );

  const openDetails = item => {
    setSelectedOwner(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by PAN or Owner Name"
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
      />

      <FlashList
        data={filteredOwners}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={150}
        renderItem={({ item }) => (
          <ScrollView horizontal style={styles.cardContainer}>
            <Pressable style={styles.card} onPress={() => openDetails(item)}>
              <Text style={styles.ownerName}>{item.Name}</Text>
              <Text style={styles.pan}>PAN: {item.PanNo}</Text>
              <Text style={styles.status}>
                Status:{" "}
                <Text
                  style={{
                    color: item.Status === 'Approved' ? 'green' : 'orange',
                  }}
                >
                  {item.Status}
                </Text>
              </Text>
            </Pressable>
          </ScrollView>
        )}
      />

      {/* Modal for Details */}
   <Modal
  visible={modalVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <ScrollView>
        {selectedOwner &&
          Object.entries(selectedOwner).map(([key, value]) => (
            <View key={key} style={styles.detailRow}>
              <Text style={styles.detailKey}>{key}</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))}

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          {/* Reject */}
          <TextInput placeholder="Reason for Rejection" style={styles.input} />
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#dc3545' }]}>
            <Text style={styles.btnText}>Reject</Text>
          </TouchableOpacity>

          {/* Approve */}
          <TextInput placeholder="Note for Approval" style={styles.input} />
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#28a745' }]}>
            <Text style={styles.btnText}>Approve</Text>
          </TouchableOpacity>

          {/* Return */}
          <TextInput placeholder="Reason for Return" style={styles.input} />
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#ffc107' }]}>
            <Text style={styles.btnText}>Return</Text>
          </TouchableOpacity>
        </View>

        {/* Close */}
        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.closeText}>Close</Text>
        </Pressable>
      </ScrollView>
    </View>
  </View>
</Modal>

    </View>
  );
};

export default ManageOwner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 55,
    borderColor: '#a8dadc',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor:'#edf6f9'
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    width: 300,
    elevation:4,marginHorizontal:10,margin:5,
    backgroundColor:'#f5ebe0'
  },
  ownerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#0d1b2a'
  },
  pan: {
    fontSize: 14,
    marginTop: 5,
    color:'#0d1b2a'
  },
  status: {
    marginTop: 5,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '90%',
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
  detailRow: {
  flexDirection: 'row',
  marginBottom: 8,
  alignItems: 'center',
},
detailKey: {
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'left',
  color: '#333',
  width:100
},
detailValue: {
  flex: 2,
  fontSize: 16,
  textAlign: 'center',
  color: '#555',
  textAlign:'left'
},
actionContainer: {
  marginTop: 20,
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 8,
  marginBottom: 10,
},
actionBtn: {
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 15,
},
btnText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

});
