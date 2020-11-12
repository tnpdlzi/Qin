import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    BackHandler,
} from 'react-native';
import {Avatar, Accessory} from 'react-native-elements';
import Modal from 'react-native-modal';
import server from '../../../../server.json';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let uID;

let getDatas = async (url) => await axios.get(url)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(url)
        console.log('error : ' + error);
    });


function MemoryHome({ navigation }) {

    useEffect(() => {
        const backAction = () => {
            if (navigation.isFocused()) {
                return true;
            }
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [])

    const [myModalVisible, setMyModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState([]);

    const [myProfile, setMyProfile] = useState([]);
    const [myProfileGame, setMyProfileGame] = useState([]);
    const [myProfileGenre, setMyProfileGenre] = useState([]);
    const [friendProfile, setFriendProfile] = useState([]);
    const [friendProfileGame, setFriendProfileGame] = useState([]);
    const [friendProfileGenre, setFriendProfileGenre] = useState([]);

    let arr = new Array(modalVisible.length).fill(false);


    useEffect(() => {
        const unfetched = navigation.addListener('focus', async () => {
            uID = await AsyncStorage.getItem('uID')
            setMyProfile(await getDatas(server.ip + '/friend/myProfile?uID=' + uID))
            setFriendProfile(await getDatas(server.ip + '/friend/friendProfile?uID=' + uID))
        });
        return unfetched;
    }, [navigation]);

    return (
        <ScrollView style={{ backgroundColor: "#F7F7F7", paddingLeft:15, paddingRight:15 }}
            showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

            {myProfile.map((mData, index) => {
                return (
                    <TouchableOpacity onPress={async () => {
                        setMyModalVisible(!myModalVisible);
                        setMyProfileGame(await getDatas(server.ip + '/friend/profileGame?uID=' + uID));
                        setMyProfileGenre(await getDatas(server.ip + '/friend/profileGenre?uID=' + uID));
                    }}>
                        <View style={styles.myProfile}>
                            <View style={{width:'40%', height:'100%', flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                <Avatar
                                    rounded
                                    size='medium'
                                    source={require('../../../image/profile.png')}
                                />

                                <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft:'10%' }}>{mData.userName}</Text>
                            </View>
                            <View style={{ width:'60%', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 12 }} >{mData.intro}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}

            {myProfile.map((mData2, index) => {
                return (
                    <Modal
                        animationIn={"slideInUp"} //default 'slideInUp'
                        animationOut={'slideOutDown'} //default 'slideOutDown'
                        isVisible={myModalVisible}
                        transparent={true} //default 'true'
                        backdropColor={'black'} //default 'black'
                        backdropOpacity={0.5} //default 0.7
                        onBackButtonPress={() => setMyModalVisible(false)}
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
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: '5%' }}>{mData2.userName}</Text>
                                        <Text style={{ fontSize: 10, marginTop: '2%' }}>{mData2.intro}</Text>
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
                                        <Text style={{ color: '#FFC81A', fontSize: 10, fontWeight: 'bold' }}>{mData2.good}</Text>
                                    </View>
                                    <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Text style={{ color: '#363636', fontSize: 10, fontWeight: 'bold' }}>비매너 지수   </Text>
                                        <Text style={{ color: '#00255A', fontSize: 10, fontWeight: 'bold' }}>{mData2.bad}</Text>
                                    </View>
                                </View>

                                <View style={{ width: '80%', height: 2, backgroundColor: "#E2E2E2", alignSelf: "center" }} />

                                <ScrollView style={{ width: '100%' }}>

                                    <View style={{ width: '80%', alignSelf: 'center' }}>

                                        {myProfileGame.map((mData, index) => {
                                            return (
                                                <View style={{ height: 70, justifyContent: 'center' }} >
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 20, color: '#FFC81A' }}>{'\u2022 '}</Text>
                                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{mData.game}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                                        <Text style={{ fontSize: 10 }}>{mData.gameID}</Text>
                                                        <Text style={{ fontSize: 10 }}> </Text>
                                                        <Text style={{ fontSize: 10 }}>({mData.tierID})</Text>
                                                    </View>
                                                </View>
                                            );
                                        })}

                                    </View>

                                    <View style={{ width: '80%', height: 2, backgroundColor: "#E2E2E2", alignSelf: "center" }} />

                                    <View style={{ width: '80%', alignSelf: 'center' }}>

                                        {myProfileGenre.map((mData, index) => {
                                            return (
                                                <View style={{ height: 35, flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{mData.genre}</Text>
                                                    <Text style={{ fontSize: 10 }}> </Text>
                                                    <Text style={{ fontSize: 10 }}>({mData.gDegree}%)</Text>
                                                </View>
                                            );
                                        })}

                                    </View>

                                </ScrollView>

                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 30, justifyContent: 'center', marginBottom: '10%' }}>
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

                );
            })}

            <View style={{width: '100%', height: 1, backgroundColor: "#E2E2E2", alignSelf:"center"}} />

            <View style={{height:41, flexDirection:'row', alignItems:'center'}}>
                <Text style={{color: "#5E5E5E", fontSize: 10}}>친구 ({friendProfile.length}명)</Text>
            </View>

            <FlatList
            keyExtractor={item => item.toString()}
            data={friendProfile}
            renderItem={({item})=>
                <View>
                    <TouchableOpacity onPress={async() => {
                        arr[item.uID]=true;
                        setModalVisible(arr);
                        setFriendProfileGame(await getDatas(server.ip + '/friend/profileGame?uID=' + item.uID));
                        setFriendProfileGenre(await getDatas(server.ip + '/friend/profileGenre?uID=' + item.uID))
                    }}>
                        <View style={styles.friendProfile}>
                            <View style={{ width: '40%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Avatar
                                    rounded
                                    size='medium'
                                    source={require('../../../image/profile.png')}
                                />
                                <Text style={{ fontSize: 13, marginLeft: '10%' }}>{item.userName}</Text>
                            </View>

                            <View style={{ width: '60%', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 12 }} >{item.intro}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>


                    <Modal
                        animationIn={"slideInUp"} //default 'slideInUp'
                        animationOut={'slideOutDown'} //default 'slideOutDown'
                        isVisible={modalVisible[item.uID]}
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
                                    arr[item.uID]=false;
                                    setModalVisible(arr);
                                }}>
                                    <Image style={{ width: 50, height: 50, }} source={require('../../../image/cancel.png')} />
                                </TouchableOpacity>
                                <View style={{
                                    width: '80%', height: '15%', alignSelf: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: '5%' }}>{item.userName}</Text>
                                        <Text style={{ fontSize: 10, marginTop: '2%' }}>{item.intro}</Text>
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
                                        <Text style={{ color: '#FFC81A', fontSize: 10, fontWeight: 'bold' }}>{item.good}</Text>
                                    </View>
                                    <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Text style={{ color: '#363636', fontSize: 10, fontWeight: 'bold' }}>비매너 지수   </Text>
                                        <Text style={{ color: '#00255A', fontSize: 10, fontWeight: 'bold' }}>{item.bad}</Text>
                                    </View>
                                </View>

                                <View style={{ width: '80%', height: 2, backgroundColor: "#E2E2E2", alignSelf: "center" }} />

                                <ScrollView style={{ width: '100%' }}>

                                <View style={{ width: '80%', alignSelf: 'center' }}>

                                    {friendProfileGame.map((mData, index)=> {
                                        return(
                                            <View style={{ height: 70, justifyContent: 'center' }} >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 20, color: '#FFC81A' }}>{'\u2022 '}</Text>
                                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{mData.game}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                                    <Text style={{ fontSize: 10 }}>{mData.gameID}</Text>
                                                    <Text style={{ fontSize: 10 }}> </Text>
                                                    <Text style={{ fontSize: 10 }}>({mData.tierID})</Text>
                                                </View>
                                            </View>
                                        );
                                    })}


                                </View>

                                <View style={{ width: '80%', height: 2, backgroundColor: "#E2E2E2", alignSelf: "center" }} />

                                <View style={{ width: '80%', alignSelf: 'center' }}>

                                    {friendProfileGenre.map((mData, index) => {
                                        return (
                                            <View style={{ height: 35, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 20, color: '#A5A5A5' }}>{'\u2022 '}</Text>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{mData.genre}</Text>
                                                <Text style={{ fontSize: 10 }}> </Text>
                                                <Text style={{ fontSize: 10 }}>({mData.gDegree}%)</Text>
                                            </View>
                                        );
                                    })}

                                </View>

                                </ScrollView>

                                <View style={{width:'100%', flexDirection:'row', marginTop:30, justifyContent:'center', marginBottom:'10%'}}>
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
        width:'100%',
        height: 77,
        flexDirection: 'row', //view들 가로로 나열되게
        alignItems: 'center', //위의 row와 함께쓰면 가운데에 떠있게 함
    },
    friendProfile: {
        width:'100%',
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
        height: '85%',
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
