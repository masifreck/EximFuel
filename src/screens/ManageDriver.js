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
import { darkBlue, textColor } from '../components/constant'; // Update according to your theme/colors
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageDriver = () => {
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
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [declare, setDeclare] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [isLoading,setIsLoading]=useState(false);
const [driverList, setDriverList] = useState([]); 
const [driverData,setDriverData]=useState([]);
const [singleLoader,setSingleLoader]=useState(false);
  const imageList = [
    require('../assets/dlpng.webp'),
    require('../assets/aadhaar.png'),
    require('../assets/driver.png'),
  ];
    const FetchSingleDriver = async(id)=>{
  setSingleLoader(true)
  try {
    const response =await fetch(`https://Exim.Tranzol.com/api/FetchDataApi/GetAppDriverById?id=${id}`,
      {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${apiTokenReceived}`,
            },
          });
    const data =await response.json();
    //console.log('Single driver Data:', data);
    if(data?.driver){
      setDriverData(data.driver)  
      
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
 const FetchDriverData = async (search) => {
  setIsLoading(true);
    try {
      const response = await fetch(`https://Exim.Tranzol.com/api/FetchDataApi/GetDriverPendingApprove?search=${search}`);
      const data = await response.json();
      if (data?.Entities) {
        setDriverList(data.Entities);

      } else {
        console.warn('Unexpected response format', data);
        setDriverList([]);
      }
    } catch (error) {
      console.error('Error fetching driver data:', error);
      setDriverList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handler=setTimeout(()=>{
    FetchDriverData(search || '');
},700)
return()=>clearTimeout(handler)
  }, [search]);


  const openDetails = item => {
FetchSingleDriver(item.Id)
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search by License No......."
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
        autoCapitalize='characters'
      />

      {isLoading? (
        <ActivityIndicator size={"large"} color={darkBlue} style={{marginTop:20}} />
      ) :  (
   
      <ScrollView horizontal>
        <View>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell,{paddingLeft:10}]}>Name</Text>
            <Text style={[styles.cell, styles.headerCell]}>License No</Text>
            <Text style={[styles.cell, styles.headerCell]}>Status</Text>
             <Text style={[styles.cell, styles.headerCell]}>Created By</Text>
          </View>

          <FlashList
            data={driverList}
            keyExtractor={(item, index) => index.toString()}
            estimatedItemSize={50}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => openDetails(item)}>
                <View
                  style={[
                    styles.row,
                    { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',height:50  },
                  ]}
                >
                  <Text style={[styles.cell,{paddingLeft:10}]}>{item.DriverName}</Text>
                  <Text style={styles.cell}>{item.DLNumber}</Text>
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
              {driverData && (
                <>
                  {[
                    ['Id', driverData.Id],
                    ['Name', driverData.DriverName],
                    ['License No', driverData.DLNumber],
                    ['DOB', driverData?.DOBDriver? driverData.DOBDriver.split('T')[0] : ''],
                    ['Email', driverData.DriverEmail],
                    ['Adhar No',driverData.AdharNo],
                    ['PAN No', driverData.PanNo],
                    ['Address', driverData.DriverAddress]
                  ].map(([label, value]) => (
                    <View key={label} style={styles.detailRow}>
                      <Text style={styles.detailKey}>{label}</Text>
                      <Text style={styles.detailValue}>{value}</Text>
                    </View>

                  ))}
                   <View style={styles.detailRow}>
                        <Text style={styles.detailKey}>P. Mobile No</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' ,flex:2}}>
                          <Text style={styles.detailValue}>{driverData.PrimaryContactNo} </Text>
                        </View>
                      </View>
 <View style={styles.detailRow}>
      <Text style={styles.detailKey}>S.Mobile No</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' ,flex:2}}>
        <Text style={styles.detailValue}>{driverData.SecondaryContactNo} </Text>
      </View>
    </View>
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

export default ManageDriver;

// Styles (copy the same from ManageOwner with optional tweaks)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchBar: {
    borderWidth: 1,
    borderColor: darkBlue,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    elevation: 4,
    backgroundColor: '#edf2f4',
    color:textColor,
fontSize:18
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
    paddingHorizontal:3,
    color: '#023047',
    fontSize:13 
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
    flex:1
  },
  detailValue: {
    color: '#333',
    flex: 1,
    textAlign: 'left',
    flex:2
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
