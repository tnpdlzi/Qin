import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class chatTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor, focused }) => (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Image source={focused ? require('../image/menu_y_02.png') : require('../image/menu_02.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
            </View>
        )
    }

    render() {
        return (
            <View style={style.container}>
                <Text>chat</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
