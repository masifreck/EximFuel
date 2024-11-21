import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import ButtomBar from './components/ButtomBar';
// import Driver from './screens/Driver'

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="ButtomBar" component={ButtomBar}
            options={{headerShown:false,
                title: 'Home'}} 
            
            />
            {/* <Drawer.Screen name="Driver" component={Driver}
            options={{headerShown:false,
                title: 'Driver'}} 
            
            /> */}
        </Drawer.Navigator>
    )
}

export default DrawerNavigation