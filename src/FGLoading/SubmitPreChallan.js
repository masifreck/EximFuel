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
import { darkBlue } from '../components/constant';


const SubmitPreChallan = ({ route,navigation }) => {
    const [apiTokenReceived, setapiTokenReceived] = useState(null);
  AsyncStorage.getItem('Token')
    .then(token => {
      setapiTokenReceived(token);
    })
    .catch(error => {
      const TokenReceived = useApiToken();
      setapiTokenReceived(TokenReceived);
    });
  const { JobDetails, VEHICLENO, VEHICLEID, DLNo, PANNo ,selectedDate, driverId,driverName,ownerId} = route.params;
//console.log('owner id',ownerId, VEHICLENO)
 
  const [ownerData, setOwnerData] = useState([]);
  const [loading, setLoading] = useState(false);
   const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    if (PANNo && apiTokenReceived) {
    const fetchOwnerDetails = async () => {
  try {
    setLoading(true);
   // console.log(`https://Exim.Tranzol.com/api/OwnerApi/GetOwner?panNo=${PANNo}`);

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
   // console.log("Owner API Response:", data);

    if (data?.apiResult?.Result) {
      setOwnerData(data.apiResult.Result); // <-- set the actual owner details
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
  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const payload = {
        JobId: JobDetails?.value,
        VehicleId: VEHICLEID,
        OwnerId: ownerId,
        DriverId: driverId, // You may pass correct driverId if available
        DriverDlNo: DLNo,
        AllotmentDate: selectedDate,
       // CreatedBy: 1,
      };

     // console.log("Submitting Payload:", payload);

  const response = await fetch(
  "https://Exim.Tranzol.com/api/LoadingChallan/CreatePreLoading",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${apiTokenReceived}`, // exactly as in Postman
    },
    body: JSON.stringify(payload),
  }
);
//console.log('pre loading payload',payload)

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
     // console.log("Pre-Challan API Response:", result);

      if (result?.data) {
         Alert.alert(
    "Success",
    `✅ Successfully created Pre-Challan\n\n` +
    `Job ID: ${result?.data?.JobId ?? '-'}\n` +
    `Vehicle ID: ${result?.data?.VehicleId ?? '-'}\n` +
    `Owner ID: ${result?.data?.OwnerId ?? '-'}\n` +
    `Driver ID: ${result?.data?.DriverId ?? '-'}\n` +
    `Driver DL No: ${result?.data?.DriverDlNo ?? '-'}\n`  )
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to create Pre-Challan");
      }

    } catch (error) {
      console.error("Error submitting Pre-Challan:", error);
      Alert.alert("Error", "Failed to submit Pre-Challan");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <View style={[styles.container,{paddingBottom:10}]}>

      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
      ) : (
      <ScrollView  contentContainerStyle={{ paddingBottom: 0 }}>
  {/* Owner Details */}
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Owner Details</Text>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Owner Name</Text>
      <Text style={styles.detailValue}>{ownerData?.OwnerName ?? "N/A"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>PAN</Text>
      <Text style={styles.detailValue}>{ownerData?.PanNo ?? "N/A"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Mobile</Text>
      <Text style={styles.detailValue}>{ownerData?.PrimaryMobileNo ?? "N/A"}</Text>
    </View>
      <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Bank Name</Text>
      <Text style={styles.detailValue}>{ownerData?.BankNameName ?? " "}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Account Type </Text>
      <Text style={styles.detailValue}>{ownerData?.BankTypeName ?? "N/A"}</Text>
    </View>

     <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Account No</Text>
      <Text style={styles.detailValue}>{ownerData?.AccountNo ?? " "}</Text>
    </View>
     <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Account No</Text>
      <Text style={styles.detailValue}>{ownerData?.AccountNo ?? " "}</Text>
    </View>
     <View style={styles.detailRow}>
      <Text style={styles.detailKey}>IFSC Code</Text>
      <Text style={styles.detailValue}>{ownerData?.IFSCCode ?? " "}</Text>
    </View>
   
  </View>

  {/* Driver Details */}
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Driver Details</Text>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Driver Name</Text>
      <Text style={styles.detailValue}>{driverName ? driverName.split("(")[0] : "-"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>DL No</Text>
      <Text style={styles.detailValue}>{DLNo || "-"}</Text>
    </View>
  </View>

  {/* Vehicle Details */}
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Vehicle Details</Text>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Vehicle No</Text>
      <Text style={styles.detailValue}>{VEHICLENO?VEHICLENO.split(' ')[0] : "-"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Vehicle Id</Text>
      <Text style={styles.detailValue}>{VEHICLEID || "-"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Alltmnt Date</Text>
      <Text style={styles.detailValue}>{selectedDate || "-"}</Text>
    </View>
  </View>

  {/* Job Details */}
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Job Details</Text>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Consignor</Text>
      <Text style={styles.detailValue}>{JobDetails?.ConsignorName || "-"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Consignee</Text>
      <Text style={styles.detailValue}>{JobDetails?.ConsigneeName || "-"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Loading Point</Text>
      <Text style={styles.detailValue}>{JobDetails?.LoadingPoint || "-"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Unloading Point</Text>
      <Text style={styles.detailValue}>{JobDetails?.UnloadingPoint || "-"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Material</Text>
      <Text style={styles.detailValue}>{JobDetails?.MaterialName || "-"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Job No</Text>
      <Text style={styles.detailValue}>{JobDetails?.label || "-"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>Job Id</Text>
      <Text style={styles.detailValue}>{JobDetails?.value || "-"}</Text>
    </View>
  </View>
   <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={submitting}>
        {submitting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
</ScrollView>

      )}

      {/* Submit button */}
     

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
    backgroundColor: darkBlue,
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
  section: {
  backgroundColor: "#f9f9f9",
  borderRadius: 10,
  padding: 12,
  marginBottom: 15,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 2,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 8,
  color: darkBlue,
  borderBottomWidth: 1,
  borderBottomColor: "#ddd",
  paddingBottom: 4,
  textAlign: "center",
},


});
