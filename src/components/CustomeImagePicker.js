import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, Alert, PermissionsAndroid, Platform, Modal, Text, SafeAreaView, Pressable, TouchableOpacity ,Dimensions, ImageBackground} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { darkBlue, inputbgColor, textColor } from './constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ScreenWidth=Dimensions.get('window').width
const   CustomImagePicker = ({ onImagePicked,title,iconName,onlyCamera ,bgImage,width,imageData,isMandatory}) => {

    const [isModalVisible, setModalVisible] = useState(false);

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
        requestStoragePermission();
    }, []);

    const pickImageFromLibrary = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.error('ImagePicker Error: ', response.error);
                Alert.alert('Error', 'Something went wrong. Please try again later.');
            } else if (response.assets && response.assets.length > 0) {
                const { uri, fileName, type, fileSize } = response.assets[0];
                const imageData = { uri, fileName, type, fileSize };
                
                setModalVisible(false);
                onImagePicked(imageData); // Callback to parent component with image data
            }
        });
    };

   const takePhotoWithCamera = async () => {
        console.log('clicked');
        
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Camera access is required to take photos.');
            return;
        }
    
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.error('ImagePicker Error: ', response.error);
                Alert.alert('Error', 'Something went wrong. Please try again later.');
            } else if (response.assets && response.assets.length > 0) {
                const { uri, fileName, type, fileSize } = response.assets[0];
                const imageData = { uri, fileName, type, fileSize };
                
                setModalVisible(false);
                onImagePicked(imageData); // Callback to parent component with image data
            }
        });
    };

    return (
        <>
        <View style={{flexDirection:'column'}}>
        <Text style={styles.pickbtntext}>
  {title}
  {isMandatory && <Text style={{ color: 'red' }}> *</Text>}
</Text>

        <ImageBackground source={imageData ? { uri: imageData.uri } : bgImage } style={{width:width?width:120,height:80,margin:10,
        }}  imageStyle={{ borderRadius: 10, }}>
            
                <TouchableOpacity style={styles.pickbtn} onPress={()=>onlyCamera? takePhotoWithCamera() :setModalVisible(true)}>
                {/* <Icon name={iconName} size={30} color={textColor} /> */}

                  
                </TouchableOpacity>
            {
            // imageData && (
            //     <View style={styles.imagePreviewContainer}>
            //         <Image source={{ uri: imageData.uri }} style={styles.imagePreview} />
            //        {/* <Text style={styles.imageDetails}>
            //             Filename: {imageData.fileName}{'\n'}
            //             Type: {imageData.type}{'\n'}
            //             Size: {imageData.fileSize / 1024} KB
            //         </Text>*/}
            //     </View>
            // )
            }
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <SafeAreaView style={styles.buttons}>
                        <Pressable
                            style={styles.imageChangeButton}
                            onPress={pickImageFromLibrary}
                        >
                            <Text style={styles.buttonText}>🖼️ Pick from Gallery</Text>
                        </Pressable>
                        <Pressable
                            style={styles.imageChangeButton}
                            onPress={takePhotoWithCamera}
                        >
                            <Text style={styles.buttonText}>📷 Take Photo</Text>
                        </Pressable>
                        <Pressable
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>❌ Cancel</Text>
                        </Pressable>
                    </SafeAreaView>
                </View>
            </Modal>
        </ImageBackground>
        
</View>
        </>
    );
};

const styles = StyleSheet.create({
    imagePreviewContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePreview: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    imageDetails: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    pickbtn:{
        flexDirection:'row',
justifyContent:'',
gap:20,
alignItems:'center',
borderRadius:10,
height:50,margin:10,paddingHorizontal:20
    },
    pickbtntext:{
        color:textColor,
        fontSize:12,
        fontWeight:'bold',
        textAlign:'left',
        marginLeft:10,marginBottom:0
    },
    buttons: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    imageChangeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        justifyContent: 'center',
    },
    cancelButton: {
        alignItems: 'center',
        paddingVertical: 16,
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 18,
        color: textColor
    },
    cancelButtonText: {
        fontSize: 18,
        color: 'red',
    },
});

export default CustomImagePicker;