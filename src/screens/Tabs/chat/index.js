import React from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ChatHome from './home';
import chatRoom from './chatRoom';
import Styles from '../../../styles';
import { TouchableOpacity, View, Image } from 'react-native';

const Stack = createStackNavigator();

export default function ChatScreen({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={ChatHome}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../../../image/menu_1.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            {/* <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/> */}
                            <Text style={{fontSize: 17}}>채팅</Text>
                        </View>
                    ,
                    headerRight: () => <Image source={require('../../../image/mail_g.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>,
                }}
            />
            <Stack.Screen
                name="chatRoom"
                component={chatRoom}
                options={{
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex: 1 }}>
                            {/* <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/> */}
                            <Text style={{ fontSize: 17 }}>상대 닉네임</Text>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity>
                        <View style={{ justifyContent: "center", width: 50 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 17 }}>관리</Text>
                        </View>
                    </TouchableOpacity>,
                }}
            />
        </Stack.Navigator>
    );
}