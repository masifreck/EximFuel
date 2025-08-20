import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,ActivityIndicator
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImageViewing from 'react-native-image-viewing';
import CustomCheckbox from '../components/CustomeCheckBox'; // Ensure this exists or adjust
import { darkBlue } from '../components/constant'; // Update according to your theme/colors
//import dummyDrivers from '../data/dummyDrivers'; // Dummy data file



const ManageVehicle = () => {
  const [search, setSearch] = useState('');
  const [selectedVehicle, setSelectedDriver] = useState(null);  
  const [modalVisible, setModalVisible] = useState(false);
  const [declare, setDeclare] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [vehicleList,setVehicleList]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
 const FetchVehicleData = async () => {
  setIsLoading(true);
    try {
      const response = await fetch('https://Exim.Tranzol.com/api/FetchDataApi/GetVehiclePendingApprove?search=');
      const data = await response.json();
      if (data?.Entities) {
        setVehicleList(data.Entities);
        console.log('Vehicle data fetched successfully:', data.Entities);
      } else {
        console.warn('Unexpected response format', data);
        setVehicleList([]);
      }
    } catch (error) {
      console.error('Error fetching driver data:', error);
      setVehicleList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchVehicleData();
  }, []);
  const imageList = [
    require('../assets/truckleft.png'),
    require('../assets/rcfrontnew.png'),
    require('../assets/driver.png'),
  ];

  const filteredDrivers = vehicleList.filter(
    item =>
      item.VehicleNo?item.VehicleNo.toLowerCase().includes(search.toLowerCase()) :'' ||
      item.EngineNo?item.EngineNo.toLowerCase().includes(search.toLowerCase()) :''
  );

  const openDetails = item => {
    setSelectedDriver(item);
    setModalVisible(true);
  };
  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />;
  }
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search by Vehicle No or Engine No"
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
      />

      {/* Table */}
      <ScrollView horizontal>
        <View>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell]}>Vehicle No</Text>
            <Text style={[styles.cell, styles.headerCell]}>Engine No.</Text>
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
                  <Text style={styles.cell}>{item.VehicleNo}</Text>
                  <Text style={styles.cell}>{item.EngineNo}</Text>
                  <Text
                    style={[
                      styles.cell,
                      { color: item.ApproveStatus === 'Approved' ? 'green' : 'orange' },
                    ]}
                  >
                    {item.ApproveStatus}
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
  ['Vehicle No', selectedVehicle.VehicleNo],
  ['RC No', selectedVehicle.EngineNo],
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
