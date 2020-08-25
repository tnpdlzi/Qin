import React from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import HashHome from './home'
import Styles from '../../../styles';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';


const Stack = createStackNavigator();

export default function HashScreen({ navigation }) {
    return (
        <Stack.Navigator>
            
            <Stack.Screen
                name="Home"
                component={HashHome}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../../../image/menu_1.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <Image source={require('../../../image/mail_g.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>,
                }}
            />

        </Stack.Navigator>
    );
}