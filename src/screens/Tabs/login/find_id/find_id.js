import React, { Component, useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ScrollView,
} from 'react-native';
import Styles from '../../../../styles';
import find_id_final from './find_id_final';
import Modal from 'react-native-modal';
import axios from 'axios';


// 10월21일부
function find_id({ navigation }) {



    let [userName, setUserName] = useState("");
    let [phone, setphone] = useState("");

    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    let [textA, changeTextA] = useState(require('../../../../image/name_g.png'));
    function setNewTextA(Text){
        if(Text == ""){
            changeTextA(require('../../../../image/name_g.png'));
        }
        else {
            setUserName(Text);
            changeTextA(require('../../../../image/name_y.png'));
        }
    }

    let [textB, changeTextB] = useState(require('../../../../image/phone_g.png'));
    function setNewTextB(Text){
        if(Text == ""){
            changeTextB(require('../../../../image/phone_g.png'));
        }
        else{
            setphone(Text);
            changeTextB(require('../../../../image/phone_y.png'));
        }
    }

    let searchName = async () => await axios.post('http://220.149.231.179:8080/users/searchName', {
        userName: userName
    })
        .then(function(response){
            if(response.data == false){ //seach_hash 를 이용해서 통신한 결과가 없을 경우 ResData를 빈 배열로 초기화
                //setResData(response.data);
                {setModalVisible1(!modalVisible1);}
                console.log("없는 아이디");
                console.log(response.data);
                //없는 아이디
            }
            else {

                console.log("있는 아이디");
                console.log(response.data);
                // 있는 아이디
                {searchPhone()}
            }
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });

    let searchPhone = async () => await axios.post('http://220.149.231.179:8080/users/searchPhone', {
        userName: userName,
        phone: phone
    })
        .then(function(response){
            if(response.data == false){ //seach_hash 를 이용해서 통신한 결과가 없을 경우 ResData를 빈 배열로 초기화
                //setResData(response.data);
                {setModalVisible2(!modalVisible2);}
                console.log("없는 번호");
                console.log(response.data);
            }
            else {
                console.log("있는 번호");
                console.log(response.data);
                {passID()}


            }
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });

    let [userID, setuserID] = useState("");


    // let userID;
    let passID = async () => await axios.post('http://220.149.231.179:8080/users/passID', {
        userName: userName,
        userID: userID
    })
        .then(function(response){
            setuserID(response.data[0].userID);
            {navigation.navigate('find_id_final',{memtitle:[userName,response.data[0].userID]})}
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });



    return (

        <View style={styles.container}>
            <ScrollView>
            {/*닉네임*/}
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                width: '100%',
                paddingHorizontal: 30,
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
                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 15, paddingRight: 45,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}
                        placeholder="닉네임 (최대 6자)"
                        onChangeText = {(text) => setNewTextA(text)}
                    />
                </View>
                <View>
                    {/*<TouchableOpacity onPress={() => searchName()}>*/}
                    {/*    <Text  style={{fontSize: 15, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 20, paddingRight: 13, backgroundColor: '#121313',borderStyle: 'solid',paddingTop: 5,*/}
                    {/*        borderRadius: 30,*/}
                    {/*        borderColor: '#0b4072',*/}
                    {/*        borderWidth: 2, Top: 0, }}>*/}
                    {/*        중복확인*/}
                    {/*    </Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
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
                                source={require('../../../../image/name_g.png')}
                            />
                            <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>아이디 찾기</Text>
                        </View>

                        <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>가입되지 않은 닉네임입니다.</Text>


                        <TouchableHighlight
                            style={{ ...styles.openButton,}}
                            onPress={() => {
                                setModalVisible1(!modalVisible1);
                            }}
                        >
                            <Text style={{fontSize: 14, color: '#000000',paddingTop: 25,}}>확인</Text>
                        </TouchableHighlight>
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
                                    source={require('../../../../image/name_g.png')}
                                />
                                <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>아이디 찾기</Text>
                            </View>

                            <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                                borderBottomStyle: 'solid',
                                borderBottomWidth: 1,paddingBottom: 20, paddingRight: 50, paddingLeft: 50, paddingTop: 20,justifyContent: "center",
                                alignItems: "center",}}>없는 전화번호 입니다.</Text>


                            <TouchableHighlight
                                style={{ ...styles.openButton,}}
                                onPress={() => {
                                    setModalVisible2(!modalVisible2);
                                }}
                            >
                                <Text style={{fontSize: 14, color: '#000000',paddingTop: 25,}}>확인</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

            {/*전번*/}
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                width: '100%',
                paddingHorizontal: 30,
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
                    <TextInput maxLength = {11}
                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 7, paddingRight: 7,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}
                        placeholder="010 - 0000 - 0000 ( - 는 빼고 입력해주세요)"
                        onChangeText = {(text) => setNewTextB(text)}
                    />
                </View>
            </View>
            <View style={{paddingTop: 70,}}>
            </View>

            {/*가입하기*/}
            <View style={{
                paddingTop: 20,
                paddingHorizontal: 30,
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => searchName()}>
                    <Text  style={{fontSize: 15, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 40, paddingRight: 40, backgroundColor: '#0b4072',borderStyle: 'solid',paddingTop: 10, paddingBottom: 10,
                        borderRadius: 30,
                        borderColor: '#0b4072',
                        borderWidth: 2,}}>
                        아이디 찾기
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop: 200,}}>
            </View>
                </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
    },
    modalView: {
        width: 300,
        height: 200,
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

export default find_id;
