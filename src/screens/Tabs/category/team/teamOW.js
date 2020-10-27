import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import server from '../../../../../server.json'
import axios from 'axios';

const qs = require('qs');

// 방 생성의 일련의 과정을 동기를 맞춰서 진행. makeRoom을 통해 방을 만듦. 거기에 들어갈 유저ID, tier, game, total, endTime, roomIntro 값은 다 받아서 세팅
// 그 후에 get을 통해 방금 만든 새로운 방에 대한 roomID를 받아옴
// 받아온 값을 또 넘겨 post로 join 시킴. 내가 만든 방에 내가 들어가야 하니까. 방을 만들고, 내가 만든 방 ID를 받고, 거기에 join까지 하는 거임. 하나의 버튼으로.
// 그 후에 roomID값을 받아서 다시 return. 그래야 teamComplete한테 내가 만든 방 ID를 파라미터로 넘겨줄 수 있음.
let postDatas = async (ruID, tier, game, total, endTime, roomIntro, position) => await axios({
    method: 'post',
    url: server.ip + '/category/makeRoom',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      ruID: ruID,
      tier: tier,
      game: game,
      total: total,
      endTime: endTime,
      roomIntro: roomIntro
    })
  }).then(async () => await axios.get(server.ip + '/category/newroom?tier=' + tier + '&game=OW&uID=' + ruID)
  .then(function (response) {
      console.log(response.data[0].roomID)
      return response.data[0].roomID
  })
  .catch(function (error) {
      console.log('error : ' + error);
  })).then(async (roomID) => await axios({
    method: 'post',
    url: server.ip + '/category/join',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      uID: ruID,
      roomID: roomID,
      position: position
    })
  }).then(function (roomID) {
    let rtn = roomID.config.data.split('roomID=');
    return rtn[1]
}));


function teamOW({ navigation, route }) {
    // hook을 통해 만든 states. 그냥 변수와 설정하는 함수라고 생각하면 쉽다. 여길 보면 훅에 대한 이해도를 높일 수 있을것.
    const [tank, setTank] = useState(false);
    const [damage, setDamage] = useState(false);
    const [support, setSupport] = useState(false);
    const [count, setCount] = useState(2);
    const [minutes, setMinutes] = useState(5);
    const [intro, setIntro] = useState('');
    
    let tier = route.params.tier;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.sView}>
                <View style={styles.container}>
                    <View style={{
                        paddingEnd: 20
                    }}>
                        <Image
                            style={{
                                height: 170,
                                width: 170,
                                resizeMode: 'cover',
                            }}
                            source={require('../../../../image/team.png')}/>
                    </View>

                    <Text style={{fontSize: 16, fontWeight: 'bold', paddingBottom: 30}}>
                        필요한 인원을 모집하세요.
                    </Text>
                </View>

                <View style={{paddingHorizontal: 37}}>

                <View style={styles.sItem}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            paddingStart: 10,
                            paddingEnd: 20,
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: '#ffc81a'
                        }}>
                            ·
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                width: '75%'
                            }}>
                            <TextInput style={{fontSize: 16}} placeholder="제목을 입력하세요." onChangeText={(intro) => setIntro(intro)}/>
                        </View>
                    </View>
                </View>

                <View style={styles.sItem}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            paddingStart: 10,
                            paddingEnd: 10,
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: '#ffc81a'
                        }}>
                            ·
                        </Text>
                        <Text style={{paddingStart: 10, paddingEnd: 20, fontSize: 14, fontWeight: 'bold'}}>
                            인원
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                width: '75%'
                            }}>
                            <TouchableOpacity onPress={() => count > 2 ? setCount(count-1) : null}>
                                <Image
                                    style={{
                                        height: 80,
                                        width: 80,
                                        resizeMode: 'cover',
                                    }}
                                    source={require('../../../../image/minus.png')}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 14}}>
                                {count}명
                            </Text>
                            <TouchableOpacity onPress={() => count < 6 ? setCount(count+1) : null}>
                                <Image
                                    style={{
                                        height: 80,
                                        width: 80,
                                        resizeMode: 'cover',
                                    }}
                                    source={require('../../../../image/plus.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{width: '100%',
                    height: 80,
                    backgroundColor: '#ffffff',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 0,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'gray',}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            paddingStart: 10,
                            paddingEnd: 10,
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: '#ffc81a'
                        }}>
                            ·
                        </Text>
                        <Text style={{paddingStart: 10, paddingEnd: 20, fontSize: 14, fontWeight: 'bold'}}>
                            포지션
                        </Text>
                        <View
                            style={{
                                flexDirection: 'column',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: '75%',
                                    padding: 8
                                }}>
                                
                                <View
                                    style={{
                                        paddingHorizontal: 8
                                    }}>
                                    <TouchableOpacity style={ damage ? styles.positioned : styles.position} onPress={() => setDamage(!damage)}>
                                        <Text style={{fontSize: 14, padding: 5, color: damage ? '#000000' : '#E2E2E2'}}>
                                            공격
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: 8
                                    }}>
                                    <TouchableOpacity style={ tank ? styles.positioned : styles.position} onPress={() => setTank(!tank)}>
                                        <Text style={{fontSize: 14, padding: 5, color: tank ? '#000000' : '#E2E2E2'}}>
                                            돌격
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                
                                <View
                                    style={{
                                        paddingHorizontal: 8
                                    }}>
                                    <TouchableOpacity style={ support ? styles.positioned : styles.position} onPress={() => setSupport(!support)}>
                                        <Text style={{fontSize: 14, padding: 5, color: support ? '#000000' : '#E2E2E2'}}>
                                            지원
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            
                        </View>
                    </View>
                </View>
                </View>
                <View style={{
                    width: '100%',
                    height: 130,
                    backgroundColor: '#ffffff',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingBottom: 40,
                    paddingHorizontal: 37
                }}>

                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                            <Text style={{
                                paddingStart: 0,
                                paddingEnd: 10,
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: '#ffc81a'
                            }}>
                                ·
                            </Text>
                            <Text style={{paddingStart: 10, paddingEnd: 20, fontSize: 14, fontWeight: 'bold'}}>
                                자동삭제
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity onPress={() => minutes > 5 ? setMinutes(minutes-5) : null}>
                                    <Image
                                        style={{
                                            height: 80,
                                            width: 80,
                                            resizeMode: 'cover',
                                        }}
                                        source={require('../../../../image/minus.png')}/>
                                </TouchableOpacity>
                                <Text style={{fontSize: 14}}>
                                    {minutes.toString()}분 후
                                </Text>
                                <TouchableOpacity onPress={() => minutes < 30 ? setMinutes(minutes+5) : null}>
                                    <Image
                                        style={{
                                            height: 80,
                                            width: 80,
                                            resizeMode: 'cover',
                                        }}
                                        source={require('../../../../image/plus.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{paddingStart: 10}}>
                            5분 단위의 시간 설정으로 모집 글이 자동 삭제됩니다.
                        </Text>

                    </View>

                </View>

                <View
                    style={{alignItems: 'center', paddingBottom: 30, paddingTop: 20}}>
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
                        onPress={async () => navigation.navigate('teamComplete', {myRoom: await postDatas(1, tier, 'OW', count, minutes, intro, (damage?' 공격 ':'') + (tank?' 돌격 ':'') + (support?' 지원':'')), tier: tier, game: 'OW'})}>

                        <Text style={{color: '#ffffff', fontSize: 15, fontWeight: 'bold'}}>
                            작성하기
                        </Text>

                    </TouchableOpacity>
                </View>



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

export default teamOW;
