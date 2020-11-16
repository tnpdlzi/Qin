import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Avatar, Accessory } from 'react-native-elements';
import Modal from 'react-native-modal';
import server from '../../../../../server.json';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
const qs = require('qs');

const uploadPhoto = async (uID, photo) =>{
    const data = new FormData();
    await data.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: uID.replace('\"', '').replace('\"', ''),
    })
    
    axios({
    method: 'post',
    url: server.ip + '/image/upload',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  }).catch(function (error) {
    console.log('error : ' + error);
})
console.log('photo_uri................' + photo.uri)}

let userID;

let getDatas = async (url) => await axios.get(url)
    .then(function (response) {
        if (response.data == "") {
            return [];
        }
        else {
            return response.data;
        }
    })
    .catch(function (error) {
        console.log(url)
        console.log('error : ' + error);
    });

let postIntro = async (intro) => await axios({
    method: 'post',
    url: server.ip + '/friend/editIntro',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
        uID: userID.replace('\"', '').replace('\"', ''),
        intro: intro
    })
});

function myProf({ navigation }) {
    
    const [myProfile, setMyProfile] = useState([]);
    const [introModalVisible, setIntroModalVisible] = useState(false);

    const [introData, setIntroData] = useState([]);

    const [avatar, setAvatar] = useState(require('../../../../../src/image/profile.png'));
    const [title, setTitle] = useState('Profile Photo');


    const handlePicker = () => {
        ImagePicker.showImagePicker({}, async (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            setAvatar({uri: response.uri});
            setTitle('Updating...'); // image start to upload on server so on header set text is 'Updating..'
            uploadPhoto(await AsyncStorage.getItem('uID'), response)
          }
        });
      };

    useEffect(() => {
        const unfetched = navigation.addListener('focus', async () => {
            userID = await AsyncStorage.getItem('uID')
            setMyProfile(await getDatas(server.ip + '/friend/myProfile?uID=' + userID))
        });

        return unfetched;
    }, [navigation]);

    return (
        <View style={{ height:'100%', backgroundColor: "#F7F7F7", paddingLeft: '10%', paddingRight: '10%', paddingTop: '10%' }}>
            <View style={{flexDirection:'row', height:'25%'}}>
                <View style={{ width: '25%'}}>
                <TouchableOpacity
                    onPress={() => handlePicker()}>
                        {myProfile.map((data, index) => {
                            return (
                                <Avatar
                                    rounded
                                    source={{ uri: server.ip + '/photo' + myProfile[0].image }}
                                    PlaceholderContent={<ActivityIndicator />}
                                    size='large'
                                />
                            );
                        })}
                        
                    </TouchableOpacity>
                </View>
                <View style={{ width:'75%', height:'100%', paddingLeft: '15%'}}>
                    <View style={{height:'25%'}}>     
                        {myProfile.map((data, index)=>{
                            return(
                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{data.userName}</Text>
                            );
                        })}
                    </View>
                    <View style={{ height: '15%', paddingTop: '3%'}}>
                        {myProfile.map((data, index) => {
                            return (
                                <Text style={{ color: '#363636' }}>{data.userID}</Text>
                            );
                        })}
                    </View>
                    <View style={{height: '50%'}}>
                        <TouchableOpacity style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{ fontSize: 20, color:'#A5A5A5'}}>{'\u2022 '} </Text>
                            <Text>비밀번호 변경            </Text>
                            <Image source={require('../../../../image/go.png')} style={{width:'40%', height:'100%'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{width:'100%', height:2, backgroundColor:'#E2E2E2'}} />
            <View style={{ width:'100%', height:'10%', borderRadius: 15, marginTop:'10%',backgroundColor:'#FFFFFF', elevation:5,}}>
                <TouchableOpacity onPress={async()=> {
                    setIntroModalVisible(true)
                    userID = await AsyncStorage.getItem('uID')
                    setIntroData("")
                }} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    {myProfile.map((data, index) => {
                        return (
                            data.intro == "" ?
                                <Text style={{ color: '#A5A5A5' }}>자기소개를 등록해주세요. (30자 이내)</Text>
                                :
                                <Text>{data.intro}</Text>
                        );
                    })}        
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: '15%', borderRadius: 15, marginTop: '10%', backgroundColor: '#FFFFFF', elevation:5, flexDirection:'row', padding:'5%' }}>
                <View style={{ width:'50%', height:'100%',}}>
                    <View style={{height:'50%', flexDirection:'row',paddingRight:'10%'}}>
                        <View style={{width:'60%', height:'100%', justifyContent:'center'}}>
                            <Text style={{fontSize:12, fontWeight:'bold'}}>매너 지수</Text>
                        </View>
                        <View style={{ width: '40%', height: '100%', justifyContent: 'center' }}>
                            {myProfile.map((data, index) => {
                                return (
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 12, fontWeight: 'bold' }}>{data.good}</Text>
                                );
                            })}
                        </View>
                    </View>
                    <View style={{ height: '50%', paddingRight: '10%', justifyContent:'center' }}>
                        <View style={{ width: '100%', height: 8, alignItems: 'flex-start', borderWidth:1, borderColor:'#E2E2E2' }}>
                            {myProfile.map((data, index) => {
                                return (
                                    <View style={{ width: data.good + '%', height: '100%', backgroundColor: '#FFC81A' }} />
                                );
                            })}
                        </View>
                    </View>
                </View>
                <View style={{ width: '50%', height: '100%',}}>
                    <View style={{ height: '50%', flexDirection: 'row', paddingLeft:'10%' }}>
                        <View style={{ width: '60%', height: '100%', justifyContent:'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>비매너 지수</Text>
                        </View>
                        <View style={{ width: '40%', height: '100%', justifyContent: 'center' }}>
                            {myProfile.map((data, index) => {
                                return (
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 12, fontWeight: 'bold' }}>{data.bad}</Text>
                                );
                            })}
                        </View>
                    </View>
                    <View style={{ height: '50%', paddingLeft: '10%', justifyContent: 'center' }}>
                        <View style={{ width: '100%', height: 8, alignItems: 'flex-start', borderWidth:1, borderColor:'#E2E2E2' }}>
                            {myProfile.map((data, index) => {
                                return (
                                    <View style={{ width: data.bad + '%', height: '100%', backgroundColor: '#00255A' }} />
                                );
                            })}
                        </View>
                    </View>
                </View>
            </View>

            <Modal
                animationIn={"slideInUp"} //default 'slideInUp'
                animationOut={'slideOutDown'} //default 'slideOutDown'
                isVisible={introModalVisible}
                transparent={true} //default 'true'
                backdropColor={'black'} //default 'black'
                backdropOpacity={0.5} //default 0.7
                onBackButtonPress={() => setIntroModalVisible(false)}
                onBackdropPress={() => setIntroModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', alignItems: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
                            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                                <Image source={require("../../../../image/registered_1.png")} style={{ width: 30, height: 35 }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>자기소개 변경</Text>
                            </View>
                            <View style={{ width: '100%', height: 40, borderBottomWidth: 2, borderBottomColor: '#A5A5A5', marginBottom: 10 }}>
                                <TextInput style={{ justifyContent: 'center' }}
                                    placeholder='변경할 자기소개를 작성해주세요.' placeholderTextColor='#A5A5A5'
                                    onChangeText={text => { setIntroData(text) }}
                                     />
                            </View>
                            <View style={{ width: '100%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                            <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        setIntroModalVisible(false)
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: '70%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={async() => {
                                        setIntroModalVisible(false)
                                        postIntro(introData)
                                        setMyProfile(await getDatas(server.ip + '/friend/myProfile?uID=' + userID))
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>완료</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: "center",
        padding: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
    },
    modalView: {
        width: '90%',
        //height: '85%',
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
});


export default myProf;
