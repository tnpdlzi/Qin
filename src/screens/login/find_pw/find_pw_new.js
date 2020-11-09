import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import Styles from '../../../styles';
import find_pw_final from './find_pw_final';
import Modal from 'react-native-modal';
import axios from 'axios';
import server from '../../../../server.json'


// 10월21일부

function find_pw_new({ navigation, route }) {
    let userName = route.params.memtitle[0];

    const [modalVisible1, setModalVisible1] = useState(false);

    let updatePW = async () => await axios.post(server.ip + '/users/updatePW', {
        userPW: userPW,
        userName: userName,

    })
        .then(function(response){
            if(response.data == false){ //seach_hash 를 이용해서 통신한 결과가 없을 경우 ResData를 빈 배열로 초기화
                console.log(password);
                console.log("비밀번호 수정 에러");
                console.log(response.data);
            }
            else {
                {navigation.navigate('find_pw_final',{memtitle:[userName]})}
            }
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });

    let [textA, changeTextA] = useState(require('../../../image/pw_g.png'));
    function setNewTextA(Text){
        if(Text.length == 0){
            changeTextA(require('../../../image/pw_g.png'));
        }
        else {
            changeTextA(require('../../../image/pw_y.png'));
            changePwc(Text);
        }
        if(Text == apwc){
            changeP(require('../../../image/pw_checked.png'));
            changePW(Text);
        }
        if(Text != apwc){
            changeP(require('../../../image/pw_unchecked.png'));
        }
    }

    let [userPW, changePW] = useState("");
    let [password, changeP] = useState(require('../../../image/pw_unchecked.png'));
    let [pwc, changePwc] = useState("");
    let [apwc, AchangePwc] = useState("");
    let [textD, changeTextD] = useState(require('../../../image/pw_check_g.png'));
    function setNewTextD(Text){
        if(Text.length == 0){
            changeTextD(require('../../../image/pw_check_g.png'));
        }
        else{
            changeTextD(require('../../../image/pw_check_y.png'));
            AchangePwc(Text);
        }
        if(Text == pwc){
            changeP(require('../../../image/pw_checked.png'));
            changePW(Text);
        }
        if(Text != pwc){
            changeP(require('../../../image/pw_unchecked.png'));
        }
    }

    function updatePassWord(){
        if(password == require('../../../image/pw_checked.png')){
            updatePW()
        }
        else {
            {setModalVisible1(!modalVisible1);}
        }
    }
    return (

        <View style={styles.container}>

            <View style={{paddingTop: 50,}}>
            </View>
            {/*사진*/}
            <View>
                <Image
                    style={{
                        height: 70,
                        width: 70,
                        resizeMode: 'center',
                    }}
                    source={require('../../../image/check.png')}
                />
            </View>


            {/*글*/}
            <View style={{paddingTop: 40,}}>
            </View>
            <View>
                <Text>
                    새로운 비밀번호를 등록해주세요.
                </Text>
            </View>
            <ScrollView>

            {/*비밀번호*/}
            <View style={{paddingTop: 60,}}>
            </View>
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
                        source={textA}
                    />
                </View>
                <View>
                    <TextInput  maxLength = {14}
                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 15, paddingRight: 100,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}
                        placeholder="  비밀번호 (6-14자)"secureTextEntry={true}
                        onChangeText = {(text) => setNewTextA(text)}
                    />
                </View>
            </View>

            {/*영문자,숫자*/}
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                width: '100%',
                paddingHorizontal: 30,
                alignItems: 'center',
            }}>

                <View>
                    <Text
                        style={{fontSize: 11, color: '#171616', paddingLeft: 80, paddingBottom: 10}}>
                        영문자, 숫자를 조합해주세요.
                    </Text>
                </View>
            </View>

                <View>
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
                                        source={require('../../../image/name_y.png')}
                                    />
                                    <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>중복 확인</Text>
                                </View>

                                <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>비밀번호가 불일치합니다.</Text>


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
                </View>

            {/*비밀번호 확인*/}
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
                        source={textD}
                    />
                </View>
                <View>
                    <TextInput  maxLength = {14}
                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 15, paddingRight: 80,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}
                        placeholder="   비밀번호  확인"secureTextEntry={true}
                        onChangeText = {(text) => setNewTextD(text)}
                    />
                </View>
                <View>
                    <Image
                        style={{
                            height: 70,
                            width: 70,
                            resizeMode: 'center',
                            borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,
                        }}
                        source={password}
                    />
                </View>
            </View>
            <View style={{paddingTop: 70,}}>
            </View>


            {/*비밀번호 찾기*/}
            <View style={{
                paddingTop: 20,
                paddingHorizontal: 30,
                alignItems: 'center',
            }}>
                <TouchableOpacity  onPress={() => updatePassWord()}>
                    <Text  style={{fontSize: 15, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 40, paddingRight: 40, backgroundColor: '#0b4072',borderStyle: 'solid',paddingTop: 10, paddingBottom: 10,
                        borderRadius: 30,
                        borderColor: '#0b4072',
                        borderWidth: 2,}}>
                        비밀번호 찾기
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop: 40,}}>
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
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});

export default find_pw_new;
