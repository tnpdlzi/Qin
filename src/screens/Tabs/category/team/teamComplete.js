import React, { useState } from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import teamLOL from "../team/teamLOL";
import joinedLOL from "../join/joinedLOL";
import roomsLOL from "../roomList/roomsLOL";

function callPost(){
    const url = '/user-register/server?key=all';
    const formData = new FormData();

    formData.append('centerKey', 1)

    formData.append('image', this.state.file)
    formData.append('name', this.state.name)
    formData.append('uCenterName', this.state.uCenterName)
    formData.append('birthday', this.state.birthday)
    formData.append('gender', this.state.gender)
    formData.append('email', this.state.email)
    formData.append('address', this.state.address)
    formData.append('uPhoneNum', this.state.uPhoneNum)
    formData.append('carNum', this.state.carNum)
    formData.append('secondNum', this.state.secondNum)
    formData.append('webID', this.state.webID)
    formData.append('uRegistered', '등록')
    formData.append('uApplyDate', this.state.uApplyDate)
    formData.append('etc', this.state.etc)
    console.log(formData)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, config)
}

function teamComplete({ navigation }) {

    const callApi = async () => {
        const response = await fetch('/program-user/server?key=all');
        const body = await response.json();
        console.log(body);
        return body;
    }



    const room = callApi();

    const rooms = [
        {roomID: '1', ruID: '이동건', roomIntro: '방 만들기', join: '2', total: '4', endtime: '18:42'},
        {roomID: '1', ruID: '이동건', roomIntro: '방 만들기', join: '2', total: '4', endtime: '18:42'},
    ]

    const rTitle = [
        {roomID: '1', ruID: '이동건', roomIntro: '방 만들기', join: '2', total: '4', endtime: '18:42'},
    ]

    const [top, setTop] = useState(false);
    const [jungle, setJungle] = useState(false);
    const [mid, setMid] = useState(false);
    const [bottom, setBottom] = useState(false);
    const [support, setSupport] = useState(false);

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
                        onPress={() => navigation.navigate(joinedLOL)}>

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
                        onPress={() => navigation.navigate(roomsLOL)}>

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
