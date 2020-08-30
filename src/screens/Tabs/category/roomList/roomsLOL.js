import React, {Component, useState} from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import joinedLOL from "../join/joinedLOL";
import teamLOL from "../team/teamLOL";
import axios from 'axios';

// 서버로부터 받을 id값, 방장 이름, 방 제목, 참여중 인원수, 총원, 모집 종료 시간
// const datas = [
//     {roomID: '1', ruID: '이동건', roomIntro: '방 만들기', join: '2', total: '4', endtime: '18:42'},
//     {roomID: '2', ruID: '이규빈', roomIntro: 'ㅎㅇㅎㅇ', join: '2', total: '4', endtime: '18:42'},
//     {roomID: '3', ruID: '류대현', roomIntro: '커몽', join: '2', total: '4', endtime: '18:42'},
//     {roomID: '4', ruID: '박진곤', roomIntro: '우와', join: '2', total: '4', endtime: '18:42'},
//     {roomID: '5', ruID: '이지훈', roomIntro: 'intro', join: '2', total: '4', endtime: '18:42'},
// ];

const myRoom = [
    {roomID: '1', ruID: '이동건', roomIntro: '방 만들기', join: '2', total: '4', endtime: '18:42'},
]

function roomsLOL({ navigation, route }) {

    let [datas, setDatas] = useState([]);

    let tier = route.params.tiergame[0];
    let game = route.params.tiergame[1];
    let url = 'http://133.186.216.152:8080/category/roomlist?tier=' + tier + '&game=' + game;

    let getDatas = async () => await axios.get(url)
        .then(function (response) {
            datas = setDatas(response.data);
            console.log(datas)
        })
        .catch(function (error) {
            console.log(tier)
            console.log(game)
            console.log(url)
            console.log('error : ' + error);
        });
    getDatas();
    console.log(datas);


        return (
            <View style={styles.container}>
                <View style={styles.gameImage}>
                    <Image
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: 100,
                            width: '100%',
                            resizeMode: 'cover',
                        }}
                        source={require('../../../../image/img_lol_bg.png')}
                    />
                </View>
                <View style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 0,
                    elevation: 0,
                    paddingHorizontal: 37,
                    justifyContent: 'space-between'}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 10
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                paddingStart: 10
                            }}>
                            <Text style={{paddingStart: 10, paddingEnd: 20, fontSize: 30, fontWeight: 'bold', color: '#FFC81A'}}>
                                ·
                            </Text>
                            <Text style={{paddingEnd: 20, fontSize: 15, fontWeight: 'bold'}}>
                                내가 쓴 글
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(teamLOL)}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                paddingEnd: 5
                            }}>
                            <Image
                                style={{height: 50, width: 80, resizeMode: 'cover'}}
                                source={require('../../../../image/team.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            paddingVertical: 20,
                        }}
                        onPress={() => navigation.navigate(joinedLOL)}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingStart: 15,
                            }}>
                                {myRoom.map((data, index) => {
                                    return (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                paddingStart: 5,
                                                paddingEnd: 100
                                            }}>
                                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                                                    {data.roomIntro} ( {'1'} / {data.total.toString()} )
                                                </Text>
                                                <Text style={{fontSize: 12, paddingStart: 10, color: '#5E5E5E'}}>
                                                    {data.endtime.toString()}
                                                </Text>
                                        </View>
                                    );})}
                        </View>
                        <View
                            >
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 28,
                                    width: 70,
                                    borderStyle: 'solid',
                                    borderRadius: 20,
                                    borderColor: '#00255A',
                                    borderWidth: 2,
                                    paddingVertical: 10,
                                    elevation: 6,
                                    backgroundColor: '#ffffff'
                                }}
                                onPress={() => setEndtime(endtime + 5)}>
                                <Text style={{color: '#00255A', fontWeight: 'bold'}}>
                                    refresh
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 60,
                        width: '100%',
                        backgroundColor: '#F2F2F2'
                    }}>

                    <Text  style={{fontSize: 12, paddingStart: 70, color: '#5E5E5E'}}>
                        게시글은 설정한 시간이 지나면 자동으로 삭제됩니다.
                    </Text>

                </View>


                <ScrollView style={styles.sView}>
                    {datas.map((data, index) => {
                        return (
                            <View style={styles.sItem} >
                                <TouchableOpacity
                                    style={{
                                        paddingStart: 8,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}
                                    onPress={() => navigation.navigate(joinedLOL)}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            paddingStart: 5
                                        }}>
                                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                                            {data.roomIntro} ( {2} / {data.total} )
                                        </Text>

                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            flex: 1,
                                            padding: 10
                                        }}>
                                        <Text style={{fontSize: 12, paddingStart: 10, color: '#5E5E5E'}}>
                                            {data.ruID}  |  {data.endTime}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    gameImage: {
        height: 50,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    sView: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0,
        elevation: 0,
        paddingHorizontal: 37,
    },
    sItem: {
        width: '100%',
        height: 75,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
    },
});

export default roomsLOL;
