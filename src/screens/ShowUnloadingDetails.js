
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

const ShowUnloadingDetails = ({navigation}) => {
  const route = useRoute();
  const {Unloading,finishGoodsData} = route.params;

  const FetchminesDetails = Unloading?.date;
  const LoadingDetails = finishGoodsData?.apiResult?.Result || '';
  console.log('Loading Details', finishGoodsData);
 const HandleNavigation=()=>{
  navigation.navigate('updateUnloadingChalan',{Unloading:Unloading, finishGoodsData:LoadingDetails} )
 }
  return (
    <ScrollView>
      <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
      <Text style={styles.levelText}>Challan Details</Text>
      <TouchableOpacity onPress={HandleNavigation}>
        <Image style={{width:50,height:50}} source={require('../assets/edit.png')}/>
      </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TableRow title="ChallanNo" value={LoadingDetails.ChallanNo} />
        <TableRow title="UnloadDate" value={FetchminesDetails.UnloadDate} />
        <TableRow title="WayBillNo" value={LoadingDetails.EwayBillNo1} />
        <TableRow title="GrossWt" value={LoadingDetails.GrossWt} />
        <TableRow title="TareWt" value={LoadingDetails.TareWt} />
        <TableRow title="NetWt" value={LoadingDetails.NetWt} />
      
        <TableRow title="LoadDate" value={LoadingDetails.LoadDate} />
        <TableRow title="LoadType" value={LoadingDetails.LoadType} />
        <TableRow title="GSPNo" value={LoadingDetails.GPSNo} />
       <TableRow
  title="GPSReceived"
  value={LoadingDetails.IsGpsReceived === 'True' ? 'yes' : 'no'}
/>


        <TableRow title="VehicleNo" value={LoadingDetails.VehicleNo} />
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
