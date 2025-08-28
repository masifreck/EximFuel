import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,ActivityIndicator,Linking,Platform
} from 'react-native';
import {
  buttonColor,
  darkBlue,
  inputbgColor,
  textColor,
} from '../components/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TableRow = ({title, value, color}) => (
  <View style={styles.tableRow}>
    <View style={styles.leftColumn}>
      <Text style={styles.leftText}>{title}</Text>
    </View>
    <View style={styles.verticalBorder} />
    <Text style={[styles.rightText, {color: color || 'black'}]}>{value}</Text>

    {title === 'Vehicle No' && (
      <View style={styles.blacklistContainer}>
        <Image
          style={styles.blackList}
          source={
            color === 'green'
              ? require('../assets/verified.png')
              : require('../assets/delete-cross.png')
          }
        />
      </View>
    )}
  </View>
);
const FetchOwnerDetails = {};
const ShowVehicleDetails = ({route, navigation}) => {
  // Retrieve the vehicleDetails parameter from the route
  const {vehicleDetails} = route.params;
    const [apiTokenReceived, setapiTokenReceived] = useState(null);
  AsyncStorage.getItem('Token')
    .then(token => {
      setapiTokenReceived(token);
    })
    .catch(error => {
      const TokenReceived = useApiToken();
      setapiTokenReceived(TokenReceived);
    });
  
  const [IsOwnerVisible, setIsOwnerVisible] = useState(false);
  const FetchVehicleDetails = vehicleDetails.apiResult.Result;
   // console.log('vehicle details',FetchVehicleDetails)
  const [ownerData,setOwnerData]=useState([])
  const [isownerLoading,setIsownerLoading]=useState(false)

  const [isBlackList, setIsBlackList] = useState(null); // Initialize as null
  useEffect(() => {
    // Check the value of vehicleDetails[0].Code and update isBlackList accordingly
    if (FetchVehicleDetails.IsBlocked === false) {
      setIsBlackList(true); // Set to true if verified
    } else {
      setIsBlackList(false); // Set to false if not verified
    }
  }, [vehicleDetails]); // Re-run the effect whenever vehicleDetails changes
const handleOwnerVisiblity = async () => {
  

  if (!FetchVehicleDetails?.VehicleNo) {
    Alert.alert("Error", "Vehicle number not found");
    return;
  }

  try {
    setIsownerLoading(true); // start loading
   const vehicleResponse = await fetch(
  `https://exim.tranzol.com/api/DropDown/VehicleNo?search=${FetchVehicleDetails?.VehicleNo}`,
  {
    method: 'GET',
    headers: {
      Authorization: `Basic ${apiTokenReceived}`,
      'Content-Type': 'application/json',
    },
  }
);
 console.log( `https://Exim.Tranzol.com/api/OwnerApi/GetOwner?panNo=${FetchVehicleDetails?.VehicleNo}`)
    if (!vehicleResponse.ok) {
      console.log('vehicle api response',vehicleResponse.json())
      Alert.alert("Error", "Failed to fetch vehicle info");
      return;
    }

    const vehicleData = await vehicleResponse.json();
    console.log("VehicleNo API Response:", vehicleData);

    const panNumber = vehicleData?.VehicleNoList?.[0]?.PANNumber;

    if (!panNumber) {
      Alert.alert("Error", "PAN Number not found for this vehicle");
      return;
    }

    // 2️⃣ Call Owner API with extracted PANNumber

    const response = await fetch(`https://Exim.Tranzol.com/api/OwnerApi/GetOwner?panNo=${panNumber}`,
       {
    method: 'GET',
    headers: {
      Authorization: `Basic ${apiTokenReceived}`,
      'Content-Type': 'application/json',
    },
  }
    );

    if (response.ok) {
      const data = await response.json();
      //console.log("Owner API Response:", data);

      if (data.error) {
        Alert.alert(data.error);
        Alert.alert("API Response Error", data.error);
      } else {
        const ownerResult = data?.apiResult?.Result;
console.log("Owner API Response:", ownerResult);
        if (!ownerResult) {
          Alert.alert("Error", "Owner not found with this PAN Number");
        } else {
          setOwnerData(ownerResult);
          setIsOwnerVisible(!IsOwnerVisible);
        }
      }
    } else {
      Alert.alert("Error", "Failed to fetch owner details");
    }
  } catch (error) {
    console.log("Network Error:", error);
    Alert.alert("Error", "Network Error. Please try again.");
  } finally {
    setIsownerLoading(false); // stop loading
  }
};


const openDialScreen = async (number) => {
  console.log('phone', number);

  // Validate 10-digit number
  if (!number || !/^\d{10}$/.test(number)) {
  //  Alert.alert();
    Alert.alert('Error','Invalid Number Please enter a valid 10-digit phone number.')
    return;
  }

  // Format the dial URL depending on the platform
  const dialURL = Platform.OS === 'ios' ? `telprompt:${number}` : `tel:${number}`;

  try {
    const canOpen = await Linking.canOpenURL(dialURL);
    if (canOpen) {
      await Linking.openURL(dialURL);
    } else {
      Alert.alert('Error', 'Dialer not supported on this device.');
    }
  } catch (error) {
   // console.error('Dialer Error:', error);
    Alert.alert('Error', 'Something went wrong while trying to open the dialer.');
  }
};
  return (
    <ScrollView>
      <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
      <Text style={styles.levelText}>🚛 Vehicle Details</Text>
      <TouchableOpacity style={{position:'absoulte',top:10,right:10}} onPress={()=>navigation.navigate('UpdateVehicle',{vehicleDetails:vehicleDetails})}>
      <Image style={{width:50,height:50}} source={require('../assets/edit.png')}/>
      </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
        <ImageBackground
          source={require('../assets/rcfrontnew.png')}
          imageStyle={{borderRadius: 10}}
          style={styles.dlCard}>
          <Text
            style={{
              position: 'absolute',
              top: 160,
              left: 40,
              color: vehicleDetails?.Code === 'VERIFIED' ? 'green' : 'red',
              fontWeight: 'bold',
            }}>
            {vehicleDetails?.Code ? vehicleDetails.Code : ''}
          </Text>

          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 15,
              position: 'absolute',
              top: 85,
              left: 150,
              fontWeight: 'bold',
            }}>
            {FetchVehicleDetails?.VehicleNo
              ? FetchVehicleDetails.VehicleNo
              : ''}
          </Text>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 12,
              position: 'absolute',
              top: 90,
              left: 260,
            }}>
            {FetchVehicleDetails?.PermitNo ? FetchVehicleDetails.PermitNo : ''}
          </Text>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 15,
              position: 'absolute',
              top: 88,
              left: 373,
            }}>
            {FetchVehicleDetails?.PermitExpiry
              ? FetchVehicleDetails.PermitExpiry
              : ''}
          </Text>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 15,
              position: 'absolute',
              top: 125,
              left: 148,
            }}>
            {FetchVehicleDetails?.ChasisNo ? FetchVehicleDetails.ChasisNo : ''}
          </Text>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 15,
              position: 'absolute',
              top: 167,
              left: 148,
            }}>
            {FetchVehicleDetails?.EngineNo ? FetchVehicleDetails.EngineNo : ''}
          </Text>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 15,
              position: 'absolute',
              top: 205,
              left: 148,
            }}>
            {FetchVehicleDetails?.OwnerName
              ? FetchVehicleDetails.OwnerName
              : ''}
          </Text>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 14,
              position: 'absolute',
              top: 242,
              left: 148,
            }}>
            {FetchVehicleDetails?.PUCCNo ? FetchVehicleDetails.PUCCNo : ''}
          </Text>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 14,
              position: 'absolute',
              top: 285,
              left: 148,
            }}>
            {FetchVehicleDetails?.PUCCExpiry
              ? FetchVehicleDetails.PUCCExpiry
              : ''}
          </Text>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 14,
              position: 'absolute',
              top: 326,
              left: 148,
            }}>
            {FetchVehicleDetails?.NationalPermitExpiry
              ? FetchVehicleDetails.NationalPermitExpiry
              : ''}
          </Text>
          {/* fuel type */}
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 10,
              position: 'absolute',
              bottom: 46,
              left: 20,
            }}>
            {FetchVehicleDetails?.InsuranceNo
              ? FetchVehicleDetails.InsuranceNo
              : ''}
          </Text>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 13,
              position: 'absolute',
              width: 110,
              top: 322,
              left: 20,
            }}>
            {FetchVehicleDetails?.InsuranceExpiry
              ? FetchVehicleDetails.InsuranceExpiry
              : ''}
          </Text>
        </ImageBackground>
        <ImageBackground
          source={require('../assets/rcnewback.png')}
          imageStyle={{borderRadius: 10}}
          style={styles.dlCard}>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 18,
              position: 'absolute',
              top: 88,
              left: 18,
              fontWeight: 'bold',
            }}>
            {FetchVehicleDetails?.VehicleNo
              ? FetchVehicleDetails.VehicleNo
              : ''}
          </Text>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 15,
              position: 'absolute',
              bottom: 50,
              left: 200,
            }}>
            {FetchVehicleDetails?.FitnessNo
              ? FetchVehicleDetails.FitnessNo
              : ''}
          </Text>
          <Text
            style={{
              color: '#020202',
              fontWeight: 'bold',
              fontSize: 14,
              position: 'absolute',
              width: 110,
              bottom: 50,
              left: 325,
            }}>
            {FetchVehicleDetails?.FitnessExpiry
              ? FetchVehicleDetails.FitnessExpiry
              : ''}
          </Text>
        </ImageBackground>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TableRow title="VehicleNo" value={FetchVehicleDetails.VehicleNo} />
        {/* 
         */}
        {/* <TableRow title="OwnerName" value={FetchVehicleDetails.OwnerName} /> */}
        <TableRow title="ChassicNo" value={FetchVehicleDetails.ChassicNo} />
        <TableRow title="EngineNo" value={FetchVehicleDetails.EngineNo} />
        <TableRow title="Owner Name" value={FetchVehicleDetails.OwnerName} />
        <TableRow
          title="StatePermit Validity"
          value={FetchVehicleDetails.StatePermitNo}
        />
        <TableRow
          title="Fitness Validity"
          value={FetchVehicleDetails.FitnessNo}
        />
        <TableRow
          title="Pollution Validity"
          value={FetchVehicleDetails.PollutionNo}
        />
      </View>
      <View style={{padding: 10, alignItems: 'center'}}>
       {IsOwnerVisible ? (
  <TouchableOpacity onPress={handleOwnerVisiblity}>
    <Image
      style={{ width: 60, height: 60 }}
      source={require('../assets/closepng.png')}
    />
  </TouchableOpacity>
) : (
  <TouchableOpacity
    onPress={handleOwnerVisiblity}
    style={{
      backgroundColor: darkBlue,
      padding: 10,
      borderRadius: 10,
      elevation: 4,
      width: 200,
      height: 50,
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {isownerLoading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 15 }}>
        GET OWNER DETAILS
      </Text>
    )}
  </TouchableOpacity>
)}

      </View>
      {IsOwnerVisible && (
        <ScrollView>
          <View style={styles.view1}>
            {/* <Image style={styles.img} source={require('../assets/profile.png')} /> */}
          </View>

          <View
            style={{
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: darkBlue,
                fontSize: 20,
                marginBottom: 10,
                marginTop: 0,
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
            👤 Owner Details
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.nameTxt}>
                {ownerData?.OwnerName
                  ? ownerData.OwnerName
                  : ''}
              </Text>
              <Text style={styles.emailTxt}>
                {ownerData?.EmailAddress
                  ? ownerData.EmailAddress
                  : ''}
              </Text>
              <View style={styles.row}>
                <Text style={styles.label}>Mobile Number :</Text>
                <Text style={styles.value}>
                  {ownerData?.PrimaryMobileNo
                    ? ownerData.PrimaryMobileNo
                    : ''}
                </Text>
                <TouchableOpacity
                  style={{marginRight: 30}}
                   onPress={() => openDialScreen(ownerData?.PrimaryMobileNo
                    ? ownerData.PrimaryMobileNo
                    : '')}
                >
                  <Image
                    style={{width: 35, height: 35, marginRight: 20}}
                    source={require('../assets/phone-call.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Secondary Number :</Text>
                <Text style={styles.value}>
                  {ownerData?.SecondaryNo
                    ? ownerData.SecondaryNo
                    : ''}
                </Text>
                <TouchableOpacity
                  style={{marginRight: 30}}
                   onPress={() => openDialScreen(ownerData?.SecondaryNo
                    ? ownerData.SecondaryNo
                    : '')}
                >
                  <Image
                    style={{width: 35, height: 35, marginRight: 20}}
                    source={require('../assets/phone-call.png')}
                  />
                </TouchableOpacity>
              </View>
  <View style={styles.row}>
                <Text style={styles.label}>PAN No :</Text>
                <Text style={styles.value}>
                  {ownerData?.PanNo
                    ? ownerData.PanNo
                    : ''}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Date Of Birth :</Text>
                <Text style={styles.value}>
                  {ownerData?.DobOwner
                    ? ownerData.DobOwner.split('T')[0]
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Address :</Text>
                <Text style={styles.value}>
                  {ownerData?.Address
                    ? ownerData.Address
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>TDS Type Name:</Text>
                <Text style={styles.value}>
                  {ownerData?.TDSTypeName
                    ? ownerData.TDSTypeName
                    : ''}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  width: '100%',
                  color: darkBlue,
                  fontSize: 20,
                  marginBottom: 10,
                  marginTop: 20,
                  fontFamily: 'PoppinsBold',
                  textAlign: 'center',
                }}>
              🏦 Bank Details
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>Account Number :</Text>
                <Text style={styles.value}>
                  {ownerData?.AccountNo
                    ? ownerData.AccountNo
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Bank Name :</Text>
                <Text style={styles.value}>
                  {ownerData?.BankNameName
                    ? ownerData.BankNameName
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Account Type :</Text>
                <Text style={styles.value}>
                  {ownerData?.BankTypeName
                    ? ownerData.BankTypeName
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>IFSC Code :</Text>
                <Text style={styles.value}>
                  {ownerData?.IFSCCode
                    ? ownerData.IFSCCode
                    : ''}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionHeader}>📋 Other Details</Text>

            <View style={styles.inputContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>Total No Vehicle :</Text>
                <Text style={styles.value}>
                  {ownerData?.TotalNoVehicle
                    ? ownerData.TotalNoVehicle
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Shortage Recovery :</Text>
                <Text style={styles.value}>
                  {ownerData?.ShortageRecovery
                    ? ownerData.ShortageRecovery
                    : ''}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '93%',
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#ccc',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  dlCard: {
    height: 350,
    width: 570,
    borderRadius: 10,
    margin: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderColor: 'grey',
    paddingVertical: 2,
  },
  leftColumn: {
    width: 120, // Fixed width for the left column
  },
  verticalBorder: {
    width: 1,
    backgroundColor: '#ccc',
  },
  leftText: {
    fontWeight: '700',
    fontSize: 15,
    color: 'black',
    padding: 5,
  },
  rightText: {
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 5,
    color: 'black',
    padding: 6,
    flex: 1,
  },
  blacklistContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  blackList: {
    height: 20,
    width: 20,
  },
  levelText: {
    color: darkBlue,
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
  },
  button: {
    backgroundColor: '#3492eb',
    borderRadius: 5,
    marginBottom: 20,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '95%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 17,
  },

  //owner details style

  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    // paddingLeft:10
  },
  label: {
    fontWeight: '900',
    fontSize: 17,
    color: 'black',
    width: '35%',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  value: {
    fontWeight: '500',
    fontSize: 17,
    color: '#363432',
    padding: 10,
    width: '60%',
    flexWrap: 'wrap',
  },
  view1: {
    height: 10,
    width: '100%',
    // margin: 10,
    // padding: 10,
    flexDirection: 'row',
    marginVertical: 20,
    // backgroundColor:'white'
  },
  nameTxt: {
    fontSize: 20,
    fontWeight: '900',
    color: textColor,
    padding: 6,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginHorizontal: 10,
  },
  emailTxt: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: textColor,
    padding: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginHorizontal: 10
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 150,
    width: '100%',
    // backgroundColor: 'white'
  },
  sectionHeader: {
    color: darkBlue,
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
  },
  inputContainer: {
    // height: 200,
    width: '100%',
    backgroundColor: inputbgColor,
    borderRadius: 10,
    alignItems: 'flex-start',
    marginTop: 10,
    padding: 10,
    paddingRight: 30,
  },
  edit: {
    height: 15,
    width: 15,
  },
});

export default ShowVehicleDetails;
