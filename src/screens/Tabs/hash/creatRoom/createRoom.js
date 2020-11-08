import React, {Component, useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import axios from "axios";
import Modal from 'react-native-modal';
import server from '../../../../../server.json';
const IP = server.ip;

const test_uID = 2;

console.log(IP);
function createRoom ({navigation}){
    const [chatName, setChatName] = useState("");
    const [chatInfo ,setChatInfo] = useState("");
    const [memberCounter, setMemberCounter] = useState(50);
    const [newText, setNewText] = useState(""); //유저의 input을 담기위한 Hook
    const [hashList, setHashList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    //Hash Tag 추가하는 함수
    function addHash(){
        console.log("add");
        if(!hashList.includes(newText)){
            setHashList([
                ...hashList, // 기존의 List들은 유지하면서 새로운 newText추가
                newText
            ]);
        }
    }

    //DB에서 Notnull인 정보들 
    const neCheck = ()=>{
        if(chatName.length > 0){
            if(hashList.length > 0){
                roomCreate();
            }else{
                setModal2Visible(!modal2Visible);
            }
        }else{
            setModal2Visible(!modal2Visible);
        }
    }

    //필수 필드 다 채웠을때 호출될 함수
    const roomCreate = async () => await axios.post(IP + '/hash/roomCreate',{
        "uID" : test_uID,
        "chatName" : chatName,
        "chatInfo" : chatInfo,
        "hashList" : hashList,
        "maxNum" : memberCounter,
    })
    .then(function(response){
        setMemberCounter(50);
        setModalVisible(!modalVisible);
    })
    .catch(function(error){
        console.log(error);
    });

    const deleteHash = function(data) {
        hashList.forEach(function(element, index){
            if(element.hash == data.hash){
                //배열의 filter를 이용해서 data와 일치하는 멤버 삭제
                setHashList(hashList.filter(input => input != data));
            }
        })
    };

    //유저가 추가한 HashTag 리스트를 보여줄 화면
    const hashInput = (hashText) =>{
        return(
            <View style = {{justifyContent:"space-between", flexDirection:"row", backgroundColor: "white",borderBottomColor: "gray", borderBottomWidth: 2,width:100,}}>
                <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                onMomentumScrollEnd={() => {
                console.log('Scrolling is End');}}
                >
                    <View style ={styles.hashText}>
                        <Text style ={{paddingTop : 13, fontSize:20}}>#  </Text>
                        <Text style ={{paddingTop : 13, fontSize:20}}>{hashText}</Text>
                    </View>
                    
                </ScrollView>
                <View style ={{justifyContent:"center"}}>
                    <TouchableOpacity style={{}}
                        //검색 키워드 삭제 기능 구현
                        onPress = {() => deleteHash(hashText)}>
                        <Image
                            style={{height: 50, width: 10, resizeMode: 'cover'}}
                            source={require('../../../../image/cancel.png')}/>
                    </TouchableOpacity>
                
                </View>
            </View>
            
            
        )
    }
    
    return (
        //생성하기 버튼 누르고 나서 이벤트를 처리한 결과를 보여주는 모달들
        <View style = {styles.container}>
            <Modal
            transparent = {true}
            isVisible = {modalVisible}
            backdropColor = {'black'}
            backdropOpacity = {0.5}
            >
                <View style = {{height: 150,backgroundColor:"white",borderRadius:20}}>
                    <View style = {{flexDirection:"row",alignContent:"center"}}>
                        <TouchableOpacity style={{paddingTop: 1, paddingLeft:9,flex:0.5}}
                            onPress = {() => setModalVisible(!modalVisible,navigation.goBack(null))}>
                            <Image
                                style={{height: 60, width: 30, resizeMode: 'cover',justifyContent:"center"}}
                                source={require('../../../../image/cancel.png')}/>
                        </TouchableOpacity>
                        <Image
                            style={{height: 70, width: 60, resizeMode: 'cover',alignSelf:"flex-end"}}
                            source={require('../../../../image/complain.png')}/>
                    </View>
                    
                    <View style = {{backgroundColor: "white",borderRadius:20, justifyContent:"center",alignItems:"center"}}>
                        <Text>채팅방이 생성되었습니다.</Text>
                    </View>
                </View>
            </Modal>

            <Modal
            transparent = {true}
            isVisible = {modal2Visible}
            backdropColor = {'black'}
            backdropOpacity = {0.5}
            >
                <View style = {{height: 150,backgroundColor:"white",borderRadius:20}}>
                    <View style = {{flexDirection:"row",alignContent:"center"}}>
                        <TouchableOpacity style={{paddingTop: 1, paddingLeft:9,flex:0.5}}
                            onPress = {() => setModal2Visible(!modal2Visible)}>
                            <Image
                                style={{height: 60, width: 30, resizeMode: 'cover',justifyContent:"center"}}
                                source={require('../../../../image/cancel.png')}/>
                        </TouchableOpacity>
                        <Image
                            style={{height: 70, width: 60, resizeMode: 'cover',alignSelf:"flex-end"}}
                            source={require('../../../../image/complain.png')}/>
                    </View>
                    
                    <View style = {{backgroundColor: "white",borderRadius:20, justifyContent:"center",alignItems:"center"}}>
                        <Text> 채팅방 이름/키워드를 입력해주세요.</Text>
                    </View>
                </View>
            </Modal>
            {/* 채팅방의 이름과 정보를 입력하는 공간의 View */}
            <View style = {styles.name_Info}>
                <Image
                    style={{height: 100, width: 50, resizeMode: 'cover',alignSelf:"center", marginLeft:15, marginRight: 15,}}
                    source={require('../../../../image/room.png')}/>
                <View style = {{flexDirection:"column",flex:1}}>
                    <TextInput style = {styles.input} 
                    placeholder = "채팅방의 이름을 입력해주세요.(20자)"
                    autoCorrect={ false }
                    onChangeText = {(name) => setChatName(name)}
                    >
                    </TextInput>
                    <TextInput style = {styles.input} 
                    placeholder = "채팅방의 정보를 입력해주세요.(20자)"
                    autoCorrect={ false }
                    onChangeText = {(info) => setChatInfo(info)}
                    >
                    </TextInput>
                </View>
            </View>
            {/* 해쉬태그를 입력할 UI의 뷰 */}
            <View style = {styles.hashTags}>
                <View style = {styles.hashInput}>
                    <Text style ={{fontSize: 20}}>#</Text>
                    <TextInput style={{flex:1}} placeholder="키워드를 입력하세요"
                    autoCorrect={ false }
                    onChangeText = {(text) => setNewText(text)} //변할때 마다 NewText 에 입력
                    />
                    <TouchableOpacity
                        onPress = {() => newText.length >= 1 ? addHash() : null}
                        >
                        <Image
                            style={{height: 100, width: 60, resizeMode: 'cover'
                        }}
                            source={require('../../../../image/tag_search.png')} 
                        />
                    </TouchableOpacity>
                </View>
                
                <View style = {{alignItems:"center",flex: 1}}>
                    <ScrollView
                        showsHorizontalScrollIndicator={true}
                        onMomentumScrollEnd={() => {
                        console.log('Scrolling is End');
                    }}>
                        {hashList.map((hashText, index)=>{
                            return(
                                hashInput(hashText)
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
            {/* 채팅방 인원을 결정하는 UI 부분 */}
            <View style = {styles.MemberNum}>
                <Text style ={{fontSize:15,color:"gray"}}>채팅방의 최대 모집 인원을 설정해 주세요.</Text>
                <Text style ={{fontSize:15,color:"gray"}}>(10명 단위 / 최대 100명)</Text>
                <View style = {{flexDirection:"row", alignItems:"center"}}>
                    <TouchableOpacity onPress = {() => memberCounter > 10 ? setMemberCounter(memberCounter - 10) : null}>
                        <Image
                            source={require('../../../../image/minus.png')} style={{ height: 80, width: 80, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>
                    <Text>{memberCounter} 명</Text>
                    <TouchableOpacity onPress = {() => memberCounter < 100 ? setMemberCounter(memberCounter + 10) : null}>
                        <Image
                            source={require('../../../../image/plus.png')} style={{ height: 80, width: 80, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{alignContent:"center", height:100, alignItems:"center",margin:15}}>
                <TouchableOpacity style = {{flex: 0.4}}
                onPress = {() => neCheck()}
                >
                    <View style = {{flex:1,backgroundColor: "#00255A", borderRadius: 20, justifyContent: "center", alignItems:"center",width:150}}>
                        <Text style = {{color: "white", fontSize: 15}}>생성하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
              
        </View>
    )
}
const styles = StyleSheet.create({
    //메인 container
    container:{
        flex:1,
        backgroundColor:"white",
    },
    //채팅방 이름과 정보를 나타내는 스타일
    name_Info:{
        height:120,
        flexDirection : "row",
        marginTop: 10,
        borderBottomWidth:2,
        borderBottomColor:"gray",
        justifyContent : "center"
    },
    //해쉬태그를 입력하고 입력한 목록을 보여주는 창
    hashTags:{
        height : 250,
        alignItems:"center",
    },
    //채팅방 최대 인원수 설정 창
    MemberNum:{
        height : 100,
        alignItems:"center"
    },
    //채팅방의 정보와 이름을 입력하는 창
    input:{
        borderBottomColor: "gray",
        width : "80%",
        borderBottomWidth: 2,
        fontSize: 14
    },
    //해쉬태그 입력하는 창
    hashInput:{
        flexDirection:"row",
        height: 50,
        width: '70%',
        marginTop:10,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: "#00255A",
        borderWidth: 1.5,
        borderRadius: 15,
        justifyContent:"center",
    },
    //추가된 HashTag들을 보여주는 창
    hashText:{
        paddingLeft: 10,
        height: 50,
        flexDirection: "row",
        marginTop: 10,
        backgroundColor: "white",
    },
})

export default createRoom;