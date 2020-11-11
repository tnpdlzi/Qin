import React, {Component, useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, Image, StyleSheet, TextInput, TouchableHighlight, ScrollView} from 'react-native';
import Styles from '../../../styles';
import find_pw_new from './find_pw_new';
import Modal from 'react-native-modal';
import axios from 'axios';
import server from '../../../../server.json'


// 10월21일부
function find_pw({ navigation }) {



    let [userName, setUserName] = useState("");
    let [userID, setUserID] = useState("");
    let [userAns, setUserAns] = useState("");
    let [phone, setphone] = useState("");
    let [question, setQuestion] = useState("");



    let searchQuestion = async () => await axios.post(server.ip + '/users/searchQuestion', {
        userName: userName
    })
        .then(function(response){
            if(response.data[0].question == 1){
                setQuestion("1. 자신의 보물 1호는?")
            }
            else if(response.data[0].question == 2){
                setQuestion("2. 자신이 졸업한 초등학교 이름은?")
            }
            else if(response.data[0].question == 3){
                setQuestion("3. 자신의 가장 친한 친구는?")
            }
             else if(response.data[0].question == 4){
                setQuestion("4. 자신의 첫사랑 이름은?")
            }
            else {
                setQuestion("5. 자신의 별명은?")
            }
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });


    let searchName = async () => await axios.post(server.ip + '/users/searchName', {
        userName: userName
    })
        .then(function(response){
            if(response.data == false){ //seach_hash 를 이용해서 통신한 결과가 없을 경우 ResData를 빈 배열로 초기화
                {setModalVisible1(!modalVisible1);}
            }
            else {
                console.log(response.data);
                // 있는 아이디
                {searchPhone()}
            }
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });

    let searchID = async () => await axios.post(server.ip + '/users/searchID', {
        userName: userName,
        userID: userID,
        phone: phone
    })
        .then(function(response){
            if(response.data == false){ //seach_hash 를 이용해서 통신한 결과가 없을 경우 ResData를 빈 배열로 초기화
                {setModalVisible2(!modalVisible2);}
            }
            else {
                // 있는 아이디
                searchQuestion();
                {setModalVisible5(!modalVisible5);}

            }
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });

    let searchAns = async () => await axios.post(server.ip + '/users/searchAns', {
        userName: userName,
        userID: userID,
        userAns: userAns,
        phone: phone
    })
        .then(function(response){
            if(response.data == false){ //seach_hash 를 이용해서 통신한 결과가 없을 경우 ResData를 빈 배열로 초기화
                {setModalVisible3(!modalVisible3);}
            }
            else {
                // 있는 아이디
                {navigation.navigate('find_pw_new',{memtitle:[userName]})}
                setModalVisible5(!modalVisible5)
            }
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });

    let searchPhone = async () => await axios.post(server.ip + '/users/searchPhone', {
        userName: userName,
        phone: phone
    })
        .then(function(response){
            if(response.data == false){ //seach_hash 를 이용해서 통신한 결과가 없을 경우 ResData를 빈 배열로 초기화
                {setModalVisible4(!modalVisible4);}
            }
            else {
                {searchID()}
            }
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });

    let [textA, changeTextA] = useState(require('../../../image/name_g.png'));
    function setNewTextA(Text){
        if(Text == ""){
            changeTextA(require('../../../image/name_g.png'));
        }
        else {
            setUserName(Text);
            changeTextA(require('../../../image/name_y.png'));
        }
    }
    let [textB, changeTextB] = useState(require('../../../image/id_g.png'));

    function setNewTextB(Text){
        if(Text == ""){
            changeTextB(require('../../../image/id_g.png'));
        }
        else {
            setUserID(Text);
            changeTextB(require('../../../image/id_y.png'));
        }
    }
    let [textC, changeTextC] = useState(require('../../../image/mail_check_g.png'));
    function setNewTextC(Text){
        if(Text == ""){
            changeTextC(require('../../../image/mail_check_g.png'));
        }
        else {
            setUserAns(Text);
            changeTextC(require('../../../image/mail_check_y.png'));
        }
    }
    let [textD, changeTextD] = useState(require('../../../image/phone_g.png'));
    function setNewTextD(Text){
        if(Text == ""){
            changeTextD(require('../../../image/phone_g.png'));
        }
        else {
            setphone(Text);
            changeTextD(require('../../../image/phone_y.png'));
        }
    }






    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);


    return (

        <View style={styles.container}>
            <ScrollView>
            {/*닉네임*/}
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                width: '100%',
                paddingTop: 10,
                alignItems: 'center',
            }}>
                <View>
                    <Image
                        style={{
                            height: 70,
                            width: 70,
                            resizeMode: 'center',
                        }}
                        source={textA}
                    />
                </View>
                <View>
                    <TextInput maxLength = {6}
                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 15, paddingRight: 135,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}
                        placeholder="닉네임 (최대 6자)"
                        onChangeText = {(text) => setNewTextA(text)}
                    />
                </View>
            </View>

            {/*이메일*/}
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                width: '100%',
                alignItems: 'center',
            }}>
                <View>
                    <Image
                        style={{
                            height: 70,
                            width: 70,
                            resizeMode: 'center',
                        }}
                        source={textB}

                    />
                </View>
                <View>
                    <TextInput maxLength = {25}
                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 15, paddingRight: 35,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}
                        placeholder="이메일 (아이디)                               "
                        onChangeText = {(text) => setNewTextB(text)}
                    />
                </View>
            </View>



            {/*전번*/}
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                width: '100%',
                alignItems: 'center',
            }}>
                <View>
                    <Image
                        style={{
                            height: 70,
                            width: 70,
                            resizeMode: 'center',
                        }}
                        source={textD}
                    />
                </View>
                <View>
                    <TextInput maxLength = {11}
                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 7, paddingRight: 7,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}
                        placeholder="010 - 0000 - 0000 ( - 는 빼고 입력해주세요)"
                        onChangeText = {(text) => setNewTextD(text)}
                    />
                </View>
            </View>
            <View style={{paddingTop: 100,}}>
            </View>

            <Modal
                animationIn={"slideInUp"} //default 'slideInUp'
                animationOut={'slideOutDown'} //default 'slideOutDown'
                isVisible={modalVisible1}
                transparent={true} //default 'true'
                backdropColor={'black'} //default 'black'
                backdropOpacity={0.5} //default 0.7
                onBackButtonPress={() => { setModalVisible1(!modalVisible1); }}

            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}
                          onBackDropPress={() => { setModalVisible1(!modalVisible1); }}>

                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: '#ffffff',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: "space-around",
                            paddingHorizontal: 50,
                        }}>
                            <Image
                                style={{
                                    height: 70,
                                    width: 70,
                                    resizeMode: 'center',
                                }}
                                source={require('../../../image/pw_g.png')}
                            />
                            <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>비밀번호 찾기</Text>
                        </View>

                        <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>가입되지 않은 닉네임입니다.</Text>


                        <TouchableOpacity
                            style={{ ...styles.openButton,}}
                            onPress={() => {setModalVisible1(!modalVisible1);
                            }}
                        >
                            <Text style={{fontSize: 14, color: '#000000',paddingTop: 25,}}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

                <Modal
                    animationIn={"slideInUp"} //default 'slideInUp'
                    animationOut={'slideOutDown'} //default 'slideOutDown'
                    isVisible={modalVisible2}
                    transparent={true} //default 'true'
                    backdropColor={'black'} //default 'black'
                    backdropOpacity={0.5} //default 0.7
                    onBackButtonPress={() => { setModalVisible2(!modalVisible2); }}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}
                              onBackDropPress={() => { setModalVisible2(!modalVisible2); }}>

                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: '#ffffff',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: "space-around",
                                paddingHorizontal: 50,
                            }}>
                                <Image
                                    style={{
                                        height: 70,
                                        width: 70,
                                        resizeMode: 'center',
                                    }}
                                    source={require('../../../image/pw_g.png')}
                                />
                                <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>비밀번호 찾기</Text>
                            </View>

                            <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                                borderBottomStyle: 'solid',
                                borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>가입되지 않은 아이디입니다.</Text>


                            <TouchableOpacity
                                style={{ ...styles.openButton,}}
                                onPress={() => {setModalVisible2(!modalVisible2);
                                }}
                            >
                                <Text style={{fontSize: 14, color: '#000000',paddingTop: 25,}}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationIn={"slideInUp"} //default 'slideInUp'
                    animationOut={'slideOutDown'} //default 'slideOutDown'
                    isVisible={modalVisible4}
                    transparent={true} //default 'true'
                    backdropColor={'black'} //default 'black'
                    backdropOpacity={0.5} //default 0.7
                    onBackButtonPress={() => { setModalVisible4(!modalVisible4); }}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}
                              onBackDropPress={() => { setModalVisible4(!modalVisible4); }}>

                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: '#ffffff',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: "space-around",
                                paddingHorizontal: 50,
                            }}>
                                <Image
                                    style={{
                                        height: 70,
                                        width: 70,
                                        resizeMode: 'center',
                                    }}
                                    source={require('../../../image/pw_g.png')}
                                />
                                <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>비밀번호 찾기</Text>
                            </View>

                            <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                                borderBottomStyle: 'solid',
                                borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>없는 전화번호입니다.</Text>


                            <TouchableOpacity
                                style={{ ...styles.openButton,}}
                                onPress={() => {setModalVisible4(!modalVisible4);
                                }}
                            >
                                <Text style={{fontSize: 14, color: '#000000',paddingTop: 25,}}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationIn={"slideInUp"} //default 'slideInUp'
                    animationOut={'slideOutDown'} //default 'slideOutDown'
                    isVisible={modalVisible3}
                    transparent={true} //default 'true'
                    backdropColor={'black'} //default 'black'
                    backdropOpacity={0.5} //default 0.7
                    onBackButtonPress={() => { setModalVisible3(!modalVisible3); }}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}
                              onBackDropPress={() => { setModalVisible3(!modalVisible3); }}>

                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: '#ffffff',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: "space-around",
                                paddingHorizontal: 50,
                            }}>
                                <Image
                                    style={{
                                        height: 70,
                                        width: 70,
                                        resizeMode: 'center',
                                    }}
                                    source={require('../../../image/pw_g.png')}
                                />
                                <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>비밀번호 찾기</Text>
                            </View>

                            <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                                borderBottomStyle: 'solid',
                                borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>올바르지 않은 답변입니다.</Text>


                            <TouchableOpacity
                                style={{ ...styles.openButton,}}
                                onPress={() => {setModalVisible3(!modalVisible3);
                                }}
                            >
                                <Text style={{fontSize: 14, color: '#000000',paddingTop: 25,}}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>




                <Modal
                    animationIn={"slideInUp"} //default 'slideInUp'
                    animationOut={'slideOutDown'} //default 'slideOutDown'
                    isVisible={modalVisible5}
                    transparent={true} //default 'true'
                    backdropColor={'black'} //default 'black'
                    backdropOpacity={0.5} //default 0.7
                    onBackButtonPress={() => { setModalVisible5(!modalVisible5); }}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}
                              onBackDropPress={() => { setModalVisible5(!modalVisible5); }}>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: '#ffffff',
                                width: '100%',
                                alignItems: 'center',
                                paddingHorizontal: 50,
                            }}>
                                <Image
                                    style={{
                                        height: 70,
                                        width: 70,
                                        resizeMode: 'center',
                                    }}
                                    source={require('../../../image/pw_g.png')}
                                />
                                <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>비밀번호 찾기</Text>
                            </View>

                            {/*질문*/}
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: '#ffffff',
                                width: '100%',
                                alignItems: 'center',

                            }}>
                                <View style={{ paddingRight: 10,}}>
                                    <Image
                                        style={{
                                            height: 70,
                                            width: 70,
                                            resizeMode: 'center',
                                        }}
                                        source={require('../../../image/message_new.png')}
                                    />

                                </View>
                                <View>
                                    <Text>{question}</Text>
                                </View>

                            </View>




                            {/*질문답*/}
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: '#ffffff',
                                width: '100%',
                                // paddingHorizontal: 30,
                                alignItems: 'center',
                            }}>
                                <View>
                                    <Image
                                        style={{
                                            height: 70,
                                            width: 70,
                                            resizeMode: 'center',
                                        }}
                                        source={textC}
                                    />
                                </View>
                                <View>
                                    <TextInput maxLength = {14}
                                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 15, paddingRight: 40,  borderBottomColor: '#d6d9dc',
                                            borderBottomStyle: 'solid',
                                            borderBottomWidth: 1,}}
                                        placeholder="질문 답변                              "
                                        onChangeText = {(text) => setNewTextC(text)}
                                    />
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: '#ffffff',
                                width: '100%',
                                paddingTop: 10,
                                alignItems: 'center',
                                justifyContent: "space-around",
                            }}>

                            <TouchableOpacity
                                style={{ ...styles.openButton,}}
                                onPress={() => {searchAns();
                                }}
                            >
                                <Text style={{fontSize: 15, color: '#000000',}}>확인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton,}}
                                onPress={() => {setModalVisible5(!modalVisible5);
                                }}
                            >
                                <Text style={{fontSize: 14, color: '#000000',}}>닫기</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>






            {/*가입하기*/}
            <View style={{
                paddingTop: 20,

                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => searchName()}>
                    <Text  style={{fontSize: 15, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 40, paddingRight: 40, backgroundColor: '#0b4072',borderStyle: 'solid',paddingTop: 10, paddingBottom: 10,
                        borderRadius: 30,
                        borderColor: '#0b4072',
                        borderWidth: 2,}}>
                        비밀번호 찾기
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop: 70,}}>
            </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: '#ffffff',
        width: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
    },
    modalView: {
        width: 400,
        height: 300,
        margin: 22,
        flexDirection: 'column',
        justifyContent: "space-around",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
});

export default find_pw;
