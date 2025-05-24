import React from 'react';
import AppNavigator from './src/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

// ✅ Import AlertNotificationRoot
import { AlertNotificationRoot } from 'react-native-alert-notification';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* ✅ Wrap the navigator in AlertNotificationRoot */}
      <AlertNotificationRoot>
        <AppNavigator />
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
