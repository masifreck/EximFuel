import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterConsignee({ onSuccess, onClose }) {
  const [apiTokenReceived, setapiTokenReceived] = useState(null);
  const [CName, setCName] = useState('');
  const [GSTNo, setGSTNo] = useState('');
  const [CAddress, setCAddress] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem('Token')
      .then(token => setapiTokenReceived(token))
      .catch(error => console.error('Error retrieving token:', error));
  }, []);

  const handleSave = async () => {
    if (!CName.trim() || !GSTNo.trim() || !CAddress.trim()) {
      Alert.alert('❌ Validation Error', 'All fields are mandatory!');
      return;
    }

    setLoading(true);
    try {
      const postData = {
        CName: CName.trim(),
        GSTNo: GSTNo.trim(),
        CAddress: CAddress.trim(),
      };

      const response = await fetch(
        'https://exim.tranzol.com/api/LoadingChallan/CreateConsignee',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${apiTokenReceived}`,
          },
          body: JSON.stringify(postData),
        },
      );

      const text = await response.text();
      let data = null;

      if (text && text.trim() !== '') {
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.warn('Invalid JSON:', text);
        }
      }

      setLoading(false);

      if (response.ok && data?.StatusCode === 0 && data?.Result) {
        Alert.alert(
          '✅ Success',
          `Successfully created consignor!\n\n🏢 Name: ${data.Result.CName}\n🆔 ID: ${data.Result.Id}\n🧾 GST: ${data.Result.GSTNo}\n📍 Address: ${data.Result.CAddress}`
        );

        if (onSuccess) onSuccess(data.Result);
        if (onClose) onClose(); // ✅ Automatically close the modal
      } else if (!response.ok) {
        Alert.alert('⚠️ Server Error', `HTTP ${response.status}`);
      } else {
        Alert.alert('❌ Error', data?.Error || 'Unexpected response from server');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error saving consignor:', error);
      Alert.alert('⚠️ Network Error', 'Failed to save consignor.');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'center', marginBottom:10,color:'black'}}>Register New Consignee</Text>
      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>✖ Close</Text>
      </TouchableOpacity>

      {/* Consignor Name */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>🏢 Consignee Name</Text>
        <Text style={styles.required}>*</Text>
      </View>
      <TextInput
        value={CName}
        onChangeText={setCName}
        placeholder="Enter Consignor Name"
        style={styles.input}
      />

      {/* GST Number */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>💳 GST Number</Text>
        <Text style={styles.required}>*</Text>
      </View>
      <TextInput
        value={GSTNo}
        onChangeText={setGSTNo}
        placeholder="Enter GST Number"
        style={styles.input}
        autoCapitalize="characters"
      />

      {/* Address */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>📍 Address</Text>
        <Text style={styles.required}>*</Text>
      </View>
      <TextInput
        value={CAddress}
        onChangeText={setCAddress}
        placeholder="Enter Address"
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={3}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleSave}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>💾 Save Consignor</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeText: {
    fontSize: 16,
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  required: {
    color: 'red',
    fontSize: 18,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    marginBottom: 14,
    elevation: 2,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0078D7',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 3,
    marginTop: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
