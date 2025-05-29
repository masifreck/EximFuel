import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import { darkBlue } from '../components/constant';
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

const ShowMinesDetails = () => {
  const route = useRoute();
  const {minesDetails} = route.params;

  const FetchminesDetails = minesDetails.apiResult.Result;
  console.log(FetchminesDetails);

  return (
    <ScrollView>
      <Text style={styles.levelText}>Mines Details</Text>
      <View style={styles.inputContainer}>
        <TableRow title="E-Challan No" value={FetchminesDetails.EChallanNo} />
        <TableRow title="Challan No" value={FetchminesDetails.ChallanNo} />
        <TableRow title="Truck Source" value={FetchminesDetails.TruckSource} />
        <TableRow title="E-way Bill No" value={FetchminesDetails.EwayBillNo} />
        <TableRow
          title="E-way Bill No1"
          value={FetchminesDetails.EwayBillNo1}
        />
        <TableRow
          title="E-way Bill No2"
          value={FetchminesDetails.EwayBillNo2}
        />
        <TableRow
          title="E-way Bill No3"
          value={FetchminesDetails.EwayBillNo3}
        />
        <TableRow
          title="E-way Bill No4"
          value={FetchminesDetails.EwayBillNo4}
        />
        <TableRow
          title="E-way Bill No5"
          value={FetchminesDetails.EwayBillNo5}
        />
        <TableRow
          title="E-way Bill No6"
          value={FetchminesDetails.EwayBillNo6}
        />
        <TableRow
          title="E-way Bill No7"
          value={FetchminesDetails.EwayBillNo7}
        />
        <TableRow
          title="E-way Bill No8"
          value={FetchminesDetails.EwayBillNo8}
        />
        <TableRow
          title="E-way Bill No9"
          value={FetchminesDetails.EwayBillNo9}
        />


        <TableRow
          title="Client Invoice No"
          value={FetchminesDetails.ClientInvoiceNo}
        />
        <TableRow
          title="Client Invoice No1"
          value={FetchminesDetails.ClientInvoiceNo1}
        />
        <TableRow
          title="Client Invoice No2"
          value={FetchminesDetails.ClientInvoiceNo2}
        />
                <TableRow
          title="Client Invoice No3"
          value={FetchminesDetails.ClientInvoiceNo3}
        />
        <TableRow
          title="Client Invoice No4"
          value={FetchminesDetails.ClientInvoiceNo4}
        />
        <TableRow
          title="Client Invoice No5"
          value={FetchminesDetails.ClientInvoiceNo5}
        />
        <TableRow
          title="Client Invoice No6"
          value={FetchminesDetails.ClientInvoiceNo6}
        />
        <TableRow
          title="Client Invoice No7"
          value={FetchminesDetails.ClientInvoiceNo7}
        />
        <TableRow
          title="Client Invoice No8"
          value={FetchminesDetails.ClientInvoiceNo8}
        />
        <TableRow
          title="Client Invoice No9"
          value={FetchminesDetails.ClientInvoiceNo9}
        />
        <TableRow title="TP No" value={FetchminesDetails.TPNo} />
        <TableRow title="Load Date" value={FetchminesDetails.LoadDate} />
        <TableRow title="Freight Rate" value={FetchminesDetails.FreightRate} />
        <TableRow title="Load Type" value={FetchminesDetails.LoadType} />
        <TableRow title="Gross WT" value={FetchminesDetails.GrossWt} />
        <TableRow title="Tare WT" value={FetchminesDetails.TareWt} />
        <TableRow title="Net WT" value={FetchminesDetails.NetWt} />
        <TableRow title="DieselAdvance" value={FetchminesDetails.DieselAdvance} />
        <TableRow title="Cash" value={FetchminesDetails.Cash} />
        <TableRow
          title="MaterialValue"
          value={FetchminesDetails.MaterialValue}
        />
        <TableRow title="Total Bags" value={FetchminesDetails.TotalBag} />
        <TableRow title="Total Loose" value={FetchminesDetails.TotalLoose} />
        <TableRow title="STO No" value={FetchminesDetails.STONo} />
        <TableRow title="Del No" value={FetchminesDetails.DelNo} />
        <TableRow title="GPS No" value={FetchminesDetails.GPSNo} />
        <TableRow title="GuarnteeWt" value={FetchminesDetails.GuarnteeWt} />
        <TableRow
          title="Current Location"
          value={FetchminesDetails.CurrentLocation}
        />

        <TableRow title="Remarks" value={FetchminesDetails.Remarks} />
      </View>
      {/* 
      <Text style={styles.levelText}>Mines Details</Text>

      <View style={[styles.inputContainer, {marginBottom: 10}]}>
        <TableRow
          title="OwnerPartyName)"
          value={FetchVehicleDetails.OwnerPartyName}
        />
        <TableRow
          title="OwnerPanNumber"
          value={FetchVehicleDetails.OwnerPanNumber}
        />
        <TableRow
          title="OwnerContactNo"
          value={FetchVehicleDetails.OwnerContactNo}
        />
        <TableRow
          title="OwnerAddress"
          value={FetchVehicleDetails.OwnerAddress}
        />
      </View> */}

      {/* <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>Update Vehicle Owner Details</Text>
      </TouchableOpacity> */}
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
    borderBottomWidth: 1,
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
    fontSize: 16,
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
    fontWeight: '900',

    paddingTop: 15,
    marginLeft: 10,
    textAlign: 'center',
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

export default ShowMinesDetails;
