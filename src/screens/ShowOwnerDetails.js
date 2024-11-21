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


const ShowOwnerDetails = () => {
  const route = useRoute();
  const {ownerDetails} = route.params;
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
              color: '#453D98ff',
              fontSize: 20,
              marginBottom: 10,
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'PoppinsBold',
            }}>
            Owner Contact Details
          </Text>
          <View style={styles.inputContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 17,
                  color: 'black',
                  padding: 10,
                }}>
                Mobile Number :
              </Text>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  marginLeft: 5,
                  color: '#363432',
                  padding: 10,
                }}>
                {FetchOwnerDetails.PrimaryMobileNo}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 17,
                  color: 'black',
                  padding: 10,
                }}>
                Secondary Number :
              </Text>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  marginLeft: 5,
                  color: '#363432',
                  padding: 10,
                }}>
                {FetchOwnerDetails.SecondaryNo}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 17,
                  color: 'black',
                  padding: 10,
                }}>
                Date Of Birth :
              </Text>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  marginLeft: 5,
                  color: '#363432',
                  padding: 10,
                }}>
                {FetchOwnerDetails.DobOwner1}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 17,
                  color: 'black',
                  padding: 10,
                }}>
                Address :
              </Text>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  marginLeft: 5,
                  color: '#363432',
                  padding: 10,
                  width: 250,
                }}>
                {FetchOwnerDetails.Address}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 17,
                  color: 'black',
                  padding: 10,
                }}>
                TDS Type Name:
              </Text>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  marginLeft: 5,
                  color: '#363432',
                  padding: 10,
                  width: 200,
                }}>
                {FetchOwnerDetails.TDSTypeName}
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
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 17,
                  color: 'black',
                  padding: 10,
                }}>
                Account Number :
              </Text>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  marginLeft: 0.3,
                  color: '#363432',
                  padding: 9,
                  width:200,
                 
                }}>
                {FetchOwnerDetails.AccountNo}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 17,
                  color: 'black',
                  padding: 10,
                }}>
                Bank Name :
              </Text>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  marginLeft: 0.5,
                  color: '#363432',
                  padding: 10,
                  width:230,
              
                }}>
                {FetchOwnerDetails.BankNameName}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 17,
                  color: 'black',
                  padding: 10,
                }}>
                Account Type :
              </Text>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  marginLeft: 0.5,
                  color: '#363432',
                  padding: 10,
                  width:210,
           
                }}>
                {FetchOwnerDetails.BankTypeName}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 17,
                  color: 'black',
                  padding: 10,
                }}>
                IFSC Code :
              </Text>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  marginLeft: 0.5,
                  color: '#363432',
                  padding: 10,
                  width:230,
             
                }}>
                {FetchOwnerDetails.IFSCCode}
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: '#453D98ff',
              fontSize: 20,
              marginBottom: 10,
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'PoppinsBold',
            }}>
            Other Details
          </Text>
          <View style={styles.inputContainer}>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 17,
                  color: 'black',
                  padding: 10,
                }}>
                Total No Vehicle :
              </Text>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  marginLeft: 5,
                  color: '#363432',
                  padding: 10,
                }}>
                {FetchOwnerDetails.TotalNoVehicle}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 17,
                  color: 'black',
                  padding: 10,
                }}>
                Shortage Recovery :
              </Text>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  marginLeft: 5,
                  color: '#363432',
                  padding: 10,
                }}>
                {FetchOwnerDetails.ShortageRecovery}
              </Text>
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
          bottom: 5,
          left: 60,
          fontSize: 15,
          fontWeight: '700',
        }}>
        {FetchOwnerDetails.AdharNo}
      </Text>
    </View>
  );
};

export default ShowOwnerDetails;
