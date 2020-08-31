import React, { Component, useState } from 'react';
import { Dimensions,ScrollView, StyleSheet, View, Text, Button, TextInput, Image } from 'react-native';
import { Icon, Row } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

const winHeight = Dimensions.get('window').height;
const winWidth  = Dimensions.get('window').width;


const hash_rank = [{hash_rank: "동건짱"}, {hash_rank:"리그오브레전드"}, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}
, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}];


function HashHome({ navigation }) {
    
    //검색 목록
    const [search_hash, setSearch_Hash] = useState([]);
    //const [newText, setNewText] = useState("");
    const [newHash, setNewHash] = useState({hash:null});
    
    //삭제의 문제점 = 하나를 삭제했을때 인덱스가 수시로 변한다.
    const addHash = () =>{
        //중복된 Hash가 없을 때 add 하기 위한 조건문
        if(!search_hash.includes(newHash)){
            setSearch_Hash([
                ...search_hash,
                newHash
            ]);
        }
    };
    //삭제 연산 구현
    const deleteHash = (data) =>{
        search_hash.forEach(function(element, index){
            if(element.hash == data.hash){
                console.log(index);
                setSearch_Hash(search_hash.filter(input => input != data));
            }
        })
    };

    //채팅방 목록
    const [data, setData] = useState([]);
    
    return (

        <View style = {styles.container}>
            <View
                style={styles.search_bar_view}>
                    <Text style ={{fontSize: 20}}>#</Text>
                <TextInput style={styles.search_bar} placeholder="키워드를 검색하세요"
                autoCorrect={ false }
                onChangeText = {(text) => text.length >= 1 ? setNewHash({hash:text}) : setNewHash({hash:null})} //text길이가 1이상일떄만 newHash업데이트
                />
                <TouchableOpacity
                    style={{
                    }}
                    onPress = {addHash}
                    >
                    <Image
                        style={{height: 100, width: 60, resizeMode: 'cover'}}
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
                style = {{
                    flexDirection:"row",
                    height: winHeight*0.05,
                }}>
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
            
            <Text style = {{
                paddingTop : 10,
                paddingLeft:10,
                fontSize:14,
                paddingBottom:5,

            }}>검색 키워드</Text>
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
                    //검색창에 아무것도 없을때는 반응 X
                    if(data.hash != null){
                        //null아닐때 Input넣고 출력
                        let Input = data.hash;
                        return(
                        <View
                            style={styles.search_hash_list}>
                        <Text style = {{color: "white", fontSize:17,fontWeight: 'bold'}}># {Input}</Text>
                        <TouchableOpacity
                            style={{padding: 5
                        }}
                        //검색 키워드 삭제 기능 구현
                        onPress = {() => deleteHash(data)}
                       >
                        <Image
                            style={{height: 50, width: 10, resizeMode: 'cover'}}
                            source={require('../../../image/cancel.png')}
                        />
                </TouchableOpacity>
                        </View>
                    )
                    }                       
                 })}
                </ScrollView>
            </View>

            <View
            style={{flexDirection:"row",}}
                >
                <ScrollView 
                    showsHorizontalScrollIndicator={true}
                    onMomentumScrollEnd={() => {
                    console.log('Scrolling is End');
                }}>
                
                </ScrollView>
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        height:winHeight,
        padding:5,
        flex: 1,
        flexDirection: 'column',
    },
    search_bar_view:{
        marginTop:10,
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
    }
});


export default HashHome;