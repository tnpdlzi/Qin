import React, { Component } from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const datas = [
    {id: 'BEGINNER'},
    {id: 'NOVICE'},
    {id: 'EXPERIENCED'},
    {id: 'SKILLED'},
    {id: 'SPECIALIST'},
    {id: 'EXPERT'},
    {id: 'SURVIVOR'},
];
class tiersBG extends Component {

    constructor(props) {
        super(props);
        this.state = {datas: datas};
    }

    link(idx) {
        const newDatas = [...this.state.datas];

        this.setState({datas: newDatas});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.gameImage}>
                    <View style={styles.item}>
                        <Image
                            style={{height: 50, width: 50, resizeMode: 'contain'}}
                            source={require('../../../../image/img_user.png')}
                        />
                        <Text style={{padding: 20}}>등록이 필요합니다.</Text>
                    </View>
                    <Image
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: 200,
                            width: '100%',
                            resizeMode: 'cover',
                        }}
                        source={require('../../../../image/img_bg_bg.png')}
                    />
                </View>
                <ScrollView style={styles.sView}>
                    {this.state.datas.map((data, index) => {
                        return (
                                <View style={styles.sItem} >
                                    <TouchableOpacity
                                        style={{
                                            paddingStart: 8,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                        onPress={this.props.link}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                            }}>
                                            <Text style={{paddingEnd: 20, fontSize: 40, fontWeight: 'bold'}}>
                                                ·
                                            </Text>
                                            <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                                                {data.id}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                flex: 1,
                                            }}>
                                            <Image
                                                style={{height: 80, width: 80, resizeMode: 'cover'}}
                                                source={require('../../../../image/img_go.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    gameImage: {
        height: 270,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 140,
    },
    sView: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0,
        elevation: 0,
        paddingHorizontal: 30,
    },
    item: {
        width: 284,
        height: 86,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    sItem: {
        width: '100%',
        height: 80,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
    },
});

export default tiersBG;
