import React, { Component } from 'react';
import {ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, TextInput} from 'react-native';

export class teamLOL extends Component<Props> {
    constructor(props){
        super(props);
        this.state={count:1, minutes: 5};
    }

    _plus(){
        if(this.state.count < 5){
            this.setState({
                count:this.state.count+1
            });
        }
    }
    _minus(){
        if(this.state.count > 1){
            this.setState({
                count:this.state.count-1
            });
        }
    }

    _plusM(){
        if(this.state.minutes < 30){
            this.setState({
                minutes:this.state.minutes+5
            });
        }
    }
    _minusM(){
        if(this.state.minutes > 5){
            this.setState({
                minutes:this.state.minutes-5
            });
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={{
                    paddingEnd: 20
                }}>
                    <Image
                        style={{
                            height: 170,
                            width: 170,
                            resizeMode: 'cover',
                        }}
                        source={require('../../../../image/team.png')}/>
                </View>

                <Text style={{fontSize: 16, fontWeight: 'bold', paddingBottom: 30}}>
                    필요한 인원을 모집하세요.
                </Text>
                <ScrollView style={styles.sView}>
                    <View style={styles.sItem}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                            <Text style={{
                                paddingStart: 10,
                                paddingEnd: 20,
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: '#ffc81a'
                            }}>
                                ·
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    width: '75%'
                                }}>
                                <TextInput style={{fontSize: 16}} placeholder="제목을 입력하세요."/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sItem}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                            <Text style={{
                                paddingStart: 10,
                                paddingEnd: 10,
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: '#ffc81a'
                            }}>
                                ·
                            </Text>
                            <Text style={{paddingStart: 10, paddingEnd: 20, fontSize: 14, fontWeight: 'bold'}}>
                                인원
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: '75%'
                                }}>
                                <TouchableOpacity onPress={this._minus.bind(this)}>
                                    <Image
                                        style={{
                                            height: 80,
                                            width: 80,
                                            resizeMode: 'cover',
                                        }}
                                        source={require('../../../../image/minus.png')}/>
                                </TouchableOpacity>
                                <Text style={{fontSize: 14}}>
                                    {this.state.count.toString()}명
                                </Text>
                                <TouchableOpacity onPress={this._plus.bind(this)}>
                                    <Image
                                        style={{
                                            height: 80,
                                            width: 80,
                                            resizeMode: 'cover',
                                        }}
                                        source={require('../../../../image/plus.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{width: '100%',
                        height: 150,
                        backgroundColor: '#ffffff',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        padding: 0,
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'gray',}}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                            <Text style={{
                                paddingStart: 10,
                                paddingEnd: 10,
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: '#ffc81a'
                            }}>
                                ·
                            </Text>
                            <Text style={{paddingStart: 10, paddingEnd: 20, fontSize: 14, fontWeight: 'bold'}}>
                                포지션
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'column',
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '75%',
                                        padding: 8
                                    }}>
                                    <View
                                        style={{
                                            paddingHorizontal: 8
                                        }}>

                                    <TouchableOpacity style={{
                                        height: 35,
                                        width: 53,
                                        flexDirection: 'row',
                                        borderStyle: 'solid',
                                        borderRadius: 14,
                                        borderColor: '#000000',
                                        borderWidth: 1,
                                        borderTopWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{fontSize: 14, padding: 5}}>
                                            탑
                                        </Text>
                                    </TouchableOpacity>
                                    </View>

                                    <View
                                        style={{
                                            paddingHorizontal: 8
                                        }}>
                                    <TouchableOpacity style={styles.position}>
                                        <Text style={{fontSize: 14, padding: 5}}>
                                            미드
                                        </Text>
                                    </TouchableOpacity>
                                    </View>

                                    <View
                                        style={{
                                            paddingHorizontal: 8
                                        }}>
                                    <TouchableOpacity style={styles.position}>
                                        <Text style={{fontSize: 14, padding: 5}}>
                                            정글
                                        </Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '75%',
                                        padding: 8
                                    }}>

                                    <View
                                        style={{
                                            paddingHorizontal: 8
                                        }}>
                                    <TouchableOpacity style={styles.position}>
                                        <Text style={{fontSize: 14, padding: 5}}>
                                            원딜
                                        </Text>
                                    </TouchableOpacity>
                                    </View>

                                    <View
                                        style={{
                                            paddingHorizontal: 8
                                        }}>
                                    <TouchableOpacity style={{height: 35,
                                        width: 73,
                                        flexDirection: 'row',
                                        borderStyle: 'solid',
                                        borderRadius: 14,
                                        borderColor: '#000000',
                                        borderWidth: 1,
                                        borderTopWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',}}>
                                        <Text style={{fontSize: 14, padding: 5}}>
                                            서포터
                                        </Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        height: 130,
                        backgroundColor: '#ffffff',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingBottom: 40,
                    }}>

                        <View
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                <Text style={{
                                    paddingStart: 10,
                                    paddingEnd: 10,
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    color: '#ffc81a'
                                }}>
                                    ·
                                </Text>
                                <Text style={{paddingStart: 10, paddingEnd: 20, fontSize: 14, fontWeight: 'bold'}}>
                                    자동삭제
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '75%'
                                    }}>
                                    <TouchableOpacity onPress={this._minusM.bind(this)}>
                                        <Image
                                            style={{
                                                height: 80,
                                                width: 80,
                                                resizeMode: 'cover',
                                            }}
                                            source={require('../../../../image/minus.png')}/>
                                    </TouchableOpacity>
                                    <Text style={{fontSize: 14}}>
                                        {this.state.minutes.toString()}분 후
                                    </Text>
                                    <TouchableOpacity onPress={this._plusM.bind(this)}>
                                        <Image
                                            style={{
                                                height: 80,
                                                width: 80,
                                                resizeMode: 'cover',
                                            }}
                                            source={require('../../../../image/plus.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text>
                                5분 단위의 시간 설정으로 모집 글이 자동 삭제됩니다.
                            </Text>

                        </View>

                    </View>

                    <View
                        style={{alignItems: 'center', paddingBottom: 30, paddingTop: 20}}>
                        <TouchableOpacity
                            style={{
                                height: 50,
                                width: 180,
                                flexDirection: 'row',
                                borderStyle: 'solid',
                                borderRadius: 100,
                                borderColor: '#00255a',
                                borderWidth: 1,
                                borderTopWidth: 1,
                                backgroundColor: '#00255a',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>

                            <Text style={{color: '#ffffff', fontSize: 15, fontWeight: 'bold'}}>
                                작성하기
                            </Text>

                        </TouchableOpacity>
                    </View>


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
        height: 50,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    sView: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0,
        elevation: 0,
        paddingHorizontal: 37,
    },
    sItem: {
        width: '100%',
        height: 75,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
    },
    position: {
        height: 35,
        width: 63,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderRadius: 14,
        borderColor: '#000000',
        borderWidth: 1,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default teamLOL;
