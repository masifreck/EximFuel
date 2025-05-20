import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet, TouchableOpacity,
  Image
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { darkBlue, textColor } from '../components/constant';
import CustomCheckbox from '../components/CustomeCheckBox';
import ImageViewing from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/FontAwesome'; 
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
    isPCVerified:true,
     isSCVerified:false
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
     isPCVerified:true,
      isSCVerified:false
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
     isPCVerified:false,
      isSCVerified:true
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
     isPCVerified:true,
     isSCVerified:true
  },
];

const ManageOwner = () => {
  const [search, setSearch] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [declare,setDeclayer]=useState(false)
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const imageList = [
  require('../assets/adhar_BACK.png'),
  require('../assets/delivery-truck.png'),
  require('../assets/frontphoto.png'),
];


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
    {/* Search Bar */}
    <TextInput
      placeholder="Search by PAN or Owner Name"
      style={styles.searchBar}
      value={search}
      onChangeText={setSearch}
    />

    {/* Horizontal Scrollable Table */}
    <ScrollView horizontal>
      <View>
        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>Name</Text>
          <Text style={[styles.cell, styles.headerCell]}>PAN</Text>
          <Text style={[styles.cell, styles.headerCell]}>Status</Text>
        </View>

        {/* FlashList for Rows */}
     <FlashList
  data={filteredOwners}
  keyExtractor={(item, index) => index.toString()}
  estimatedItemSize={50}
  renderItem={({ item, index }) => ( // include index here
    <Pressable onPress={() => openDetails(item)}>
      <View style={[
        styles.row,
        { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }, // now index is defined
      ]}>
        <Text style={styles.cell}>{item.Name}</Text>
        <Text style={styles.cell}>{item.PanNo}</Text>
        <Text
          style={[
            styles.cell,
            { color: item.Status === 'Approved' ? 'green' : 'orange' },
          ]}
        >
          {item.Status}
        </Text>
      </View>
    </Pressable>
  )}
/>

      </View>
    </ScrollView>

    {/* Modal for Details */}
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <Image source={require('../assets/closepng.png')} style={{ width: 50, height: 50 }} />
        </Pressable>

        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
{selectedOwner && (
  <>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Id</Text>
      <Text style={styles.detailValue}>{selectedOwner.Id}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Name</Text>
      <Text style={styles.detailValue}>{selectedOwner.Name}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Pan No</Text>
      <Text style={styles.detailValue}>{selectedOwner.PanNo}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>DOB</Text>
      <Text style={styles.detailValue}>{selectedOwner.DOB}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>TDS</Text>
      <Text style={styles.detailValue}>{selectedOwner.Tds}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Adhar No</Text>
      <Text style={styles.detailValue}>{selectedOwner.AdharNo}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>P. Mobile No</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' ,flex:2}}>
        <Text style={styles.detailValue}>{selectedOwner.PMobileNo} </Text>
        <Icon
          name={selectedOwner.isPCVerified ? 'check-circle' : 'times-circle'}
          size={18}
          color={selectedOwner.isPCVerified ? 'green' : 'red'}
        />
      </View>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>S.Mobile No</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' ,flex:2}}>
        <Text style={styles.detailValue}>{selectedOwner.SMobileNo} </Text>
        <Icon
          name={selectedOwner.isSCVerified ? 'check-circle' : 'times-circle'}
          size={18}
          color={selectedOwner.isSCVerified ? 'green' : 'red'}
        />
      </View>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>IFSC</Text>
      <Text style={styles.detailValue}>{selectedOwner.IFSC}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Account No</Text>
      <Text style={styles.detailValue}>{selectedOwner.AccountNo}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Bank ID</Text>
      <Text style={styles.detailValue}>{selectedOwner.BankId}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Account</Text>
      <Text style={styles.detailValue}>{selectedOwner.Account}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Email</Text>
      <Text style={styles.detailValue}>{selectedOwner.Email}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Address</Text>
      <Text style={styles.detailValue}>{selectedOwner.Address}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Status</Text>
      <Text style={styles.detailValue}>{selectedOwner.Status}</Text>
    </View>
  </>
)}
<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
  <TouchableOpacity onPress={() => {
    setCurrentImageIndex(0);
    setImageViewerVisible(true);
  }}>
    <Image
      source={require('../assets/adhar_BACK.png')}
      style={{ width: 70, height: 70, borderRadius: 10 }}
      resizeMode="cover"
    />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => {
    setCurrentImageIndex(1);
    setImageViewerVisible(true);
  }}>
    <Image
      source={require('../assets/delivery-truck.png')}
      style={{ width: 70, height: 70, borderRadius: 10 }}
      resizeMode="cover"
    />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => {
    setCurrentImageIndex(2);
    setImageViewerVisible(true);
  }}>
    <Image
      source={require('../assets/frontphoto.png')}
      style={{ width: 70, height: 70, borderRadius: 10 }}
      resizeMode="cover"
    />
  </TouchableOpacity>
</View>

            {/* Action Buttons */}
            
            <View style={styles.actionContainer}>
              <TextInput
                multiline
                placeholder="Reason / Remark"
                style={styles.input}
              />
            <View style={{marginBottom:10}}>
               <CustomCheckbox label="I hereby confirm that all required documents have been properly verified and the appropriate options have been duly selected." value={declare} onChange={(value) => setDeclayer(value ? true : false)} />
                </View>
              <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#dc3545' }]}>
                  <Text style={styles.btnText}>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#28a745' }]}>
                  <Text style={styles.btnText}>Approve</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#ffc107' }]}>
                  <Text style={styles.btnText}>Return</Text>
                </TouchableOpacity>
              </View>
            </View>
      
          </ScrollView>
        </View>
  

      </View>
      <ImageViewing
  images={imageList}
  imageIndex={currentImageIndex}
  visible={imageViewerVisible}
  onRequestClose={() => setImageViewerVisible(false)}
/>

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
    borderWidth: 1,
    borderColor: darkBlue,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    elevation:4,
    backgroundColor:'#edf2f4'
  },
  
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: darkBlue,
    borderBottomWidth: 2,
    borderRadius:10,
  },
  cell: {
    width: 120,
    paddingHorizontal: 10,
    color:'#023047'
  },
  headerCell: {
    fontWeight: 'bold',
    color:'white'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  detailKey: {
    fontWeight: 'bold',
    flex: 1,
    color:textColor
  },
  detailValue: {
    flex: 2,
    textAlign: 'left',
    color:textColor
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  actionContainer: {
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

