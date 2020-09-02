import React, { Component } from 'react';
import {ScrollView, View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
// 가장 첫 화면
function CategoryHome({ navigation }) {

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            onMomentumScrollEnd={() => {
                console.log('Scrolling is End');
            }}>
            <View style={styles.item}>
                {/*이 부분을 통해 index에서 선언된 tiersLOL이라는 네비게이션에 등록된 스크린으로 넘어가게됨. 아래도 동일*/}
                <TouchableOpacity style={styles.gamecard} onPress={() => navigation.navigate('tiersLOL')}> 
                    <View style={styles.LtriangleCorner} />
                    <View style={styles.LtriangleCorner1} />
                    <Text style={styles.title}>LEAGUE OF</Text>
                    <Text style={styles.title1}>LEGENDS</Text>
                    <View style={styles.LgameImage}>
                        <Image
                            style={{height: '100%', width: '100%', resizeMode: 'contain'}}
                            source={require('../../../image/img_LOL.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.item}>
                <TouchableOpacity style={styles.gamecard} onPress={() => navigation.navigate('tiersOW')}>
                    <View style={styles.OtriangleCorner} />
                    <View style={styles.OtriangleCorner1} />
                    <Text style={styles.title}>OVER</Text>
                    <Text style={styles.title1}>WATCH</Text>
                    <View style={styles.OgameImage}>
                        <Image
                            style={{height: '100%', width: '100%', resizeMode: 'contain'}}
                            source={require('../../../image/img_OW.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.item}>
                <TouchableOpacity style={styles.gamecard} onPress={() => navigation.navigate('tiersBG')}>
                    <View style={styles.BtriangleCorner} />
                    <View style={styles.BtriangleCorner1} />
                    <Text style={styles.title}>BATTLE</Text>
                    <Text style={styles.title1}>GROUNDS</Text>
                    <View style={styles.BgameImage}>
                        <Image
                            style={{
                                height: '100%',
                                width: '100%',
                                resizeMode: 'contain',
                                borderBottomRightRadius: 20,
                            }}
                            source={require('../../../image/img_BG.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.item}>
                <TouchableOpacity style={styles.gamecard} onPress={() => navigation.navigate('tiersRS')}>
                    <View style={styles.RtriangleCorner} />
                    <View style={styles.RtriangleCorner1} />
                    <Text style={styles.title}>RAINBOW</Text>
                    <Text style={styles.title1}>SIX: SIEGE</Text>
                    <View style={styles.RgameImage}>
                        <Image
                            style={{height: '100%', width: '100%', resizeMode: 'contain'}}
                            source={require('../../../image/img_R6.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    LtriangleCorner: {
        position: 'absolute',
        width: 300,
        height: 50,
        backgroundColor: 'green',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    LtriangleCorner1: {
        position: 'absolute',
        width: 300,
        height: 300,
        top: 50,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 300,
        borderTopWidth: 300,
        borderRightColor: 'white',
        borderTopColor: 'green',
    },
    LgameImage: {
        width: 300,
        justifyContent: 'center',
        paddingBottom: 126,
    },
    OtriangleCorner: {
        position: 'absolute',
        width: 300,
        height: 50,
        backgroundColor: 'orange',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    OtriangleCorner1: {
        position: 'absolute',
        width: 300,
        height: 300,
        top: 50,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 300,
        borderTopWidth: 300,
        borderRightColor: 'white',
        borderTopColor: 'orange',
    },
    OgameImage: {
        width: 300,
        justifyContent: 'center',
        paddingBottom: 49,
    },
    BtriangleCorner: {
        position: 'absolute',
        width: 300,
        height: 50,
        backgroundColor: 'blue',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    BtriangleCorner1: {
        position: 'absolute',
        width: 300,
        height: 300,
        top: 50,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 300,
        borderTopWidth: 300,
        borderRightColor: 'white',
        borderTopColor: 'blue',
    },
    BgameImage: {
        width: 300,
        justifyContent: 'center',
        paddingBottom: 24,
        borderBottomRightRadius: 20,
    },
    RtriangleCorner: {
        position: 'absolute',
        width: 300,
        height: 50,
        backgroundColor: 'gray',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    RtriangleCorner1: {
        position: 'absolute',
        width: 300,
        height: 300,
        top: 50,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 300,
        borderTopWidth: 300,
        borderRightColor: 'white',
        borderTopColor: 'gray',
    },
    RgameImage: {
        width: 300,
        justifyContent: 'center',
        paddingBottom: 83,
    },
    gamecard: {
        width: 300,
        height: 450,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 30,
        flexDirection: 'column',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 20,
        paddingLeft: 25,
    },
    title1: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 25,
    },
});

export default CategoryHome;
