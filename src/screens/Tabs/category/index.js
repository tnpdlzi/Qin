import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

import CategoryHome from './home';
import tiersLOL from './tiers/tiersLOL';
import tiersOW from './tiers/tiersOW';
import tiersBG from './tiers/tiersBG';
import tiersRS from "./tiers/tiersRS";
import roomsLOL from "./roomList/roomsLOL";
import joinedLOL from "./join/joinedLOL";

const Stack = createStackNavigator();

export default function CategoryScreen({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={CategoryHome}
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
            <Stack.Screen
                name="tiersLOL"
                component={tiersLOL}
                options={{ title: 'tiersLOL' }}
            />
            <Stack.Screen
                name="tiersOW"
                component={tiersOW}
                options={{ title: 'tiersOW' }}
            />
            <Stack.Screen
                name="tiersBG"
                component={tiersBG}
                options={{ title: 'tiersBG' }}
            />
            <Stack.Screen
                name="tiersRS"
                component={tiersRS}
                options={{ title: 'tiersRS' }}
            />
            <Stack.Screen
                name="roomsLOL"
                component={roomsLOL}
                options={{ title: 'roomsLOL' }}
            />
            <Stack.Screen
                name="joinedLOL"
                component={joinedLOL}
                options={{ title: 'joinedLOL' }}
            />
        </Stack.Navigator>
    );
}
