import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import Login from './screens/Login';
import { darkBlue } from './components/constant';
import DashboardScreen from './screens/Dashborad';
import FuelManagementScreen from './screens/FuelMangement';
import ExpenseBooking from './screens/ExpenseBooking';
import VehicleExpense from './screens/VehicleExpense';
import PendingApprovalScreen from './screens/PendingApprovalScreen';
import RejectedList from './screens/RejectedList'
import ApprovedList from './screens/Approvedlist';
import FinalApprovalList from './screens/FinalApprovalList';
import FuelList from './screens/FuelList';
import ExpenseReport from './screens/ExpenseReport';
import FuelDeff from './screens/FuelDeff';
import FuelListDetails from './screens/FuelListDetails';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const getScreenOptions = title => {
    return {
      headerShown: true,
      headerStyle: {
        backgroundColor: darkBlue,
      },
      headerTintColor: 'white',
      title: title,
    };
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
    
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
        name='dashboard'
        component={DashboardScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name = 'fuelmanagement'
        component={FuelManagementScreen}
        options={{headerShown: false}}
        />
     <Stack.Screen
     name='expensebooking'
     component={ExpenseBooking}
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='vehicleexpense'
      component={VehicleExpense}
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='pendingapproval'
      component={PendingApprovalScreen}
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='rejectedlist'
      component={RejectedList}
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='approvedlist'
      component={ApprovedList}
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='finalapprovedlist'
      component={FinalApprovalList}
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='fuellist'
      component={FuelList}
      options={{headerShown: false}}
      />
         <Stack.Screen
      name='fuellistdetails'
      component={FuelListDetails}
     options={{
    title: '⛽ Check & Add More Details',
  }}
      />
      <Stack.Screen
      name='report'
      component={ExpenseReport}
      options={{headerShown: false}}
      />
 <Stack.Screen 
 name='diffoil'
 component={FuelDeff}
 options={{headerShown : false}}
 />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
