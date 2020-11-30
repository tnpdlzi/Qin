import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import {View, Text, StyleSheet, Image,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import LoginScreen from '../screens/login/index';
import LoginHome from './login/index';

import MyTabs from '../screens/Tabs/index';

import DrawerScreen from './Tabs/sidebar/home'
import MySide from './Tabs/sidebar/index';
import MailHome from './Tabs/mailBox/index'
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



// 10월21일부
function MyScreens() {

    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false,
            }}
                          name="LoginScreen"
                          component={LoginScreen}

            />
            <Stack.Screen options={
                {
                    headerShown : false,
                }}

                          name="MyTabs"
                          component={MyTabs}
            />
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
                          name="MailHome"
                          component={MailHome}
            />

        </Stack.Navigator>
    );

}

export default MyScreens;
