import React ,{useState, useEffect}from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
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
useEffect(() => {
  const getUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
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
    <Text style={styles.logoutIcon}>🚪</Text>
  </TouchableOpacity>
</View>


      {/* 🧩 Cards */}
      <View style={styles.cardContainer}>
        {/* 🚛 Fleet Management */}
       

        {/* ⛽ Fuel Management */}
        <TouchableOpacity
          style={[styles.card, styles.fuelCard]}
          onPress={() => navigation.navigate('fuelmanagement')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>⛽</Text>
            <Text style={styles.cardTitle}>Fuel Management</Text>
          </View>
          <Text style={styles.cardDesc}>
            Track fuel usage, balance & expenses
          </Text>
        </TouchableOpacity>
        
          {/* 💰 Expense Booking */}
  <TouchableOpacity
    style={[styles.card, styles.expenseCard]}
    onPress={() => navigation.navigate('expensebooking')}
  >
    <View style={styles.cardHeader}>
      <Text style={styles.cardEmoji}>💰</Text>
      <Text style={styles.cardTitle}>Expense Booking</Text>
    </View>
    <Text style={styles.cardDesc}>
      Record trip-wise expenses and manage cost tracking
    </Text>
  </TouchableOpacity>

<TouchableOpacity
  style={[styles.card, styles.fleetCard]}
  onPress={() => navigation.navigate('vehicleexpense')}
>
  <View style={styles.cardHeader}>
    <Text style={styles.cardEmoji}>💰🚗</Text>
    <Text style={styles.cardTitle}>Vehicle Expense</Text>
  </View>
  <Text style={styles.cardDesc}>
    Track fuel, maintenance & other vehicle expenses easily
  </Text>
</TouchableOpacity>

{/* ✅ Approval */}
<TouchableOpacity
  style={[styles.card, styles.approvalCard]}
  onPress={() =>
    Alert.alert(
      '🚧 Coming Soon',
      'Approval feature will be available soon ✅',
      [{ text: 'OK 👍' }],
    )
  }
>
  <View style={styles.cardHeader}>
    <Text style={styles.cardEmoji}>✅</Text>
    <Text style={styles.cardTitle}>Approvals</Text>
  </View>
  <Text style={styles.cardDesc}>
    Review and approve expense & fuel requests
  </Text>
</TouchableOpacity>

      </View>

      {/* ⚡ Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by <Text style={styles.footerBrand}>Tranzol 🚀 </Text>
            V-1.4 </Text>
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
  fontSize: 20,
  fontWeight: '800',
  color: '#FFFFFF',
  marginTop: 2,
},

headerTitle: {
  fontSize: 16,
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
  padding: 12,
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
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 22,
    marginBottom: 22,
    elevation: 5,
  },

  fleetCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#22C55E',
  },

  fuelCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#F97316',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  cardEmoji: {
    fontSize: 38,
    marginRight: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  cardDesc: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginTop: 4,
  },
expenseCard: {
  borderLeftWidth: 5,
  borderLeftColor: '#A855F7', // purple accent
},
approvalCard: {
  borderLeftWidth: 5,
  borderLeftColor: '#0EA5E9',
},


  /* ===== Footer ===== */
  footer: {
    position: 'absolute',
    bottom: 14,
    alignSelf: 'center',
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
