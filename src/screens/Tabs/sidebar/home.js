import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';

function DrawerScreen({ navigation }) {
    return (

        <View style={styles.container}>
            {/*로그아웃과 떨어트려놓기 위한 view (container의 justifyContent가 space-between이기 때문)*/}
            <View style={{
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                width: '100%',
                paddingHorizontal: 35,
                paddingTop: 30
            }}>
                {/*가장 위에 x표시와 프로필 사진 View*/}
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    backgroundColor: '#ffffff',
                    justifyContent: 'space-between',
                }}>
                    <View style={{paddingTop: 20}}>
                        <TouchableOpacity
                            onPress={() => {navigation.closeDrawer()}}
                        >
                            <Image
                                style={{
                                    height: 20,
                                    width: 20,
                                    resizeMode: 'cover',
                                }}
                                source={require('../../../../src/image/cancel.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <Image
                            style={{
                                height: 100,
                                width: 100,
                                resizeMode: 'cover',
                            }}
                            source={require('../../../../src/image/my.png')}
                        />
                    </TouchableOpacity>

                </View>

                {/*아이디, 이메일, 자기소개 View*/}
                <View style={{
                    flexDirection: 'column',
                    width: '100%',
                    backgroundColor: '#ffffff',
                }}>

                    <Text  style={{fontSize: 30, color: '#000000', paddingVertical: 10}}>
                        닉네임
                    </Text>

                    <Text  style={{fontSize: 14, color: '#000000', paddingVertical: 5}}>
                        email@naver.com
                    </Text>

                    <Text  style={{fontSize: 14, color: '#A5A5A5', paddingVertical: 5}}>
                        자기소개를 등록해주세요.
                    </Text>

                    <View style={{paddingVertical: 25}}>
                        <View style={{
                            width: '100%',
                            height:1,
                            backgroundColor: '#E2E2E2',
                        }}/>
                    </View>


                </View>

                {/*매너지수 View*/}

                <View style={{
                    flexDirection: 'column',
                    width: '100%',
                    backgroundColor: '#ffffff',
                }}>

                    <Text  style={{fontSize: 14, color: '#000000', paddingVertical: 5}}>
                        매너 지수
                    </Text>

                    <Text  style={{fontSize: 14, color: '#000000', paddingVertical: 5}}>
                        비매 너지수
                    </Text>

                    <View style={{paddingVertical: 25}}>
                        <View style={{
                            width: '100%',
                            height:1,
                            backgroundColor: '#E2E2E2',
                        }}/>
                    </View>


                </View>

                {/*내 게임정보, 프로필 관리 view*/}
                <View style={{
                    flexDirection: 'column',
                    width: '100%',
                    backgroundColor: '#FFFFFF'
                }}>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('myGameScreen');
                        }}
                    >
                        <Text  style={{fontSize: 14, color: '#000000', paddingVertical: 5}}>
                            내 게임 정보
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('myProfileScreen');
                        }}
                    >
                        <Text  style={{fontSize: 14, color: '#000000', paddingVertical: 5}}>
                            프로필 관리
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/*로그아웃 View*/}
            <View
                style={{
                    backgroundColor: '#F7F7F7',
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        // Navigate using the `navigation` prop that you received
                        navigation.navigate('SomeScreen');
                    }}
                >
                    <View style={{
                        paddingStart: 35,
                        flexDirection: 'row',
                    }}>
                        <Image
                            style={{
                                height: 30,
                                width: 30,
                                resizeMode: 'cover',
                            }}
                            source={require('../../../../src/image/logout.png')}
                        />
                        <Text  style={{fontSize: 14, color: '#000000', paddingVertical: 6, paddingStart: 10}}>
                            로그아웃
                        </Text>
                    </View>
                </TouchableOpacity>
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
});

export default DrawerScreen;
