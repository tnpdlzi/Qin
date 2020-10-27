import React, { useState, useEffect } from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, BackHandler} from 'react-native';
import server from '../../../../../server.json'
import axios from 'axios';


function teamComplete({ navigation, route }) {
    let getDatas = async (url) => await axios.get(url)
    .then(function (response) {
        console.log(response.data)
        return response.data
    })
    .catch(function (error) {
        console.log(url)
        console.log('error : ' + error);
    });
    
    let roomID = route.params.myRoom;
    let tier = route.params.tier;
    let game = route.params.game;


    // 다른 곳과 다르게 이 페이지는 뒤로가기 버튼을 눌렀을 때 방 생성으로 돌아가면 안됨. 방 생성으로 돌아가게 되면 한 유저가 두개의 방을 만드는 불상사가 생김.
    // 게임에 대한 파라미터를 받아서 뒤로가기 버튼을 눌렀을 때 2개의 페이지 전으로 돌아가도록 세팅
    const backAction = () => {

        if(game == 'LOL'){
            navigation.navigate('teamLOL');
        }else if(game == 'OW'){
            navigation.navigate('teamOW');
        }else if(game == 'BG'){
            navigation.navigate('teamBG');
        }else if(game == 'RS'){
            navigation.navigate('teamRS');
        }
        
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);

    return (
        <View style={styles.container}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingTop: 100,
                height: 10,
                paddingBottom: 30
            }}>
                <Image
                    style={{
                        height: 80,
                        width: 80,
                        resizeMode: 'cover',
                    }}
                    source={require('../../../../image/check.png')}/>
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 60,
                    width: '42%',
                    backgroundColor: '#E2E2E2'
                }}>

                <View
                    style={{
                        backgroundColor: '#ffffff',
                        height: 30,
                        width: '100%',
                        alignItems: 'center'
                    }}>
                    <Text  style={{fontSize: 30, color: '#5E5E5E', position: 'absolute', paddingBottom: 20, paddingTop: 10}}>
                        팀원 구하기!
                    </Text>
                </View>

            </View>

            <View
                style={{
                    alignItems: 'center',
                    paddingTop: 15
                }}>
                <Text style={{fontSize: 16}}>
                    필요한 인원을 모집하는
                </Text>
                <Text style={{fontSize: 16}}>
                    글 작성이 완료되었습니다.
                </Text>
            </View>


            <View>

                <View
                    style={{alignItems: 'center', paddingBottom: 10}}>
                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: 180,
                            flexDirection: 'row',
                            borderStyle: 'solid',
                            borderRadius: 100,
                            borderColor: '#00255a',
                            borderWidth: 1,
                            borderTopWidth: 1,
                            backgroundColor: '#00255a',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={async () => navigation.navigate('joined' + game, {memtitle: [await getDatas(server.ip + '/category/member?roomID=' + roomID + '&game=' + game), await getDatas(server.ip + '/category/title?roomID=' + roomID)]})}>

                        <Text style={{color: '#ffffff', fontSize: 15, fontWeight: 'bold'}}>
                            게시글 확인
                        </Text>

                    </TouchableOpacity>
                            
                </View>
                <View
                    style={{alignItems: 'center', paddingBottom: 50}}>
                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: 180,
                            flexDirection: 'row',
                            borderStyle: 'solid',
                            borderRadius: 100,
                            borderColor: '#00255a',
                            borderWidth: 1,
                            borderTopWidth: 1,
                            backgroundColor: '#ffffff',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={async () => navigation.navigate('rooms' + game, {dataroom: [await getDatas(server.ip + '/category/roomlist?tier=' + tier + '&game=' + game), await getDatas(server.ip + '/category/myroom?tier=' + tier + '&game=' + game + '&uID=1'), tier]})}>

                        <Text style={{color: '#00255A', fontSize: 15, fontWeight: 'bold'}}>
                            게시판 돌아가기
                        </Text>

                    </TouchableOpacity>
                </View>

            </View>
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
        height: 200,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 140,
    },
    sView: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0,
        elevation: 0,
        paddingHorizontal: 30,
    },
    item: {
        width: 284,
        height: 86,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    sItem: {
        width: '100%',
        height: 80,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
    },
    position: {
        height: 35,
        width: 63,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderRadius: 14,
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    positioned: {
        height: 35,
        width: 63,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderRadius: 14,
        borderColor: '#ffffff',
        borderWidth: 1,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        backgroundColor: '#ffffff'
    }
});

export default teamComplete;
