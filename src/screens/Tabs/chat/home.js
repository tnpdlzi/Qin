import React, {  useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SocketIOClient from "socket.io-client";
const url = 'http://192.168.0.5:3000';

export default function ChatHome({ navigation }) {
    const [chatList, setChatList] = useState([]);
    const socket = SocketIOClient(url, { jsonp: false});

    //페이지 로드시 채팅방리스트 "한 번만" 불러옴
    useEffect(() => {
        socket.emit('load chatList');
    },[]);
    socket.on('return chatList', (data) => {
        setChatList(data);
    })
    
    //FlatList renderItem
    const renderItem = ({ item }) => {
        return(
            <TouchableOpacity
            onPress={() => navigation.navigate('chatRoom', {roomTitle: item.chatName})}
        >
            <View style={styles.item}>
                <View style={{ width: 60, justifyContent: 'center' }}>
                    <Image
                        source={require('../../../image/my.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }}
                    />
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', width: "65%" }}>
                    <Text style={styles.title}>{item.chatName}</Text>
                    <Text style={styles.title}>미리보기</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', width: "30%" }}>
                    <Text style={styles.title}>12:10</Text>
                </View>
            </View>
        </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={chatList}
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