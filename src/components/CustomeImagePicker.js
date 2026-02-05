import React, { useState ,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,PermissionsAndroid
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary,launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomImagePicker = ({ selectedFiles, setSelectedFiles }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openPickerModal = () => setModalVisible(true);
  const closePickerModal = () => setModalVisible(false);
const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: "Camera Permission",
                message: "This app needs access to your camera.",
                buttonPositive: "OK",
                buttonNegative: "Cancel",
              }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        }
        return true; // iOS permissions are handled in the app settings
      };
    useEffect(() => {
      requestCameraPermission();
    }, []);

    const takePhotoWithCamera = async () => {
  console.log('clicked');

  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    Alert.alert('Permission Denied', 'Camera access is required to take photos.');
    return;
  }

  launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.errorCode) {
      console.error('Camera Error: ', response.errorMessage);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } else if (response.assets && response.assets.length > 0) {
      const img = response.assets[0];

      const newImage = {
        uri: img.uri,
        name: img.fileName || `camera_image_${Date.now()}.jpg`,
        type: img.type || 'image/jpeg',
        isPdf: false,
      };

      const totalFiles = selectedFiles.length + 1;
      if (totalFiles > 6) {
        Alert.alert('Limit Reached', 'You can select a maximum of 6 files.');
        return;
      }

      const updatedFiles = [...selectedFiles, newImage];
      setSelectedFiles(updatedFiles);

      setModalVisible(false);
    }
  });
};

  const handlePickImages = async () => {
    closePickerModal();
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 0,
      });

      if (result.assets?.length > 0) {
        const newFiles = result.assets.map((img) => ({
          uri: img.uri,
          name: img.fileName || `image_${Date.now()}.jpg`,
          type: img.type || 'image/jpeg',
          isPdf: false,
        }));

        const totalFiles = selectedFiles.length + newFiles.length;
        if (totalFiles > 6) {
          Alert.alert('Limit Reached', 'You can select a maximum of 6 files.');
          return;
        }

        const updated = [...selectedFiles, ...newFiles];
        setSelectedFiles(updated);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handlePickPDFs = async () => {
    closePickerModal();
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
      });

      const newFiles = res.map((doc) => ({
        uri: doc.uri,
        name: doc.name,
        type: doc.type || 'application/pdf',
        isPdf: true,
      }));

      const totalFiles = selectedFiles.length + newFiles.length;
      if (totalFiles > 10) {
        Alert.alert('Limit Reached', 'You can select a maximum of 10 files.');
        return;
      }

      const updated = [...selectedFiles, ...newFiles];
      setSelectedFiles(updated);
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', error.message);
      }
    }
  };

  const removeFile = (index) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
  };

  const renderFile = ({ item, index }) => (
    <View style={styles.fileContainer}>
      {item.isPdf ? (
        <Text style={styles.fileText}>📄 {item.name}</Text>
      ) : (
        <Image source={{ uri: item.uri }} style={styles.imagePreview} />
      )}
      <TouchableOpacity onPress={() => removeFile(index)} style={styles.crossBtn}>
        <Icon name="cancel" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pickerBtn} onPress={openPickerModal}>
        <ImageBackground
          style={{ width: 100, height: 100 }}
          source={require('../assets/upload-file.png')}
        />
      </TouchableOpacity>

      <Text style={styles.btnText}>Choose Files</Text>

      <View style={styles.previewList}>
        {selectedFiles.map((item, index) => (
          <View key={item.uri || index}>
            {renderFile({ item, index })}
          </View>
        ))}
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={closePickerModal}
          activeOpacity={1}
        >
          <View style={styles.modalContainer}>
             <TouchableOpacity style={styles.optionBtn} onPress={takePhotoWithCamera}>
              <Text style={styles.optionText}>📷 From Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={handlePickImages}>
              <Text style={styles.optionText}>🖼️ Pick Images</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.optionBtn} onPress={handlePickPDFs}>
              <Text style={styles.optionText}>📄 Pick PDFs</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.cancelBtn} onPress={closePickerModal}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomImagePicker;


const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  pickerBtn: {
    
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  btnText: { color: 'black', fontSize: 16 },
  previewList: { marginTop: 20, width: '100%', alignItems: 'center' },
  fileContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#f1f1f1',
    padding: 5,
    borderRadius: 8,
    position: 'relative',
  },
  imagePreview: { width: 60, height: 60, resizeMode: 'cover', borderRadius: 5 },
  fileText: { fontSize: 16, color: '#333' },
  crossBtn: {
    position: 'absolute',
    top: -20,
    right: -20,
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  optionBtn: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: { fontSize: 18,color:'#000' },
  cancelBtn: { marginTop: 10, paddingVertical: 15 },
  cancelText: { textAlign: 'center', color: 'red', fontSize: 16 },
});