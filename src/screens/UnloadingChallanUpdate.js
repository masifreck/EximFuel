import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function UnloadingChallanUpdate({ route }) {
  const { date } = route.params; // route data

  const [loading, setLoading] = useState(false);

  // Initialize states with 3 decimal precision using optional chaining
  const [UnloadGrossWt, setUnloadGrossWt] = useState(
    date?.UnloadGrossWt ? parseFloat(date.UnloadGrossWt).toFixed(3) : ''
  );
  const [UnloadTareWt, setUnloadTareWt] = useState(
    date?.UnloadTareWt ? parseFloat(date.UnloadTareWt).toFixed(3) : ''
  );
  const [UnloadWt, setUnloadWt] = useState(
    date?.UnloadWt ? parseFloat(date.UnloadWt).toFixed(3) : ''
  );
  const [GRNNumber, setGRNNumber] = useState(date?.GRNNumber || '');

  // Function to handle update API call
  const handleUpdate = async () => {
    if (!UnloadGrossWt || !UnloadTareWt || !UnloadWt || !GRNNumber) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('Id', date?.Id);
      formData.append('LoadingId', date?.LoadingId);
      formData.append('IsGpsReceived', date?.IsGpsReceived);
      formData.append('UnloadDate', date?.UnloadDate);
      formData.append('UnloadGrossWt', UnloadGrossWt);
      formData.append('UnloadTareWt', UnloadTareWt);
      formData.append('UnloadWt', UnloadWt);
      formData.append('GRNNumber', GRNNumber);

      const response = await fetch(
        'https://Exim.Tranzol.com/api/LoadingChallan/CreateUnloadingChallan',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok && data?.apiResult?.StatusCode === 0) {
        Alert.alert('Success', data.apiResult.Result || 'Updated successfully!');
      } else {
        Alert.alert('Error', data?.apiResult?.Error || 'Update failed!');
      }
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Update Unloading Challan</Text>

      <Text style={styles.label}>Unload Gross Weight</Text>
      <TextInput
        style={styles.input}
        value={UnloadGrossWt.toString()}
        onChangeText={(val) => setUnloadGrossWt(val.replace(/[^0-9.]/g, ''))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Unload Tare Weight</Text>
      <TextInput
        style={styles.input}
        value={UnloadTareWt.toString()}
        onChangeText={(val) => setUnloadTareWt(val.replace(/[^0-9.]/g, ''))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Unload Weight</Text>
      <TextInput
        style={styles.input}
        value={UnloadWt.toString()}
        onChangeText={(val) => setUnloadWt(val.replace(/[^0-9.]/g, ''))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>GRN Number</Text>
      <TextInput
        style={styles.input}
        value={GRNNumber}
        onChangeText={setGRNNumber}
        placeholder="Enter GRN Number"
      />

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.updateText}>Update</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
  },
  updateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  updateText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
