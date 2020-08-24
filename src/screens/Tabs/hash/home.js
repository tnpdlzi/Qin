import React, { Component } from 'react';
import { Dimensions,ScrollView, StyleSheet, View, Text, Button, TextInput } from 'react-native';

const winHeight = Dimensions.get('window').height;
const winWidth  = Dimensions.get('window').width;


const hash_rank = [{hash_rank: "동건짱"}, {hash_rank:"리그오브레전드"}, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}
, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}, {hash_rank:"롤"}];
function HashHome({ navigation }) {
    
    
    
    return (

        <View style = {styles.container}>
            <View
                style={styles.search_bar_view}>
                <TextInput style={styles.search_bar} placeholder="키워드를 검색하세요"
                />
            </View>
            <Text style = {{
                paddingTop : 10,
                paddingLeft:10,
                fontSize:14,
                paddingBottom:5,

            }}>인기 키워드</Text>
            <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                onMomentumScrollEnd={() => {
                console.log('Scrolling is End');
            }}>
                <View
                style = {{
                    flexDirection:"row",
                    height: winHeight*0.03,
                }}>
                {hash_rank.map((data, index)=>{
                    return(
                        <View
                            style={styles.Top_Hash_view}>
                        <Text style = {{color: "white", fontSize:13.5,fontWeight: 'bold'}}># {data.hash_rank}</Text>
                        </View>
                    )
                 })}
                </View>
            </ScrollView>
            <View style={styles.search_list_view}>
                <Text>검색 키워드 목록</Text>
            </View>
            <View
            style={styles.chat_list_view}>
                <Text>chat_list_view</Text>
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        height:winHeight,
        backgroundColor:"#FFDBC1",
        padding:5,
    },
    search_bar_view:{
        flexDirection: 'row',
            width: "100%",
            justifyContent:"center",
            paddingTop: 10,
            height: 55, //%로 설정하면 검색창이 켜질때 마다 크기가 줄어든다...
            backgroundColor: "#E1B771",
    },
    search_bar: {
        fontSize: 15,
        width: winWidth - 30,
        borderWidth: 1.5,
        borderColor: "#00255A",
        borderRadius: 15,
    },
    Top_Hash_view:{
        marginLeft:7,
        backgroundColor: "#00255A",
        borderRadius:7,
        padding:3, //하나의 요소 내에서 테두리로부터 요소 안의 내용물까지의 간격을 의미
        marginBottom:7,
        height: winHeight*0.03,
    },
    search_list_view:{
        paddingTop:10,
        backgroundColor: "#3DFF92", //구분을 위한 임시 배경 컬러
        height:winHeight*0.11,
        paddingLeft:10
    },
    chat_list_view:{
        flexDirection:"row",
        backgroundColor: "#FFAAFF",
        height: winHeight*0.7,
    }
});


export default HashHome;