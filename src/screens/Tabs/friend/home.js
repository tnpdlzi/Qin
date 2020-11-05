import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Avatar, Accessory} from 'react-native-elements';
import Modal from 'react-native-modal';
import server from '../../../../server.json';
import axios from 'axios';


let getDatas = async (url) => await axios.get(url)
    .then(function (response) {
        console.log(response.data)
        return response.data
    })
    .catch(function (error) {
        console.log(url)
        console.log('error : ' + error);
    });

function MemoryHome({ navigation }) {
    
    const [modalVisible, setModalVisible] = useState([]); //hook: useState는 현재의 state값과 이 값을 업데이트하는 함수를 쌍으로 제공.
    //useState 괄호안은 초기값을 나타낸다.
    const [myModalVisible, setMyModalVisible] = useState(false);
    const [friendprofile, setFriendprofile] = useState([]);
    
    let arr = new Array(modalVisible.length).fill(false);

    const myProfile={
        uid:100,
        image:"",
        name:"이지훈",
        comment:"아이디 주인",
    };

    // const friendprofile=[
    //     {
    //         uid:0,
    //         image:"",
    //         name:"류대현",
    //         comment:"자기소개1",
    //     },
    //     {
    //         uid: 1,
    //         image: "",
    //         name: "박진곤",
    //         comment: "자기소개2",
    //     },
    //     {
    //         uid: 2,
    //         image: "",
    //         name: "이규빈",
    //         comment: "자기소개3",
    //     },
    //     {
    //         uid: 3,
    //         image: "",
    //         name: "이동건",
    //         comment: "무빙건",
    //     },
    // ];

    useEffect(() => {
        const unfetched = navigation.addListener('focus', async () => {
            setFriendprofile(await getDatas(server.ip + '/friend/friendList?uID=1'))
        });

        return unfetched;
    }, [navigation]);

    return ( 
        <ScrollView style={{ backgroundColor: "#F7F7F7", paddingLeft:15, paddingRight:15 }}
            showsHorizontalScrollIndicator={true}>

            <TouchableOpacity onPress={() => setMyModalVisible(!myModalVisible)}>
                <View style={styles.myProfile}>
                    <View style={{height:77, width: 77,alignItems:'center', justifyContent:'center',}}>
                        <Avatar
                            rounded
                            style={{width: '70%', height:'70%', }}
                            source={require('../../../image/profile.png')}
                        />
                    </View>
                    <View style={{ width: 77, }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{myProfile.name}</Text>
                    </View>
                    <View style={{ width: '59%', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 12 }} >{myProfile.comment}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <Modal
                animationIn={"slideInUp"} //default 'slideInUp'
                animationOut={'slideOutDown'} //default 'slideOutDown'
                isVisible={myModalVisible}
                transparent={true} //default 'true'
                backdropColor={'black'} //default 'black'
                backdropOpacity={0.5} //default 0.7
                onBackButtonPress={() => setMyModalVisible(false) }
                onBackdropPress={() => setMyModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setMyModalVisible(false)}>
                            <Image style={{ width: 50, height: 50, }} source={require('../../../image/cancel.png')} />
                        </TouchableOpacity>
                        <View style={{
                            width: '80%', height: '15%', alignSelf: 'center',
                            flexDirection: 'row',
                        }}>
                            <View style={{ width: '70%', }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: '5%' }}>{myProfile.name}</Text>
                                <Text style={{ fontSize: 10, marginTop: '2%' }}>{myProfile.comment}</Text>
                            </View>
                            <View style={{ width: '30%', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Avatar
                                    rounded
                                    style={{ width: '70%', height: '70%' }}
                                    source={require('../../../image/profile.png')}
                                />
                            </View>
                        </View>
                        <View style={{ width: '80%', height: 2, backgroundColor: "#E2E2E2", alignSelf: "center" }} />
                        <View style={{ width: '80%', height: '10%', alignSelf: 'center', flexDirection: 'row' }}>
                            <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ color: '#363636', fontSize: 10, fontWeight: 'bold' }}>매너 지수   </Text>
                                <Text style={{ color: '#FFC81A', fontSize: 10, fontWeight: 'bold' }}>20</Text>
                            </View>
                            <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={{ color: '#363636', fontSize: 10, fontWeight: 'bold' }}>비매너 지수   </Text>
                                <Text style={{ color: '#00255A', fontSize: 10, fontWeight: 'bold' }}>7</Text>
                            </View>
                        </View>
                        
                        <View style={{ width: '80%', height: 2, backgroundColor: "#E2E2E2", alignSelf: "center" }} />
                        
                        <View style={{ width: '80%', alignSelf: 'center' }}>

                            <View style={{ height: 70, justifyContent: 'center' }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, color: '#FFC81A' }}>{'\u2022 '}</Text>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>LEAGUE OF LEGEND</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                    <Text style={{ fontSize: 10 }}>dlwlgns110</Text>
                                    <Text style={{ fontSize: 10 }}> </Text>
                                    <Text style={{ fontSize: 10 }}>(SILVER)</Text>
                                </View>
                            </View>

                            <View style={{ height: 70, justifyContent: 'center' }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, color: '#FFC81A' }}>{'\u2022 '}</Text>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>LEAGUE OF LEGEND</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                    <Text style={{ fontSize: 10 }}>dlwlgns110</Text>
                                    <Text style={{ fontSize: 10 }}> </Text>
                                    <Text style={{ fontSize: 10 }}>(SILVER)</Text>
                                </View>
                            </View>

                        </View>
                        
                        <View style={{ width: '80%', height: 2, backgroundColor: "#E2E2E2", alignSelf: "center" }} />
                        
                        <View style={{ width: '80%', alignSelf: 'center' }}>
                            
                            <View style={{ height: 35, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>RPG</Text>
                                <Text style={{ fontSize: 10 }}> </Text>
                                <Text style={{ fontSize: 10 }}>(20%)</Text>
                            </View>

                            <View style={{ height: 35, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>FPS</Text>
                                <Text style={{ fontSize: 10 }}> </Text>
                                <Text style={{ fontSize: 10 }}>(40%)</Text>
                            </View>

                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 30, justifyContent: 'center'}}>
                            <TouchableHighlight
                                style={{
                                    width: '45%', height: 40, backgroundColor: "#00255A", alignSelf: 'center'
                                    , borderRadius: 20, elevation: 2, justifyContent: 'center'
                                }}
                                onPress={() => {
                                    setMyModalVisible(false);
                                    navigation.navigate('myProf');
                                    }}>
                                <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>프로필 관리</Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>
            </Modal>

            <View style={{width: '100%', height: 1, backgroundColor: "#E2E2E2", alignSelf:"center"}} />

            <View style={{height:41, flexDirection:'row', alignItems:'center'}}>
                <Text style={{color: "#5E5E5E", fontSize: 10}}>친구 (20명)</Text>
            </View>

            <FlatList
            keyExtractor={item => item.toString()}
            data={friendprofile}
            renderItem={({item})=> 
                <View>
                    <TouchableOpacity onPress={() => {
                        arr[item.uid]=true;
                        setModalVisible(arr);
                    }}>
                        <View style={styles.friendProfile}>
                            <View style={{ height: 77, width: 77, alignItems: 'center', justifyContent: 'center', }}>
                                <Avatar
                                    rounded
                                    style={{ width: '70%', height: '70%'}}
                                    source={require('../../../image/profile.png')}
                                />
                            </View>
                            <View style={{ width: 77, }}>
                                <Text style={{ fontSize: 13 }}>{item.name}</Text>
                            </View>
                            <View style={{ width: '59%', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 12 }} >{item.comment}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>


                    <Modal
                        animationIn={"slideInUp"} //default 'slideInUp'
                        animationOut={'slideOutDown'} //default 'slideOutDown'
                        isVisible={modalVisible[item.uid]}
                        transparent={true} //default 'true'
                        backdropColor={'black'} //default 'black'
                        backdropOpacity={0.5} //default 0.7
                        onBackButtonPress={() => {
                            arr[item.uid]=false;
                            setModalVisible(arr);
                        }}
                        onBackdropPress={() => setModalVisible(false)}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={() => { 
                                    arr[item.uid]=false;
                                    setModalVisible(arr);
                                }}>
                                    <Image style={{ width: 50, height: 50, }} source={require('../../../image/cancel.png')} />
                                </TouchableOpacity>
                                <View style={{
                                    width: '80%', height: '15%', alignSelf: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: '5%' }}>{item.name}</Text>
                                        <Text style={{ fontSize: 10, marginTop: '2%' }}>{item.comment}</Text>
                                    </View>
                                    <View style={{ width: '30%', alignItems: 'center' , justifyContent: 'flex-start'}}>
                                        <Avatar
                                            rounded
                                            style={{ width: '70%', height: '70%'}}
                                            source={require('../../../image/profile.png')}
                                        />
                                    </View>
                                </View>
                                
                                <View style={{ width: '80%', height: 2, backgroundColor: "#E2E2E2", alignSelf: "center" }} />
                                
                                <View style={{ width: '80%', height: '10%', alignSelf: 'center', flexDirection: 'row' }}>
                                    <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', }}>
                                        <Text style={{ color: '#363636', fontSize: 10, fontWeight: 'bold' }}>매너 지수   </Text>
                                        <Text style={{ color: '#FFC81A', fontSize: 10, fontWeight: 'bold' }}>20</Text>
                                    </View>
                                    <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Text style={{ color: '#363636', fontSize: 10, fontWeight: 'bold' }}>비매너 지수   </Text>
                                        <Text style={{ color: '#00255A', fontSize: 10, fontWeight: 'bold' }}>7</Text>
                                    </View>
                                </View>
                                
                                <View style={{ width: '80%', height: 2, backgroundColor: "#E2E2E2", alignSelf: "center" }} />
                                
                                <View style={{ width: '80%', alignSelf: 'center' }}>
                                    
                                    <View style={{height: 70, justifyContent:'center'}} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 20, color: '#FFC81A' }}>{'\u2022 '}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>LEAGUE OF LEGEND</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                            <Text style={{ fontSize: 10 }}>dlwlgns110</Text>
                                            <Text style={{ fontSize: 10 }}> </Text>
                                            <Text style={{ fontSize: 10 }}>(SILVER)</Text>
                                        </View>
                                    </View>

                                    <View style={{ height: 70, justifyContent: 'center' }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 20, color: '#FFC81A' }}>{'\u2022 '}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>LEAGUE OF LEGEND</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                            <Text style={{ fontSize: 10 }}>dlwlgns110</Text>
                                            <Text style={{ fontSize: 10 }}> </Text>
                                            <Text style={{ fontSize: 10 }}>(SILVER)</Text>
                                        </View>
                                    </View>
                                    
                                </View>
                                
                                <View style={{ width: '80%', height: 2, backgroundColor: "#E2E2E2", alignSelf: "center" }} />
                                
                                <View style={{ width: '80%', alignSelf: 'center' }}>
                                    
                                    <View style={{ height: 35, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>RPG</Text>
                                        <Text style={{ fontSize: 10 }}> </Text>
                                        <Text style={{ fontSize: 10 }}>(20%)</Text>
                                    </View>

                                    <View style={{ height: 35, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>FPS</Text>
                                        <Text style={{ fontSize: 10 }}> </Text>
                                        <Text style={{ fontSize: 10 }}>(40%)</Text>
                                    </View>

                                </View>

                                <View style={{width:'100%', flexDirection:'row', marginTop:30, justifyContent:'center'}}>
                                    <TouchableHighlight
                                        style={{
                                            width: '45%', height: 40, backgroundColor: "#00255A", alignSelf: 'center'
                                            , borderRadius: 20, elevation: 2, justifyContent: 'center'
                                        }}
                                        onPress={() => { }}>
                                        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>1:1 채팅</Text>
                                    </TouchableHighlight>
                                </View>
                                

                            </View>
                        </View>
                    </Modal>
                </View> 
            } />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    myProfile: {
        height: 77,
        flexDirection: 'row', //view들 가로로 나열되게
        alignItems: 'center', //위의 row와 함께쓰면 가운데에 떠있게 함
    },
    friendProfile: {
        height: 67,
        flexDirection: 'row',
        alignItems: 'center',
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

export default MemoryHome;
