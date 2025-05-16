import React from 'react';
import AppNavigator from './src/AppNavigator';
import Toast from 'react-native-toast-message'; // ✅ Import Toast
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
const App = () => {
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
      <AppNavigator />
      <Toast /> 
      </GestureHandlerRootView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App;
