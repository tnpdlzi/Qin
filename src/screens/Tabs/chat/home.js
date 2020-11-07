import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SocketIOClient from "socket.io-client";
import Modal from "react-native-modal";
import server from '../../../../server.json';
const url = server.chatIP;

export default class ChatHome extends Component {
    constructor(props){
        super(props);
        this.socket = SocketIOClient(url, {jsonp: false});
        this.state={
            chatList: [],
            modalVisible: false,
            chatID: 0,
        }
        this.socket.emit('load chatList', 1); //채팅리스트 불러오기
    }

    componentDidMount() {
        this.socket.on('return chatList', (data) => {
            this.setState({chatList: data});
            //console.log(data);
        })
    }

    //퇴장 버튼을 눌렀을 때 실행될 함수
    exitRoom(chatID) {
        //클라이언트에서 채팅방 목록 바로 삭제
        let findItem = this.state.chatList.find(function(item) {
            return item.chatID === chatID;
        });
        let idx = this.state.chatList.indexOf(findItem);
        this.state.chatList.splice(idx, 1);
    }
    
    render() {
        //FlatList renderItem
        const renderItem = ({ item }) => {

            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('chatRoom', { roomTitle: item.chatName, roomID: item.chatID })}
                    onLongPress={() => {
                        this.setState({ modalVisible: true })
                        this.setState({ chatID: item.chatID });
                    }}
                >
                    <View style={styles.item}>
                        <View style={{ width: 60, justifyContent: 'center' }}>
                            <Image
                                source={require('../../../image/my.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', width: "65%" }}>
                            <Text style={styles.title}>{item.chatName}</Text>
                            <Text style={styles.title}>{item.message}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', width: "30%" }}>
                            <Text style={styles.title}>{item.sendTime.slice(11, 16)}</Text>
                        </View>
                    </View>

                    {/* 채팅방 나가기 모달 */}
                    <Modal
                        animationIn="pulse"
                        animationOut="pulse"
                        transparent={true}
                        isVisible={this.state.modalVisible}
                        onBackdropPress={() => this.setState({ modalVisible: false })}
                        onBackButtonPress={() => this.setState({ modalVisible: false })}
                        backdropOpacity={0.3}
                        backdropColor={'black'}
                    >
                        <View style={styles.centerView}>
                            <View style={styles.modalView}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', height: 80 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <Image
                                            source={require('../../../image/logout.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }}
                                        />
                                        <Text style={{ fontSize: 17, fontWeight: "bold", marginRight: 15 }}>   나가기</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 80 }}>
                                        <Text>채팅방에서 나가시겠습니까?</Text>
                                    </View>
                                    <View style={{ borderWidth: 0.3, borderColor: '#E2E2E2', backgroundColor: '#E2E2E2', width: 230 }}></View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ modalVisible: false })}
                                        >
                                            <View style={{ width: 150, alignItems: 'center', justifyContent: 'center', height: 50, marginTop: 5 }}>
                                                <Text>취소</Text>
                                            </View>

                                        </TouchableOpacity>
                                        <View style={{ borderWidth: 0.3, borderColor: '#E2E2E2', backgroundColor: '#E2E2E2', height: 40, marginTop: 10 }}></View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                exitRoom(chatID);
                                                this.setState({ modalVisible: false });
                                                socket.emit('exit Room', chatID, 1); //userID =1
                                            }}
                                        >
                                            <View style={{ width: 150, alignItems: 'center', justifyContent: 'center', height: 50, marginTop: 5 }}>
                                                <Text>퇴장</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </TouchableOpacity>
            );
        };
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.chatList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.chatName}
                />
            </View>
        );
    }

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
    centerView: { //모달 뷰
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: { //모달 영역
        backgroundColor: "white",
        width: 300,
        height: 215,
        borderRadius: 20,
        elevation: 5,
        justifyContent: 'center'
    },
});