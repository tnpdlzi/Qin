import React, { Component } from 'react';
import {View, Text, Button, Image} from 'react-native';
import FriendScreen from "../../friend";
import ChatScreen from "../../chat";
import CategoryScreen from "../../category";
import HashScreen from "../../hash";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import myGame from "./myGame";
const Tab = createBottomTabNavigator();

function myGameScreen({ navigation }) {
    return (
        <Tab.Navigator
            tabBarOptions={{
                iconStyle: {height: 40},
                activeTintColor: '#d1cece',
                inactiveTintColor: '#000',
                upperCaseLabel: false,
                showLabel: false,
                showIcon: true,
                keyboardHidesTabBar: true,
            }}
        >
            <Tab.Screen name="myGame" component={myGame} options={
                {
                    tabBarIcon: ({ tintColor, focused }) => (
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={focused ? require('../../../../image/menu_y_01.png') : require('../../../../image/menu_01.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
                        </View>
                    )
                }
            }/>

            <Tab.Screen name="friend" component={FriendScreen} options={
                {
                    tabBarIcon: ({ tintColor, focused }) => (
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={focused ? require('../../../../image/menu_y_01.png') : require('../../../../image/menu_01.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
                        </View>
                    )
                }
            }/>
            <Tab.Screen name="chat" component={ChatScreen} options={
                {
                    tabBarIcon: ({ tintColor, focused }) => (
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={focused ? require('../../../../image/menu_y_02.png') : require('../../../../image/menu_02.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
                        </View>
                    )
                }
            } />
            <Tab.Screen name="category" component={CategoryScreen} options={{
                tabBarIcon: ({ tintColor, focused }) => (
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Image source={focused ? require('../../../../image/menu_y_03.png') : require('../../../../image/menu_03.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
                    </View>
                )}} />
            <Tab.Screen name="hash" component={HashScreen} options={
                {
                    tabBarIcon: ({ tintColor, focused }) => (
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={focused ? require('../../../../image/menu_y_04.png') : require('../../../../image/menu_04.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
                        </View>
                    )
                }
            } />
        </Tab.Navigator>
    );
}



export default myGameScreen;
