import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { View, Text, StyleSheet, Image } from 'react-native';
import LoginHome from './login/index';
import MyTabs from '../screens/Tabs/index';

import DrawerScreen from './Tabs/sidebar/home'
import MySide from './Tabs/sidebar/index';
// import {TouchableOpacity} from "react-native-gesture-handler";
import {createStackNavigator} from '@react-navigation/stack';


const retrieveData = async () => {
    try {
        console.log("이것은 uID입니다..." + JSON.stringify(await AsyncStorage.getItem('uID')))
        console.log("이것은 userID입니다..." + JSON.stringify(await AsyncStorage.getItem('userID')))
        console.log("이것은 userName입니다..." + JSON.stringify(await AsyncStorage.getItem('userName')))
        console.log("이것은 good입니다..." + JSON.stringify(await AsyncStorage.getItem('good')))
        console.log("이것은 bad입니다..." + JSON.stringify(await AsyncStorage.getItem('bad')))
        console.log("이것은 intro입니다..." + JSON.stringify(await AsyncStorage.getItem('intro')))
    } catch (error) {
      // Error retrieving data
    }
  };

  retrieveData
// 아래쪽의 탭 네비게이터를 쓰겠다는 선언
const Stack = createStackNavigator();
// 탭들에 대한 구현 함수로 선언

// 10월21일부
function MyScreens() {
    return (// 탭 네비게이터로 안에 있는 4개의 아이콘에 대한 옵션 설정. 그 아래로는 각각의 아이콘에 대해 누르면 이동할 스크린, 그리고 아이콘에 대한 이미지 설정
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={LoginHome}
                options={{
                    headerShown: false,
                }}

            />

            {/*여기부터는 각각 스크린에 대한 선언들. component들은 다 import되어 있음*/}


            <Stack.Screen options={
                {
                    headerShown : false,
                }}
                name="DrawerScreen"
                component={DrawerScreen}
            />
            <Stack.Screen options={
                {
                    headerShown : false,
                }}
                name="MySide"
                component={MySide}
            />
            <Stack.Screen options={
                {
                    headerShown : false,
                }}

                name="MyTabs"
                component={MyTabs}
            />

        </Stack.Navigator>
    );
}

export default MyScreens;
