import {View, Text, Button, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';
import React, {Component, useState} from 'react';

import find_pw from '../find_pw/find_pw';
import axios from 'axios';
import LoginHome from '../home';


// 10월21일부
function find_id_final({ navigation, route }) {
    let userName = route.params.memtitle[0];
    let userID = route.params.memtitle[1];
    console.log("넘어온 id")
    console.log(userID)
    console.log("넘어온 닉네임")
    console.log(userName)





    return (

        <View style={styles.container}>
            <View style={{
                backgroundColor: '#ffffff',
                width: '100%',
                paddingTop: 50,
            }}>
            </View>
            <View>
                <Image
                    style={{
                        height: 100,
                        width: 100,
                        resizeMode: 'center',
                    }}
                    source={require('../../../image/registered.png')}
                />
            </View>
            <View>
                <Text style={{fontSize: 20, color: '#171616',}}>
                    {userID}
                </Text>
            </View>

            <View style={{
                backgroundColor: '#ffffff',
                width: '100%',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <View>
                    <Text style={{fontSize: 15, color: '#171616',}}>
                        반갑습니다. {userName}님,
                    </Text>
                </View>
                <View>
                    <Text style={{fontSize: 15, color: '#171616', paddingTop: 10,}}>
                        아이디(이메일)는 다음과 같습니다.
                    </Text>
                </View>
            </View>
            <View style={{paddingTop: 20,}}>
            </View>

            <View>
                <TouchableOpacity onPress={() => navigation.navigate('LoginHome')}>
                    <Text  style={{fontSize: 15, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 40, paddingRight: 40, backgroundColor: '#0b4072',borderStyle: 'solid',paddingTop: 10, paddingBottom: 10,
                        borderRadius: 30,
                        borderColor: '#0b4072',
                        borderWidth: 2,}}>
                        로그인하기
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity  onPress={() => navigation.navigate('find_pw')}>
                    <Text  style={{fontSize: 15, color: 'black', paddingVertical: 5,paddingLeft: 30, paddingRight: 30, backgroundColor: 'white',borderStyle: 'solid',paddingTop: 10, paddingBottom: 10,
                        borderRadius: 30,
                        borderColor: '#0b4072',
                        borderWidth: 2,}}>
                        비밀번호 찾기
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{
                backgroundColor: '#ffffff',
                width: '100%',
                paddingTop: 50,
            }}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});

export default find_id_final;
