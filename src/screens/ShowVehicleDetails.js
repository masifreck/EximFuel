import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {
  buttonColor,
  darkBlue,
  inputbgColor,
  textColor,
} from '../components/constant';

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
  const [IsOwnerVisible, setIsOwnerVisible] = useState(false);
  const FetchVehicleDetails = vehicleDetails.apiResult.Result;

  const [isBlackList, setIsBlackList] = useState(null); // Initialize as null
  useEffect(() => {
    // Check the value of vehicleDetails[0].Code and update isBlackList accordingly
    if (FetchVehicleDetails.IsBlocked === false) {
      setIsBlackList(true); // Set to true if verified
    } else {
      setIsBlackList(false); // Set to false if not verified
    }
  }, [vehicleDetails]); // Re-run the effect whenever vehicleDetails changes
  const handleOwnerVisiblity = () => {
    setIsOwnerVisible(!IsOwnerVisible);
  };
  return (
    <ScrollView>
      <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
      <Text style={styles.levelText}>Vehicle Details</Text>
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
        <TableRow title="TyreNo" value={FetchVehicleDetails.TyreNo} />
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
              style={{width: 60, height: 60}}
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
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 15}}>
              GET OWNER DETAILS
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {IsOwnerVisible && (
        <ScrollView>
          <View style={styles.view1}>
            {/* <Image style={styles.img} source={require('../assets/profile.png')} /> */}
          </View>
          {/* <ScrollView horizontal={true}>
                <PanCard />
                <AdharCard />
              </ScrollView> */}

          <View
            style={{
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#453D98ff',
                fontSize: 20,
                marginBottom: 10,
                marginTop: 0,
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Owner Details
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.nameTxt}>
                {FetchOwnerDetails?.OwnerName
                  ? FetchVehicleDetails.OwnerName
                  : 'Dummy Name'}
              </Text>
              <Text style={styles.emailTxt}>
                {FetchOwnerDetails?.EmailAddress
                  ? FetchOwnerDetails.EmailAddress
                  : 'Dummyemailgmail.com'}
              </Text>
              <View style={styles.row}>
                <Text style={styles.label}>Mobile Number :</Text>
                <Text style={styles.value}>
                  {FetchOwnerDetails?.PrimaryMobileNo
                    ? FetchVehicleDetails.PrimaryMobileNo
                    : ''}
                </Text>
                <TouchableOpacity
                  style={{marginRight: 30}}
                  // onPress={() => openDialScreen(primaryContact)}
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
                  {FetchOwnerDetails?.SecondaryNo
                    ? FetchVehicleDetails.SecondaryNo
                    : ''}
                </Text>
                <TouchableOpacity
                  style={{marginRight: 30}}
                  // onPress={() => openDialScreen(primaryContact)}
                >
                  <Image
                    style={{width: 35, height: 35, marginRight: 20}}
                    source={require('../assets/phone-call.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Date Of Birth :</Text>
                <Text style={styles.value}>
                  {FetchOwnerDetails?.DobOwner1
                    ? FetchVehicleDetails.DobOwner1
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Address :</Text>
                <Text style={styles.value}>
                  {FetchOwnerDetails?.Address
                    ? FetchVehicleDetails.Address
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>TDS Type Name:</Text>
                <Text style={styles.value}>
                  {FetchOwnerDetails?.TDSTypeName
                    ? FetchVehicleDetails.TDSTypeName
                    : ''}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  width: '100%',
                  color: '#453D98ff',
                  fontSize: 20,
                  marginBottom: 10,
                  marginTop: 20,
                  fontFamily: 'PoppinsBold',
                  textAlign: 'center',
                }}>
                Bank Details
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>Account Number :</Text>
                <Text style={styles.value}>
                  {FetchOwnerDetails?.AccountNo
                    ? FetchVehicleDetails.AccountNo
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Bank Name :</Text>
                <Text style={styles.value}>
                  {FetchOwnerDetails?.BankNameName
                    ? FetchVehicleDetails.BankNameName
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Account Type :</Text>
                <Text style={styles.value}>
                  {FetchOwnerDetails?.BankTypeName
                    ? FetchVehicleDetails.BankTypeName
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>IFSC Code :</Text>
                <Text style={styles.value}>
                  {FetchOwnerDetails?.IFSCCode
                    ? FetchVehicleDetails.IFSCCode
                    : ''}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionHeader}>Other Details</Text>

            <View style={styles.inputContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>Total No Vehicle :</Text>
                <Text style={styles.value}>
                  {FetchOwnerDetails?.TotalNoVehicle
                    ? FetchVehicleDetails.TotalNoVehicle
                    : ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Shortage Recovery :</Text>
                <Text style={styles.value}>
                  {FetchOwnerDetails?.ShortageRecovery
                    ? FetchVehicleDetails.ShortageRecovery
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
    color: '#453D98ff',
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
    color: '#453D98ff',
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
