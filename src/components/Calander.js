import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const CalendarModal = ({ visible, onClose, onSelect }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [convselectedStartDate, setConvSelectedStartDate] = useState(null);

  // Function to handle OK button press
  const handleOkPress = () => {
    onSelect(selectedStartDate, convselectedStartDate);
    onClose();
  };

  // Handle date change and format the date to DD/MM/YYYY
  const onDateChange = (date) => {
    const formattedDate = formatDateToDMY(date); // Call format function
    setSelectedStartDate(formattedDate);
    console.log("Formatted date (DD/MM/YYYY):", formattedDate);
  };

  // Convert DD/MM/YYYY to YYYY-MM-DD
  useEffect(() => {
    if (selectedStartDate) {
      const parts = selectedStartDate.split('/');
      const [day, month, year] = parts;
      const convertedDate = `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
      setConvSelectedStartDate(convertedDate);
      console.log("Converted date (YYYY-MM-DD):", convertedDate);
    }
  }, [selectedStartDate]);

  // Function to format date to DD/MM/YYYY
  const formatDateToDMY = (date) => {
    const day = (`0${date.getDate()}`).slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      {visible && (
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <CalendarPicker
              onDateChange={onDateChange}
              selectedDayColor="#ffffff"
              todayBackgroundColor="#9894e6"
              selectedDayTextColor="#453D98ff"
              height={400}
              width={350}
              textStyle={{
                fontFamily: 'PoppinsBold',
                color: 'white',
                fontSize: 15,
              }}
              maxDate={new Date()} // Disable future dates
            />

            <View style={styles.buttoncont}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleOkPress}>
                <Text style={styles.buttonText}>Select</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Your styles go here...
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  alertContainer: {
    width: 350,
    height: 420,
    backgroundColor: '#453D98ff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#453D98ff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttoncont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CalendarModal;
