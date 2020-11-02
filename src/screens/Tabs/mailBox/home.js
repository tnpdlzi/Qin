import React, {Component, useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, RefreshControl, TouchableHighlight} from 'react-native';
import server from '../../../../server.json';
import {Avatar, Accessory} from 'react-native-elements';
import Modal from 'react-native-modal';
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

    const [modalVisible, setModalVisible] = useState(new Array(datas.length).fill(false));
    const [okModal, setOkModal] = useState(false);

    let arr = new Array(modalVisible.length).fill(false);

    // 새로고침 onRefresh로 구현. onRefresh를 호출하면 setDatas, setMyRoom으로 hook 다시 불러옴. 그에 따라 화면도 다시 render
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);

        setDatas(await getDatas(server.ip + '/mail/getMails?&uID=1'))
    
        wait(2000).then(() => setRefreshing(false));
      }, []);
    

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

                        console.log('index값 : ' + index)

                        // 서버 시간과의 차이를 한국 시간으로 바꿔줌
                        let rdate = new Date(data.createdTime);
                        rdate.setHours(rdate.getHours() + 9);
                        let endtime = rdate.toString().substr(16, 5);
                        let game = '';

                        if(data.game == 'LOL'){
                            game = 'LEAGUE OF LEGENDS';
                        }else if(data.game == 'OW'){
                            game = 'OVERWATCH';
                        }else if(data.game == 'BG'){
                            game = 'BATTLEGROUND';
                        }else if(data.game == 'RS'){
                            game = 'RAINBOW SIX SIEGE';
                        }else{
                            game = data.game;
                        }

                        return (
                            <View style={styles.sItem} >
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}
                                    onPress={() => {
                                        arr[index]=true;
                                        setModalVisible(arr);
                                    }}>

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
                                                        {data.userName}
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

                                <Modal
                                    animationIn={"slideInUp"} //default 'slideInUp'
                                    animationOut={'slideOutDown'} //default 'slideOutDown'
                                    isVisible={modalVisible[index]}
                                    transparent={true} //default 'true'
                                    backdropColor={'black'} //default 'black'
                                    backdropOpacity={0.5} //default 0.7
                                    onBackButtonPress={() => {
                                        arr[index]=false;
                                        setModalVisible(arr);
                                    }}
                                    onBackdropPress={() => setModalVisible(false)}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <TouchableOpacity onPress={() => { 
                                                arr[index]=false;
                                                setModalVisible(arr);
                                            }}
                                            >
                                                <Image style={{ width: 70, height: 70, }} source={require('../../../image/cancel.png')} />
                                            </TouchableOpacity>
                                            <View style={{
                                                width: '70%', height: '15%', alignSelf: 'center',
                                                flexDirection: 'row', marginBottom: 20
                                            }}>
                                                <View style={{ width: '70%', }}>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: '5%' }}>{data.userName}</Text>
                                                    <Text style={{ fontSize: 12, marginTop: '3%' }}>{data.intro}</Text>
                                                </View>
                                                <View style={{ width: '30%', alignItems: 'center' , justifyContent: 'flex-start', marginTop: '5%'}}>
                                                    <Avatar
                                                        rounded
                                                        style={{ width: '70%', height: '70%'}}
                                                        source={require('../../../image/profile.png')}
                                                    />
                                                </View>
                                            </View>
                                            
                                            <View style={{ width: '70%', height: 1, backgroundColor: "#E2E2E2", alignSelf: "center" }} />
                                            
                                            <View style={{ width: '70%', height: '10%', alignSelf: 'center', flexDirection: 'row', paddingTop: 20 }}>
                                                <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', }}>
                                                    <Text style={{ color: '#363636', fontSize: 12, fontWeight: 'bold' }}>매너 지수   </Text>
                                                    <Text style={{ color: '#FFC81A', fontSize: 12, fontWeight: 'bold' }}>{data.good}</Text>
                                                </View>
                                                <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                    <Text style={{ color: '#363636', fontSize: 12, fontWeight: 'bold' }}>비매너 지수   </Text>
                                                    <Text style={{ color: '#00255A', fontSize: 12, fontWeight: 'bold' }}>{data.bad}</Text>
                                                </View>
                                            </View>
                                            
                                            
                                            <View style={{ width: '70%', alignSelf: 'center', paddingTop: 20, marginBottom: 10 }}>
                                                
                                                <View style={{height: 100, justifyContent:'center'}} >
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 20, color: '#FFC81A' }}>{'\u2022 '} </Text>
                                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{game}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>
                                                        <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '} </Text>
                                                        <Text style={{ fontSize: 12 }}>{data.gameID}</Text>
                                                        <Text style={{ fontSize: 12 }}> </Text>
                                                        <Text style={{ fontSize: 12 }}>({data.tierID})</Text>
                                                    </View>
                                                </View>
                                                
                                            </View>
                                            
                                            <View style={{ width: '80%', height: 1, backgroundColor: "#E2E2E2", alignSelf: "center" }} />
                                            
                                            

                                            <View style={{width:'100%', flexDirection:'row', marginTop: 20, justifyContent:'center'}}>
                                                <TouchableOpacity
                                                    style={{
                                                        width: '45%', height: 20, alignSelf: 'center'
                                                        , justifyContent: 'center'
                                                    }}
                                                    onPress={() => {

                                                        arr[index]=false;
                                                        setModalVisible(arr);
                                                        setOkModal(true);
                                                        getDatas(server.ip + '/mail/bad?&uID=' + data.uID1);
                                                        getDatas(server.ip + '/mail/deleteMail?&fgID=' + data.fgID);

                                                    }}>
                                                    <Text style={{ color: "gray", fontWeight: "bold", textAlign: "center", fontSize: 16 }}>싫어요</Text>
                                                </TouchableOpacity>

                                                <View style={{ width: 1, height: 40, backgroundColor: "#E2E2E2", alignSelf: "center" }} />

                                                <TouchableOpacity
                                                    style={{
                                                        width: '45%', height: 20, alignSelf: 'center'
                                                        , justifyContent: 'center'
                                                    }}
                                                    onPress={() => {
                                                        
                                                        arr[index]=false;
                                                        setModalVisible(arr);
                                                        setOkModal(true);
                                                        getDatas(server.ip + '/mail/good?&uID=' + data.uID1);
                                                        getDatas(server.ip + '/mail/deleteMail?&fgID=' + data.fgID);

                                                    }}>
                                                    <Text style={{ color: "black", fontWeight: "bold", textAlign: "center", fontSize: 16 }}>좋아요</Text>
                                                </TouchableOpacity>
                                            </View>
                                            

                                        </View>
                                    </View>
                                </Modal>

                                <Modal
                                    animationIn={"slideInUp"} //default 'slideInUp'
                                    animationOut={'slideOutDown'} //default 'slideOutDown'
                                    isVisible={okModal}
                                    transparent={true} //default 'true'
                                    backdropColor={'black'} //default 'black'
                                    backdropOpacity={0.5} //default 0.7
                                    onBackButtonPress={() => {
                                        setOkModal(false);
                                        onRefresh();
                                    }}
                                    onBackdropPress={() => {setOkModal(false); onRefresh();}}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={{
                                            width: '90%',
                                            height: 270,
                                            backgroundColor: "white",
                                            borderRadius: 20,
                                            alignItems: 'center',
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                        }}>
                                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                                                    <Image style={{ width: 100, height: 100, }} source={require('../../../image/id_y.png')} />
                                                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingEnd: 40 }}>평가완료</Text>
                                                </View>

                                                <View style={{
                                                    width: '70%', height: '15%', alignSelf: 'center',
                                                    flexDirection: 'row', marginBottom: 40
                                                }}>
                                                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: '5%' }}>매너지수를 평가해주셔서 감사합니다.</Text>
                                                        <Text style={{ color: '#e2e2e2', fontSize: 12, fontWeight: 'bold', marginTop: '5%' }}>메시지는 자동으로 삭제됩니다.</Text>
                                                    </View>
                                                
                                                </View>
                                            </View>
                                            
                                    
                                            
                                            <View style={{ width: '80%', height: 1, backgroundColor: "#E2E2E2", alignSelf: "center" }} />
                                            
                                            

                                            <View style={{width:'100%', flexDirection:'row', marginTop: 20, justifyContent:'center'}}>

                                                <TouchableOpacity
                                                    style={{
                                                        width: '45%', height: 20, alignSelf: 'center'
                                                        , justifyContent: 'center'
                                                    }}
                                                    onPress={() => {setOkModal(false); onRefresh();
                                                    }}>
                                                    <Text style={{ color: "black", fontWeight: "bold", textAlign: "center", fontSize: 16 }}>확인</Text>
                                                </TouchableOpacity>
                                            </View>
                                            

                                        </View>
                                    </View>
                                </Modal>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
    },
    modalView: {
        width: '90%',
        height: 410,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default MailHome;
