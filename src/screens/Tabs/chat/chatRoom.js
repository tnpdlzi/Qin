import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, TextInput, StyleSheet, FlatList } from 'react-native';
import SocketIOClient from "socket.io-client";
const url = 'http://192.168.0.5:3000';

export default class chatRoom extends Component {
    constructor(props) {
        super(props);
        this.socket = SocketIOClient(url, {jsonp: false});
        this.state = {
            chatMessage: "",
            chatMessages: [],
            chatName: this.props.route.params.roomTitle, //채팅방 식별
        }

        this.socket.emit('load Message', this.state.chatName);
        this.socket.on('return Message', (data) => {
            data.map(element => this.setState({chatMessages: [...this.state.chatMessages, element.message]}))
        })
    }

    //메세지 전송
    submitMessage() {
        if(this.state.chatMessage != null) {
            this.setState({chatMessages: [...this.state.chatMessages, this.state.chatMessage]});
            this.socket.emit('send Message', this.state.chatMessage, this.state.chatName);
            this.setState({chatMessage: ""});
        }
    }

    render() {
        //FlatList renderItem
        const renderItem = ({ item, index }) => {
            return(
                <View style = {styles.message}>
                    <Text style={{color: "white", fontSize: 17}}>{item}</Text>
                </View>
            );
        };

        return (
            <View style={styles.container}>
                <View style={styles.chatMessage}>
                    <FlatList 
                        data={Object.values(this.state.chatMessages)}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.mID}
                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                        onLayout={() => this.flatList.scrollToEnd({ animated: true})}
                    />
                </View>
                <View style={styles.inputText}>
                    <TextInput
                        style={{ height: 50, width: '80%', fontSize: 20 }}
                        value={this.state.chatMessage}
                        onChangeText={chatMessage => {
                            this.setState({ chatMessage });
                        }}
                    />
                    <TouchableOpacity
                        onPress = {() => this.submitMessage()}
                        >
                        <Image
                            source={require('../../../image/chat_send.png')} style={{ height: 80, width: 80, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    inputText: { //텍스트상자 영역
        height: 55,
        width: '90%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 30,
        borderRadius: 20,
        elevation: 5,
    },
    chatMessage: { //메시지 표시 영역
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: "85%",
        width: "100%",
        marginRight: 20,
        marginTop: 20,
    },
    message: { //메세지 말풍선
        backgroundColor: '#00255A',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        maxWidth: 300,
        alignSelf: 'flex-end',
        padding: 10,
        margin: 5,
        borderWidth: 1,
    }
});
