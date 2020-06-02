import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
// 하단 탭에 들어갈 컴포넌트들
import categoryTab from './AppTabNavigator/categoryTab'
import chatTab from "./AppTabNavigator/chatTab";
import friendTab from "./AppTabNavigator/friendTab";
import hashTab from "./AppTabNavigator/hashTab";

// 하단 탭 네비게이터 생성
const AppTabNavigator = createMaterialTopTabNavigator({
    friendTab: { screen: friendTab },
    chatTab: { screen: chatTab },
    categoryTab: { screen: categoryTab },
    hashTab: { screen: hashTab }
}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
        style: {
            ...Platform.select({
                ios: {
                    backgroundColor: 'white',
                },
                android: {
                    backgroundColor: 'white',
                    justifyContent: 'center'
                }
            })
        },
        iconStyle: {height: 40},
        activeTintColor: '#000',
        inactiveTintColor: '#d1cece',
        upperCaseLabel: false,
        showLabel: false,
        showIcon: true
    }
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {

    // navigationOptions 코드 추가
    static navigationOptions = {
        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: "center",
            justifyContent: 'center',
            flex: 1,
            fontWeight: 'bold',
            textAlignVertical: 'center'
        },
        headerLeft: () => <Image source={require('./image/menu_1.png')} style={{ height:50, width:50, resizeMode: 'contain' }}/>,
        headerTitle: () =>
            <View style={{ alignItems: "center", flex:1 }}>
                <Image source={require('./image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
            </View>
        ,
        headerRight: () => <Image source={require('./image/mail_g.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>,
    }
    render() {
        return <AppTabContainet/>; // AppTabContainet 컴포넌트를 리턴한다.
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
