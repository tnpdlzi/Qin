import React, {Component, useState} from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import axios from "axios";

function createRoom ({Navigation}){
    const [chatRoomName, setChatRoomName] = useState("");
    const [chatRoomInfo ,setChatRoomInfo] = useState("");
    const [hashCounter, setHashCounter] = useState(3);

    const hashInput = () =>{
        return(
            <View style ={{paddingLeft: 10,height: 50, flexDirection: "row", marginTop: 10, backgroundColor: "white",borderBottomColor: "gray",borderBottomWidth: 2}}>
                <Text style ={{paddingTop : 13, fontSize:20}}>#</Text>
                <TextInput style = {{fontSize: 18}} placeholder = " 키워드를 입력해주세요."
                autoCorrect={ false }
                onChange = {(text) =>{setChatRoomName(text)}}>
                </TextInput>
            </View>
        )
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.name_Info}>
                <Image
                    style={{height: 50, width: 50, resizeMode: 'cover',alignSelf:"center", marginLeft:15, marginRight: 15,}}
                    source={require('../../../../image/logout.png')}/>
                <View style = {{flexDirection:"column",flex:1}}>
                    <TextInput style = {styles.input} 
                    placeholder = "채팅방의 이름을 입력해주세요.(20자)"
                    autoCorrect={ false }
                    onChange = {(text) => setChatRoomName(text)}
                    >
                    </TextInput>
                    <TextInput style = {styles.input} 
                    placeholder = "채팅방의 정보를 입력해주세요.(20자)"
                    autoCorrect={ false }
                    onChange = {(text) => setChatRoomInfo(text)}
                    >
                    </TextInput>
                </View>
            </View>
            <View style = {styles.hashTags}>
                <View style = {{alignItems:"center",flex: 1}}>
                    <ScrollView
                        showsHorizontalScrollIndicator={true}
                        onMomentumScrollEnd={() => {
                        console.log('Scrolling is End');
                    }}>
                        {[...Array(hashCounter)].map((el, index)=>{
                            return(
                                hashInput()
                            )
                                                
                        })}
                    </ScrollView>
                </View>
                <TouchableOpacity onPress = {() => setHashCounter(hashCounter + 1)}>
                    <Image
                        source={require('../../../../image/plus.png')} style={{ height: 80, width: 80, resizeMode: 'contain'}}
                    />
                </TouchableOpacity>
            </View>
            <View style = {styles.MemberNum}>
                <Text style ={{fontSize:15,color:"gray"}}>채팅방의 최대 모집 인원을 설정해 주세요.</Text>
                <Text style ={{fontSize:15,color:"gray"}}>(10명 단위 / 최대 100명)</Text>
            </View>  
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    name_Info:{
        height:120,
        flexDirection : "row",
        marginTop: 10,
        borderBottomWidth:2,
        borderBottomColor:"gray",
        justifyContent : "center"
    },
    hashTags:{
        height : 310,
        alignItems:"center"
    },
    MemberNum:{
        height : 100,
        alignItems:"center"
    },
    inputView:{
        flexDirection : "row",
        width: "80%",
        borderColor : "gray",
        borderWidth:2,
        marginTop:20,
    },
    nameView:{
        flex:1,
        flexDirection: "row",
        width : "85%",
        backgroundColor:"blue",
        justifyContent:"center"
    },
    input:{
        borderBottomColor: "gray",
        width : "75%",
        borderBottomWidth: 2,
        fontSize: 15
    },


})

export default createRoom;