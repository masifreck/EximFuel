
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useApiToken from '../components/Token';
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

const ShowUnloadingDetails = () => {
  const route = useRoute();
  const {Unloading} = route.params;

  const FetchminesDetails = Unloading.apiResult.Result;
  console.log(FetchminesDetails);
  return (
    <ScrollView>
      <Text style={styles.levelText}>Challan Details</Text>
      <View style={styles.inputContainer}>
        <TableRow title="ChallanNo" value={FetchminesDetails.ChallanNo} />
        <TableRow title="UnloadDate" value={FetchminesDetails.UnloadDate} />
        <TableRow title="WayBillNo" value={FetchminesDetails.WayBillNo} />
        <TableRow title="GrossWt" value={FetchminesDetails.GrossWt} />
        <TableRow title="TareWt" value={FetchminesDetails.TareWt} />
        <TableRow title="NetWt" value={FetchminesDetails.NetWt} />
        <TableRow title="Moisture" value={FetchminesDetails.Moisture} />
        <TableRow title="LoadDate" value={FetchminesDetails.LoadDate} />
        <TableRow title="LoadType" value={FetchminesDetails.LoadType} />
        <TableRow title="GSPNo" value={FetchminesDetails.GSPNo} />
        <TableRow title="GPSReceived" value={FetchminesDetails.GPSReceived} />
        <TableRow title="VehicleNo" value={FetchminesDetails.VehicleNo} />
        <TableRow
          title="UnloadGrossWt"
          value={FetchminesDetails.UnloadGrossWt}
        />
        <TableRow title="UnloadTareWt" value={FetchminesDetails.UnloadTareWt} />
        <TableRow title="UnloadWt" value={FetchminesDetails.UnloadWt} />
        <TableRow title="GRNNumber" value={FetchminesDetails.GRNNumber} />
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
export default ShowUnloadingDetails;
