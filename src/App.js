import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerScreen from "./screens/Tabs/sidebar/home";
import MyTabs from "./screens/Tabs";
import myGameScreen from "./screens/Tabs/sidebar/game"
import myProfileScreen from "./screens/Tabs/sidebar/profile"
import myGame from "./screens/Tabs/sidebar/game/myGame";
import myProfile from "./screens/Tabs/sidebar/profile/myProfile";

// 드로워를 쓰겠다고 선언. 리엑트 네비게이션에 들어있는 함수다!
const Drawer = createDrawerNavigator();

// 드로워에 대한 선언
export default function MyDrawer() {

    return (
        <>
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={(props) => <DrawerScreen {...props} />}
                    drawerStyle={{ width: '75%' }}
                    drawerContentOptions={{
                        activeTintColor: '#e91e63',
                        itemStyle: { marginVertical: 30 },
                    }}
                >

                    {/*드로워에 대한 스크린 선언*/}
                    <Drawer.Screen name="tabs" component={MyTabs} />
                    <Drawer.Screen name="myGameScreen" component={myGameScreen} />
                    <Drawer.Screen name="myProfileScreen" component={myProfileScreen} />
                    <Drawer.Screen name="myGame" component={myGame} />
                    <Drawer.Screen name="myProfile" component={myProfile} />
                </Drawer.Navigator>
            </NavigationContainer>
        </>
  );
}
