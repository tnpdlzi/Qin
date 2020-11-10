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
    FlatList, onContentSizeChange, ScrollView,
} from 'react-native';
import Styles from '../../../styles';
import join_final from './join_final';
import Modal from 'react-native-modal';
import axios from 'axios';
import server from '../../../../server.json'

//import RNPickerSelect from 'react-native-picker-select';
// import {Dropdown} from 'react-native-material-dropdown';

// import DropDownPicker from 'react-native-dropdown-picker';
// import Icon from 'react-native-vector-icons/Feather';


//const qs = require('qs');
// 10월21일부
function join({ navigation, route }) {

    let [randomNumber, setrandomNumber] = useState("");

    let emailAuth = async () => await axios.post(server.ip + '/users/emailAuth', {
        userID: userID,
    })
        .then(function(response){
            setrandomNumber(toString(response.data));
            console.log(typeof (toString(response.data)));
            {setModalVisible6(!modalVisible6);}
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });


    function email(){
        if(nullEmail==true) {
            emailAuth()
        }
        else {
            setModalVisible5(!modalVisible5);
        }
    }

    let [nullEmail, changeNullEmail] = useState(false);





    let [check1, setCheck1] = useState("");
    let [check2, setCheck2] = useState("");

    let searchName = async () => await axios.post(server.ip +'/users/searchName', {
        userName: userName
    })
        .then(function(response){
            if(response.data == false){ //seach_hash 를 이용해서 통신한 결과가 없을 경우 ResData를 빈 배열로 초기화
                //setResData(response.data);
                changeM("닉네임")
                {setModalVisible10(!modalVisible10);}
                console.log("없는 아이디래");
                console.log(response.data);
                setCheck1(1);
                //없는 아이디
            }
            else {
                changeM("닉네임")
                {setModalVisible1(!modalVisible1);}
                console.log("있는 아이디래");
                console.log(response.data);

                setCheck1(0);
            // 있는 아이디
            }
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });


    let [modal_message, changeM] = useState("");

    function CheckEmail(str)

    {
        var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if(!reg_email.test(str)) {
            setModalVisible5(!modalVisible5);
        }
        else {
            search_ID()
        }
    }

    let search_ID = async () => await axios.post(server.ip + '/users/search_ID', {
        userID: userID
    })
        .then(function(response){
            if(response.data == false){ //seach_hash 를 이용해서 통신한 결과가 없을 경우 ResData를 빈 배열로 초기화
                //setResData(response.data);
                changeM("아이디")

                {setModalVisible2(!modalVisible2);}

                console.log(response.data);

                setCheck2(1);
                //없는 아이디
            }
            else {
                changeM("아이디")

                {setModalVisible1(!modalVisible1);}

                console.log(response.data);
                userID = response.data;
                setCheck2(0);
                // 있는 아이디
            }
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });


    let loginBy = "naver"
    let [answer, setAnswer] = useState("");

    let [phone, setPhone] = useState("");

    let register = async () => await axios.post(server.ip + '/users/register', {
        userName: userName,
        userID: userID,
        password: pwc,
        loginBy: loginBy,
        answer: answer,
        question: question,
        phone: phone
    })
        .then(function(response){
            console.log(response.data);
        })
        .catch(function(error){
            console.log("에러 :" + error);
        });



    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);
    const [modalVisible6, setModalVisible6] = useState(false);
    const [modalVisible7, setModalVisible7] = useState(false);
    const [modalVisible8, setModalVisible8] = useState(false);
    const [modalVisible9, setModalVisible9] = useState(false);
    const [modalVisible10, setModalVisible10] = useState(false);


    let [pw, changeP] = useState(require('../../../image/pw_unchecked.png'));
    let [pwc, changePwc] = useState("");
    let [Apwc, AchangePwc] = useState("");
    let [userName, setUserName] = useState("");
    let [userID, setUserID] = useState("");
    let [find, setfind] = useState("0");

    function Start(){
        if(find == 1){
            setModalVisible8(!modalVisible8)
            register()
            navigation.navigate('join_final',{memtitle:[userName]})
        }
        else{
            setModalVisible7(!modalVisible7)
        }
    }
    function checkNumber(){
        if(toString(userNumber)==randomNumber){
            setfind(1);
            setModalVisible8(!modalVisible8)
            setModalVisible6(!modalVisible6)
        }
        else {
            setModalVisible9(!modalVisible9)
            setModalVisible6(!modalVisible6)
        }
    }

    let [textA, changeTextA] = useState(require('../../../image/name_g.png'));
    function setNewTextA(Text){
        if(Text == ""){
            changeTextA(require('../../../image/name_g.png'));
        }
        else {
            setUserName(Text);
            console.log(userName);
            changeTextA(require('../../../image/name_y.png'));
        }
    }

    let [textB, changeTextB] = useState(require('../../../image/id_g.png'));
    function setNewTextB(Text){
        if(Text == ""){
            changeTextB(require('../../../image/id_g.png'));
        }
        else{
            changeNullEmail(true);
            changeTextB(require('../../../image/id_y.png'));
            setUserID(Text);
        }
    }
    let [textC, changeTextC] = useState(require('../../../image/pw_g.png'));
    function setNewTextC(Text){
        if(Text == ""){
            changeTextC(require('../../../image/pw_g.png'));
        }
        else{
            changeTextC(require('../../../image/pw_y.png'));
            changePwc(Text);
        }
        if(Text == Apwc){
            changeP(require('../../../image/pw_checked.png'));
        }
        if(Text != Apwc){
            changeP(require('../../../image/pw_unchecked.png'));
        }
    }
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
        }
        if(Text != pwc){
            changeP(require('../../../image/pw_unchecked.png'));
        }
    }

    let [textE, changeTextE] = useState(require('../../../image/mail_check_g.png'));
    function setNewTextE(Text){
        if(Text == ""){
            changeTextE(require('../../../image/mail_check_g.png'));
        }
        else{
            changeTextE(require('../../../image/mail_check_y.png'));
            setAnswer(Text);
        }
    }
    let [userNumber, setNumber] = useState("");
    let [textF, changeTextF] = useState(require('../../../image/phone_g.png'));
    function setNewTextF(Text){
        if(Text == ""){
            changeTextF(require('../../../image/phone_g.png'));
        }
        else {
            changeTextF(require('../../../image/phone_y.png'));
            setPhone(Text);
        }
    }
    let [textG, changeTextG] = useState(require('../../../image/mail_check_g.png'));
    function setNewTextG(Text){
        if(Text == ""){
            changeTextG(require('../../../image/mail_check_g.png'));
        }
        else {
            setNumber(Text);
            changeTextG(require('../../../image/mail_check_y.png'));
        }
    }

    function check(){
        if(check1 == 1){
            if(check2 == 1){
                if(pw == require('../../../image/pw_checked.png')){
                    if(textF == require('../../../image/phone_y.png')){
                        email()
                    }
                    else{
                        console.log("4번지점")
                        {setModalVisible3(!modalVisible3);}
                    }
                }
                else{
                    console.log("3번지점")
                    {setModalVisible3(!modalVisible3);}
                }
            }
            else{
                console.log("2번지점")
                {setModalVisible3(!modalVisible3);}
            }
        }
        else {
            console.log("1번지점")
            {setModalVisible3(!modalVisible3);}
        }
    }
    let [question, setQuestion] = useState("");
    let [questionSelect, setQuestionSelect] = useState("질 문  선 택");
    function setQ1(){
        setQuestion(1);
        setQuestionSelect("1. 자신의 보물 1호는?");
        setModalVisible4(!modalVisible4);
    }
    function setQ2(){
        setQuestion(2);
        setQuestionSelect("2. 자신이 졸업한 초등학교 이름은?");
        setModalVisible4(!modalVisible4);
    }
    function setQ3(){
        setQuestion(3);
        setQuestionSelect("3. 자신의 가장 친한 친구는?");
        setModalVisible4(!modalVisible4);
    }
    function setQ4(){
        setQuestion(4);
        setQuestionSelect("4. 자신의 첫사랑 이름은?");
        setModalVisible4(!modalVisible4);
    }
    function setQ5(){
        setQuestion(5);
        setQuestionSelect("5. 자신의 별명은?");
        setModalVisible4(!modalVisible4);
    }


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

                <View style={{
                    flexDirection: 'column',
                    backgroundColor: '#ffffff',
                    paddingTop: 10,
                    alignItems: 'center',
                }}>
                    <View>
                        <TextInput maxLength={20}
                                   style={{fontSize: 13, color: '#A5A5A5', }}
                                   placeholder="닉네임 (최대 6자)"
                                   onChangeText = {(text) => setNewTextA(text)}
                        />
                    </View>
                    <View style={{width: 160, backgroundColor:'white',paddingLeft: 15, paddingRight: 55,  borderBottomColor: '#d6d9dc',
                        borderBottomStyle: 'solid',
                        borderBottomWidth: 1,}}>

                    </View>
                </View>

                <View>
                    <TouchableOpacity onPress={async () => searchName()}>
                        <Text  style={{fontSize: 15, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 20, paddingRight: 13, backgroundColor: '#121313',borderStyle: 'solid',paddingTop: 5,
                            borderRadius: 30,
                            borderColor: '#0b4072',
                            borderWidth: 2, Top: 0, }}>
                            중복확인
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

                {/* 질문 선택 Modal*/}
                <View>
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
                            <View style={styles.QmodalView}
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
                                        source={require('../../../image/name_g.png')}
                                    />
                                    <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>질문 선택</Text>
                                </View>

                                <TouchableOpacity onPress={async () => setQ1()}>
                                    <Text  style={{fontSize: 13, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 20, paddingRight: 13, backgroundColor: '#296161',borderStyle: 'solid',paddingTop: 5,
                                        borderRadius: 30,
                                        borderColor: '#f8f6f6',
                                        borderWidth: 2, Top: 0, }}>
                                        1. 자신의 보물 1호는?
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => setQ2()}>
                                    <Text  style={{fontSize: 13, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 20, paddingRight: 13, backgroundColor: '#296161',borderStyle: 'solid',paddingTop: 5,
                                        borderRadius: 30,
                                        borderColor: '#f8f6f6',
                                        borderWidth: 2, Top: 0, }}>
                                        2. 자신이 졸업한 초등학교 이름은?
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => setQ3()}>
                                    <Text  style={{fontSize: 13, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 20, paddingRight: 13, backgroundColor: '#296161',borderStyle: 'solid',paddingTop: 5,
                                        borderRadius: 30,
                                        borderColor: '#f8f6f6',
                                        borderWidth: 2, Top: 0, }}>
                                        3. 자신의 가장 친한 친구는?
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => setQ4()}>
                                    <Text  style={{fontSize: 13, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 20, paddingRight: 13, backgroundColor: '#296161',borderStyle: 'solid',paddingTop: 5,
                                        borderRadius: 30,
                                        borderColor: '#f8f6f6',
                                        borderWidth: 2, Top: 0, }}>
                                        4. 자신의 첫사랑 이름은?
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => setQ5()}>
                                    <Text  style={{fontSize: 13, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 20, paddingRight: 13, backgroundColor: '#296161',borderStyle: 'solid',paddingTop: 5,
                                        borderRadius: 30,
                                        borderColor: '#f8f6f6',
                                        borderWidth: 2, Top: 0, }}>
                                        5. 자신의 별명은?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                <Modal
                    animationIn={"slideInUp"} //default 'slideInUp'
                    animationOut={'slideOutDown'} //default 'slideOutDown'
                    isVisible={modalVisible6}
                    transparent={true} //default 'true'
                    backdropColor={'black'} //default 'black'
                    backdropOpacity={0.5} //default 0.7
                    onBackButtonPress={() => { setModalVisible6(!modalVisible6); }}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView1}
                              onBackDropPress={() => { setModalVisible6(!modalVisible6); }}>
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
                                <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>회원 가입</Text>
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
                                    <Text>발송된 숫자를 입력해주세요</Text>
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
                                        source={textG}
                                    />
                                </View>
                                <View>
                                    <TextInput maxLength = {14}
                                               style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 15,   borderBottomColor: '#d6d9dc',
                                                   borderBottomStyle: 'solid',
                                                   borderBottomWidth: 1,}}
                                               placeholder="해당 이메일로 발송된 인증 숫자를 입력해주세요."
                                               onChangeText = {(text) => setNewTextG(text)}
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
                                    onPress={() => {checkNumber();
                                    }}
                                >
                                    <Text style={{fontSize: 15, color: '#000000',}}>확인</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ ...styles.openButton,}}
                                    onPress={() => {setModalVisible6(!modalVisible6);
                                    }}
                                >
                                    <Text style={{fontSize: 14, color: '#000000',}}>닫기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationIn={"slideInUp"} //default 'slideInUp'
                    animationOut={'slideOutDown'} //default 'slideOutDown'
                    isVisible={modalVisible8}
                    transparent={true} //default 'true'
                    backdropColor={'black'} //default 'black'
                    backdropOpacity={0.5} //default 0.7
                    onBackButtonPress={() => { setModalVisible8(!modalVisible8); }}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}
                              onBackDropPress={() => { setModalVisible8(!modalVisible8); }}>

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
                                <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>회원 가입</Text>
                            </View>

                            <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                                borderBottomStyle: 'solid',
                                borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>이메일 인증 완료!</Text>


                            <TouchableOpacity
                                style={{ ...styles.openButton,}}
                                onPress={() => {Start()
                                }}
                            >
                                <Text style={{fontSize: 14, color: '#000000',paddingTop: 25,}}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            {/* 사용불가능한 닉네임입니다 Modal*/}
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
                                source={require('../../../image/name_g.png')}
                            />
                            <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>중복 확인</Text>
                        </View>

                        <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>이미 사용 중인 {modal_message} 입니다.</Text>


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

                <View>
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
                                    justifyContent: "space-around",
                                    paddingHorizontal: 50,
                                }}>
                                    <Image
                                        style={{
                                            height: 70,
                                            width: 70,
                                            resizeMode: 'center',
                                        }}
                                        source={require('../../../image/name_g.png')}
                                    />
                                    <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>이메일 형식</Text>
                                </View>

                                <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>잘못된 이메일 형식 입니다.</Text>


                                <TouchableHighlight
                                    style={{ ...styles.openButton,}}
                                    onPress={() => {
                                        setModalVisible5(!modalVisible5);
                                    }}
                                >
                                    <Text style={{fontSize: 14, color: '#000000',paddingTop: 25,}}>확인</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>

            <View>
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
                                source={require('../../../image/name_y.png')}
                            />
                            <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>중복 확인</Text>
                        </View>

                        <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>{userID}는 사용 가능한 {modal_message} 입니다.</Text>


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
            </View>
                <View>
                    <Modal
                        animationIn={"slideInUp"} //default 'slideInUp'
                        animationOut={'slideOutDown'} //default 'slideOutDown'
                        isVisible={modalVisible10}
                        transparent={true} //default 'true'
                        backdropColor={'black'} //default 'black'
                        backdropOpacity={0.5} //default 0.7
                        onBackButtonPress={() => { setModalVisible10(!modalVisible10); }}

                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}
                                  onBackDropPress={() => { setModalVisible10(!modalVisible10); }}>

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
                                    borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>{userName}는 사용 가능한 {modal_message} 입니다.</Text>


                                <TouchableHighlight
                                    style={{ ...styles.openButton,}}
                                    onPress={() => {
                                        setModalVisible10(!modalVisible10);
                                    }}
                                >
                                    <Text style={{fontSize: 14, color: '#000000',paddingTop: 25,}}>확인</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>


                <View>
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
                                        source={require('../../../image/name_g.png')}
                                    />
                                    <Text style={{fontSize: 13, color: '#000000',paddingRight: 20,}}>알림</Text>
                                </View>

                                <Text style={{fontSize: 12, color: '#5f5e5e',borderBottomColor: '#d6d9dc',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>잘못된 항목이 존재</Text>


                                <TouchableHighlight
                                    style={{ ...styles.openButton,}}
                                    onPress={() => {
                                        setModalVisible3(!modalVisible3);
                                    }}
                                >
                                    <Text style={{fontSize: 14, color: '#000000',paddingTop: 25,}}>확인</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
                <Modal
                    animationIn={"slideInUp"} //default 'slideInUp'
                    animationOut={'slideOutDown'} //default 'slideOutDown'
                    isVisible={modalVisible9}
                    transparent={true} //default 'true'
                    backdropColor={'black'} //default 'black'
                    backdropOpacity={0.5} //default 0.7
                    onBackButtonPress={() => { setModalVisible9(!modalVisible9); }}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}
                              onBackDropPress={() => { setModalVisible9(!modalVisible9); }}>

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
                                onPress={() => {setModalVisible9(!modalVisible9);
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
                    isVisible={modalVisible7}
                    transparent={true} //default 'true'
                    backdropColor={'black'} //default 'black'
                    backdropOpacity={0.5} //default 0.7
                    onBackButtonPress={() => { setModalVisible7(!modalVisible7); }}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}
                              onBackDropPress={() => { setModalVisible7(!modalVisible7); }}>

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
                                borderBottomWidth: 1,paddingBottom: 20, paddingRight: 40, paddingLeft: 40, paddingTop: 20}}>이메일 인증이 필요합니다.</Text>


                            <TouchableOpacity
                                style={{ ...styles.openButton,}}
                                onPress={() => {setModalVisible7(!modalVisible7);
                                }}
                            >
                                <Text style={{fontSize: 14, color: '#000000',paddingTop: 25,}}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                {/*/!*이메일*!/*/}
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
                            source={textB}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'column',
                        backgroundColor: '#ffffff',
                        paddingTop: 10,
                        alignItems: 'center',
                    }}>
                        <View>
                            <TextInput maxLength={25}
                                style={{fontSize: 11, color: '#A5A5A5', maxHeight:40}}
                                placeholder="이메일 (아이디)"
                                onChangeText = {(text) => setNewTextB(text)}
                            />
                        </View>
                        <View style={{width: 160, backgroundColor:'white',paddingLeft: 15, paddingRight: 55,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}>

                        </View>
                    </View>

                    <View>
                        <TouchableOpacity onPress={async () => CheckEmail(userID)}>
                            <Text  style={{fontSize: 15, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 20, paddingRight: 13, backgroundColor: '#121313',borderStyle: 'solid',paddingTop: 5,
                                borderRadius: 30,
                                borderColor: '#0b4072',
                                borderWidth: 2, Top: 0, }}>
                                중복확인
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


            {/*비번*/}
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
                        source={textC}
                    />
                </View>
                <View>
                    <TextInput maxLength={14}
                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 15, paddingRight: 100,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}
                        placeholder="비밀번호 (6-14자)"secureTextEntry={true}
                        onChangeText = {(text) => setNewTextC(text)}
                    />
                </View>
            </View>

            {/*비번정보*/}
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

            {/*비번확인*/}
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
                    <TextInput maxLength={14}
                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 15, paddingRight: 40,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}
                        placeholder="비밀번호 확인       "secureTextEntry={true}
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
                        source={pw}
                    />
                </View>
            </View>

            {/*질문*/}
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                width: '100%',
                paddingHorizontal: 30,
                alignItems: 'center',
                paddingLeft: 50,
            }}>
                <View>
                    <Image
                        style={{
                            height: 35,
                            width: 35,
                            resizeMode: 'center',
                        }}
                        source={require('../../../image/message.png')}
                    />

                </View>
                <View>
                    <Text>     </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={async () => {setModalVisible4(!modalVisible4);}}>
                        <Text style={{fontSize: 15, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 10, paddingRight: 10, backgroundColor: '#999e9e',borderStyle: 'solid',paddingTop: 5,
                            borderRadius: 30,
                            borderColor: '#d1d5db',
                            borderWidth: 2, Top: 0, }}>
                            {questionSelect}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>




            {/*질문답*/}
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
                        source={textE}
                    />
                </View>
                <View>
                    <TextInput maxLength={14}
                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 15, paddingRight: 80,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}
                        placeholder="질문 답변                       "
                        onChangeText = {(text) => setNewTextE(text)}
                    />
                </View>
            </View>
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
                        source={textF}
                    />
                </View>
                <View>
                    <TextInput maxLength={11}
                        style={{fontSize: 13, color: '#A5A5A5', paddingLeft: 7, paddingRight: 7,  borderBottomColor: '#d6d9dc',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,}}
                        placeholder="010 - 0000 - 0000 ( - 는 빼고 입력해주세요)"
                        onChangeText = {(text) => setNewTextF(text)}
                    />
                </View>
            </View>
            {/*가입하기*/}
            <View style={{
                paddingTop: 20,
                paddingHorizontal: 30,
                alignItems: 'center',
            }}>

                <TouchableOpacity onPress={async () => check()}>
                    <Text  style={{fontSize: 15, color: '#f8f6f6', paddingVertical: 5,paddingLeft: 40, paddingRight: 40, backgroundColor: '#0b4072',borderStyle: 'solid',paddingTop: 10, paddingBottom: 10,
                        borderRadius: 30,
                        borderColor: '#0b4072',
                        borderWidth: 2,}}>
                        가입하기
                    </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
    modalView1: {
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
    QmodalView: {
        width: 300,
        height: 400,
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

export default join;
