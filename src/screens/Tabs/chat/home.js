import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
//import Styles from '../../../styles';

const testRoom = [
    {userName: 'test', message: '대화내용 미리보기', time: '12:10'},
    {userName: 'user1', message: 'ㅎㅇ', time: '12:10'},
    {userName: 'user2', message: 'ㅋㅋ', time: '12:10'},
];

function ChatHome({ navigation }) {
    
    //개인채팅방 목록 생성(상대 닉네임, 대화 내용 일부, 시간)
    const Item = ({ userName, roomTitle, message, time }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('chatRoom')}
        >
            <View style={styles.item}>
                <View style={{ width: 60, justifyContent: 'center' }}>
                    <Image 
                        source={require('../../../image/my.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }}
                    />
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', width: "65%" }}>
                    <Text style={styles.title}>{userName}</Text>
                    <Text style={styles.title}>{message}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', width: "30%" }}>
                    <Text style={styles.title}>{time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Item
            userName={item.userName}
            roomTitle={item.roomTitle}
            message={item.message}
            time={item.time}
        />
    );
    
    return (
        <View style={styles.container}>
            <FlatList
                data={testRoom}
                renderItem={renderItem}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        backgroundColor: "white",
        padding: 10,
        width: "100%",
        height: 80,
        flexDirection: 'row',
    },
    title: {
        fontSize: 15,
    },
});

export default ChatHome;