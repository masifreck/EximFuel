import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ShowDriverDetails = ({route}) => {
  const {driverDetails} = route.params;
  const FetchDriverDetails = driverDetails.apiResult.Result;
  console.log(driverDetails); // logging driverdetails==================

  const [isBlackList, setIsBlackList] = useState(null); // Initialize as null
  useEffect(() => {
    // Check the value of driverDetails[0].Code and update isBlackList accordingly
    if (driverDetails.apiResult.StatusCode === 0) {
      setIsBlackList(true); // Set to true if verified
    } else {
      setIsBlackList(false); // Set to false if not verified
    }
  }, [driverDetails]);

  // For adding new data just do////////////////////////////////////////////////////
  // 1.Add label
  // 2.Value : FetchDriverDetails.<Key> from above list
  function convertDateFormat(inputDate) {
    const [year, month, day] = inputDate.split('T')[0].split('-');
    return `${day}-${month}-${year}`;
  }
  function convertDateFormat(inputDate) {
    const [year, month, day] = inputDate.split('T')[0].split('-');
    return `${day}-${month}-${year}`;
  }

  // Assuming FetchDriverDetails.Dob is the variable representing the date of birth
  const dob = FetchDriverDetails.Dob;

  let formattedDate;
  if (dob) {
    formattedDate = convertDateFormat(dob);
  } else {
    formattedDate = ''; // Or any other appropriate message or action
  }

  const data = [
    {label: 'Driver Name', value: FetchDriverDetails.DriverName},
    {label: 'Dl Number', value: FetchDriverDetails.DLNumber},
    {label: 'Driver Email', value: FetchDriverDetails.DriverEmail},
    {label: 'Primary Contact No', value: FetchDriverDetails.PrimaryContactNo},
    {
      label: 'Secondary Contact No',
      value: FetchDriverDetails.SecondaryContactNo,
    },
    {label: 'Pan Number', value: FetchDriverDetails.PanNo},
    {label: 'Aadhar Number', value: FetchDriverDetails.AdharNo},
    {label: 'Dob Driver', value: formattedDate},
    {
      label: 'Driver Address',
      value: FetchDriverDetails.DriverAddress,
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View style={styles.header}>
            <View>
              <Image
                style={styles.img}
                source={require('../assets/driver.png')}
              />
            </View>
            {/* <View style={styles.driverInfo}>
              <Text style={styles.nameTxt}>
                {FetchDriverDetails.DriverName}
              </Text>
              <Text style={styles.emailTxt}>{FetchDriverDetails.DlNumber}</Text>
            </View> */}
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  blackList: {
    height: 28,
    width: 28,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  driverInfo: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  nameTxt: {
    fontSize: 28,
    fontWeight: '700',
    color: 'black',
    padding: 6,
  },
  emailTxt: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    padding: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  label: {
    fontWeight: '900',
    fontSize: 17,
    color: 'black',
    flex: 1,
  },
  value: {
    fontWeight: '500',
    fontSize: 17,
    marginLeft: 5,
    color: '#363432',
    flex: 1,
  },
});

const AdharCard = () => {
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
        }}
      />
    </View>
  );
};

export default ShowDriverDetails;
