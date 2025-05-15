import React from 'react';
import AppNavigator from './src/AppNavigator';
import Toast from 'react-native-toast-message'; // ✅ Import Toast

const App = () => {
  return (
    <>
      <AppNavigator />
      <Toast /> 
    </>
  );
};

export default App;
