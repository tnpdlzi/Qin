import React, { Component, useState } from 'react';
import { Text, TouchableOpacity, View, Image, TextInput, StyleSheet, FlatList } from 'react-native';
import SocketIOClient from "socket.io-client";
import Modal from "react-native-modal";
const url = 'http://133.186.216.152:3000';

export default class chatRoom extends Component {
    constructor(props) {
        super(props);
        this.socket = SocketIOClient(url, {jsonp: false});
        this.state = {
            chatMessage: "",
            chatMessages: [],
            chatName: this.props.route.params.roomTitle, //채팅방 식별
            modalVisible: false,
        }
        this.socket.emit('load Message', this.state.chatName);
        this.socket.on('return Message', (data) => {
            data.map(element => this.setState({chatMessages: [...this.state.chatMessages, element.message]}))
        })
    }
    
    //채팅방 관리
    manageRoom() {
        this.setState({modalVisible: true});
    }

    //메세지 전송
    submitMessage() {
        if(this.state.chatMessage.length > 0) {
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

                {/* 모달 */}
                <Modal
                    transparent={true}
                    isVisible={this.state.modalVisible}
                    onBackdropPress={() => this.setState({ modalVisible: false })}
                    backdropOpacity={0.5}
                    backdropColor={'black'}
                >
                    <View style={styles.centerView}>
                        <View style={styles.modalView}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ modalVisible: false })}
                                    style={{ top: -5, left: -5 }}
                                >
                                    <Image
                                        source={require('../../../image/cancel.png')} style={{ height: 80, width: 80, resizeMode: 'contain' }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ left: 25, fontSize: 15, fontWeight: "bold" }}>대화상대(2명)</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                <Image
                                    source={require('../../../image/chat_profile.png')} style={{ height: 100, width: 100, resizeMode: 'contain' }}
                                />
                                <Text style={{ fontSize: 17 }}>나</Text>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* 상단바 */}
                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Image
                            source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 17 }}>{this.state.chatName}</Text>
                    </View>
                    <TouchableOpacity
                        style={{width: 50}}
                        onPress={()=> this.manageRoom()}    
                    >
                        <Text style={{ fontWeight: "bold", fontSize: 17 }}>관리</Text>
                    </TouchableOpacity>
                </View>

                
                {/* 메시지 */}
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

                {/* 텍스트 상자 */}
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
        flex: 0.8,
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
        marginBottom: 10,
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
    },
    headerBar: { //상단바 영역
        backgroundColor: "white",
        height: 56,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 5,
    },
    centerView: { //모달 뷰
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: { //모달 영역
        backgroundColor: "white",
        width: 300,
        height: 213,
        borderRadius: 20,
        elevation: 5,
    },
});
