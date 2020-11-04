import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, TextInput, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import SocketIOClient from "socket.io-client";
import Modal from "react-native-modal";
import {Avatar} from 'react-native-elements';
const url = 'http://133.186.216.152:3000';
//const url = 'http://192.168.0.5:3000';

export default class chatRoom extends Component {
    constructor(props) {
        super(props);
        this.socket = SocketIOClient(url, {jsonp: false});
        this.state = {
            chatMessage: "",
            chatMessages: [], //현재 채팅방에 나타낼 메시지
            messageData: [], //DB에 불러온 메시지 데이터
            chatName: this.props.route.params.roomTitle, //채팅방 식별
            chatMember: [], //채팅방 참여 멤버
            modalVisible: false, //모달
        }
        this.socket.emit('load Message', this.state.chatName); //채팅방 접속시 메시지 로드
        this.socket.emit('load Member', this.state.chatName); //채팅방 접속시 멤버 로드
    }
    
    componentDidMount() {
        this.socket.on('return Message', (data) => {
            data.map(element => this.setState({messageData: [...this.state.messageData, element]})); //DB에서 불러온 메시지 데이터들을 모두 저장
            //console.log(data);
        })
        this.socket.on('return Member', (data) => {
            data.map(element => this.setState({chatMember: [...this.state.chatMember, element]})); //불러온 채팅방 참여자들을 모두 저장
            //console.log(data);
        })
        this.socket.on('send Message', (data) => {
            this.setState({messageData: [...this.state.messageData, data]}); //보낸 메시지를 서버로부터 되받음
            //console.log(data);
        })
    }

    //메세지 전송
    submitMessage() {
        var date = new Date(); //날짜 생성
        var date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + date.getHours()).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);
        if(this.state.chatMessage.length > 0) {
            this.socket.emit('send Message', {message: this.state.chatMessage, sendTime: date, uID: 1}, this.state.chatName); //메시지 보내기 + DB에 저장
            this.setState({chatMessage: ""});
        }
    }

    //채팅방 관리
    manageRoom() {
        this.setState({modalVisible: true});
    }
    
    render() {
        //메시지 renderItem
        const renderItem = ({ item, index }) => {
            return (
                <View style={{ width: "100%" }}>
                    <View style={{ alignItems: 'center' }}>
                        {index > 0 && item.sendTime.slice(0, 10) == this.state.messageData[index - 1].sendTime.slice(0, 10) ? <View></View> :
                            <View style={styles.date}>
                                <Text style={{ fontSize: 11, margin: 4, textAlign: 'center', color: 'white' }}>{item.sendTime.slice(0, 10)}</Text>
                            </View>}
                    </View>
                    {item.uID == 1 ? //추후 수정(여기에 사용자 아이디 입력)
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View style={{ justifyContent: 'flex-end' }}><Text style={{ fontSize: 10 }}>{item.sendTime.slice(11, 16)}</Text></View>
                            <View style={styles.myMessage}>
                                <Text style={{ color: "white", fontSize: 17 }}>{item.message}</Text>
                            </View>
                        </View>
                        :
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={require('../../../image/profile.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 12 }}>  {item.userName}</Text>
                                    <View style={styles.otherMessage}>
                                        <Text style={{ color: "black", fontSize: 17 }}>{item.message}</Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <View style={{ justifyContent: 'flex-start' }}><Text style={{ fontSize: 10 }}>{item.sendTime.slice(11, 16)}</Text></View>
                                </View>
                            </View>
                        </View>}
                </View>
            );
        };
        
        //채팅방 멤버 renderItem
        const memRenderItem = ({ item, index }) => {
            return (
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                    <View style={{height: 60, width: 60, alignItems: 'center', justifyContent: 'center', marginLeft: 10}}>
                        <Avatar
                            rounded
                            style={{ width: '130%', height: '130%', }}
                            source={require('../../../image/chat_profile.png')}
                        />
                    </View>
                    <Text style={{ fontSize: 17, paddingRight: 10 }}>{item.userName}</Text>
                    {item.uID == 1 ? //본인 프로필은 "나"라고뜸
                        <View style={{width: 20, height: 20, borderRadius: 20, backgroundColor: '#00255A', alignItems: 'center', justifyContent: 'center'}}><Text style={{color: 'white', fontSize: 12}}>나</Text></View>
                 :
                 <View></View>}
            </View>
            );
            //방장 추가
        };

        return (
            <View style={styles.container}>

                {/* 모달 */}
                <Modal
                    animationIn="pulse"
                    animationOut="pulse"
                    transparent={true}
                    isVisible={this.state.modalVisible}
                    onBackdropPress={() => this.setState({ modalVisible: false })}
                    onBackButtonPress={() => this.setState({ modalVisible: false })}
                    backdropOpacity={0.5}
                    backdropColor={'black'}
                >
                    <View style={styles.centerView}>
                        <View style={this.state.chatMember.length < 4? styles.modalView : styles.longModalView }>
                            <View style={{ flexDirection: 'row', alignItems: "center", height: 50}}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ modalVisible: false })}
                                    style={{top: 5, left: -5 }}
                                >
                                    <Image
                                        source={require('../../../image/cancel.png')} style={{ height: 80, width: 80, resizeMode: 'contain' }}
                                    />
                                </TouchableOpacity>

                                <Text style={{ top: 5, left: 25, fontSize: 15, fontWeight: "bold" }}>대화상대({this.state.chatMember.length}명)</Text>
                            </View>

                            <View style={{ height: "75%" }}>
                                <FlatList
                                    data={this.state.chatMember}
                                    renderItem={memRenderItem}
                                    keyExtractor={(item) => item.uID}
                                />
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
                <KeyboardAvoidingView behavior="padding" style={styles.chatMessage} keyboardVerticalOffset={-180}>
                    <FlatList
                        data={this.state.messageData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.sendTime}
                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                        onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                    />

                    {/* 텍스트 상자 */}
                    <View style={{ alignItems: "center", justifyContent: "center", marginTop: 10}}>
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
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
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
        height: "85%",
        width: "100%",
        marginTop: 20,
        marginBottom: 10,
    },
    myMessage: { //메세지 말풍선(나)
        backgroundColor: '#00255A',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        maxWidth: 245,
        alignSelf: 'flex-end',
        padding: 10,
        margin: 5,
    },
    otherMessage: { //메세지 말풍선(상대)
        backgroundColor: '#FFFFFF',
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        maxWidth: 300,
        alignSelf: 'flex-start',
        padding: 10,
        margin: 5,
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
        height: 215,
        borderRadius: 20,
        elevation: 5,
    },
    longModalView: { //모달영역(긴버전)
        backgroundColor: "white",
        width: 300,
        height: 320,
        borderRadius: 20,
        elevation: 5,
    },
    date: { //날짜 영역
        alignContent: "center",
        backgroundColor: "#707070",
        width: 90,
        height: 25,
        borderRadius: 20
    }
});
