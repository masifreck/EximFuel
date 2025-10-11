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
  StyleSheet,ActivityIndicator,Alert
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImageViewing from 'react-native-image-viewing';
import CustomCheckbox from '../components/CustomeCheckBox'; // Ensure this exists or adjust
import { darkBlue } from '../components/constant'; // Update according to your theme/colors
import AsyncStorage from '@react-native-async-storage/async-storage';
import { te } from 'date-fns/locale';



const ManageVehicle = () => {
    const [apiTokenReceived, setapiTokenReceived] = useState();
  AsyncStorage.getItem('Token')
    .then(token => {
      setapiTokenReceived(token);
    })
    .catch(error => {
      const TokenReceived = useApiToken();
      setapiTokenReceived(TokenReceived);
    });
  const [search, setSearch] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const [declare, setDeclare] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [vehicleList,setVehicleList]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData,setVehicleData]=useState([]);
const [singleLoader,setSingleLoader]=useState(false);
const [statusRemarks,setstatusRemarks]=useState('')
const [loading, setLoading] = useState(false);
   const FetchSingleVehicle = async(id)=>{
  setSingleLoader(true)
  try {
    const response =await fetch(`https://Exim.Tranzol.com/api/FetchDataApi/GetAppVehicleById?id=${id}`,
      {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${apiTokenReceived}`,
            },
          });
    const data =await response.json();
   console.log('Single vehicle Data:', data);
    if(data?.vehicle){
      setVehicleData(data.vehicle)  
      
    }else{
      Alert.alert("No Data Found")
    }
  
  }catch(error){
    console.error('Error fetching single owner data:', error);
    Alert.alert("Error fetching data")  
  
    }finally{
      setSingleLoader(false)
    }
  }
 const FetchVehicleData = async (search) => {
  setIsLoading(true);
    try {
      const response = await fetch(`https://Exim.Tranzol.com/api/FetchDataApi/GetVehiclePendingApprove?search=${search}`);
      const data = await response.json();
      if (data?.Entities) {
        setVehicleList(data.Entities);
      //  console.log('Vehicle data fetched successfully:', data.Entities);
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
    const handler=setTimeout(()=>{
    FetchVehicleData( search || '');
    },700)
    return()=>clearTimeout(handler)
  }, [search]);
  const imageList = [
    require('../assets/truckleft.png'),
    require('../assets/rcfrontnew.png'),
    require('../assets/driver.png'),
  ];

  const openDetails = item => {
FetchSingleVehicle(item.Id)
    setModalVisible(true);
  };
    const approveVehicle = async (approveStatus,id, statusRemarks) => {
      if( !approveStatus || !statusRemarks){
        Alert.alert( 'Error',"Please fill all the fields")
        return;
  
      }
      if(!declare){
        Alert.alert("Please confirm the declaration")
        return;
      }
     console.log('Approving owner with ID:', id, 'Status:', approveStatus, 'Remarks:', statusRemarks);
      setLoading(true);
      try {
        const response = await fetch('https://Exim.Tranzol.com/api/VehicleApi/ApprovalVehicle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Id: id,
            ApproveStatus: approveStatus,
            StatusRemarks: statusRemarks,
          }),
        });

        const data = await response.json();
  
        if (response.ok && data?.apiResult?.StatusCode === 0) {
          Alert.alert('Success',`${data.apiResult?.Result || 'Vehicle approved successfully.'}`);
         setVehicleData([]);
          setModalVisible(false);
          setstatusRemarks('')
        
          setSearch('')
          
        } else {
         Alert.alert('Error', data?.apiResult?.Result || 'Failed to approve Vehicle.');
         console.error('API Error:', data);
        }
      } catch (error) {
        console.error('Error approving Vehicle:', error);
        Alert.alert('Error', 'An error occurred while approving the Vehicle.');
      } finally {
        setLoading(false);
      }
    };
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search by Vehicle No"
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
        autoCapitalize='characters'
      />

      {isLoading? (
        <ActivityIndicator size={"Large"} color={darkBlue} />
      ) : (
   
      <ScrollView horizontal>
        <View>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell,{paddingLeft:10}]}>Vehicle No</Text>
            <Text style={[styles.cell, styles.headerCell]}>Engine No.</Text>
            <Text style={[styles.cell, styles.headerCell]}>Status</Text>
             <Text style={[styles.cell, styles.headerCell]}>Created By</Text>
          </View>

          <FlashList
            data={vehicleList}
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
                  <Text style={[styles.cell,{paddingLeft:10}]}>{item.VehicleNo}</Text>
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
   )}
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
              {vehicleData && (
                <>
              {[
  ['ID', vehicleData.Id],
  ['Vehicle No', vehicleData.VehicleNo],
  ['RC No', vehicleData.EngineNo],
  ['Chassis No.', vehicleData.ChassicNo],
  ['State Permit No', vehicleData.statePermitNo],
  ['Owner Name', vehicleData.OwnerName],
  ['Pollution No', vehicleData.PollutionNo],
  ['Fitness No', vehicleData.FitnessNo],
  ['Road Tax No', vehicleData.RoadTaxNo],
  ['State Permit No', vehicleData.StatePermitNo],
  ['Mfg. Month/Year', vehicleData.manufacturingMonthYear],
  ['Vehicle Tyre', vehicleData.VehicleTyre],
  ['Insurance Validity', vehicleData.insuranceValidTill],
].map(([label, value]) => (
  <View key={`${label}-${value}`} style={styles.detailRow}>
    <Text style={styles.detailKey}>{label}</Text>
    <Text style={styles.detailValue}>{value || ' '}</Text>
  </View>
))}

                  {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
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
                  </View> */}

                  <View style={styles.actionContainer}>
                    <TextInput multiline placeholder="Reason / Remark" style={styles.input}
                    value={statusRemarks}
                    onChangeText={(text)=>setstatusRemarks(text)}
                    />

                    <View style={{ marginBottom: 10 }}>
                      <CustomCheckbox
                        label="I hereby confirm that all required documents have been properly verified and the appropriate options have been duly selected."
                        value={declare}
                        onChange={(val) => setDeclare(val)}
                      />
                    </View>
    {loading? (
                <ActivityIndicator size="large" color={darkBlue} style={{ marginVertical: 10 }} />
              ) : (
             <>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#dc3545' }]}
                         disabled={loading}
          onPress={() => approveVehicle(2,vehicleData.Id, statusRemarks)}
                      >
                        <Text style={styles.btnText}>Reject</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#28a745' }]}
                         disabled={loading}
          onPress={() => approveVehicle(4,vehicleData.Id, statusRemarks)}
                      >
                        <Text style={styles.btnText}>Approve</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#ffc107' }]}
                         disabled={loading}
          onPress={() => approveVehicle(0,vehicleData.Id, statusRemarks)}
                      >
                        <Text style={styles.btnText}>Return</Text>
                      </TouchableOpacity>
                    </View>
                    </>
              )}
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
    paddingHorizontal: 2,
    color: '#023047',
    fontSize:13, 
    paddingVertical:5
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
