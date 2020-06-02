import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class hashTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor, focused }) => (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Image source={focused ? require('../image/menu_y_04.png') : require('../image/menu_04.png')} style={{ height: 70, width: 70, justifyContent: 'center'}}/>
            </View>
        )
    }

    render() {
        return (
            <View style={style.container}>
                <Text>hash</Text>
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
