import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Avatar, Accessory } from 'react-native-elements';
import Modal from 'react-native-modal';

function myProf({ navigation }) {
    
    return (
        <View style={{ height:'100%', backgroundColor: "#F7F7F7", paddingLeft: '10%', paddingRight: '10%', paddingTop: '10%' }}>
            <View style={{flexDirection:'row', height:'25%'}}>
                <View style={{ width: '25%'}}>
                    <Avatar
                        rounded
                        source={require('../../../image/lol_bg.png')}
                        size='large'
                    />
                </View>
                <View style={{ width:'75%', height:'100%', paddingLeft: '15%'}}>
                    <View style={{height:'25%'}}>
                        <Text style={{fontSize:25, fontWeight:'bold'}}>이지훈</Text>
                    </View>
                    <View style={{ height: '15%', paddingTop: '3%'}}>
                        <Text style={{ color:'#363636'}}>dlwlgns102@naver.com</Text>
                    </View>
                    <View style={{height: '50%'}}>
                        <TouchableOpacity style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{ fontSize: 20, color:'#A5A5A5'}}>{'\u2022 '} </Text>
                            <Text>비밀번호 변경            </Text>
                            <Image source={require('../../../image/go.png')} style={{width:'40%', height:'100%'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{width:'100%', height:2, backgroundColor:'#E2E2E2'}} />
            <View style={{ width:'100%', height:'10%', borderRadius: 15, marginTop:'10%',backgroundColor:'#FFFFFF', elevation:5}}>

            </View>
            <View style={{ width: '100%', height: '15%', borderRadius: 15, marginTop: '10%', backgroundColor: '#FFFFFF', elevation:5 }}>

            </View>

        </View>
    );
}


export default myProf;