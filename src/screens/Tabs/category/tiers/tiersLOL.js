import React, {Component, useState} from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import axios from "axios";

const tiers = [
    {id: 'UNRANKED'},
    {id: 'IRON'},
    {id: 'BRONZE'},
    {id: 'SILEVER'},
    {id: 'GOLD'},
    {id: 'PLATINUM'},
    {id: 'DIAMOND'},
    {id: 'MASTER'},
];

function tiersLOL({ navigation }) {

    let getDatas = async (url) => await axios.get(url)
        .then(function (response) {
            console.log(response.data)
            return response.data
        })
        .catch(function (error) {
            console.log(url)
            console.log('error : ' + error);
        });

    let getMyRoom = async (mrurl) => await axios.get(mrurl)
        .then(function (response) {
            console.log(response.data)
            return response.data
        })
        .catch(function (error) {
            console.log(mrurl)
            console.log('error : ' + error);
        });


    return (
            <View style={styles.container}>
                <View style={styles.gameImage}>
                    <View style={styles.item}>
                        <Image
                            style={{height: 50, width: 50, resizeMode: 'contain'}}
                            source={require('../../../../image/img_user.png')}
                        />
                        <Text style={{padding: 20}}>등록이 필요합니다.</Text>
                    </View>
                    <Image
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: 200,
                            width: '100%',
                            resizeMode: 'cover',
                        }}
                        source={require('../../../../image/img_lol_bg.png')}
                    />
                </View>
                <ScrollView style={styles.sView}>
                    {tiers.map((data, index) => {
                        return (
                                <View style={styles.sItem} >
                                    <TouchableOpacity
                                        style={{
                                            paddingStart: 8,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                        onPress={
                                            async () => navigation.navigate('roomsLOL', {dataroom: [await getDatas('http://133.186.216.152:8080/category/roomlist?tier=' + data.id + '&game=LOL'), await getMyRoom('http://133.186.216.152:8080/category/myroom?tier=' + data.id + '&game=LOL&uID=1')]})
                                        }>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                            }}>
                                            <Text style={{paddingEnd: 20, fontSize: 40, fontWeight: 'bold'}}>
                                                ·
                                            </Text>
                                            <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                                                {data.id}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                flex: 1,
                                            }}>
                                            <Image
                                                style={{height: 80, width: 80, resizeMode: 'cover'}}
                                                source={require('../../../../image/img_go.png')}
                                            />
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
        backgroundColor: '#ffffff',
    },
    gameImage: {
        height: 270,
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
});

export default tiersLOL;
