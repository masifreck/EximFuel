import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import Share from 'react-native-share';
import { useNavigation, useRoute } from '@react-navigation/native';
import Sound from 'react-native-sound';

Sound.setCategory('Playback'); // ✅ important for Android

const { height } = Dimensions.get('window');

const SuccessUI = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { message } = route.params || {};

  const displayMessage =
    message ||
    '🎉 Action completed successfully!\nEverything went as expected.';

  useEffect(() => {
    const sound = new Sound(require('../assets/success-340660.mp3'), (error) => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      sound.play((success) => {
        if (!success) console.log('Sound playback failed');
        sound.release();
      });
    });
  }, []);

  const handleShare = async () => {
    try {
      await Share.open({
        title: 'Success',
        message: displayMessage,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Lottie Animation (80%) */}
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('../assets/Success.json')}
          autoPlay
          loop={false}
          style={styles.lottie}
        />
      </View>

      {/* Message + Buttons (20%) */}
      <View style={styles.bottomSection}>
        <Text style={styles.message}>{displayMessage}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.okButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    height: height,
  },
  lottieContainer: {
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 3,
  },
  okButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SuccessUI;
