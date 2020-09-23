import React, { useState } from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import teamLOL from "../team/teamLOL";



function joinedLOL({ navigation, route }) {

    let member = route.params.memtitle[0];
    let rTitle = route.params.memtitle[1];

    const [top, setTop] = useState(false);
    const [jungle, setJungle] = useState(false);
    const [mid, setMid] = useState(false);
    const [bottom, setBottom] = useState(false);
    const [support, setSupport] = useState(false);

    return (
        <View style={styles.container}>
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

            {rTitle.map((data, index) => {
                return(
                    <View style={{
                        width: '100%',
                        height: 70,
                        backgroundColor: '#ffffff',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingTop: 20,
                        paddingBottom: 0,
                        paddingHorizontal: 30
                    }} >
                        <View
                            style={{
                                paddingStart: 8,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    paddingStart: 5
                                }}>

                                <Text style={{fontSize: 32}}>
                                    {data.roomIntro}
                                </Text>


                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    flex: 1,
                                    padding: 20,
                                    alignItems: 'center'
                                }}>

                                <Text style={{fontSize: 16}}>
                                    {data.joined} / {data.total} 명
                                </Text>

                            </View>
                        </View>
                    </View>
                );
            })}


            <ScrollView style={styles.sView}>
                {member.map((data, index) => {

                    let rdate = new Date(data.inTime);
                    rdate.setHours(rdate.getHours() + 9);
                    let intime = rdate.toString().substr(16, 5);

                    return (
                        <View style={{
                            width: '100%',
                            height: 60,
                            backgroundColor: '#ffffff',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderBottomColor: 'gray',
                            justifyContent: 'space-between',
                        }} >
                            <View style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#ffffff',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }} >
                                <View
                                    style={{
                                        paddingStart: 8,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            paddingStart: 5
                                        }}>

                                        <Text style={{fontSize: 14}}>
                                            {data.uID}
                                        </Text>


                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            flex: 1,
                                            padding: 20
                                        }}>

                                        <Text style={{fontSize: 14}}>
                                            {intime}
                                        </Text>

                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}
                <View style={{width: '100%',
                    height: 150,
                    backgroundColor: '#ffffff',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 0,
                    }}>
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
                                    onPress={() => setTop(!top)}>
                                        <Text style={{fontSize: 14, padding: 5, color: top ? '#000000' : '#E2E2E2'} }>
                                            탑
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: 8
                                    }}>
                                    <TouchableOpacity style={mid ? styles.positioned : styles.position}
                                    onPress={() => setMid(!mid)}>
                                        <Text style={{fontSize: 14, padding: 5, color: mid ? '#000000' : '#E2E2E2'} }>
                                            미드
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: 8
                                    }}>
                                    <TouchableOpacity style={jungle ? styles.positioned : styles.position}
                                                      onPress={() => setJungle(!jungle)}>
                                        <Text style={{fontSize: 14, padding: 5, color: jungle ? '#000000' : '#E2E2E2'} }>
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
                                    <TouchableOpacity style={bottom ? styles.positioned : styles.position}
                                                      onPress={() => setBottom(!bottom)}>
                                        <Text style={{fontSize: 14, padding: 5, color: bottom ? '#000000' : '#E2E2E2'} }>
                                            원딜
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: 8
                                    }}>
                                    <TouchableOpacity style={ support ? {height: 35,
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

                                    <Text style={{fontSize: 14, padding: 5, color: support ? '#000000' : '#E2E2E2'} }>
                                            서포터
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
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
                        }}>

                        <Text style={{color: '#ffffff', fontSize: 15, fontWeight: 'bold'}}>
                            참여하기
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

export default joinedLOL;
