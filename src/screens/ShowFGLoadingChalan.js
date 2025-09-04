import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import { darkBlue } from '../components/constant';
const TableRow = ({title, value, color}) => (
  <View style={styles.tableRow}>
    <View style={styles.leftColumn}>
      <Text style={styles.leftText}>{title}</Text>
    </View>
    <View style={styles.verticalBorder} />
    <Text style={[styles.rightText, {color: color || 'black'}]}>{value || 'N/A'}</Text>
    {/*title === 'Vehicle No' && (
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
    )*/}
  </View>
);

const ShowFGLoadingChalan = () => {
  const route = useRoute();
  const {FGLoading} = route.params;

  const FetchminesDetails = FGLoading.apiResult.Result;
  console.log(FetchminesDetails);

  return (
    <ScrollView>
      <Text style={styles.levelText}>Mines Details</Text>
      <View style={styles.inputContainer}>
        <TableRow title="Challan No" value={FetchminesDetails.ChallanNo} />
        <TableRow title="Vehicle No" value={FetchminesDetails.VehicleNo} />
        <TableRow title="Owner Name" value={FetchminesDetails.OwnerName} />
        <TableRow title="Driver Name" value={FetchminesDetails.DriverName} />
        <TableRow title="Broker Name" value={FetchminesDetails.BrokerName} />
        <TableRow title="Association Name" value={FetchminesDetails.AssociationName} />
        <TableRow title="Consignee Name" value={FetchminesDetails.ConsigneeName} />
        <TableRow title="Consignor Name" value={FetchminesDetails.ConsignorName} />
        <TableRow title="Pump Name" value={FetchminesDetails.PumpName} />
        <TableRow title="Loading Point" value={FetchminesDetails.LoadingPoint} />
        <TableRow title="Unloading Point" value={FetchminesDetails.UnloadingPoint} />
        <TableRow title="Material Name" value={FetchminesDetails.MaterialName} />
        <TableRow title="Job No" value={FetchminesDetails.JobNo} />
        <TableRow title="Freight Rate" value={FetchminesDetails.FreightRate} />
        <TableRow title="Eway Bill " value={FetchminesDetails.EwayBillNo1} />
        <TableRow title="Validty UpTo" value={FetchminesDetails?.EValidity? FetchminesDetails.EValidity.split('T')[0] : ''} />
        {/* <TableRow title="Eway Bill 3" value={FetchminesDetails.EwayBillNo3} /> */}
        <TableRow title="Client Invoice " value={FetchminesDetails.ClientInvoiceNo1} />
        <TableRow title="Unloading Contact" value={FetchminesDetails.UnloadingContact} />
        {/* <TableRow title="Client Invoice 3" value={FetchminesDetails.ClientInvoiceNo3} /> */}
        <TableRow title="GPS No" value={FetchminesDetails.GPSNo} />
        <TableRow title="Cash" value={FetchminesDetails.Cash} />
        <TableRow title="Bank Amount" value={FetchminesDetails.BankAmount} />
        <TableRow title="Other Expense" value={FetchminesDetails.OtherExpense} />
        <TableRow title="Detention" value={FetchminesDetails.Detention} />
        <TableRow title="HSD" value={FetchminesDetails.HSD} />
        <TableRow title="Gross Weight" value={FetchminesDetails.GrossWt} />
        <TableRow title="Tare Weight" value={FetchminesDetails.TareWt} />
        <TableRow title="Net Weight" value={FetchminesDetails.NetWt} />
        <TableRow title="Remarks" value={FetchminesDetails.Remarks} />
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
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingVertical: 2,
  },
  leftColumn: {
    width: 120,
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
});
export default ShowFGLoadingChalan;
