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
import CustomCheckbox from '../components/CustomeCheckBox'; // Ensure this exists or adjust
import { darkBlue } from '../components/constant'; // Update according to your theme/colors
//import dummyDrivers from '../data/dummyDrivers'; // Dummy data file
const dummyVehicleDetails = [
  {
    Id: 1,
    vehicleNo: "MH12AB1234",
    rcNo: "RC987654321",
    chasisNo: "CHS123456789",
    statePermitNo: "SPMH001122",
    ownerName: "Rahul Sharma",
    ownerFatherName: "Mahesh Sharma",
    ownerAddress: "123 MG Road, Pune",
    createdBy: "Admin",
    mobile: "9876543210",
    model: "Tata Ace",
    color: "White",
    manufacturingMonthYear: "March-2021",
    registrationDate: "2021-03-15",
    insuranceValidTill: "2025-03-14",
    CreatedBy: 'employee2',
    Status:'Approved'
  },
  {
    Id: 2,
    vehicleNo: "DL04CD5678",
    rcNo: "RC123456789",
    chasisNo: "CHS234567890",
    statePermitNo: "SPDL334455",
    ownerName: "Priya Mehta",
    ownerFatherName: "Ramesh Mehta",
    ownerAddress: "56 Green Park, Delhi",
    createdBy: "User1",
    mobile: "9812345678",
    model: "Mahindra Bolero",
    color: "Silver",
    manufacturingMonthYear: "June-2022",
    registrationDate: "2022-06-20",
    insuranceValidTill: "2026-06-19",
    Status: 'Pending',
    CreatedBy: 'admin',
  },
  {
    Id: 3,
    vehicleNo: "KA05EF9101",
    rcNo: "RC456789123",
    chasisNo: "CHS345678901",
    statePermitNo: "SPKA778899",
    ownerName: "Suresh Kumar",
    ownerFatherName: "Vijay Kumar",
    ownerAddress: "9 Residency Road, Bangalore",
    createdBy: "Supervisor",
    mobile: "9900112233",
    model: "Ashok Leyland Dost",
    color: "Blue",
    manufacturingMonthYear: "January-2020",
    registrationDate: "2020-01-10",
    insuranceValidTill: "2024-01-09",
    Status: 'Pending',
    CreatedBy: 'admin',
  },
  {
    Id: 4,
    vehicleNo: "TN07GH1122",
    rcNo: "RC321654987",
    chasisNo: "CHS456789012",
    statePermitNo: "SPTN991122",
    ownerName: "Meena Iyer",
    ownerFatherName: "Sundar Iyer",
    ownerAddress: "22 T Nagar, Chennai",
    createdBy: "Admin",
    mobile: "9876001122",
    model: "Eicher Pro 2049",
    color: "Red",
    manufacturingMonthYear: "August-2019",
    registrationDate: "2019-08-25",
    insuranceValidTill: "2023-08-24",
    Status: 'Pending',
    CreatedBy: 'admin',
  },
  {
    Id: 5,
    vehicleNo: "GJ01JK3344",
    rcNo: "RC112233445",
    chasisNo: "CHS567890123",
    statePermitNo: "SPGJ556677",
    ownerName: "Anil Patel",
    ownerFatherName: "Kiran Patel",
    ownerAddress: "88 Ring Road, Ahmedabad",
    createdBy: "User2",
    mobile: "9090909090",
    model: "Force Traveller",
    color: "Yellow",
    manufacturingMonthYear: "January-2023",
    registrationDate: "2023-01-01",
    insuranceValidTill: "2027-12-31",
    Status: 'Pending',
    CreatedBy: 'employee1',
  }
];


const ManageVehicle = () => {
  const [search, setSearch] = useState('');
  const [selectedVehicle, setSelectedDriver] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [declare, setDeclare] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageList = [
    require('../assets/truckleft.png'),
    require('../assets/rcfront.png'),
    require('../assets/driver.png'),
  ];

  const filteredDrivers = dummyVehicleDetails.filter(
    item =>
      item.vehicleNo?item.vehicleNo.toLowerCase().includes(search.toLowerCase()) :'' ||
      item.rcNo?item.rcNo.toLowerCase().includes(search.toLowerCase()) :''
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
            <Text style={[styles.cell, styles.headerCell]}>Vehicle No</Text>
            <Text style={[styles.cell, styles.headerCell]}>RC No.</Text>
            <Text style={[styles.cell, styles.headerCell]}>Status</Text>
             <Text style={[styles.cell, styles.headerCell]}>Created By</Text>
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
                  <Text style={styles.cell}>{item.vehicleNo}</Text>
                  <Text style={styles.cell}>{item.rcNo}</Text>
                  <Text
                    style={[
                      styles.cell,
                      { color: item.Status === 'Approved' ? 'green' : 'orange' },
                    ]}
                  >
                    {item.Status}
                  </Text>
                   <Text style={styles.cell}>{item.CreatedBy}</Text>
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
              {selectedVehicle && (
                <>
              {[
  ['ID', selectedVehicle.Id],
  ['Vehicle No', selectedVehicle.vehicleNo],
  ['RC No', selectedVehicle.rcNo],
  ['Chassis No.', selectedVehicle.chasisNo],
  ['State Permit No', selectedVehicle.statePermitNo],
  ['Owner Name', selectedVehicle.ownerName],
  ['Owner\'s Father', selectedVehicle.ownerFatherName],
  ['Owner\'s Address', selectedVehicle.ownerAddress],
  ['Model', selectedVehicle.model],
  ['Color', selectedVehicle.color],
  ['Mfg. Month/Year', selectedVehicle.manufacturingMonthYear],
  ['Registration Date', selectedVehicle.registrationDate],
  ['Insurance Validity', selectedVehicle.insuranceValidTill],
  ['Status', selectedVehicle.Status],
  ['Created By', selectedVehicle.CreatedBy],
].map(([label, value]) => (
  <View key={`${label}-${value}`} style={styles.detailRow}>
    <Text style={styles.detailKey}>{label}</Text>
    <Text style={styles.detailValue}>{value || 'N/A'}</Text>
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
                        label="I hereby confirm that all required documents have been properly verified and the appropriate options have been duly selected."
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

export default ManageVehicle;

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
    fontSize:12 
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
