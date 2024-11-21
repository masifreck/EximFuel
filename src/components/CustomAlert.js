import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  alertContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 16,
    marginBottom: 30,
    marginTop:30,
    fontWeight:'500',
    color:"black",
    fontFamily:"PoppinsMedium"
  },
  closeButton: {
    color: '#453D98ff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:"PoppinsBold"
  },
});

export default CustomAlert;
