import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImageViewing from 'react-native-image-viewing';
import CustomCheckbox from './CustomCheckbox'; // Ensure this exists or adjust
import { darkBlue } from '../constants/theme'; // Update according to your theme/colors
import dummyDrivers from '../data/dummyDrivers'; // Dummy data file
const driverList = [
  {
    Id: 64,
    DLNumber: '00009',
    DriverName: 'new 64 test update',
    AdharNo: 'AdharNo',
    Dob: '2024-02-01T00:00:00',
    PanNo: 'PanNo',
    DriverEmail: 'DriverEmail',
    InserUserId: null,
    UpdateUserId: null,
    InsertDate: null,
    UpdateDate: null,
    PrimaryContactNo: '12369',
    SecondaryContactNo: 'SecondaryContactNo',
    DriverAddress: 'DriverAddress',
    Status: 'Pending',
    isPCVerified: false,
    isSCVerified: true,
    CreatedBy: 'admin',
  },
  {
    Id: 65,
    DLNumber: '00010',
    DriverName: 'Ravi Sharma',
    AdharNo: 'AADHAR456',
    Dob: '1990-08-12T00:00:00',
    PanNo: 'PAN456',
    DriverEmail: 'ravi@example.com',
    InserUserId: null,
    UpdateUserId: null,
    InsertDate: null,
    UpdateDate: null,
    PrimaryContactNo: '9876543210',
    SecondaryContactNo: '9123456789',
    DriverAddress: 'Sector 45, Gurgaon',
    Status: 'Approved',
    isPCVerified: true,
    isSCVerified: true,
    CreatedBy: 'admin',
  },
  {
    Id: 66,
    DLNumber: '00011',
    DriverName: 'Sita Verma',
    AdharNo: 'AADHAR789',
    Dob: '1985-02-20T00:00:00',
    PanNo: 'PAN789',
    DriverEmail: 'sita@example.com',
    InserUserId: null,
    UpdateUserId: null,
    InsertDate: null,
    UpdateDate: null,
    PrimaryContactNo: '7564839201',
    SecondaryContactNo: 'Not Provided',
    DriverAddress: 'MG Road, Bangalore',
    Status: 'Rejected',
    isPCVerified: true,
    isSCVerified: false,
    CreatedBy: 'superadmin',
  },
  {
    Id: 67,
    DLNumber: '00012',
    DriverName: 'Karan Patel',
    AdharNo: 'AADHAR999',
    Dob: '1993-11-03T00:00:00',
    PanNo: 'PAN999',
    DriverEmail: 'karan@example.com',
    InserUserId: null,
    UpdateUserId: null,
    InsertDate: null,
    UpdateDate: null,
    PrimaryContactNo: '9876541230',
    SecondaryContactNo: '9123451234',
    DriverAddress: 'Ahmedabad, Gujarat',
    Status: 'Pending',
    isPCVerified: false,
    isSCVerified: false,
    CreatedBy: 'admin',
  },
];

const ManageDriver = () => {
  const [search, setSearch] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [declare, setDeclare] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageList = [
    require('../assets/license_front.png'),
    require('../assets/license_back.png'),
    require('../assets/driver_photo.png'),
  ];

  const filteredDrivers = dummyDrivers.filter(
    item =>
      item.Name.toLowerCase().includes(search.toLowerCase()) ||
      item.LicenseNo.toLowerCase().includes(search.toLowerCase())
  );

  const openDetails = item => {
    setSelectedDriver(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search by License No or Driver Name"
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
      />

      {/* Table */}
      <ScrollView horizontal>
        <View>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell]}>Name</Text>
            <Text style={[styles.cell, styles.headerCell]}>License No</Text>
            <Text style={[styles.cell, styles.headerCell]}>Status</Text>
          </View>

          <FlashList
            data={filteredDrivers}
            keyExtractor={(item, index) => index.toString()}
            estimatedItemSize={50}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => openDetails(item)}>
                <View
                  style={[
                    styles.row,
                    { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' },
                  ]}
                >
                  <Text style={styles.cell}>{item.Name}</Text>
                  <Text style={styles.cell}>{item.LicenseNo}</Text>
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

      {/* Modal */}
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
              {selectedDriver && (
                <>
                  {[
                    ['Id', selectedDriver.Id],
                    ['Name', selectedDriver.Name],
                    ['License No', selectedDriver.LicenseNo],
                    ['DOB', selectedDriver.DOB],
                    ['Mobile', selectedDriver.Mobile],
                    ['Email', selectedDriver.Email],
                    ['Address', selectedDriver.Address],
                    ['Status', selectedDriver.Status],
                  ].map(([label, value]) => (
                    <View key={label} style={styles.detailRow}>
                      <Text style={styles.detailKey}>{label}</Text>
                      <Text style={styles.detailValue}>{value}</Text>
                    </View>
                  ))}

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
                    {imageList.map((img, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => {
                          setCurrentImageIndex(idx);
                          setImageViewerVisible(true);
                        }}
                      >
                        <Image
                          source={img}
                          style={{ width: 70, height: 70, borderRadius: 10 }}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.actionContainer}>
                    <TextInput multiline placeholder="Reason / Remark" style={styles.input} />

                    <View style={{ marginBottom: 10 }}>
                      <CustomCheckbox
                        label="I confirm the driver documents are verified."
                        value={declare}
                        onChange={(val) => setDeclare(val)}
                      />
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
                </>
              )}
            </ScrollView>
          </View>
          <ImageViewing
            images={imageList}
            imageIndex={currentImageIndex}
            visible={imageViewerVisible}
            onRequestClose={() => setImageViewerVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ManageDriver;

// Styles (copy the same from ManageOwner with optional tweaks)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchBar: {
    borderWidth: 1,
    borderColor: darkBlue,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    elevation: 4,
    backgroundColor: '#edf2f4',
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
    borderRadius: 10,
  },
  cell: {
    width: 120,
    paddingHorizontal: 10,
    color: '#023047',
  },
  headerCell: {
    fontWeight: 'bold',
    color: 'white',
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
    marginBottom: 10,
  },
  detailKey: {
    fontWeight: 'bold',
    color: '#000',
  },
  detailValue: {
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  actionContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
