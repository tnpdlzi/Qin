import React, {useEffect, useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerScreen from "./screens/Tabs/sidebar/home";
import MyTabs from "./screens/Tabs";
import myProfile from "./screens/Tabs/sidebar/myProfile";
import myGame from "./screens/Tabs/sidebar/myGame";
import SplashScreen from 'react-native-splash-screen';
import MyScreens from './screens';
import MySide from './screens/Tabs/sidebar';
import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from './screens/login/home';
import SecondScreens from './screens/SecondScreens';

// 드로워를 쓰겠다고 선언. 리엑트 네비게이션에 들어있는 함수다!
const Drawer = createDrawerNavigator();



// 드로워에 대한 선언
export default function MyDrawer() {

    useEffect(() => {
        SplashScreen.hide();
      }, [])

    const [userID, setUserID] = useState('');

    AsyncStorage.getItem('loginCheck', (err, result) => {
        //setUserID(result)
        if(result == null){setUserID(0)

        }
        else{setUserID(1)

        }

    });




    if(userID == 1){
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
                        <Drawer.Screen name="SecondScreens" component={SecondScreens} />
                        <Drawer.Screen name="tabs" component={MyTabs} />
                        <Drawer.Screen name="side" component={MySide} />
                        <Drawer.Screen name="myProfile" component={myProfile}/>
                        <Drawer.Screen name="myGame" component={myGame} />

                    </Drawer.Navigator>
                </NavigationContainer>
            </>
        );
    }


    else{
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
                        <Drawer.Screen name="screens" component={MyScreens} />
                        <Drawer.Screen name="tabs" component={MyTabs} />
                        <Drawer.Screen name="myProfile" component={myProfile}/>
                        <Drawer.Screen name="myGame" component={myGame} />
                        <Drawer.Screen name="side" component={MySide} />
                        <Drawer.Screen name="LoginScreen" component={LoginScreen} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </>
        );
    }

}
