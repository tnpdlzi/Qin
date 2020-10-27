import React,{ Component, useState, useEffect } from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import HashHome from './home'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-gesture-handler';
import createRoom from './creatRoom/createRoom'

const Stack = createStackNavigator();

export default function HashScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [hashCounter, setHashCounter] = useState(3);
    const [chatRoomName, setChatRoomName] = useState("");
    const [chatRoomInfo, setChatRoomInfo] = useState("");
    

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
                    headerRight: () => <TouchableOpacity onPress ={()=> navigation.navigate('createRoom')}>
                        <Text style = {{margin:15}}>방 만들기</Text>
                    </TouchableOpacity>,
                }}
            />
            <Stack.Screen
                name="createRoom"
                component={createRoom}
                options={{ title: '방 만들기', headerRight:() =><TouchableOpacity onPress ={()=> navigation.navigate('createRoom')}>
            </TouchableOpacity> }}
            />

        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({
    ModalName_InfoView :{
        backgroundColor : "white",
        borderRadius: 20,
        height:250,
    },
    ModalName_InfoTop :{
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    ModalName_InfoMid :{
        flex: 0.6,
    },
    input:{
        borderBottomColor: "gray",
        width : "75%",
        borderBottomWidth: 2,
        fontSize: 17
    },
    ModalHashView :{
        height: 450,
        width:"100%",
        borderRadius: 20,
        backgroundColor:"white"
    },
    ModalHashTop:{
        height:50,
        flexDirection: "row",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "white",
        justifyContent:"space-between"
    },
    ModalHashMid:{
        flex:0.75,
        backgroundColor: 'white'
    },
    ModalHashBot :{
        backgroundColor:"white",
        justifyContent :"center"
    }
});