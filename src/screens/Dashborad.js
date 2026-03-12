import React ,{useState, useEffect}from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const DashboardScreen = ({ navigation }) => {
  const handleLogout = async () => {
    Alert.alert(
      'Logout 🚪',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.replace('Login');
          },
        },
      ],
    );
  };
const [username, setUsername] = useState('');
const [isFuelManagement, setIsFuelManagement] = useState(false);
const [isMaintenance, setIsMaintenance] = useState(false);
const [isFinalApproval, setisFinalApproval]=useState(false);
const [isFuelApproval, setisFuelApproval]=useState(false);
useEffect(() => {
  const getUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
       const maintenance = await AsyncStorage.getItem('isMaintenance');
      const fuelManagement = await AsyncStorage.getItem('isFuelManagement');
      const finalApproval = await AsyncStorage.getItem('isFinalApproval');
      const fuelapproval = await AsyncStorage.getItem('isFuelApproval');
      if (storedUsername) {
        setUsername(storedUsername);
      }
      if (maintenance === 'true') {
        setIsMaintenance(true);
      }
      if (fuelManagement === 'true') {
        setIsFuelManagement(true);
      }
      if(finalApproval === 'true'){
        setisFinalApproval(true)
      }
      if(fuelapproval === 'true'){
        setisFuelApproval(true)
      }
    } catch (error) {
      console.log('Failed to load username', error);
    }
  };

  getUserData();
}, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#2563EB" barStyle="light-content" />

      {/* 🔝 Header */}
      <View style={styles.header}>
  <View>
    <Text style={styles.welcomeText}>👋 Welcome,</Text>
    <Text style={styles.userName}>{username}</Text>

    <View style={{ marginTop: 6 }}>
      <Text style={styles.headerTitle}>Tranzol 🚚</Text>
      <Text style={styles.headerSubTitle}>
        Smart Logistics Dashboard
      </Text>
    </View>
  </View>

  <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
  <Image style ={{width:30,height:30}} source={require('../assets/logout.png')}/>
  </TouchableOpacity>
</View>


      {/* 🧩 Cards */}
      {/* 🧩 Cards */}
<View style={styles.cardContainer}>


    <View style={{flexDirection:'row', justifyContent:'space-between',gap:12,height:200,
      marginTop:10
    }}>
      {isFuelApproval && (
    <TouchableOpacity
  activeOpacity={0.85}
  style={[styles.card, styles.fuelCard,{width:'48%', justifyContent:'center'}]}
  onPress={() => navigation.navigate('fuellist')}
>
  <View>
  <View style={styles.cardHeader}>
    {/* <View style={styles.iconCircle}>
      <Text style={styles.cardEmoji}>🛢️</Text>
    </View> */}
    <View style={styles.cardText}>
      <Text style={styles.cardTitle}>Fuel Requests</Text>
      <Text style={styles.cardDesc}>
        Add more details fuel
      </Text>
    </View>
    <Text style={styles.cardArrow}></Text>
  </View>
   
  </View>
   <View style={[styles.iconCircle,{marginLeft:'auto', marginRight:'auto',marginTop:10}]}>
      <Text style={styles.cardEmoji}>🛢️ </Text>
    </View>
</TouchableOpacity>
  )}

  {isFuelManagement && (
  <TouchableOpacity
  activeOpacity={0.85}
   style={[styles.card, styles.fuelCard,{width:'48%', justifyContent:'center'}]}
  onPress={() => navigation.navigate('fuelmanagement')}
>
  <View style={styles.cardHeader}>

    <View style={styles.cardText}>
      <Text style={styles.cardTitle}>Fuel Entry</Text>
      <Text style={styles.cardDesc}>
        Add new fuel details
      </Text>
    </View>
 
  </View>
   <View style={[styles.iconCircle,{marginLeft:'auto', marginRight:'auto',marginTop:10}]}>
      <Text style={styles.cardEmoji}>📝</Text>
    </View>
</TouchableOpacity>
  )}
    </View>


  <TouchableOpacity
    activeOpacity={0.85}
    style={[styles.card, styles.expenseCard]}
    onPress={() =>
      Alert.alert('🚧 Coming Soon', 'Vehicle inspection feature will be available soon.')
    }
  >
    <View style={styles.cardHeader}>
      <View style={styles.iconCircle}>
        <Text style={styles.cardEmoji}>🛠️</Text>
      </View>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>Vehicle Inspection</Text>
        <Text style={styles.cardDesc}>
          Inspect vehicle condition and safety
        </Text>
      </View>
      <Text style={styles.cardArrow}>›</Text>
    </View>
  </TouchableOpacity>

  {isMaintenance && (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, styles.fleetCard]}
      onPress={() => navigation.navigate('vehicleexpense')}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconCircle}>
          <Text style={styles.cardEmoji}>💰🚗</Text>
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Vehicle Maintenance</Text>
          <Text style={styles.cardDesc}>
            Track vehicle expenses easily
          </Text>
        </View>
        <Text style={styles.cardArrow}>›</Text>
      </View>
    </TouchableOpacity>
  )}

  {isMaintenance && (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, styles.pendingCard]}
      onPress={() => navigation.navigate('pendingapproval')}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconCircle}>
          <Text style={styles.cardEmoji}>⏳</Text>
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Pending</Text>
          <Text style={styles.cardDesc}>
            Requests waiting for approval
          </Text>
        </View>
        <Text style={styles.cardArrow}>›</Text>
      </View>
    </TouchableOpacity>
  )}

  {isMaintenance && (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, styles.approvedCard]}
      onPress={() => navigation.navigate('approvedlist')}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconCircle}>
          <Text style={styles.cardEmoji}>🟢</Text>
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Approved</Text>
          <Text style={styles.cardDesc}>
            View approved requests
          </Text>
        </View>
        <Text style={styles.cardArrow}>›</Text>
      </View>
    </TouchableOpacity>
  )}

  {isMaintenance && (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, styles.rejectedCard]}
      onPress={() => navigation.navigate('rejectedlist')}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconCircle}>
          <Text style={styles.cardEmoji}>🔴</Text>
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Rejected</Text>
          <Text style={styles.cardDesc}>
            View rejected requests
          </Text>
        </View>
        <Text style={styles.cardArrow}>›</Text>
      </View>
    </TouchableOpacity>
  )}

{isFinalApproval && (
  <TouchableOpacity
    activeOpacity={0.85}
    style={[styles.card, styles.finalApprovedCard]}
    onPress={() => navigation.navigate('finalapprovedlist')}
  >
    <View style={styles.cardHeader}>
      <View style={styles.iconCircle}>
        <Text style={styles.cardEmoji}>🏁</Text>
      </View>

      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>Final Approved</Text>
        <Text style={styles.cardDesc}>
          Final approved vehicle expenses
        </Text>
      </View>

      <Text style={styles.cardArrow}>›</Text>
    </View>
  </TouchableOpacity>
)}
<TouchableOpacity
  activeOpacity={0.85}
  style={[styles.card, styles.expenseBookingReportCard]}
  onPress={() => navigation.navigate('report')}
>
  <View style={styles.cardHeader}>
    <View style={styles.iconCircle}>
      <Text style={styles.cardEmoji}>📊</Text>
    </View>

    <View style={styles.cardText}>
      <Text style={styles.cardTitle}>Expense Booking Report</Text>
      <Text style={styles.cardDesc}>
        View and analyze expense booking details
      </Text>
    </View>

    <Text style={styles.cardArrow}>›</Text>
  </View>
</TouchableOpacity>

</View>


      {/* ⚡ Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by <Text style={styles.footerBrand}>Tranzol 🚀 </Text>
            V-2.6 </Text>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F9',
  },

  /* ===== Header ===== */
  header: {
    backgroundColor: '#2563EB',
    paddingTop: 28,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8,
  },

  welcomeText: {
    fontSize: 13,
    color: '#DCE4FF',
    fontWeight: '500',
  },

  userName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#EAF0FF',
  },

  headerSubTitle: {
    fontSize: 12,
    color: '#C7D2FE',
    marginTop: 2,
  },

  logoutBtn: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    padding: 8,
    borderRadius: 14,
  },

  logoutIcon: {
    fontSize: 18,
  },

  /* ===== Cards ===== */
  cardContainer: {
    padding: 20,
    marginTop: -10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  cardEmoji: {
    fontSize: 26,
  },

  cardText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },

  cardDesc: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },

  cardArrow: {
    fontSize: 28,
    color: '#9CA3AF',
    marginLeft: 8,
  },

  /* ===== Card Variants ===== */
  fuelCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#F97316',
  },

  fleetCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#22C55E',
  },

  expenseCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#A855F7',
  },

  pendingCard: {
    backgroundColor: '#EFF6FF',
    borderLeftWidth: 5,
    borderLeftColor: '#2563EB',
  },

  approvedCard: {
    backgroundColor: '#ECFDF5',
    borderLeftWidth: 5,
    borderLeftColor: '#16A34A',
  },

  rejectedCard: {
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 5,
    borderLeftColor: '#DC2626',
  },
finalApprovedCard: {
  backgroundColor: '#F0FDF4',
  borderLeftWidth: 5,
  borderLeftColor: '#15803D',
},
expenseBookingReportCard: {
  backgroundColor: '#F3E8FF', // soft lavender
},

  /* ===== Footer ===== */
  footer: {
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  footerBrand: {
    fontWeight: '700',
    color: '#2563EB',
  },
});

