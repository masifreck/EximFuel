import React, { useState ,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet, TouchableOpacity,
  Image ,ActivityIndicator, Alert
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { darkBlue, textColor } from '../components/constant';
import CustomCheckbox from '../components/CustomeCheckBox';
import ImageViewing from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { is, se } from 'date-fns/locale';

//   {
//     Id: null,
//     Name: 'First Owner Name',
//     PanNo: 'test01pan',
//     DOB: '1995-06-30',
//     Tds: 1,
//     AdharNo: '123569',
//     PMobileNo: '9648433287',
//     SMobileNo: 'SecondaryNo',
//     IFSC: 'IFSC',
//     AccountNo: 'AccountNo',
//     BankId: '1',
//     Account: 3,
//     Email: 'Email',
//     Address: 'Address',
//     Status: 'Pending',
//     isPCVerified:true,
//      isSCVerified:false
//   },
//     {
//     Id: null,
//     Name: 'Second  Owner Name',
//     PanNo: 'test02pan',
//     DOB: '1995-06-30',
//     Tds: 1,
//     AdharNo: '123569',
//     PMobileNo: '9648433287',
//     SMobileNo: 'SecondaryNo',
//     IFSC: 'IFSC',
//     AccountNo: 'AccountNo',
//     BankId: '1',
//     Account: 3,
//     Email: 'Email',
//     Address: 'Address',
//     Status: 'Pending',
//      isPCVerified:true,
//       isSCVerified:false
//   },
//     {
//     Id: null,
//     Name: 'Update Owner',
//     PanNo: 'test06pan',
//     DOB: '1995-06-30',
//     Tds: 1,
//     AdharNo: '123569',
//     PMobileNo: '9648433287',
//     SMobileNo: 'SecondaryNo',
//     IFSC: 'IFSC',
//     AccountNo: 'AccountNo',
//     BankId: '1',
//     Account: 3,
//     Email: 'Email',
//     Address: 'Address',
//     Status: 'Pending',
//      isPCVerified:false,
//       isSCVerified:true
//   },
//   {
//     Id: null,
//     Name: 'Another Owner',
//     PanNo: 'samplePAN2',
//     DOB: '1993-04-10',
//     Tds: 1,
//     AdharNo: '654321',
//     PMobileNo: '9998887770',
//     SMobileNo: 'SecondaryNo2',
//     IFSC: 'IFSC1234',
//     AccountNo: '123456789',
//     BankId: '2',
//     Account: 2,
//     Email: 'another@email.com',
//     Address: 'Another Address',
//     Status: 'Approved',
//      isPCVerified:true,
//      isSCVerified:true
//   },
// ];

const ManageOwner = () => {
  const [search, setSearch] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [declare,setDeclayer]=useState(false)
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [ownerList, setOwnerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const [singleLoader,setSingleLoader]=useState(false)
  const [apiTokenReceived, setapiTokenReceived] = useState();
  AsyncStorage.getItem('Token')
    .then(token => {
      setapiTokenReceived(token);
      // console.log('Retrieved token:', token);
    })
    .catch(error => {
      const TokenReceived = useApiToken();
      setapiTokenReceived(TokenReceived);
      console.log('Received token', apiTokenReceived);
      console.log('Error retrieving token:', error);
    });
  const FetchSingleOnwer = async(id)=>{
setSingleLoader(true)
try {
  const response =await fetch(`https://Exim.Tranzol.com/api/OwnerApi/GetOwner?panNo=${id}`,
    {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${apiTokenReceived}`,
          },
        });
  const data =await response.json();
  console.log('Single Owner Data:', data);
  if(data.apiResult?.Result){
    setSelectedOwner(data.apiResult.Result)  
    
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
 const FetchOwnerData = async (search) => {
  setIsLoading(true);
    try {
      const response = await fetch(`https://Exim.Tranzol.com/api/FetchDataApi/GetOwnerPendingApprove?search=${search}`);
      console.log('Fetch URL:', `https://Exim.Tranzol.com/api/FetchDataApi/GetOwnerPendingApprove?search=${search}`);
      const data = await response.json();
      if (data?.Entities) {
        setOwnerList(data.Entities);
        console.log('Owner data fetched successfully:', data.Entities);
      } else {
        console.warn('Unexpected response format', data);
        setOwnerList([]);
      }
    } catch (error) {
      console.error('Error fetching driver data:', error);
      setOwnerList([]);
    } finally {
      setIsLoading(false);
    }
  };

useEffect(() => {
  const handler = setTimeout(() => {
    FetchOwnerData(search || '');
  }, 500); // waits 500ms after user stops typing

  return () => clearTimeout(handler);
}, [search]);

const imageList = [
  require('../assets/adhar_BACK.png'),
  require('../assets/delivery-truck.png'),
  require('../assets/frontphoto.png'),
];


  const openDetails = item => {
    FetchSingleOnwer(item.PanNo)
    // setSelectedOwner(item);
    setModalVisible(true);
  };

  return (
  <View style={styles.container}>
    {/* Search Bar */}
    <TextInput
      placeholder="Search by PAN No"
      style={styles.searchBar}
      value={search}
      onChangeText={setSearch}
      autoCapitalize='characters'
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

      {isLoading ? (
  <ActivityIndicator size="large" color={darkBlue} style={{ marginTop: 50 }} />
) :  (
     <FlashList
  data={ownerList}
  keyExtractor={(item, index) => index.toString()}
  estimatedItemSize={50}
  renderItem={({ item, index }) => ( // include index here
    <Pressable onPress={() => openDetails(item)}>
      <View style={[
        styles.row,
        { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }, // now index is defined
      ]}>
        <Text style={styles.cell}>{item.OwnerName}</Text>
        <Text style={styles.cell}>{item.PanNo}</Text>
        <Text
          style={[
            styles.cell,
            { color: item.ApproveStatus === 'Approved' ? 'green' : 'orange' },
          ]}
        >
          {item.ApproveStatus}
        </Text>
      </View>
    </Pressable>
  )}
/>
)}
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

  singleLoader ? (
    <ActivityIndicator size="large" color={darkBlue} />
  ) : (
    <>
    {  console.log('Selected Owner in ui:', selectedOwner)}
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Id</Text>
        <Text style={styles.detailValue}>{selectedOwner.Id}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Name</Text>
        <Text style={styles.detailValue}>{selectedOwner.OwnerName}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Pan No</Text>
        <Text style={styles.detailValue}>{selectedOwner.PanNo}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>DOB</Text>
        <Text style={styles.detailValue}>{selectedOwner.DobOwner?.split('T')[0]}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>TDS</Text>
        <Text style={styles.detailValue}>{selectedOwner.TDSTypeName}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Adhar No</Text>
        <Text style={styles.detailValue}>{selectedOwner.AdharNo}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>P. Mobile No</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 2 }}>
          <Text style={styles.detailValue}>{selectedOwner.PrimaryMobileNo} </Text>
          <Icon
            name={selectedOwner.isPCVerified ? 'check-circle' : 'times-circle'}
            size={18}
            color={selectedOwner.isPCVerified ? 'green' : 'red'}
          />
        </View>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>S. Mobile No</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 2 }}>
          <Text style={styles.detailValue}>{selectedOwner.SecondaryNo} </Text>
          <Icon
            name={selectedOwner.isSCVerified ? 'check-circle' : 'times-circle'}
            size={18}
            color={selectedOwner.isSCVerified ? 'green' : 'red'}
          />
        </View>
      </View>
     <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Bank </Text>
        <Text style={styles.detailValue}>{selectedOwner.BankNameName}</Text>
      </View>
        <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Bank Type</Text>
        <Text style={styles.detailValue}>{selectedOwner.BankTypeName}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>IFSC</Text>
        <Text style={styles.detailValue}>{selectedOwner.IFSCCode}</Text>
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
        <Text style={styles.detailValue}>{selectedOwner.ZipCode}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Status</Text>
        <Text style={styles.detailValue}>{selectedOwner.ApproveStatus}</Text>
      </View>
    </>
  )
)}

{/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
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
</View> */}

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
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 10,
    elevation:4,
    backgroundColor:'#edf2f4',
    fontSize:16,
    color:textColor
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

