import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryHome from './home';
import tiersLOL from './tiersLOL';
import tiersOW from './tiersOW';
import tiersBG from './tiersBG';
import tiersRS from "./tiersRS";
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

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
        </Stack.Navigator>
    );
}
