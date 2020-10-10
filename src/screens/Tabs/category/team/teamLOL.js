import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import teamComplete from "./teamComplete";
import axios from 'axios';

const qs = require('qs');

let postDatas = async (ruID, tier, game, total, endTime, roomIntro) => await axios({
    method: 'post',
    url: 'http://133.186.216.152:8080/category/makeRoom',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      ruID: ruID,
      tier: tier,
      game: game,
      total: total,
      endTime: endTime,
      roomIntro: roomIntro
    })
  }).then(async () => await axios.get('http://133.186.216.152:8080/category/newroom?tier=' + tier + '&game=LOL&uID=' + ruID)
  .then(function (response) {
      console.log(response.data[0].roomID)
      return response.data[0].roomID
  })
  .catch(function (error) {
      console.log('error : ' + error);
  })).then(async (roomID) => await axios({
    method: 'post',
    url: 'http://133.186.216.152:8080/category/join',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      uID: ruID,
      roomID: roomID
    })
  }).then(function (roomID) {
    let rtn = roomID.config.data.split('roomID=');
    return rtn[1]
}));
//   let postDatas2 = async (url, uID, roomID) => await axios({
//     method: 'post',
//     url: url,
//     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//     data: qs.stringify({
//       uID: uID,
//       roomID: roomID
//     })
//   });

  let getMyRoom = async (mrurl) => await axios.get(mrurl)
        .then(function (response) {
            console.log(response.data)
            return response.data
        })
        .catch(function (error) {
            console.log(mrurl)
            console.log('error : ' + error);
        });

function teamLOL({ navigation, route }) {
    // hook을 통해 만든 states. 그냥 변수와 설정하는 함수라고 생각하면 쉽다. 여길 보면 훅에 대한 이해도를 높일 수 있을것.
    const [top, setTop] = useState(false);
    const [jungle, setJungle] = useState(false);
    const [mid, setMid] = useState(false);
    const [bottom, setBottom] = useState(false);
    const [support, setSupport] = useState(false);
    const [count, setCount] = useState(1);
    const [minutes, setMinutes] = useState(5);
    const [intro, setIntro] = useState('');
    
    let tier = route.params.tier;
    console.log(tier)

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
                            <TouchableOpacity onPress={() => count > 1 ? setCount(count-1) : null}>
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
                            <TouchableOpacity onPress={() => count < 5 ? setCount(count+1) : null}>
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
                    height: 150,
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

                                    <TouchableOpacity style={ top ? {
                                        height: 35,
                                        width: 53,
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
                                    } : {
                                        height: 35,
                                        width: 53,
                                        flexDirection: 'row',
                                        borderStyle: 'solid',
                                        borderRadius: 14,
                                        borderColor: '#E2E2E2',
                                        borderWidth: 1,
                                        borderTopWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                                      onPress={() => setTop(!top)}
                                    >
                                        <Text style={{fontSize: 14, padding: 5, color: top ? '#000000' : '#E2E2E2'} }>
                                            탑
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: 8
                                    }}>
                                    <TouchableOpacity style={ mid ? styles.positioned : styles.position} onPress={() => setMid(!mid)}>
                                        <Text style={{fontSize: 14, padding: 5, color: mid ? '#000000' : '#E2E2E2'}}>
                                            미드
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: 8
                                    }}>
                                    <TouchableOpacity style={jungle ? styles.positioned : styles.position} onPress={() => setJungle(!jungle)}>
                                        <Text style={{fontSize: 14, padding: 5, color: jungle ? '#000000' : '#E2E2E2'}}>
                                            정글
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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
                                    <TouchableOpacity style={bottom ? styles.positioned : styles.position} onPress={() => setBottom(!bottom)}>
                                        <Text style={{fontSize: 14, padding: 5, color: bottom ? '#000000' : '#E2E2E2'}}>
                                            원딜
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: 8
                                    }}>
                                    <TouchableOpacity style={support ? {height: 35,
                                            width: 73,
                                            flexDirection: 'row',
                                            borderStyle: 'solid',
                                            borderRadius: 14,
                                            borderColor: '#ffffff',
                                            borderWidth: 1,
                                            borderTopWidth: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            elevation: 10,
                                            backgroundColor: '#ffffff'} :
                                        {height: 35,
                                            width: 73,
                                            flexDirection: 'row',
                                            borderStyle: 'solid',
                                            borderRadius: 14,
                                            borderColor: '#E2E2E2',
                                            borderWidth: 1,
                                            borderTopWidth: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',}}
                                                      onPress={() => setSupport(!support)}>
                                        <Text style={{fontSize: 14, padding: 5, color: support ? '#000000' : '#E2E2E2'}}>
                                            서포터
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
                        onPress={async () => navigation.navigate('teamComplete', {myRoom: await postDatas(1, tier, 'LOL', count, minutes, intro)})}>

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

export default teamLOL;
