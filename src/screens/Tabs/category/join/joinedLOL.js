import React, { Component } from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const datas = [
    {id: 'UNRANKED'},
    {id: 'IRON'},
    {id: 'BRONZE'},
    {id: 'SILEVER'},
    {id: 'GOLD'},
    {id: 'PLATINUM'},
    {id: 'DIAMOND'},
    {id: 'MASTER'},
];

function joinedLOL({ navigation }) {

    return (
        <View style={styles.container}>

            <View style={styles.sItem} >
                <TouchableOpacity
                    style={{
                        paddingStart: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                    onPress={() => navigation.navigate('roomsLOL')}>
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
                            joinedLOL
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
});

export default joinedLOL;
