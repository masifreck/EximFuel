import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Platform, PermissionsAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { darkBlue } from './constant';
const CustomImagePicker = ({ title, onFileSelected, showFileDetails }) => {
  const [imageFile, setImageFile] = useState(null);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'This app needs access to your storage to pick images.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission granted');
            } else {
                console.log('Storage permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
};

useEffect(() => {
    requestStoragePermission();
}, []);


  // Function to select an image
  const pickImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // Restrict to images
      });
      const file = res[0];
      
      // Store image URI in the state
      setImageFile(file?.uri);

      // Pass file details to parent component via callback
      if (onFileSelected) {
        onFileSelected({
          uri: file.uri,
          name: file.name,
          type: file.type
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Unknown error: ', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Button to pick an image */}
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>

      {/* Display selected image */}
      {imageFile && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageFile }} style={styles.image} />
        </View>
      )}

      {/* Display file details if available and showFileDetails is true */}
      {imageFile && showFileDetails && (
        <Text style={styles.fileDetails}>
          {`File: ${imageFile}`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: darkBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 20,
    height: 200, // Set a height for displaying the image
    width: 200, // Set a width for displaying the image
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Ensure the image fits within the container
  },
  fileDetails: {
    marginTop: 10,
    fontSize: 12,
    color: '#333',
  },
});

export default CustomImagePicker;
