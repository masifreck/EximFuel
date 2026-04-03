// FuelListDetails.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,Modal,Dimensions,Image, FlatList
} from 'react-native';
import { styles } from './FuelStyle';
import ImageZoom from 'react-native-image-pan-zoom';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
const SUBMIT_API =
  'http://eximapi1.tranzol.com/api/Fuel/FuelDetailRequest';

const FuelListDetails = ({ route, navigation }) => {
  const selectedItem = route?.params?.item;
const [username, setUsername] = useState('');
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fuelAmount, setfuelAmount] = useState('');
  const [rate, setrate] = useState('');
  const [ltr, setltr] = useState('');
  const [remarks, setremarks] = useState('');
  const [lastEdited, setLastEdited] = useState(null);
  const [submitActionLoading, setActionSubmitLoading] = useState(false);
  const [appFuelRequestId, setAppFuelRequestId] = useState(null);
const [fuelLoadDate, setfuelLoadDate] = useState(null);
const [addNewDetails ,setAddNewDetails]=useState(false);


  const [submitLoading, setSubmitLoading] = useState(false);

  const [imageModalVisible, setImageModalVisible] = useState(false);
const [previewImage, setPreviewImage] = useState('');
 const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
const currentDate = getCurrentDate();
useEffect(() => {
  const amt = parseFloat(fuelAmount);
  const r = parseFloat(rate);
  const l = parseFloat(ltr);

  // ✅ Calculate Litres (Amount / Rate)
  if (
    lastEdited === 'amount' &&
    !isNaN(amt) &&
    !isNaN(r) &&
    r > 0
  ) {
    const result = (amt / r).toFixed(2);
    setltr(result.toString());
  }

  // ✅ Calculate Amount (Litres * Rate)
  if (
    lastEdited === 'ltr' &&
    !isNaN(l) &&
    !isNaN(r)
  ) {
    const result = (l * r).toFixed(2);
    setfuelAmount(result.toString());
  }

}, [fuelAmount, rate, ltr, lastEdited]);
useEffect(() => {
  const getUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('userId');
       const admin = await AsyncStorage.getItem('isAdmin');
      // console.log('Admin Status:', admin);
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
const handleSubmit = async (appFuelRequestId) => {
  if (!fuelAmount) {
    Alert.alert('Validation', 'Please enter approve amount');
    return;
  }

  if (!appFuelRequestId) {
    Alert.alert('Validation', 'Invalid action');
    return;
  }


  const payload = {
    appFuelRequestId,
   fuelLoadDate: new Date().toISOString(),
    rate:Number(rate),
    ltr:Number(ltr),
    fuelAmount: Number(fuelAmount),
    remarks: remarks?.trim() || '',
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

    if (res.ok) {
      Alert.alert(
        'Success',
        responseText || 'Insert successfully'
      );

      setrate('');
      setltr('');
      setfuelAmount('');
      setremarks('');
        fetchDetails(appFuelRequestId)
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
const handleActionSubmit = async (statusId) => {

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
  };

  //console.log('Submit Payload:', payload);

  try {
    setActionSubmitLoading(true);

    const res = await fetch('http://eximapi1.tranzol.com/api/Fuel/Approve', {
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
    setActionSubmitLoading(false);
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

const [fetchDetailsLoading, setFetchDetailsLoading] = useState(false);

  // 🔥 AUTO CALCULATION
  useEffect(() => {
    const amt = parseFloat(fuelAmount);
    const r = parseFloat(rate);
    const l = parseFloat(ltr);

    if (!isNaN(r) && r > 0) {
      if (lastEdited === 'amount' && !isNaN(amt)) {
        setltr((amt / r).toFixed(2));
      } else if (lastEdited === 'ltr' && !isNaN(l)) {
        setfuelAmount((l * r).toFixed(2));
      } else if (lastEdited === 'rate') {
        if (!isNaN(amt)) {
          setltr((amt / r).toFixed(2));
        }
      }
    }
  }, [fuelAmount, rate, ltr, lastEdited]);

  // 🔥 FETCH DETAILS
  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://eximapi1.tranzol.com/api/Fuel/GetFuelDetails?AppFuelRequestId=${selectedItem.id}`
      );
      const json = await res.json();
     // console.log('details',json , `http://eximapi1.tranzol.com/api/Fuel/GetFuelDetails?AppFuelRequestId=${selectedItem.id}`)
      setDetails(json || []);
    } catch {
      Alert.alert('Error loading details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
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



const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={styles.headerCell}>Date</Text>
    <Text style={styles.headerCell}>Amount</Text>
    <Text style={styles.headerCell}>rate</Text>
    <Text style={styles.headerCell}>Liters</Text>
    <Text style={styles.headerCell}>Remarks</Text>
  </View>
);

const renderItem = ({ item }) => (
  <View style={styles.tableRow}>
    <Text style={styles.rowCell}>
      {new Date(item.fuelLoadDate).toLocaleDateString()}
    </Text>

    <Text style={styles.rowCell}>₹ {item.fuelAmount}</Text>

    <Text style={styles.rowCell}>{item.rate}</Text>

    <Text style={styles.rowCell}>{item.ltr}</Text>

    <Text style={styles.rowCell}>{item.remarks || '-'}</Text>
  </View>
);
  return (
    <>
 
   <View style={styles.modalBackdrop}>
     <View style={styles.modalCard}>
 
 <ScrollView
   showsVerticalScrollIndicator={false}
   keyboardShouldPersistTaps="always"
   contentContainerStyle={styles.modalScrollContent}
 >
 
         {selectedItem && (
           <>
           <View style={styles.detailLine}>
               <Text style={styles.detailKey}>load Type</Text>
               <Text style={styles.detailValue}>{selectedItem.loadType}</Text>
             </View>
               <View style={styles.detailLine}>
               <Text style={styles.detailKey}>fuelCardType</Text>
               <Text style={styles.detailValue}>{selectedItem.fuelCardType}</Text>
             </View>
             <View style={styles.detailLine}>
               <Text style={styles.detailKey}>Vehicle</Text>
               <Text style={styles.detailValue}>{selectedItem.vehicleNo}</Text>
             </View>
  <View style={styles.detailLine}>
               <Text style={styles.detailKey}>guarantorName</Text>
               <Text style={styles.detailValue}>{selectedItem.guarantorName}</Text>
             </View>
             <View style={styles.detailLine}>
               <Text style={styles.detailKey}>cardNo</Text>
               <Text style={styles.detailValue}>{selectedItem.cardNo}</Text>
             </View>
             <View style={styles.detailLine}>
               <Text style={styles.detailKey}>driverName</Text>
               <Text style={styles.detailValue}>{selectedItem.driverName}</Text>
             </View>
             <View style={styles.detailLine}>
               <Text style={styles.detailKey}>driver Mob.</Text>
               <Text style={styles.detailValue}>{selectedItem.driverContactNo}</Text>
             </View>
             <View style={styles.detailLine}>
               <Text style={styles.detailKey}>Loading Points</Text>
               <Text style={styles.detailValue}>{selectedItem.loadingPoints}</Text>
             </View>
 
             <View style={styles.detailLine}>
               <Text style={styles.detailKey}>Unloading Points</Text>
               <Text style={styles.detailValue}>{selectedItem.unloadingPoints}</Text>
             </View>
 <View style={styles.detailLine}>
               <Text style={styles.detailKey}>balanceLtr</Text>
               <Text style={styles.detailValue}>₹ {selectedItem.balanceLtr}</Text>
             </View><View style={styles.detailLine}>
               <Text style={styles.detailKey}>netWt</Text>
               <Text style={styles.detailValue}>{selectedItem.netWt}</Text>
             </View>
             <View style={styles.detailLine}>
               <Text style={styles.detailKey}>fixedDistance</Text>
               <Text style={styles.detailValue}>{selectedItem.fixedDistance}</Text>
             </View>
 
               <View style={styles.detailLine}>
               <Text style={styles.detailKey}>fixedLtr</Text>
               <Text style={styles.detailValue}>{selectedItem.fixedLtr}</Text>
             </View>
                  <View style={styles.detailLine}>
               <Text style={styles.detailKey}>bookingDate</Text>
               <Text style={styles.detailValue}>{selectedItem.bookingDate}</Text>
             </View>
                  <View style={styles.detailLine}>
               <Text style={styles.detailKey}>fixedMileage</Text>
               <Text style={styles.detailValue}>{selectedItem.fixedMileage}</Text>
             </View>
               <View style={styles.detailLine}>
               <Text style={styles.detailKey}>allottedAmount</Text>
               <Text style={styles.detailValue}>₹ {selectedItem.allottedAmount}</Text>
             </View>
 
              <View style={styles.detailLine}>
               <Text style={styles.detailKey}>allottedDieselRate</Text>
               <Text style={styles.detailValue}>{selectedItem.allottedDieselRate}</Text>
             </View>
              <View style={styles.detailLine}>
               <Text style={styles.detailKey}>allottedTotalLtr</Text>
               <Text style={styles.detailValue}>{selectedItem.allottedTotalLtr}</Text>
             </View>
 
             <View style={styles.detailLine}>
               <Text style={styles.detailKey}>driverCashAdvance</Text>
               <Text style={styles.detailValue}>
                 {selectedItem.driverCashAdvance}
               </Text>
             </View>
 
             <View style={styles.detailLine}>
               <Text style={styles.detailKey}>Remarks</Text>
               <Text style={styles.detailValue}>
                 {selectedItem.remarks || '-'}
               </Text>
             </View>
           </>
         )}
 
         {/* ATTACHMENTS */}
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
 
         {/* LOADER */}
  {!fetchDetailsLoading && details.length > 0 && (
   <ScrollView
     horizontal
     showsHorizontalScrollIndicator
   >
     {/* THIS VIEW DEFINES TABLE WIDTH */}
     <View style={{ minWidth: 600 }}>
       
       <TableHeader />
 
       <FlatList
         data={details}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderItem}
         scrollEnabled={false}   // 🔑 VERY IMPORTANT
         removeClippedSubviews={false}
       />
 
     </View>
   </ScrollView>
 )}
 
 <TouchableOpacity
   style={[
     styles.button1,
     addNewDetails ? styles.closeBtn1 : styles.addBtn1,
   ]}
   onPress={() => {
     setAddNewDetails(!addNewDetails)
     setfuelAmount('');
     setrate('');
     setltr('');
     setremarks('');
     }}
 >
   <Text
     style={[
       styles.buttonText1,
       addNewDetails && styles.closeText1,
     ]}
   >
     {addNewDetails ? 'Close Fuel Details Form' : 'Add New Fuel Details'}
   </Text>
 </TouchableOpacity>
 
         {/* INPUTS */}
         {addNewDetails &&
         <View>
         <Text style={{ marginTop: 20, fontWeight: '600', color: '#111827', fontSize: 16 ,
             textAlign: 'center'
         }}>
   📝⛽ ADD NEW FUEL DETAILS
 </Text>
 
 <Text style={styles.label}>fuel Load Date 📅</Text>
       <TextInput
         style={[styles.input, styles.disabledInput]}
         value={currentDate}
         editable={false}
       />
     <TextInput
   placeholder="fuel Amount"
   keyboardType="numeric"
   value={fuelAmount}
   onChangeText={(text) => {
     setLastEdited('amount');
     setfuelAmount(text);
   }}
   style={styles.input}
 />
 
 <TextInput
   placeholder="Fuel Rate"
   value={rate}
   onChangeText={(text) => {
     setLastEdited('rate');
     setrate(text);
   }}
   style={styles.input}
   keyboardType="numeric"
 />
 
 <TextInput
   placeholder="LTR."
   value={ltr}
   onChangeText={(text) => {
     setLastEdited('ltr');
     setltr(text);
   }}
   style={styles.input}
   keyboardType="numeric"
 />
         <Text style={styles.label}>Remarks 📝</Text>
         <TextInput
           placeholder="Remarks"
           value={remarks}
           onChangeText={setremarks}
           style={[styles.input, { height: 80 }]}
           multiline
           placeholderTextColor="#9CA3AF"
         />
 
         {/* ACTION BUTTONS */}
         {submitLoading ? (
           <ActivityIndicator size="small" color="#2563EB" />
         ) : (
        
             <TouchableOpacity
               style={[styles.submitBtn, {marginTop:10}]}
               onPress={() => handleSubmit(selectedItem.id)}
             >
               <Text style={styles.submitText}>SUMBIT</Text>
             </TouchableOpacity>
         )}
 </View>
 }
 <View style={{
   width:'100%',
   height:1,
   backgroundColor:'black',
   elevation:4,
   marginVertical:16,
   marginHorizontal:-10
 }}></View>
 
 <View style={styles.actionRow}>
     {/* APPROVE */}
     <TouchableOpacity
       style={styles.submitBtn}
       onPress={() => handleActionSubmit(4)}
       disabled={submitActionLoading}
     >
       <Text style={styles.submitText}>Approve</Text>
     </TouchableOpacity>
 
     {/* REJECT */}
     <TouchableOpacity
       style={styles.rejectBtn}
       onPress={() => handleActionSubmit(5)}
       disabled={submitActionLoading}
     >
       <Text style={styles.rejectText}>Reject</Text>
     </TouchableOpacity>
   </View>
       </ScrollView>
     </View>
   </View>

 
 <Modal
   visible={imageModalVisible}
   transparent
   animationType="fade"
   onRequestClose={() => setImageModalVisible(false)}
 >
   <View style={styles.imageModalWrapper}>
     {/* CLOSE */}
     <TouchableOpacity
       style={styles.closeBtn}
       onPress={() => setImageModalVisible(false)}
     >
       <Text style={styles.closeText}>✕</Text>
     </TouchableOpacity>
 
     <ImageZoom
       cropWidth={width}
       cropHeight={height}
       imageWidth={width}
       imageHeight={height}
       enableCenterFocus={true}
       minScale={1}
       maxScale={4}
     >
       <Image
         source={{ uri: previewImage }}
         style={{ width, height }}
         resizeMode="contain"
       />
     </ImageZoom>
   </View>
 </Modal>
 </>
  );
};

export default FuelListDetails;