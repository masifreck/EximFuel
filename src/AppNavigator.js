import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Splash from './screens/Splash';
import Login from './screens/Login';
import ButtomBar from './components/ButtomBar';
import OwnerDetails from './screens/OwnerDetails';
import Driver from './screens/Driver';
import Vehicle from './screens/Vehicle';
import MinesLoading from './screens/MinesLoading';
import FGLoading from './screens/FGLoading';
import ShowFGLoadingChalan from './screens/ShowFGLoadingChalan';
import Unloading from './screens/Unloading';
import ShowUnloadingDetails from './screens/ShowUnloadingDetails';
import RegisterOwner from './screens/RegisterOwner';
import ShowOwnerDetails from './screens/ShowOwnerDetails';
import ShowDriverDetails from './screens/ShowDriverDetails';
import ShowMinesDetails from './screens/ShowMinesDetails';
import RegisterDriver from './screens/RegisterDriver';
import RegisterVehicle from './screens/RegisterVehicle';
import ShowVehicleDetails from './screens/ShowVehicleDetails';
import NewChalan from './screens/NewChalan';
import DrawerNavigation from './DrawerNavigation';

import UnloadingEntry from './screens/UnloadingEntry';
import MinesChalan from './screens/MinesChalan';
import PrintChallan from './screens/PrintChallan';
import MinesStep2 from './components/MinesStep2';
import MinesStep4 from './components/MinesStep4';
import Step1 from './components/Step1';
import MinesUpdateScreen from './screens/MinesUpdateScreen';
import UpdateOwner from './screens/UpdateOwner';
import UpdateDriver from './screens/UpdateDriver';
import UpdateVehicle from './screens/UpdateVehicle';
import CustomQRCode from './components/CustomQRCode';
import ExternalScanner from './components/ExternalScanner';
import EximLogisticsReceipt from './screens/DemoPrint';
import DocumentScanner from './components/DocumentScanner';
import { QRCodeGenerator } from './components/qrCodeGenerator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const getScreenOptions = title => {
    return {
      headerShown: true,
      headerStyle: {
        backgroundColor: '#453D98ff',
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
        name='qrcode'
        component={QRCodeGenerator}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name='scamme'
        component={DocumentScanner}
        />
        <Stack.Screen
        name='demoprint'
        component={EximLogisticsReceipt}
        /> 
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ButtomBar"
          component={ButtomBar}
          options={{headerShown: false}}
        />
        {/* Owenrdata================= */}
        <Stack.Screen
          name="OwnerDetails"
          component={OwnerDetails}
          options={getScreenOptions('Owner')}
        /> 
        <Stack.Screen
          name="ShowOwnerDetails"
          component={ShowOwnerDetails}
          options={getScreenOptions('Show Owner Details')}
        />
        <Stack.Screen
          name="RegisterOwner"
          component={RegisterOwner}
          options={getScreenOptions('Register Owner')}
        />
        <Stack.Screen
          name="UpdateOwner"
          component={UpdateOwner}
          options={getScreenOptions('Update Owner')}
        />
        {/* Driver data================= */}
        <Stack.Screen
          name="Driver"
          component={Driver}
          options={getScreenOptions('Driver')}
        />
        <Stack.Screen
          name="ShowDriverDetails"
          component={ShowDriverDetails}
          options={getScreenOptions('Show Driver Details')}
        />
        <Stack.Screen
          name="RegisterDriver"
          component={RegisterDriver}
          options={getScreenOptions('Register Driver')}
        />
        <Stack.Screen
          name="UpdateDriver"
          component={UpdateDriver}
          options={getScreenOptions('Update Driver')}
        />
        {/* Vehicledata=============== */}
        <Stack.Screen
          name="Vehicle"
          component={Vehicle}
          options={getScreenOptions('Vehicle')}
        />
        <Stack.Screen
          name="ShowVehicleDetails"
          component={ShowVehicleDetails}
          options={getScreenOptions('Show Vehicle Details')}
        />
        <Stack.Screen
          name="RegisterVehicle"
          component={RegisterVehicle}
          options={getScreenOptions('Register Vehicle')}
        />
           <Stack.Screen
          name="UpdateVehicle"
          component={UpdateVehicle}
          options={getScreenOptions('Update Vehicle Details')}
        />
        {/* mines component================= */}
        <Stack.Screen
          name="MinesLoading"
          component={MinesLoading}
          options={{headerShown: false}}

        />
        <Stack.Screen
        name='externalscanner'
        component={ExternalScanner}
        options={getScreenOptions('External Scanner')}
        />
        <Stack.Screen
          name="MinesChalan"
          component={MinesChalan}
          options={getScreenOptions('Mines Challan')}
        />
        <Stack.Screen
          name="ShowMinesDetails"
          component={ShowMinesDetails}
          options={getScreenOptions('Show Mines Details')}
        />
        <Stack.Screen
          name="MinesUpdateScreen"
          component={MinesUpdateScreen}
          options={getScreenOptions('Mines Update')}
        />
        <Stack.Screen
          name="MinesStep2"
          component={MinesStep2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MinesStep4"
          component={MinesStep4}
          options={{headerShown: false}}
        />
        {/* fg loading=============== */}
        <Stack.Screen
          name="FGLoading"
          component={FGLoading}
          options={getScreenOptions('FG Loading')}
        />
        <Stack.Screen
          name="ShowFGLoadingChalan"
          component={ShowFGLoadingChalan}
          options={getScreenOptions('Show FGLoading Challan')}
        />

        <Stack.Screen
          name="Step1"
          component={Step1}
          options={{headerShown: false}}
        />
        {/* unloading============ */}
        <Stack.Screen
          name="Unloading"
          component={Unloading}
          options={getScreenOptions('Unloading')}
        />

        <Stack.Screen
          name="UnloadingEntry"
          component={UnloadingEntry}
          options={getScreenOptions('Unloading Entry')}
        />

        <Stack.Screen
          name="ShowUnloadingDetails"
          component={ShowUnloadingDetails}
          options={getScreenOptions('Show Unloading Details')}
        />
        {/* print challan=========== */}
        <Stack.Screen
          name="PrintChallan"
          component={PrintChallan}
          options={getScreenOptions('Print Challan')}
        />
        <Stack.Screen
          name="NewChalan"
          component={NewChalan}
          options={getScreenOptions('New Challan')}
        />
         <Stack.Screen
  name='QRScanner' 
  component={CustomQRCode}
  options={getScreenOptions('Scan QR Codes')}
  />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
