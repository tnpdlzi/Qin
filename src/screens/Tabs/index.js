import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoryScreen from './category';
import ChatScreen from './chat';
import FriendScreen from './friend';
import HashScreen from './hash'
import LoginScreen from './login'
import { View, Text, StyleSheet, Image } from 'react-native';

// 아래쪽의 탭 네비게이터를 쓰겠다는 선언
const Tab = createBottomTabNavigator();
// 탭들에 대한 구현 함수로 선언

// 10월21일부
function MyTabs() {
    return (// 탭 네비게이터로 안에 있는 4개의 아이콘에 대한 옵션 설정. 그 아래로는 각각의 아이콘에 대해 누르면 이동할 스크린, 그리고 아이콘에 대한 이미지 설정
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
            <Tab.Screen name="login" component={LoginScreen} options={{
                // tabBarIcon: ({ tintColor, focused, size }) => (
                //     <View style={{flex:1, justifyContent:'center', alignItems:'center', height: 0,
                //         width: 0}}>
                //         <Image source={focused ? require('../../image/name_y.png') : require('../../image/name_g.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
                //     </View>
                // ),
                tabBarVisible: false,

            }} />

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


