import React, { Component, useState, cloneElement, useEffect } from 'react';
import { Dimensions,ScrollView, StyleSheet, View, Text, Button, TextInput, Image, } from 'react-native';
import { Icon, Row } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import Axios from 'axios';
//import { TestScheduler } from 'jest';

const winHeight = Dimensions.get('window').height;
const winWidth  = Dimensions.get('window').width;

const hash_rank = [{hash_rank: "동건짱"}, {hash_rank:"리그오브레전드"}, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}
, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}];





function HashHome({ navigation }) {
    
    //검색 목록
    const [search_hash, setSearch_Hash] = useState([]);   //검색할 HashTag 목록들
    const [newText, setNewText] = useState(""); //유저의 input을 담기위한 Hook
    const [resData, setResData] = useState([]); //search_hash 를 이용한 axios통신
    
    //검색할 Hash Tag목록 추가
    function addHash(){
        if(!search_hash.includes(newText)){
            setSearch_Hash([
                ...search_hash, // 기존의 List들은 유지하면서 새로운 newText추가
                newText
            ]);
        }
    }



    //Hash Tag목록을 기반으로 목록의 Hash Tag를 모두 포함하는 ChatRoom의 Data를 받아온다.
    let getDatas = async () => await axios.post('http://220.149.232.18:8080/hash/hashSearch', {
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
        <View style = {styles.container}>
            <View
                style={styles.search_bar_view}>
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
            <Text style = {{
                paddingTop : 10,
                paddingLeft:10,
                fontSize:14,
                paddingBottom:5,
            }}>인기 키워드</Text>
            <View
                style = {{flexDirection:"row",height: winHeight*0.035}}>
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
                        <Text style = {{color: "white", fontSize:13.5,fontWeight: 'bold'}}># {data.hash_rank}</Text>
                        </View>
                    )
                 })}
                 </ScrollView>
            </View>
            <Text style = {{paddingTop : 10,paddingLeft:10,fontSize:14,paddingBottom:5,}}>검색 키워드</Text>
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
                    <View
                        style={styles.search_hash_list}>
                    <Text style = {{color: "white", fontSize:17,fontWeight: 'bold'}}># {data}</Text>
                    <TouchableOpacity
                        style={{padding: 5}}
                    //검색 키워드 삭제 기능 구현
                    onPress = {() => deleteHash(data)}
                    >
                    <Image
                        style={{height: 50, width: 10, resizeMode: 'cover'}}
                        source={require('../../../image/cancel.png')}/>
                </TouchableOpacity>
                        </View>
                )                   
                })}
                </ScrollView>
                </View>
            
            <View style={{flexDirection:"row", flex:1, padding:5}}>
                <ScrollView 
                    showsHorizontalScrollIndicator={true}
                    onMomentumScrollEnd={() => {
                    console.log('Scrolling is End');
                }}>
                {resData.map((data, index) =>{
                    let arr = (data.hash).split(',');
                    if(data.isDeleted != 1){
                        return(
                            <View style = {styles.chatRoom}>
                                <View style = {{width: winHeight * 0.07, alignItems: "center", justifyContent: "center"}}>
                                <TouchableOpacity>
                                    <Image style={styles.chatRoomIcon} source={require('../../../image/my.png')}/>
                                </TouchableOpacity>
                                </View>
                                <View style = {{flex: 1, flexDirection:"column"}}>
                                    <View style = {{ flex: 1, height: winHeight * 0.04, paddingTop: 7, flexDirection:"row", paddingLeft:10}}>
                                    <Text style={{fontSize: 17, flex:1}}>{data.chatInfo}</Text>
                                    <Text style = {{paddingTop: 2, fontSize: 13}}>{data.total}명</Text>
                                    </View>
                                    <View style = {{flex: 0.8}}>
                                        <ScrollView 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={true}
                                        onMomentumScrollEnd={() => {
                                        console.log('Scrolling is End');
                                        }}>
                                        {arr.map((data, index)=>{
                                            return (
                                                <View style = {{paddingLeft: 7}}>
                                                    <Text style = {{fontSize: 13, color: 'gray'}}># {data}</Text>
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
        height:winHeight,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    search_bar_view:{
        marginTop:10,
        marginLeft: 10,
        marginRight: 10,
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
        //margin:3,
        padding: 10

    },
    chatRoomIcon:{
        height: 60, width: 60, resizeMode: 'cover',
    }
});


export default HashHome;