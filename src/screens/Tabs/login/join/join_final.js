import {View, Text, Button, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';
import React, { Component } from 'react';
import LoginHome from '../home';
import join from './join';
import axios from 'axios';


// 10월21일부
function join_final({ navigation, route }) {

    let userName = route.params.memtitle[0];
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
                    source={require('../../../../image/check.png')}
                />
            </View>
            <View>
                <Text style={{fontSize: 20, color: '#171616',}}>
                    환영합니다!
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
                        회원가입이 완료되었습니다.
                    </Text>
                </View>
            </View>

            <View>

            <TouchableOpacity onPress={() => navigation.navigate(LoginHome)}>
                <Text  style={{fontSize: 15, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 40, paddingRight: 40, backgroundColor: '#0b4072',borderStyle: 'solid',paddingTop: 10, paddingBottom: 10,
                    borderRadius: 30,
                    borderColor: '#0b4072',
                    borderWidth: 2,}}>
                    로그인하기
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
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});

export default join_final;
