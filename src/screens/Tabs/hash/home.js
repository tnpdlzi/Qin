import React, { Component, useState, useEffect } from 'react';
import { Dimensions,ScrollView, StyleSheet, View, Text, TextInput, Image, TouchableOpacity,TouchableHighlight} from 'react-native';
//import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import Modal from 'react-native-modal';

const winHeight = Dimensions.get('window').height;
const winWidth  = Dimensions.get('window').width;
const IP = ;

const test_uID = 109; //임시 uID 이후 로그인 유지 방법을 통해서 다른 변수로 대체될 예정

let hash_rank = [];

let getTopRank = async () => await axios.get(IP + ':8080/hash/topRank')
    .then(function(response){
        console.log(response.data);
        hash_rank = response.data;
    })
    .catch(function(error){
        console.log("에러 :" + error);
    });
getTopRank();

function HashHome({ navigation}) {
    
    const [search_hash, setSearch_Hash] = useState([]);   //검색할 HashTag 목록들
    const [newText, setNewText] = useState(""); //유저의 input을 담기위한 Hook
    const [resData, setResData] = useState([]); //search_hash 를 이용한 axios통신
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState("");
    //const topRank;
    //검색할 Hash Tag목록 추가
    function addHash(){
        if(!search_hash.includes(newText)){
            setSearch_Hash([
                ...search_hash, // 기존의 List들은 유지하면서 새로운 newText추가
                newText
            ]);
        }
    }
    //chatRoomListModal에서 채팅 참여하기 버튼 클릭 시 chatRoomEnter하기 위한 함수
    const chatRoomEnter = async () => await axios.post(IP + ':8080/hash/chatRoomEnter',{ 
        "uID" : test_uID, 
        "chatID" : modalData.chatID //유저가 선택한 chatRoom에 대한 정보를 담은 Modal 변수
    })
    .then(function(response){  // 유저의 채팅창 조인 후 어떻게 해야할지 논의 필요!!!!!
        if(response.data == "already join"){
            console.log(response.data);      
        }
    })
    .catch(function(error){
        console.log("chatRoomEnter :" + error);
    });

    //Hash Tag목록을 기반으로 목록의 Hash Tag를 모두 포함하는 ChatRoom의 Data를 받아온다.
    let getDatas = async () => await axios.post(IP + ':8080/hash/hashSearch', {
        "uID": "1",
        "hashList" : search_hash
    })
    .then(function(response){
        if(response.data == ""){ //seach_hash 를 이용해서 통신한 결과가 없을 경우 ResData를 빈 배열로 초기화
            setResData([]);
        }else setResData(response.data);
    })
    .catch(function(error){
        console.log("에러 :" + error);
    });

    //useEffect함수는 두번 째 매개변수의 변수에 변경이 발생했을때 첫번째 매개변수의 내용을 실행한다.
    useEffect(()=>{
        //search_hash가 변하면 실행되어 getDatas를 호출한다.
        if(search_hash.length != 0){
            getDatas();
        } 
        else setResData([]); //search_hash가 없다면 resData도 없어야 한다.
    },[search_hash]);

    

    //삭제 연산 구현
    const deleteHash = function(data) {
        search_hash.forEach(function(element, index){
            if(element.hash == data.hash){
                //배열의 filter를 이용해서 data와 일치하는 멤버 삭제
                setSearch_Hash(search_hash.filter(input => input != data));
            }
        })
    };

    

    //채팅방 
    return (
        //부모 컨테이너
        <View style = {styles.container}>
            {console.log("부모 컨테이너")}
            {/* CharRoomList에서 이미지 클릭시 뜨는 모달 */}
            <Modal
                transparent = {true}
                isVisible = {modalVisible}
                backdropColor = {'black'}
                backdropOpacity = {0.5}
            >
                <View style = {styles.centeredMadal}> 
                    <View style = {styles.chatRoomModal}>
                        <View style = {styles.chatRoomModalTop}>
                            <View style = {{flex : 0.5}}>
                                <TouchableOpacity style={{paddingTop: 1, paddingLeft:9}}
                                    onPress = {() => setModalVisible(!modalVisible)}>
                                    <Image
                                        style={{height: 60, width: 30, resizeMode: 'cover',}}
                                        source={require('../../../image/cancel.png')}/>
                                </TouchableOpacity>
                                
                            </View>
                            <Text style = {{paddingTop: 30, fontSize: 18}}>채팅창 정보</Text>
                        </View>
                        <View style = {styles.chatRoomModalMid}>
                            <View style = {{flexDirection: "row", justifyContent: "space-between", flex: 0.15}}>
                                <Text style = {{fontSize:22,}}>{modalData.chatName}</Text>
                                <Text style = {{paddingTop:10}}>{modalData.total}/100명</Text>
                            </View>
                            <View style = {{backgroundColor: "white",flex: 0.5,borderBottomColor: "gray", borderBottomWidth:1.5, flexDirection:"row"}}>
                                <View style = {{paddingTop:10}}>
                                    <Image style={{height: 60, width: 60, resizeMode: 'cover'}} source={require('../../../image/my.png')}/>
                                </View>
                                    <View style = {{paddingLeft:5,paddingTop:20}}>
                                    <Text style = {{color:"gray"}}>{modalData.chatInfo}</Text>
                                    <Text style = {{color:"gray"}}>{modalData.createdDate}</Text>
                                    </View>
                            </View>
                            <View style = {{flexDirection: "row"}}>
                                <Text style ={{fontSize: 12, color: "gray"}}># {modalData.hash}</Text>
                            </View>
                        </View>
                        <View style = {styles.chatRoomModalBot}>
                            <TouchableOpacity style = {{flex: 0.4}}
                            onPress = {() => chatRoomEnter()}
                            >
                                <View style = {{flex : 1, backgroundColor: "#00255A", borderRadius: 20, justifyContent: "center", alignItems:"center"}}>
                                    <Text style = {{color: "white", fontSize: 15}}>채팅 참여하기</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* 검색창 구현*/}
            <View style={styles.search_bar_view}>
                    <Text style ={{fontSize: 20}}>#</Text>
                <TextInput style={styles.search_bar} placeholder="키워드를 검색하세요"
                autoCorrect={ false }
                onChangeText = {(text) => setNewText(text)} //변할때 마다 NewText 에 입력
                />
                <TouchableOpacity
                    style={{
                    }}
                    onPress = {() => newText.length >= 1 ? addHash() : null} 
                    >
                    <Image
                        style={{height: 100, width: 60, resizeMode: 'cover'
                    }}
                        source={require('../../../image/tag_search.png')} 
                    />
                </TouchableOpacity>
            </View>
            {/* 인기 키워드 보여주기 */}
            <View style ={{alignItems: "flex-start"}}>
                <Text style = {{fontSize:14, padding: 10}}>인기 키워드</Text>
                <View style = {{flexDirection:"row",height: winHeight*0.035}}>
                    <ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    onMomentumScrollEnd={() => {
                    console.log('Scrolling is End');
                    }}>
                    {hash_rank.map((data, index)=>{
                        return(
                            <View
                                style={styles.Top_Hash_list}>
                            <Text style = {{color: "white", fontSize:13.5,fontWeight: 'bold'}}># {data.hash}</Text>
                            </View>
                        )
                    })}
                    </ScrollView>
                </View>
            </View>
            {/* 유저가 검색창에서 추가한 HashTag 리스트를 모여주는 창 */}
            <View style ={{alignItems: "flex-start"}}>
                <Text style = {{fontSize:14, padding:10}}>검색 키워드</Text>
                <View style = {{
                    flexDirection:"row",
                    height: winHeight*0.05,
                }}>
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        onMomentumScrollEnd={() => {
                        console.log('Scrolling is End');
                    }}>
                        {search_hash.map((data, index)=>{
                            return(
                                <View style={styles.search_hash_list}>
                                    <Text style = {{color: "white", fontSize:17, fontWeight: 'bold'}}># {data}</Text>
                                    <TouchableOpacity style={{padding: 5}}
                                        //검색 키워드 삭제 기능 구현
                                        onPress = {() => deleteHash(data)}>
                                        <Image
                                            style={{height: 50, width: 10, resizeMode: 'cover'}}
                                            source={require('../../../image/cancel.png')}/>
                                    </TouchableOpacity>
                                </View>
                            )                   
                        })}
                    </ScrollView>
                </View>
            </View>
            {/* 유저가 검색한 HashTag를 모두 포함하고 있는 ChatRoom을 서버로 부터 받아와서  */}
            <View style={{flexDirection:"row", flex:1, padding:5}}>
                <ScrollView 
                    showsHorizontalScrollIndicator={true}
                    onMomentumScrollEnd={() => {
                    console.log('Scrolling is End');
                }}>
                
                {resData.map((el, index) =>{
                    let resDataHashList = (el.hash).split('#');
                    if(el.isDeleted != 1){
                        return(
                            <View style = {styles.chatRoom}>
                                <View style = {{width: winHeight * 0.07, alignItems: "center", justifyContent: "center"}}>
                                <TouchableOpacity onPress = {()=> setModalVisible(!modalVisible,setModalData(el))}>
                                    <Image style={styles.chatRoomIcon} source={require('../../../image/my.png')}/>
                                </TouchableOpacity>
                                </View>
                                <View style = {{flex: 1, flexDirection:"column"}}>
                                    <View style = {{ flex: 1, height: winHeight * 0.04, paddingTop: 7, flexDirection:"row", paddingLeft:10}}>
                                        <Text style={{fontSize: 17, flex:1}}>{el.chatName}</Text>
                                        <Text style = {{paddingTop: 2, fontSize: 13}}>{el.total}명</Text>
                                    </View>
                                    <View style = {{flex: 0.8}}>
                                        <ScrollView 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={true}
                                        onMomentumScrollEnd={() => {
                                        console.log('Scrolling is End');
                                        }}>
                                        {resDataHashList.map((el2, index)=>{
                                            return (
                                                <View style = {{paddingLeft: 7}}>
                                                    <Text style = {{fontSize: 13, color: 'gray'}}>#{el2}</Text>
                                                </View>
                                            )
                                        })}
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                })}
                </ScrollView>
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: 'white'
    },
    search_bar_view:{
        marginTop:20,
        borderRadius: 15,
        paddingLeft: 10,
        width: "95%",
        height: 55, //%로 설정하면 검색창이 켜질때 마다 크기가 줄어든다...
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: "#00255A",
        borderWidth: 1.5,
    },
    search_bar: {
        flex: 1,
    },
    Top_Hash_list:{
        marginLeft:7,
        backgroundColor: "#00255A",
        borderRadius:7,
        padding:3, //하나의 요소 내에서 테두리로부터 요소 안의 내용물까지의 간격을 의미
        marginBottom:7,
        height: 25
    },
    search_list_view:{
        paddingTop:10,
        backgroundColor: "#3DFF92", //구분을 위한 임시 배경 컬러
        height:winHeight*0.3,
        padding:10
    },
    chat_list_view:{
        flexDirection:"row",
    },
    search_hash_list:{
        marginLeft:7,
        backgroundColor: "#00255A",
        borderRadius:7,
        flexDirection: "row",
        alignItems: 'center',
        height: 25
    },
    chatRoom :{
        flexDirection: "row",
        height: winHeight*0.09,
        padding: 5

    },
    chatRoomIcon:{
        height: 60, width: 60, resizeMode: 'cover',
    },
    centeredMadal :{
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    chatRoomModal:{
        flex: 0.65,
        backgroundColor: 'white',
        borderRadius: 25,
    },
    chatRoomModalTop:{
        flex : 0.2,
        flexDirection : "row",
    },
    chatRoomModalMid :{
        flex: 0.6,
        backgroundColor: "white",
        marginLeft:30,
        marginRight:30,
        marginTop: 15
    },
    chatRoomModalBot:{
        flex: 0.1,
        justifyContent: "center",
        flexDirection: "row",
    }
});

export default HashHome;