import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { darkBlue, textColor } from "../components/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";

const COL_WIDTH = 120; // 🔒 Fixed width for ALL columns

const AllotmentList = ({ navigation }) => {
  const [apiTokenReceived, setApiTokenReceived] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [allotments, setAllotments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get token then fetch data
  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const token = await AsyncStorage.getItem("Token");
        setApiTokenReceived(token);
        if (token) fetchAllotments(token);
      } catch (error) {
        console.log("Error retrieving token:", error);
      }
    };
    fetchTokenAndData();
  }, []);

  // Fetch API data
  const fetchAllotments = async (token) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://Exim.Tranzol.com/api/LoadingChallan/GetPreLoading",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      setAllotments(Array.isArray(result?.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching PreLoading data:", error);
      Alert.alert("Error", "Failed to fetch allotments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const normalized = (v) => (v ?? "").toString();

  const filteredData = allotments.filter((item) => {
    const dateOnly = normalized(item.AllotmentDate).split("T")[0];
    return (
      normalized(item.JobNo).toLowerCase().includes(searchText.toLowerCase()) ||
      dateOnly.toLowerCase().includes(searchText.toLowerCase()) ||
      normalized(item.Id).includes(searchText)
    );
  });

  const handleRowClick = (item) => {
    Alert.alert(
      "Confirm",
      "Are you sure to generate challan against these details?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            navigation.navigate("NewChalan", {
              JobDetails: { label: item.JobNo, value: item.Id },
              VEHICLENO: item.VehicleNo,
              VEHICLEID: item.VehicleId, // may be undefined
              DLNo: item.DriverDlNo, // may be undefined
              PANNo: item.PANNo, // may be undefined
            });
          },
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => {
    const dateOnly = normalized(item.AllotmentDate).split("T")[0];
    return (
      <TouchableOpacity
        style={[
          styles.row,
          index % 2 === 0 ? styles.rowEven : styles.rowOdd,
        ]}
        onPress={() => handleRowClick(item)}
      >
        <Text style={[styles.cell, { width: 100 }]}>{dateOnly}</Text>
        <Text style={[styles.cell, { width: 90 }]}>{normalized(item.Id)}</Text>
        <Text style={[styles.cell, { width: 150 }]}>{normalized(item.JobNo)}</Text>
        <Text style={[styles.cell, { width: COL_WIDTH }]}>{normalized(item.VehicleNo)}</Text>
        <Text style={[styles.cell, { width: COL_WIDTH }]}>{normalized(item.DriverName)}</Text>
        <Text style={[styles.cell, { width: COL_WIDTH }]}>{normalized(item.OwnerName)}</Text>
        <Text style={[styles.cell, { width: COL_WIDTH }]}>{normalized(item.CreatedBy) || "-"}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍 Search by JobNo, Date or AllotmentId"
        style={styles.search}
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#777"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#2E86C1" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView horizontal>
          <View>
            {/* Header */}
          <View style={[styles.row, styles.header]}>
  <View style={styles.headerCellWrapper}>
    <Text style={[styles.headerCell, { width: 100 }]}>📅  Alltmnt Date</Text>
  </View>

  <View style={styles.headerCellWrapper}>
    <Text style={[styles.headerCell, { width: 90 }]}>🆔 Alltmnt Id</Text>
  </View>

  <View style={styles.headerCellWrapper}>
    <Text style={[styles.headerCell, { width: 150 }]}>📑 Job No</Text>
  </View>

  <View style={styles.headerCellWrapper}>
    <Text style={[styles.headerCell, { width: COL_WIDTH }]}>🚛 Vehicle No</Text>
  </View>

  <View style={styles.headerCellWrapper}>
    <Text style={[styles.headerCell, { width: COL_WIDTH }]}>👨‍✈️ Driver</Text>
  </View>

  <View style={styles.headerCellWrapper}>
    <Text style={[styles.headerCell, { width: COL_WIDTH }]}>👤 Owner</Text>
  </View>

  <View style={styles.headerCellWrapper}>
    <Text style={[styles.headerCell, { width: COL_WIDTH }]}> ✍️ Created By</Text>
  </View>
</View>


            {/* Rows using FlashList */}
            <FlashList
              data={filteredData}
              keyExtractor={(item, index) => `${item.Id ?? index}`}
              renderItem={renderItem}
              estimatedItemSize={55}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#F9FAFB" },
  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  rowEven: {
    backgroundColor: "#fff",
  },
  rowOdd: {
    backgroundColor: "#f8faff",
  },
  cell: {
    paddingHorizontal: 10,
    color: "#333",
    fontSize: 14,
  },
  header: {
    backgroundColor: darkBlue,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
});

export default AllotmentList;
