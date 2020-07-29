import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoryScreen from './category';
import ChatScreen from './chat';
import FriendScreen from './friend';
import HashScreen from './hash'
import { View, Text, StyleSheet, Image } from 'react-native';


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                iconStyle: {height: 40},
                activeTintColor: '#d1cece',
                inactiveTintColor: '#000',
                upperCaseLabel: false,
                showLabel: false,
                showIcon: true,
            }}
        >
            <Tab.Screen name="friend" component={FriendScreen} options={
                {
                    tabBarIcon: ({ tintColor, focused }) => (
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={focused ? require('../../image/menu_y_01.png') : require('../../image/menu_01.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
                        </View>
                    )
                }
            }/>
            <Tab.Screen name="chat" component={ChatScreen} options={
                {
                    tabBarIcon: ({ tintColor, focused }) => (
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={focused ? require('../../image/menu_y_02.png') : require('../../image/menu_02.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
                        </View>
                    )
                }
            } />
            <Tab.Screen name="category" component={CategoryScreen} options={{
                tabBarIcon: ({ tintColor, focused }) => (
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Image source={focused ? require('../../image/menu_y_03.png') : require('../../image/menu_03.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
                    </View>
                )}} />
            <Tab.Screen name="hash" component={HashScreen} options={
                {
                    tabBarIcon: ({ tintColor, focused }) => (
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={focused ? require('../../image/menu_y_04.png') : require('../../image/menu_04.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
                        </View>
                    )
                }
            } />
        </Tab.Navigator>
    );
}

export default MyTabs;


