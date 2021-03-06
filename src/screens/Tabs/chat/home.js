import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SocketIOClient from "socket.io-client";
import Modal from "react-native-modal";
import server from '../../../../server.json';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
const url = server.chatIP;
let userID; //ASyncStorage에서 불러온 uID

export default class ChatHome extends Component {
    constructor(props) {
        super(props);
        this.socket = SocketIOClient(url, { jsonp: false });
        this.state = {
            chatList: [], //채팅방 목록
            modalVisible: false, //채팅방 나가기 모달
            chatID: 0, //나갈 채팅방
            ruID: 0, //채팅방 방장
        }

        //채팅리스트 불러오기
        this.getChatList();
    }

    componentDidMount() {
        this.socket.on('return chatList', (data) => { //불러온 채팅방 목록 저장
            this.setState({ chatList: data });
            //console.log(data);
        })
        this.refresh(); //채팅 탭 접속시 자동새로고침
    }
    
    //자동 새로고침
    refresh() {
        this.props.navigation.addListener('focus', () => {
            this.socket.emit('load chatList', userID);
        })
    }
    //퇴장 버튼을 눌렀을 때 실행될 함수
    exitRoom(chatID) {
        //클라이언트에서 채팅방 목록 바로 삭제
        let findItem = this.state.chatList.find(function (item) {
            return item.chatID === chatID;
        });
        let idx = this.state.chatList.indexOf(findItem);
        this.state.chatList.splice(idx, 1);
    }

    //user ID 가져오기 및 채팅방 목록 불러오기
    getChatList = async () => {
        userID = await AsyncStorage.getItem('uID');
        userID = userID.replace(/[^0-9]/g, "");
        this.socket.emit('load chatList', userID);
        //console.log(userID);
    }

    render() {
        //FlatList renderItem
        const renderItem = ({ item }) => {

            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('chatRoom', { roomTitle: item.onetoone == 1 ? item.userName : item.chatName, roomID: item.chatID })}
                    onLongPress={() => {
                        this.setState({ modalVisible: true });
                        this.setState({ chatID: item.chatID });
                        this.setState({ ruID: item.ruID });
                    }}
                >
                    <View style={styles.item}>
                        <View style={{ width: 60, alignItems: 'center', justifyContent: 'center' }}>
                            {item.onetoone == 1 ?
                                <View style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                                    <Avatar
                                        rounded
                                        style={{ width: '100%', height: '100%', }}
                                        source={{ uri: server.ip + '/photo' + item.image }}
                                        avatarStyle={{ borderRadius: 25 }}
                                    />
                                </View>
                                :
                                <View style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                                    <Avatar
                                        rounded
                                        style={{ width: '140%', height: '140%', }}
                                        source={require('../../../image/tag_profile.png')}
                                    />
                                </View>
                            }

                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', width: "65%", marginLeft: 10 }}>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.onetoone == 1 ? item.userName : item.chatName}</Text>
                            <Text style={{ fontSize: 13 }}>{item.message}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', width: "30%", marginBottom: 5, marginLeft: 20 }}>
                            <Text style={{ fontSize: 13 }}>{item.sendTime.slice(11, 16)}</Text>
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
                                                this.exitRoom(this.state.chatID);
                                                this.setState({ modalVisible: false });
                                                this.socket.emit('exit Room', this.state.chatID, userID);
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
                    onRefresh={() => this.socket.emit('load chatList', userID)}
                    refreshing={false}
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
    item: { //채팅방 리스트
        backgroundColor: "white",
        padding: 10,
        width: "100%",
        height: 80,
        flexDirection: 'row',
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