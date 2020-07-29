import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryHome from './home'
import tiersLOL from './tiersLOL'
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
        </Stack.Navigator>
    );
}
