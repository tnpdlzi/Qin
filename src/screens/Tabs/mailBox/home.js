import React, {Component, useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, RefreshControl} from 'react-native';
import server from '../../../../server.json';
import {Avatar, Accessory} from 'react-native-elements';
import axios from 'axios';

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


function MailHome({ navigation, route }) {

    const [datas, setDatas] = useState([]);

    // 새로고침 onRefresh로 구현. onRefresh를 호출하면 setDatas, setMyRoom으로 hook 다시 불러옴. 그에 따라 화면도 다시 render
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);

        setDatas(await getDatas(server.ip + '/mail/getMails?&uID=1'))
    
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
                setDatas(await getDatas(server.ip + '/mail/getMails?&uID=1'))
            });
        
            return unfetched;
          }, [navigation]);

        return (
            <View style={styles.container}>
                
                <ScrollView 
                    style={styles.sView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }>
                    {datas.map((data, index) => {

                        // 서버 시간과의 차이를 한국 시간으로 바꿔줌
                        let rdate = new Date(data.createdTime);
                        rdate.setHours(rdate.getHours() + 9);
                        let endtime = rdate.toString().substr(16, 5);

                        return (
                            <View style={styles.sItem} >
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}
                                    // onPress={async () => navigation.navigate('joinedLOL', {memtitle: [await getDatas(server.ip + '/category/member?roomID=' + data.roomID + '&game=LOL'), await getDatas(server.ip + '/category/title?roomID=' + data.roomID), data.roomID, await getDatas(server.ip + '/category/ismember?roomID=' + data.roomID + '&uID=1')]})}>
                                    >

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                            <View style={{height:77, width: 77,alignItems:'center', justifyContent:'center',}}>
                                                <Avatar
                                                    rounded
                                                    style={{width: '70%', height:'70%', }}
                                                    source={require('../../../image/profile.png')}
                                                />
                                            </View>


                                            <View>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-start',
                                                        paddingStart: 5,
                                                        paddingBottom: 10
                                                    }}>
                                                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                                                        {data.userName}     {data.image}
                                                    </Text>

                                                </View>

                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-start',
                                                        paddingStart: 5
                                                    }}>
                                                    <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                                                    '{data.gameID}' 님의 매너를 평가해주세요.
                                                    </Text>

                                                </View>
                                            </View>


                                        </View>
                                    
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            flex: 1,
                                            padding: 10,
                                            paddingTop: 43
                                        }}>
                                        <Text style={{fontSize: 12, paddingStart: 10, color: '#5E5E5E'}}>
                                            {endtime}
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
    },
    
    sView: {
        flex: 1,
        borderRadius: 0,
        elevation: 0,
        paddingHorizontal: 10,
    },
    sItem: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default MailHome;
