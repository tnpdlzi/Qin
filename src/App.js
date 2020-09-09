import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from './screens/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import CustomDrawerContent from "./screens/Tabs/sidebar/home";

import SideHome from "./screens/Tabs/sidebar/home";

// 드로워를 쓰겠다고 선언. 리엑트 네비게이션에 들어있는 함수다!
const Drawer = createDrawerNavigator();

// 드로워에 대한 선언
export default function MyDrawer() {
    const dimensions = useWindowDimensions();



    return (
        <>
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                    drawerStyle={{ width: '75%' }}
                    drawerContentOptions={{
                        activeTintColor: '#e91e63',
                        itemStyle: { marginVertical: 30 },
                    }}
                >

                    {/*드로워에 대한 스크린 선언*/}

                <Drawer.Screen name="Settings" component={Settings} />
                </Drawer.Navigator>
            </NavigationContainer>
        </>
  );
}
