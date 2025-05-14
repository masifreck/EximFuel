import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

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

const ShowVehicleDetails = ({route}) => {
  // Retrieve the vehicleDetails parameter from the route
  const {vehicleDetails} = route.params;

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

  return (
    <ScrollView>
      <Text style={styles.levelText}>Vehicle Details</Text>
      <View style={styles.inputContainer}>
        <TableRow title="VehicleNo" value={FetchVehicleDetails.VehicleNo} />
        <TableRow title="TyreNo" value={FetchVehicleDetails.TyreNo} />
        {/* <TableRow title="OwnerName" value={FetchVehicleDetails.OwnerName} /> */}
        <TableRow title="ChassicNo" value={FetchVehicleDetails.ChassicNo} />
        <TableRow title="EngineNo" value={FetchVehicleDetails.EngineNo} />
        <TableRow
          title="RoadTax Validity"
          value={FetchVehicleDetails.RoadTaxNo}
        />
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
});

export default ShowVehicleDetails;
