import { 
  View, 
  Text, 
  Alert, 
  ActivityIndicator, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { se } from 'date-fns/locale';

const SubmitPreChallan = ({ route }) => {
  const { JobDetails, VEHICLENO, VEHICLEID, DLNo, PANNo ,selectedDate} = route.params;
console.log(selectedDate)
  const [apiTokenReceived, setApiTokenReceived] = useState(null);
  const [ownerData, setOwnerData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('Token')
      .then(token => {
        setApiTokenReceived(token);
      })
      .catch(error => {
        console.log("Error retrieving token:", error);
      });
  }, []);

  useEffect(() => {
    if (PANNo && apiTokenReceived) {
      const fetchOwnerDetails = async () => {
        try {
          setLoading(true);
console.log(`https://Exim.Tranzol.com/api/OwnerApi/GetOwner?panNo=${PANNo}`)
          const response = await fetch(
            `https://Exim.Tranzol.com/api/OwnerApi/GetOwner?panNo=${PANNo}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${apiTokenReceived}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Owner API Response:", data);

          if (data?.VehicleNoList && data.VehicleNoList.length > 0) {
            setOwnerData(data.VehicleNoList);
          } else {
            Alert.alert("Error", "No owner details found.");
          }
        } catch (error) {
          console.error("Error fetching owner details:", error);
          Alert.alert("Error", "Failed to fetch owner details. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchOwnerDetails();
    }
  }, [PANNo, apiTokenReceived]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Pre-Challan</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView>
          {ownerData.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.key}>Owner Name:</Text>
                <Text style={styles.value}>{item.OwnerName}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.key}>Owner ID:</Text>
                <Text style={styles.value}>{item.OwnerId}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.key}>Vehicle No:</Text>
                <Text style={styles.value}>{item.VehicleNo}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.key}>Vehicle ID:</Text>
                <Text style={styles.value}>{item.VehicleId}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.key}>PAN No:</Text>
                <Text style={styles.value}>{item.PANNumber}</Text>
              </View>
            </View>
          ))}
                 <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Alloment Date</Text>
        <Text style={styles.detailValue}>{selectedDate||''}</Text>
      </View>
            <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Vehicle No</Text>
        <Text style={styles.detailValue}>{VEHICLENO || '-'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Vehicle Id</Text>
        <Text style={styles.detailValue}>{VEHICLEID || '-'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>DL No</Text>
        <Text style={styles.detailValue}>{DLNo || '-'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>PAN No</Text>
        <Text style={styles.detailValue}>{PANNo || '-'}</Text>
      </View>

      {/* Job Details */}
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Consignor</Text>
        <Text style={styles.detailValue}>{JobDetails?.ConsignorName || '-'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Consignee</Text>
        <Text style={styles.detailValue}>{JobDetails?.ConsigneeName || '-'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Loading P.</Text>
        <Text style={styles.detailValue}>{JobDetails?.LoadingPoint || '-'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Unloading P.</Text>
        <Text style={styles.detailValue}>{JobDetails?.UnloadingPoint || '-'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Material</Text>
        <Text style={styles.detailValue}>{JobDetails?.MaterialName || '-'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Job No</Text>
        <Text style={styles.detailValue}>{JobDetails?.label || '-'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Job Id</Text>
        <Text style={styles.detailValue}>{JobDetails?.value || '-'}</Text>
      </View>
        </ScrollView>
      )}

      {/* Submit button */}
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Submitted", "Pre-Challan Submitted!")}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubmitPreChallan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2
  },
  row: {
    flexDirection: "row",
    marginBottom: 6
  },
  key: {
    flex: 1,
    fontWeight: "bold",
    color: "#333"
  },
  value: {
    flex: 2,
    color: "#555"
  },
  button: {
    backgroundColor: "blue",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  detailKey: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  detailValue: {
    flex: 2,
    fontSize: 16,
    color: '#555',
  },

});
