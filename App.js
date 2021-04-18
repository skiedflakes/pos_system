import React, {useState, useEffect, Alert} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigation from './src/navigation/HomeNavigation';


const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator();
export default function App() {
  //online
  global.url = 'http://projects.skiedflakes.site/pos_system/mobile/';
  // global.mfc_id = '1c29e109-9e70-4c5c-98ef-ec418365cedc';

  //online
  // global.url ='http://192.168.41.1/pos_system/mobile/';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'HomeNavigation'}
          component={HomeNavigation}
          options={{headerShown: false, cardStyleInterpolator: forFade}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
