import React, {Component, useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, RefreshControl} from 'react-native';
import server from '../../../../../server.json'
import axios from 'axios';

const qs = require('qs');

// refresh가 완료될 때 까지 wait
const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

// url로부터 데이터 get
let getDatas = async (url) => await axios.get(url)
    .then(function (response) {
        console.log(response.data)
        return response.data
    })
    .catch(function (error) {
        console.log(url)
        console.log('error : ' + error);
    });

let postDatas = async (tier) => await axios.get(server.ip + '/category/getRooms?tier=' + tier + '&game=RS')
    .then(async (response) => await axios({
    method: 'post',
    url: server.ip + '/category/updateRooms',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      results: response.data
    })
  })).then(async () => await axios.get(server.ip + '/category/roomList?tier=' + tier + '&game=RS')
  .then(function (response) {
      console.log(response.data)
    return response.data
}));


function roomsRS({ navigation, route }) {

    let tier = route.params.dataroom[0];
    const [datas, setDatas] = useState([]);
    const [myRoom, setMyRoom] = useState([]);

    let endTime, roomID;    
    let isMyRoom = (myRoom.length)==0?false:true;

    console.log('레식 티어 : ' + tier);

    // 새로고침 onRefresh로 구현. onRefresh를 호출하면 setDatas, setMyRoom으로 hook 다시 불러옴. 그에 따라 화면도 다시 render
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);

        setDatas(await postDatas(tier))
        setMyRoom(await getDatas(server.ip + '/category/myroom?tier=' + tier + '&game=RS&uID=1'))
    
        wait(2000).then(() => setRefreshing(false));
      }, []);
    

    // 이거는 시간 연장할때 쓰는거
    let refresh = async (rfurl) => await axios.get(rfurl)
        .then(function (response) {
            console.log(rfurl)
        }).then(onRefresh)
        .catch(function (error) {
            console.log(rfurl)
            console.log('error : ' + error);
        });

        // 이 네비게이션이 focus되면 실행. onRefresh()를 실행해주겠다! 이걸로 자동 새로고침이 됨
        useEffect(() => {
            const unfetched = navigation.addListener('focus', async() => {
                setDatas(await postDatas(tier))
                setMyRoom(await getDatas(server.ip + '/category/myroom?tier=' + tier + '&game=RS&uID=1'))
            });
        
            return unfetched;
          }, [navigation]);

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
                        source={require('../../../../image/img_rs_bg.png')}
                    />
                </View>
                <View style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    paddingHorizontal: 43,
                    justifyContent: 'space-between'}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 10,
                            width: '77%'
                        }}>
                        <View
                        // 내가 만든 방이 있는지 없는지 확인해서 그거에 따라 UI 변경
                            style={isMyRoom?{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                paddingStart: 10
                            }:{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingStart: 10,
                                paddingHorizontal: 150
                            }}>
                            <Text style={{paddingStart: 10, paddingEnd: 20, fontSize: 30, fontWeight: 'bold', color: '#FFC81A'}}>
                                ·
                            </Text>
                            
                            <Text style={isMyRoom?{paddingEnd: 20, fontSize: 15, fontWeight: 'bold'}:{fontSize: 0}}>
                                내가 쓴 글
                            </Text>
                            <Text style={isMyRoom?{fontSize: 0}:{paddingEnd: 20, fontSize: 15, fontWeight: 'bold'}}>
                                방 만들기
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('teamRS', {tier: tier})}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                paddingEnd: 5
                            }}>
                            <Image
                                style={isMyRoom?{height:0, width:0}:{height: 50, width: 80, resizeMode: 'cover'}}
                                source={require('../../../../image/team.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    {myRoom.map((data, index) => {


                        let rdate = new Date(data.createdTime);
                        rdate.setHours(rdate.getHours() + 9);
                        rdate.setMinutes(rdate.getMinutes() + parseInt(data.endTime));
                        let endtime = rdate.toString().substr(16, 5);

                        endTime = data.endTime;
                        roomID = data.roomID;

                        return (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            paddingVertical: 20,
                        }}
                        // 서버에서 api 호출해 받은 데이터를 다음 화면으로 파라미터 전달
                        onPress={async () => navigation.navigate('joinedRS', {memtitle: [await getDatas(server.ip + '/category/member?roomID=' + data.roomID + '&game=RS'), await getDatas(server.ip + '/category/title?roomID=' + data.roomID), data.roomID, await getDatas(server.ip + '/category/ismember?roomID=' + data.roomID + '&uID=1')]})}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingStart: 15,
                            }}>

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                paddingStart: 5,
                                                paddingEnd: 100
                                            }}>
                                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                                                    {data.roomIntro} ( {data.joined} / {data.total} )
                                                </Text>
                                                <Text style={{fontSize: 12, paddingStart: 10, color: '#5E5E5E'}}>
                                                    {endtime}
                                                </Text>
                                        </View>
                        </View>
                        <View
                            >
                            <TouchableOpacity
                                style={isMyRoom?{
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
                                }:{height:0, width:0}}
                                onPress={() => refresh(server.ip + '/category/refresh?endTime=' + endTime + '&roomID=' + roomID)}>
                                <Text style={{color: '#00255A', fontWeight: 'bold'}}>
                                    시간연장
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                        );})}

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


                <ScrollView 
                    style={styles.sView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }>
                    {datas.map((data, index) => {

                        // 서버 시간과의 차이를 한국 시간으로 바꿔줌
                        let rdate = new Date(data.createdTime);
                        rdate.setMinutes(rdate.getMinutes() + parseInt(data.endTime));
                        rdate.setHours(rdate.getHours() + 9);
                        let endtime = rdate.toString().substr(16, 5);

                        return (
                            <View style={styles.sItem} >
                                <TouchableOpacity
                                    style={{
                                        paddingStart: 8,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}
                                    onPress={async () => navigation.navigate('joinedRS', {memtitle: [await getDatas(server.ip + '/category/member?roomID=' + data.roomID + '&game=RS'), await getDatas(server.ip + '/category/title?roomID=' + data.roomID), data.roomID, await getDatas(server.ip + '/category/ismember?roomID=' + data.roomID + '&uID=1')]})}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            paddingStart: 5
                                        }}>
                                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                                            {data.roomIntro} ( {data.joined} / {data.total} )
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
                                            {data.userName}  |  {endtime}
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

export default roomsRS;
