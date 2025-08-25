import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { textColor } from "../components/constant";

// Dummy data
const dummyData = [
  {
    allotmentDate: "2025-08-20",
    allotmentId: "A001",
    jobNo: "J1001",
    jobId: "101",
    vehicleNo: "MH12AB1234",
    createdBy: "Admin",
  },
  {
    allotmentDate: "2025-08-21",
    allotmentId: "A002",
    jobNo: "J1002",
    jobId: "102",
    vehicleNo: "DL10CD5678",
    createdBy: "User1",
  },
  {
    allotmentDate: "2025-08-22",
    allotmentId: "A003",
    jobNo: "J1003",
    jobId: "103",
    vehicleNo: "UP16XY4321",
    createdBy: "User2",
  },
];

const AllotmentList = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const filteredData = dummyData.filter(
    (item) =>
      item.jobNo.toLowerCase().includes(searchText.toLowerCase()) ||
      item.allotmentDate.toLowerCase().includes(searchText.toLowerCase()) ||
      item.allotmentId.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleRowClick = (item) => {
    Alert.alert(
      "Confirm",
      "Are you sure to generate challan against these details?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            navigation.navigate("GenerateChallan", { data: item });
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => handleRowClick(item)}
    >
      <Text style={styles.cell}>{item.allotmentDate}</Text>
      <Text style={styles.cell}>{item.allotmentId}</Text>
      <Text style={styles.cell}>{item.jobNo}</Text>
      <Text style={styles.cell}>{item.jobId}</Text>
      <Text style={styles.cell}>{item.vehicleNo}</Text>
      <Text style={styles.cell}>{item.createdBy}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by JobNo, Date or AllotmentId"
        style={styles.search}
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={[styles.row, styles.header]}>
            <Text style={styles.headerCell}>Allotment Date</Text>
            <Text style={styles.headerCell}>Allotment Id</Text>
            <Text style={styles.headerCell}>Job No</Text>
            <Text style={styles.headerCell}>Job Id</Text>
            <Text style={styles.headerCell}>Vehicle No</Text>
            <Text style={styles.headerCell}>Created By</Text>
          </View>

          {/* Table Data */}
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: textColor,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  cell: { flex: 1, paddingHorizontal: 10,color:textColor},
  header: { backgroundColor: "#f5f5f5" },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "black"},
});

export default AllotmentList;
