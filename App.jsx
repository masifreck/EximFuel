import React from 'react';
import AppNavigator from './src/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

// AlertNotification
import { AlertNotificationRoot } from 'react-native-alert-notification';

// Toast
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AlertNotificationRoot>
        <AppNavigator />
        {/* ✅ Add Toast component at the root */}
        <Toast />
      </AlertNotificationRoot>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
