import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import { darkBlue } from '../components/constant';

const ShowOwnerDetails = () => {
  const route = useRoute();
  const {ownerDetails} = route.params
  const FetchOwnerDetails = ownerDetails.apiResult.Result;

  return (
    <SafeAreaView >
      <ScrollView >
        <View style={styles.view1}>
          <Image style={styles.img} source={require('../assets/profile.png')} />
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text style={styles.nameTxt}>{FetchOwnerDetails.OwnerName}</Text>
            <Text style={styles.emailTxt}>
              {FetchOwnerDetails.EmailAddress}
            </Text>
          </View>
        </View>
        <ScrollView horizontal={true}>
          <PanCard />
          <AdharCard />
        </ScrollView>

        <View
          style={{
            marginBottom:10,
            alignItems: 'center',
            justifyContent:"center",
          }}>
          <Text
            style={{
              color: darkBlue,
              fontSize: 20,
              marginBottom: 10,
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'PoppinsBold',
            }}>
            Owner Contact Details
          </Text>
           <View style={styles.inputContainer}>
      <View style={styles.row}>
        <Text style={styles.label}>Mobile Number :</Text>
        <Text style={styles.value}>{FetchOwnerDetails.PrimaryMobileNo}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Secondary Number :</Text>
        <Text style={styles.value}>{FetchOwnerDetails.SecondaryNo}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Date Of Birth :</Text>
        <Text style={styles.value}>{FetchOwnerDetails.DobOwner? FetchOwnerDetails.DobOwner.split('T')[0] : ''}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Address :</Text>
        <Text style={styles.value}>{FetchOwnerDetails.Address}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>TDS Type Name:</Text>
        <Text style={styles.value}>{FetchOwnerDetails.TDSTypeName}</Text>
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
              Bank Details
            </Text>
          </View>
        <View style={styles.inputContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Account Number :</Text>
          <Text style={styles.value}>{FetchOwnerDetails.AccountNo}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Bank Name :</Text>
          <Text style={styles.value}>{FetchOwnerDetails.BankNameName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Account Type :</Text>
          <Text style={styles.value}>{FetchOwnerDetails.BankTypeName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>IFSC Code :</Text>
          <Text style={styles.value}>{FetchOwnerDetails.IFSCCode}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Other Details</Text>

      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Total No Vehicle :</Text>
          <Text style={styles.value}>{FetchOwnerDetails.TotalNoVehicle}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Shortage Recovery :</Text>
          <Text style={styles.value}>{FetchOwnerDetails.ShortageRecovery}</Text>
        </View>
      </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // backgroundColor: 'red',
    backgroundColor: '#ede3e1',
  },
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
    height: 110,
    width: '100%',
    // margin: 10,
    // padding: 10,
    flexDirection: 'row',
    marginVertical: 20,
    // backgroundColor:'white'
  },
  nameTxt: {
    fontSize: 15,
    fontWeight: '900',
    color: 'black',
    padding: 6,
    // marginHorizontal: 10,
  },
  emailTxt: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    padding: 6,

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
    width: '90%',
    backgroundColor: '#cedff0',
    borderRadius: 10,
    alignItems: 'flex-start',
    marginTop: 10,
    padding: 10,
   
  },
  edit: {
    height: 15,
    width: 15,
  },
});

const PanCard = () => {
  const route = useRoute();
  const {ownerDetails} = route.params;
  const FetchOwnerDetails = ownerDetails.apiResult.Result;
  return (
    <View
      style={{
        height: 150,
        width: 240,
        margin: 8,
      }}>
      <Image
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 10,
        }}
        source={require('../assets/pan-card.png')}
      />
       <Text
        style={{
          color: 'black',
          position: 'absolute',
          top: 32,
          left: 13,
          fontSize: 10,
          fontWeight: '700',
          width:'70%'
        }}>
        {FetchOwnerDetails.OwnerName}
      </Text>
       <Text
        style={{
          color: 'black',
          position: 'absolute',
          top: 44,
          left: 15,
          fontSize: 10,
          fontWeight: '700',
        }}>
        {FetchOwnerDetails.DobOwner? FetchOwnerDetails.DobOwner.split('T')[0] : ''}
      </Text>
       <Text
        style={{
          color: 'black',
          position: 'absolute',
          bottom: 65,
          left: 15,
          fontSize: 8,
          fontWeight: '700',
          width:'70%'
        }}>
        {FetchOwnerDetails.Address}
      </Text>
      <Text
        style={{
          color: 'black',
          position: 'absolute',
          bottom: 32,
          left: 15,
          fontSize: 15,
          fontWeight: '700',
        }}>
        {FetchOwnerDetails.PanNo}
      </Text>
    </View>
  );
};


  const AdharCard = () => {
  const route = useRoute();
  const {ownerDetails} = route.params;
  const FetchOwnerDetails = ownerDetails.apiResult.Result;
  return (
    <View
      style={{
        height: 150,
        width: 240,
        margin: 8,
      }}>
        {FetchOwnerDetails.AdharNo &&(
          <>
      <Image
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 10,
          borderWidth: 0.7,
          borderColor: 'lightgray',
        }}
        source={require('../assets/aadhaar.png')}
      />
 <Text
        style={{
          color: 'black',
          position: 'absolute',
          top: 36,
          left: 72,
          fontSize: 10,
          fontWeight: '700',
          width:'65%',
         // backgroundColor:'red'
        }}>
        {FetchOwnerDetails.OwnerName}
      </Text>
       <Text
        style={{
          color: 'black',
          position: 'absolute',
          top: 60,
          left: 72,
          fontSize: 11,
          fontWeight: '700',
        }}>
       DOB: {FetchOwnerDetails.DobOwner? FetchOwnerDetails.DobOwner.split('T')[0] : ''}
      </Text>
       <Text
        style={{
          color: 'black',
          position: 'absolute',
          bottom: 30,
          left: 72,

          fontSize: 9,
          fontWeight: '700',
          width:'65%'
        }}>
        {FetchOwnerDetails.Address}
      </Text>
      <Text
        style={{
          color: 'black',
          position: 'absolute',
          bottom: 5,
          left: 60,
          fontSize: 15,
          fontWeight: '700',
        }}>
        {FetchOwnerDetails.AdharNo}
      </Text>
      </>
        )}
    </View>
  );
};

export default ShowOwnerDetails;
