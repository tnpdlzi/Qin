import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from './screens/Tabs';
import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>

    </>
  );
}
