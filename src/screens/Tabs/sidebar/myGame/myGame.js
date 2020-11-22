import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import Styles from '../../../../styles';
import Slider from '@react-native-community/slider';
import { ScrollView, TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import server from '../../../../../server.json';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Autocomplete from 'react-native-autocomplete-input';
import { Linking } from 'react-native';
const qs = require('qs');

let userID;
let playGameID;
let likeGenreID;
let isEdited;
let isGame;

let arr = [];
let arr2= [];
let tmpGame;
let tmpTier;
let tmpName;

let getDatas = async (url) => await axios.get(url)
    .then(function (response) {
        if(response.data==""){
            return [];
        }
        else{
            return response.data;
        }
    })
    .catch(function (error) {
        console.log(url)
        console.log('error : ' + error);
    });

let postInsertGame = async (game, tierID, gameID) => await axios({
    method: 'post',
    url: server.ip + '/friend/insertProfileGame',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
        uID: userID.replace('\"', '').replace('\"', ''),
        game: game,
        tierID: tierID,
        gameID: gameID
    })
});

let postInsertGenre = async (genre, gDegree) => await axios({
    method: 'post',
    url: server.ip + '/friend/insertProfileGenre',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
        uID: userID.replace('\"', '').replace('\"', ''),
        genre: genre,
        gDegree: gDegree,
    })
});

let postEditGame = async (game, tierID, gameID) => await axios({
    method: 'post',
    url: server.ip + '/friend/editProfileGame',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
        game: game,
        tierID: tierID,
        gameID: gameID,
        usergameID: playGameID
    })
});

let postEditGenre = async (genre, gDegree) => await axios({
    method: 'post',
    url: server.ip + '/friend/editProfileGenre',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
        genre: genre,
        gDegree: gDegree,
        gLikeID: likeGenreID
    })
});

let postDeleteGame = async () => await axios({
    method: 'post',
    url: server.ip + '/friend/deleteProfileGame',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
        usergameID: playGameID
    })
});

let postDeleteGenre = async () => await axios({
    method: 'post',
    url: server.ip + '/friend/deleteProfileGenre',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
        gLikeID: likeGenreID
    })
});

function myGame({ navigation }) {

    const [gameListModalVisible, setgameListModalVisible] = useState([false, false, false]);
    const [genreModalVisible, setgenreModalVisible] = useState([false,false]);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [myProfileGame, setMyProfileGame] = useState([]);
    const [myProfileGenre, setMyProfileGenre] = useState([]);

    const [sliderValue, setSliderValue] = useState(0);

    const [genreData, setGenreData] = useState([]);
    const [gDegreeData, setGDegreeData] = useState([]);

    const [games, setGames] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [filteredGenres, setFilteredGenres] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});

    const findGame = (query) => {
        if (query) {
            const regex = new RegExp(`${query.trim()}`, 'i');

            setFilteredGames(
                games.filter((game) => game.game.search(regex) >= 0)
            );
        } else {
            setFilteredGames([]);
        }
    };

    const findGenre = (query) => {
        if(query) {
            const regex = new RegExp(`${query.trim()}`, 'i');

            setFilteredGenres(
                genres.filter((genre) => genre.genre.search(regex) >=0)
            );
        } else {
            setFilteredGenres([]);
        }
    };

    let arr_gameList = new Array(gameListModalVisible.length).fill(false);
    let arr_genre = new Array(genreModalVisible.length).fill(false);

    useEffect(() => {
        const unfetched = navigation.addListener('focus', async () => {
            userID = await AsyncStorage.getItem('uID');
            setMyProfileGame(await getDatas(server.ip + '/friend/profileGame?uID=' + userID))
            setMyProfileGenre(await getDatas(server.ip + '/friend/profileGenre?uID=' + userID))
            setGames(await getDatas(server.ip + '/friend/gameList'))
            setGenres(await getDatas(server.ip + '/friend/genreList'))
        });

        return unfetched;
    }, [navigation]);


    return (
        <View style={{width:'100%', height:'100%', backgroundColor:'#F7F7F7', paddingLeft:'10%', paddingRight:'10%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.title}>
                    <View style={{flexDirection:'row', alignItems:'center', width:'60%'}}>
                        <Text style={{ fontSize: 20, color: '#FFC81A' }}>{'\u2022   '}</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>플레이 게임 리스트</Text>
                    </View>
                    <View style={{width:'40%', paddingRight:'5%', alignItems:'flex-end', justifyContent:'center'}}>
                        <TouchableOpacity style={{width:21, height:21}} onPress={async()=>{
                            arr_gameList[0]=true;
                            setgameListModalVisible(arr_gameList);
                            userID = await AsyncStorage.getItem('uID');
                            isEdited=0;
                        }}>
                            <Image source={require('../../../../image/game_plus_tight.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                {myProfileGame.length==0 ?
                    <View style={styles.content}>
                        <Text style={{ color:'#A5A5A5'}}>게임 정보를 입력해주세요.</Text>
                    </View>
                    :
                    myProfileGame.map((mData, index) => {
                            return (
                                <TouchableOpacity style={styles.content} onPress={()=>{
                                    setEditModalVisible(true)
                                    playGameID = mData.usergameID
                                    isGame=1
                                }} onLongPress={async()=>{
                                    setDeleteModalVisible(true)
                                    playGameID = mData.usergameID
                                    isGame=1
                                    userID = await AsyncStorage.getItem('uID');
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, color: '#FFC81A' }}>{'\u2022   '}</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{mData.game}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, color: '#A5A5A5' }}>{'\u2022   '}</Text>
                                        <Text style={{ fontSize: 11 }}>{mData.gameID}</Text>
                                        <Text style={{ fontSize: 11 }}> </Text>
                                        <Text style={{ fontSize: 11 }}>({mData.tierID})</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                    })
                }             
                
                <View style={styles.title}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width:'60%' }}>
                        <Text style={{ fontSize: 20, color: '#FFC81A' }}>{'\u2022   '}</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>선호하는 장르</Text>
                    </View>
                    <View style={{ width: '40%', paddingRight: '5%', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ width: 21, height: 21 }} onPress={async() => {
                            arr_genre[0] = true;
                            setgenreModalVisible(arr_genre);
                            userID = await AsyncStorage.getItem('uID');
                            isEdited=0;
                        }}>
                            <Image source={require('../../../../image/game_plus_tight.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                    

                

                <View style={styles.content}>
                    {myProfileGenre.length==0 ?
                        <Text style={{ color: '#A5A5A5' }}>장르 정보를 입력해주세요.</Text>
                    :
                        myProfileGenre.map((mData, index) => {
                            return (
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 35 }}
                                onPress={()=>{
                                    setEditModalVisible(true)
                                    likeGenreID = mData.gLikeID
                                    isGame=0
                                }} onLongPress={async()=>{
                                    setDeleteModalVisible(true)
                                    likeGenreID = mData.gLikeID
                                    isGame = 0
                                    userID = await AsyncStorage.getItem('uID');
                                }}>
                                    <View style={{ width: '50%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 18, color: '#A5A5A5' }}>{'\u2022   '}</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{mData.genre}</Text>
                                        <Text style={{ fontSize: 11 }}>  </Text>
                                        <Text style={{ fontSize: 13, }}>({mData.gDegree}%)</Text>
                                    </View>
                                    <View style={{ width: '50%', height: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <View style={{ width: '90%', height: 8, borderWidth: 1, alignItems: 'flex-start', borderColor: '#E2E2E2' }}>
                                            <View style={{ width: mData.gDegree + '%', height: '100%', backgroundColor: '#00255A' }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }                
                </View>

                <Text style={{ fontSize:12, color:'#A5A5A5', marginTop:20, marginBottom:20}}>찾으시는 게임 장르가 없다면, 문의를 통해 메일로 요청해주십시오.</Text>

                <TouchableHighlight
                    style={{
                        width: '40%', height: 40, backgroundColor: "#00255A", alignSelf: 'center'
                        , borderRadius: 20, elevation: 2, justifyContent: 'center', marginBottom:'10%'
                    }}
                    onPress={() => { Linking.openURL(`mailto:unnormal3215@gmail.com`) }}>
                    <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>문의하기</Text>
                </TouchableHighlight>
            </ScrollView>

            <Modal
                animationIn={"slideInUp"} //default 'slideInUp'
                animationOut={'slideOutDown'} //default 'slideOutDown'
                isVisible={gameListModalVisible[0]}
                transparent={true} //default 'true'
                backdropColor={'black'} //default 'black'
                backdropOpacity={0.5} //default 0.7
                onBackButtonPress={() => setgameListModalVisible(arr_gameList)}
                onBackdropPress={() => setgameListModalVisible(arr_gameList)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{width:'100%', alignItems:'center', paddingLeft:'10%', paddingRight:'10%'}}>
                            <View style={{ height:50, flexDirection: 'row', alignItems:'center', justifyContent:'center', marginTop:20, marginBottom:20 }}>
                                <Image source={require("../../../../image/registered_1.png")} style={{ width: 30, height: 35 }} />
                                <Text style={{fontSize:16, fontWeight:'bold', marginLeft:15}}>게임 등록</Text>
                            </View>

                            <View style={{ width: '100%', height: 120}}>
                                <Autocomplete
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    containerStyle={{ backgroundColor: '#ffffff'}}
                                    data={filteredGames}
                                    defaultValue={
                                        JSON.stringify(selectedValue) === '{}' ?
                                            '' :
                                            selectedValue.game
                                    }

                                    onChangeText={(text) => findGame(text)}
                                    placeholder="게임 이름을 검색해주세요."
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}
                                            onPress={() => {
                                                setSelectedValue(item);
                                                setFilteredGames([]);
                                            }}>
                                            <Text style={{ fontSize: 20, color: '#FFC81A' }}>{' \u2022  '}</Text>
                                            <Text style={{textAlign: 'left', fontSize: 16}}>
                                                {item.game}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

                            <View style={{ width: '100%', borderWidth: 0.15, backgroundColor:'#E2E2E2'}} />
                            <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                <View style={{width:'50%', alignItems:'center', justifyContent:'center'}}>
                                    <TouchableOpacity onPress={() => {
                                        setgameListModalVisible(arr_gameList)
                                        setSelectedValue([])
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: '70%', borderWidth: 0.15, backgroundColor: '#E2E2E2'}} />
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={async() => {
                                        arr_gameList[1]=true
                                        setgameListModalVisible(arr_gameList)
                                        arr2=[]
                                        arr = await getDatas(server.ip + '/friend/tierData?game=' + selectedValue.game) 
                                        arr.forEach(function (e) {
                                            arr2.push({ label: e.tier, value: e.tier })
                                        })
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>확인</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationIn={"slideInUp"} //default 'slideInUp'
                animationOut={'slideOutDown'} //default 'slideOutDown'
                isVisible={gameListModalVisible[1]}
                transparent={true} //default 'true'
                backdropColor={'black'} //default 'black'
                backdropOpacity={0.5} //default 0.7
                onBackButtonPress={() => setgameListModalVisible(arr_gameList)}
                onBackdropPress={() => setgameListModalVisible(arr_gameList)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', alignItems: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
                            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 35, marginBottom: 35 }}>
                                <Image source={require("../../../../image/registered_1.png")} style={{ width: 30, height: 35 }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>아이디 입력</Text>
                            </View>
                            <View style={{ width: '100%', height: 40, borderBottomWidth: 2, borderBottomColor:'#A5A5A5', marginBottom: 40 }}>
                                <TextInput style={{ justifyContent: 'center' }}
                                    placeholder='해당 게임의 아이디(닉네임)을 입력하세요.' placeholderTextColor='#A5A5A5'
                                    onChangeText={text => tmpName=text}
                                    />
                            </View>
                            <View style={{ width: '100%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                            <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        setgameListModalVisible(arr_gameList)
                                        setSelectedValue([])
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: '70%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={async() => {
                                        arr_gameList[2]=true;
                                        setgameListModalVisible(arr_gameList) 
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>확인</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationIn={"slideInUp"} //default 'slideInUp'
                animationOut={'slideOutDown'} //default 'slideOutDown'
                isVisible={gameListModalVisible[2]}
                transparent={true} //default 'true'
                backdropColor={'black'} //default 'black'
                backdropOpacity={0.5} //default 0.7
                onBackButtonPress={() => setgameListModalVisible(arr_gameList)}
                onBackdropPress={() => setgameListModalVisible(arr_gameList)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', alignItems: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
                            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                                <Image source={require("../../../../image/registered_1.png")} style={{ width: 30, height: 35 }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>티어 선택</Text>
                            </View>
                            <View style={{width:'100%',height:100, marginBottom:20}}>
                                <DropDownPicker
                                    items={arr2}
                                    style={{ alignItems: 'center', borderWidth: 2, borderColor: '#A5A5A5'}}
                                    dropDownStyle={{ marginTop: 15, borderWidth: 2, borderColor:'#A5A5A5', paddingLeft:'10%'}}
                                    containerStyle={{ height: 40 }}
                                    dropDownStyle={{height:800}}
                                    itemStyle={{justifyContent:'flex-start'}}
                                    placeholder='티어를 선택해주세요.'
                                    placeholderStyle={{ color:'#A5A5A5'}}
                                    arrowStyle={{width:0, height:0}}
                                    onChangeItem={item => tmpTier=item.value}
                                />
                            </View>
                            <View style={{ width: '100%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                            <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        setgameListModalVisible(arr_gameList)
                                        setSelectedValue([])
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: '70%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={async() => {
                                        
                                        setgameListModalVisible(arr_gameList)
                                        if(isEdited==0){
                                            postInsertGame(selectedValue.game, tmpTier, tmpName)
                                        }
                                        else if(isEdited==1){
                                            postEditGame(selectedValue.game, tmpTier, tmpName)
                                        }
                                        setMyProfileGame(await getDatas(server.ip + '/friend/profileGame?uID=' + userID))
                                        setSelectedValue([])
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>완료</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationIn={"slideInUp"} //default 'slideInUp'
                animationOut={'slideOutDown'} //default 'slideOutDown'
                isVisible={genreModalVisible[0]}
                transparent={true} //default 'true'
                backdropColor={'black'} //default 'black'
                backdropOpacity={0.5} //default 0.7
                onBackButtonPress={() => setgenreModalVisible(arr_genre)}
                onBackdropPress={() => setgenreModalVisible(arr_genre)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', alignItems: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
                            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 35, marginBottom: 35 }}>
                                <Image source={require("../../../../image/registered_1.png")} style={{ width: 30, height: 35 }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>장르 선택</Text>
                            </View>
                            <View style={{ width: '100%', height: 120}}>
                                <Autocomplete
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    containerStyle={{ backgroundColor: '#ffffff' }}
                                    data={filteredGenres}
                                    defaultValue={
                                        JSON.stringify(selectedValue) === '{}' ?
                                            '' :
                                            selectedValue.genre
                                    }

                                    onChangeText={(text) => findGenre(text)}
                                    placeholder="게임 장르를 검색해주세요."
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                                            onPress={() => {
                                                setSelectedValue(item);
                                                setFilteredGenres([]);
                                            }}>
                                            <Text style={{ fontSize: 20, color: '#FFC81A' }}>{' \u2022  '}</Text>
                                            <Text style={{ textAlign: 'left', fontSize: 16 }}>
                                                {item.genre}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

                            <View style={{ width: '100%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                            <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        setgenreModalVisible(arr_genre)
                                        setSelectedValue([])
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: '70%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={async() => {
                                        arr_genre[1]=true
                                        setgenreModalVisible(arr_genre)
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>확인</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationIn={"slideInUp"} //default 'slideInUp'
                animationOut={'slideOutDown'} //default 'slideOutDown'
                isVisible={genreModalVisible[1]}
                transparent={true} //default 'true'
                backdropColor={'black'} //default 'black'
                backdropOpacity={0.5} //default 0.7
                onBackButtonPress={() => setgenreModalVisible(arr_genre)}
                onBackdropPress={() => setgenreModalVisible(arr_genre)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', alignItems: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
                            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 35, marginBottom: 35 }}>
                                <Image source={require("../../../../image/registered_1.png")} style={{ width: 30, height: 35 }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>장르 선호도</Text>
                            </View>
                            <Text>{sliderValue.toFixed(0)}</Text>
                            <View>
                                <Slider
                                    style={{ width: 200, height: 40 }}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor="#000000"
                                    maximumTrackTintColor="#000000"
                                    onValueChange={value=>{
                                        setSliderValue(value);
                                        setGDegreeData(value);
                                        }}/>
                            </View>
                            <View style={{ width: '100%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                            <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        setgenreModalVisible(arr_genre)
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: '70%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={async() => {
                                        setgenreModalVisible(arr_genre)
                                        if(isEdited==0){
                                            postInsertGenre(selectedValue.genre, gDegreeData.toFixed(0))
                                        }
                                        else if(isEdited==1){
                                            postEditGenre(selectedValue.genre, gDegreeData.toFixed(0))
                                        }
                                        setMyProfileGenre(await getDatas(server.ip + '/friend/profileGenre?uID=' + userID))
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>완료</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationIn={"slideInUp"} //default 'slideInUp'
                animationOut={'slideOutDown'} //default 'slideOutDown'
                isVisible={editModalVisible}
                transparent={true} //default 'true'
                backdropColor={'black'} //default 'black'
                backdropOpacity={0.5} //default 0.7
                onBackButtonPress={() => setEditModalVisible(false)}
                onBackdropPress={() => setEditModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', alignItems: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
                            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 35, marginBottom: 35 }}>
                                <Image source={require("../../../../image/check.png")} style={{ width: 30, height: 35 }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>수정하시겠습니까?</Text>
                            </View>
                            <View style={{ width: '100%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                            <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        setEditModalVisible(false)
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: '70%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={async() => {
                                        if(isGame==1){
                                            setEditModalVisible(false)
                                            arr_gameList[0] = true;
                                            setgameListModalVisible(arr_gameList);
                                            userID = await AsyncStorage.getItem('uID');
                                            isEdited = 1;
                                        }
                                        else if(isGame==0){
                                            setEditModalVisible(false)
                                            arr_genre[0] = true;
                                            setgenreModalVisible(arr_genre);
                                            userID = await AsyncStorage.getItem('uID');
                                            isEdited = 1;
                                        }
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>확인</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationIn={"slideInUp"} //default 'slideInUp'
                animationOut={'slideOutDown'} //default 'slideOutDown'
                isVisible={deleteModalVisible}
                transparent={true} //default 'true'
                backdropColor={'black'} //default 'black'
                backdropOpacity={0.5} //default 0.7
                onBackButtonPress={() => setDeleteModalVisible(false)}
                onBackdropPress={() => setDeleteModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', alignItems: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
                            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 35, marginBottom: 35 }}>
                                <Image source={require("../../../../image/check.png")} style={{ width: 30, height: 35 }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>삭제하시겠습니까?</Text>
                            </View>
                            <View style={{ width: '100%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                            <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        setDeleteModalVisible(false)
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: '70%', borderWidth: 0.15, backgroundColor: '#E2E2E2' }} />
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={async() => {
                                        setDeleteModalVisible(false)
                                        if (isGame == 1) {
                                            postDeleteGame()
                                            setMyProfileGame(await getDatas(server.ip + '/friend/profileGame?uID=' + userID))
                                        }
                                        else if (isGame == 0) {
                                            postDeleteGenre()
                                            setMyProfileGenre(await getDatas(server.ip + '/friend/profileGenre?uID=' + userID))
                                        }
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>확인</Text>
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
    title: {
        width: '100%', 
        height: 50,
        flexDirection: 'row', 
        alignItems: 'center',  
        marginTop: 10, 
    },
    content: {
        width: '95%', 
        borderRadius: 15, 
        backgroundColor: '#FFFFFF', 
        elevation: 5, 
        alignSelf: 'center', 
        marginBottom: 10, 
        padding: '5%' 
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


export default myGame;
