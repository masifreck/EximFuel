import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const LoadingRowDetails = ({ route }) => {
  const { rowData } = route.params;

  const renderRow = (label, value, isCurrency = false) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{isCurrency ? `₹ ${value}` : value}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚛 Loading Challan Details</Text>

      <View style={styles.card}>
        {renderRow("TP No:", rowData.TpNo)}
        {renderRow("Vehicle No:", rowData.VehicleNo)}
        {renderRow("Challan No:", rowData.ChallanNo)}
        {renderRow("Cash:", rowData.Cash, true)}
        {renderRow("Amount:", rowData.Amount, true)}
        {renderRow("HSD Amount:", rowData.HsdAmount, true)}
        {renderRow("Pump Name:", rowData.PumpName)}
        {renderRow("Slip No:", rowData.SlipNo)}
      </View>
    </ScrollView>
  );
};

export default LoadingRowDetails;

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#34495e",
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: "#2c3e50",
  },
});
