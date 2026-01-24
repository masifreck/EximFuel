import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const FuelManagementScreen = ({ navigation }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [fuelQty, setFuelQty] = useState('');
  const [remarks, setRemarks] = useState('');
const [balanceFuel, setBalanceFuel] = useState('');

  // 🧪 Dummy Trip Data
  const tripData = [
    {
      label: 'Trip No: TRP-101',
      value: 'TRP-101',
      tripNo: 'TRP-101',
      sectorId: 'SEC-12',
      distance: '450 KM',
      vehicleNo: 'OD-02-AB-4567',
      loadDate: '2024-10-12',
    },
    {
      label: 'Trip No: TRP-102',
      value: 'TRP-102',
      tripNo: 'TRP-102',
      sectorId: 'SEC-18',
      distance: '320 KM',
      vehicleNo: 'WB-06-CD-8899',
      loadDate: '2024-10-15',
    },
  ];

  const handleSubmit = () => {
    if (!selectedTrip || !balanceFuel || !fuelQty) {
      Alert.alert('⚠️ Required', 'Please select trip and enter fuel quantity');
      return;
    }

    Alert.alert(
      '✅ Success',
      'Fuel details submitted successfully ⛽',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 🔝 Header */}
      <Text style={styles.header}>Fuel Management ⛽</Text>

      {/* 🔽 Trip Dropdown */}
      <Text style={styles.label}>Select Trip 🚛</Text>
      <Dropdown
        style={styles.dropdown}
        data={tripData}
        labelField="label"
        valueField="value"
        placeholder="Choose Trip Number"
        value={selectedTrip?.value}
        onChange={(item) => setSelectedTrip(item)}
      />

      {/* 📋 Selected Trip Details */}
      {selectedTrip && (
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Trip Details 📄</Text>

          <Text style={styles.detailText}>
            🆔 Trip No: {selectedTrip.tripNo}
          </Text>
          <Text style={styles.detailText}>
            📍 Sector ID: {selectedTrip.sectorId}
          </Text>
          <Text style={styles.detailText}>
            🛣️ Distance: {selectedTrip.distance}
          </Text>
          <Text style={styles.detailText}>
            🚚 Vehicle No: {selectedTrip.vehicleNo}
          </Text>
          <Text style={styles.detailText}>
            📅 Load Date: {selectedTrip.loadDate}
          </Text>
        </View>
      )}

      {/* 🔢 Fuel Quantity */}
      {/* 🔢 Balance Fuel */}
<Text style={styles.label}>Balance Fuel (Litres) 🛢️</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  placeholder="Enter balance fuel"
  value={balanceFuel}
  onChangeText={setBalanceFuel}
/>

      <Text style={styles.label}>Fuel Quantity (Litres) ⛽</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter fuel quantity"
        value={fuelQty}
        onChangeText={setFuelQty}
      />

      {/* 💬 Remarks */}
      <Text style={styles.label}>Remarks 📝</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter remarks"
        multiline
        value={remarks}
        onChangeText={setRemarks}
      />

      {/* 🚀 Submit */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit ✅</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 20,
  },

  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 15,
  },

  dropdown: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    elevation: 2,
  },

  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    elevation: 3,
  },

  detailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111',
  },

  detailText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    elevation: 2,
  },

  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },

  submitBtn: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
    elevation: 4,
  },

  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default FuelManagementScreen;
