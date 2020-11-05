import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Avatar, Accessory } from 'react-native-elements';
import Modal from 'react-native-modal';

function myProf({ navigation }) {
    
    return (
        <View style={{ height:'100%', backgroundColor: "#F7F7F7", paddingLeft: '10%', paddingRight: '10%', paddingTop: '10%' }}>
            <View style={{flexDirection:'row', height:'25%'}}>
                <View style={{ width: '25%'}}>
                    <TouchableOpacity>
                        <Avatar
                            rounded
                            source={require('../../../../image/lol_bg.png')}
                            size='large'
                        />
                    </TouchableOpacity>
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
                            <Image source={require('../../../../image/go.png')} style={{width:'40%', height:'100%'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{width:'100%', height:2, backgroundColor:'#E2E2E2'}} />
            <View style={{ width:'100%', height:'10%', borderRadius: 15, marginTop:'10%',backgroundColor:'#FFFFFF', elevation:5,}}>
                <TouchableOpacity style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text>안녕하세요!</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: '15%', borderRadius: 15, marginTop: '10%', backgroundColor: '#FFFFFF', elevation:5, flexDirection:'row', padding:'5%' }}>
                <View style={{ width:'50%', height:'100%',}}>
                    <View style={{height:'50%', flexDirection:'row',paddingRight:'10%'}}>
                        <View style={{width:'60%', height:'100%', justifyContent:'center'}}>
                            <Text style={{fontSize:12, fontWeight:'bold'}}>매너 지수</Text>
                        </View>
                        <View style={{ width: '40%', height: '100%', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'flex-end', fontSize: 12, fontWeight: 'bold'}}>20</Text>
                        </View>
                    </View>
                    <View style={{ height: '50%', paddingRight: '10%', justifyContent:'center' }}>
                        <View style={{ width: '100%', height: 8, alignItems: 'flex-start', borderWidth:1, borderColor:'#E2E2E2' }}>
                            <View style={{ width: '20%', height: '100%', backgroundColor: '#FFC81A' }} />
                        </View>
                    </View>
                </View>
                <View style={{ width: '50%', height: '100%',}}>
                    <View style={{ height: '50%', flexDirection: 'row', paddingLeft:'10%' }}>
                        <View style={{ width: '60%', height: '100%', justifyContent:'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>비매너 지수</Text>
                        </View>
                        <View style={{ width: '40%', height: '100%', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'flex-end', fontSize: 12, fontWeight: 'bold' }}>7</Text>
                        </View>
                    </View>
                    <View style={{ height: '50%', paddingLeft: '10%', justifyContent: 'center' }}>
                        <View style={{ width: '100%', height: 8, alignItems: 'flex-start', borderWidth:1, borderColor:'#E2E2E2' }}>
                            <View style={{ width: '20%', height: '100%', backgroundColor: '#00255A' }} />
                        </View>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: "center",
        padding: 20
    },
    
});


export default myProf;