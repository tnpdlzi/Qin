import React,{ Component, useState, useEffect } from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import HashHome from './home'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-gesture-handler';


const Stack = createStackNavigator();

export default function HashScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [hashCounter, setHashCounter] = useState(3);
    const [chatRoomName, setChatRoomName] = useState("");
    const [chatRoomInfo, setChatRoomInfo] = useState("");
    
    
    const HashChatRoom = ()=>{
        return(
            // 모달을 감싸는 뷰
            <View>
                <View>
                    {/* chatName 과 chatInfo를 작성하는 모달 */}
                    <Modal
                        transparent = {true}
                        isVisible = {modalVisible}
                        backdropColor = {'black'}
                        backdropOpacity = {0.5}
                        
                    >
                        <View style ={styles.ModalName_InfoView}>
                            <View style = {styles.ModalName_InfoTop}>
                                <TouchableOpacity style={{paddingTop: 1, paddingLeft:9}}
                                    onPress = {() => setModalVisible(!modalVisible)}>
                                    <Image
                                        style={{height: 60, width: 30, resizeMode: 'cover',}}
                                        source={require('../../../image/cancel.png')}/>
                                </TouchableOpacity>
                                {/* {chatRoomName == "" & chatRoomInfo == "" ? <Text style = {{fontSize:15, color: "gray"}}>다음</Text> : 
                                    <TouchableOpacity style={{paddingTop: 25, paddingRight:20, }}
                                        onPress = {() => setModal2Visible(!modal2Visible)}>
                                            <Text style ={{fontSize: 15, color: modal1TextColor()}}>다음</Text>
                                    </TouchableOpacity>} */}
                                <TouchableOpacity style={{paddingTop: 25, paddingRight:20, }}
                                    onPress = {() => setModal2Visible(!modal2Visible)}>
                                    <Text style ={{fontSize: 15,}}>다음</Text>
                                </TouchableOpacity>    
                            </View>
                            <View style = {styles.ModalName_InfoMid}>
                                <View style = {{flex: 0.3, backgroundColor: "white", flexDirection : "row", justifyContent:"center", alignItems:"center"}}>
                                    <Image
                                        style={{height: 30, width: 30, resizeMode: 'cover',}}
                                        source={require('../../../image/logout.png')}/>
                                        <Text style ={{justifyContent:"center"}}>   방 만들기</Text>
                               </View>
                               <View style = {{flex:1, alignItems:"center"}}>
                                    <TextInput style = {styles.input} placeholder = "채팅방의 이름을 입력해주세요.(20자)"
                                    autoCorrect={ false }
                                    onChange = {(text) =>{setChatRoomName(text)}}
                                    >
                                    </TextInput>
                                    <TextInput style = {styles.input} placeholder = "채팅방의 정보를 입력해주세요.(20자)"
                                    autoCorrect={ false }
                                    onChange = {(text) =>{setChatRoomInfo(text)}}
                                    >
                                    </TextInput>
                               </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                {/* HashTag입력하는 모달 */}
                <View>
                    <Modal
                    transparent = {true}
                    isVisible = {modal2Visible}
                    backdropColor = {'black'}
                    backdropOpacity = {0.5}
                    >
                        <View style = {styles.ModalHashView}>
                            <View style = {styles.ModalHashTop}>
                                <TouchableOpacity style={{paddingTop: 15, paddingLeft:15}}
                                    onPress = {() => setModal2Visible(!modal2Visible)}>
                                    <Text style ={{fontSize: 15}}>이전</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{paddingTop: 15, paddingRight:15}}
                                    onPress = {() => setModal2Visible(!modal2Visible)}>
                                    <Text style ={{fontSize: 15}}>다음</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.ModalHashMid}>
                                <View style = {{backgroundColor: "white", flexDirection : "row", justifyContent:"center", alignItems:"center"}}>
                                    <Image
                                        style={{height: 40, width: 40, resizeMode: 'cover',}}
                                        source={require('../../../image/logout.png')}/>
                                        <Text style ={{justifyContent:"center", fontSize: 20}}>   방 만들기</Text>
                               </View>
                               <View style = {{alignItems:"center"}}>
                                {/* 2020-10-12 이어서 진행할 부분 <<  */}
                               {[...Array(hashCounter)].map((num, index) =>{
                                   return(
                                        <View style ={{height: 40,}}>
                                            <Text>#</Text>
                                            <TextInput style = {styles.input} placeholder = "채팅방의 이름을 입력해주세요.(20자)"
                                            autoCorrect={ false }
                                    onChange = {(text) =>{setChatRoomName(text)}}
                                    ></TextInput>
                                        </View>
                                   );
                               })}
                               </View>
                               
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
          
        
        );
        
    }
    const createRoom = () =>{
        if(modalVisible > 0){
            return(
                <HashChatRoom />
            );
        }
    }

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
                    headerRight: () => <TouchableOpacity onPress ={()=> setModalVisible(!modalVisible)}>
                        <Text style = {{margin:15}}>방 만들기</Text>
                        {createRoom()}
                    </TouchableOpacity>,
                }}
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
        backgroundColor: "red",
        borderRadius: 20,
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
        backgroundColor: 'blue'
    }
});