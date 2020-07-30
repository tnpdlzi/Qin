import React, { Component } from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import joinedLOL from "../join/joinedLOL";

// 서버로부터 받을 id값, 방장 이름, 방 제목, 참여중 인원수, 총원, 모집 종료 시간
const datas = [
    {roomID: '1', ruID: '이동건', roomIntro: '방 만들기', join: '2', total: '4', endtime: '18:42'},
    {roomID: '2', ruID: '이규빈', roomIntro: 'ㅎㅇㅎㅇ', join: '2', total: '4', endtime: '18:42'},
    {roomID: '3', ruID: '류대현', roomIntro: '커몽', join: '2', total: '4', endtime: '18:42'},
    {roomID: '4', ruID: '박진곤', roomIntro: '우와', join: '2', total: '4', endtime: '18:42'},
    {roomID: '5', ruID: '이지훈', roomIntro: 'intro', join: '2', total: '4', endtime: '18:42'},
];

const myRoom = [
    {roomID: '1', ruID: '이동건', roomIntro: '방 만들기', join: '2', total: '4', endtime: '18:42'},
]
function roomsLOL({ navigation }) {

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
                                alignItems: 'center'
                            }}>
                            <Text style={{paddingStart: 10, paddingEnd: 20, fontSize: 30, fontWeight: 'bold'}}>
                                ·
                            </Text>
                            <Text style={{paddingEnd: 20, fontSize: 15, fontWeight: 'bold'}}>
                                내가 쓴 글
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            }}>
                            <Image
                                style={{height: 50, width: 80, resizeMode: 'cover'}}
                                source={require('../../../../image/team.png')}
                            />
                        </View>
                    </View>

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
                            }}>
                                {myRoom.map((data, index) => {
                                    return (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                paddingStart: 5
                                            }}>
                                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                                                    {data.roomIntro} ( {data.join} / {data.total} )
                                                </Text>
                                                <Text style={{fontSize: 12, paddingStart: 10, color: '#5E5E5E'}}>
                                                    {data.endtime}
                                                </Text>
                                        </View>
                                    );})}
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                flex: 1,
                                height: 65,
                                width: 80,
                                paddingEnd: 40
                            }}>
                            <Text>
                                refresh
                            </Text>
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
                                            {data.roomIntro} ( {data.join} / {data.total} )
                                        </Text>

                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            flex: 1,
                                            padding: 20
                                        }}>
                                        <Text style={{fontSize: 12, paddingStart: 10, color: '#5E5E5E'}}>
                                            {data.ruID}  |  {data.endtime}
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
