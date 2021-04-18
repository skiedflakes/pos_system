import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import RegisterScreen from 'screens/RegisterScreen'
import PaymentScreen from 'screens/PaymentScreen'


function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (

      <Drawer.Navigator initialRouteName="Register">
        <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
        <Drawer.Screen name="PaymentScreen" component={PaymentScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
 
  );
}