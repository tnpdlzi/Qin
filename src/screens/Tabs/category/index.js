import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

import CategoryHome from './home';
import tiersLOL from './tiers/tiersLOL';
import tiersOW from './tiers/tiersOW';
import tiersBG from './tiers/tiersBG';
import tiersRS from "./tiers/tiersRS";
import roomsLOL from "./roomList/roomsLOL";
import roomsOW from './roomList/roomsOW';
import roomsBG from './roomList/roomsBG';
import roomsRS from './roomList/roomsRS';
import joinedLOL from "./join/joinedLOL";
import joinedOW from './join/joinedOW';
import joinedBG from './join/joinedBG';
import joinedRS from './join/joinedRS';
import teamLOL from "./team/teamLOL";
import teamOW from './team/teamOW';
import teamBG from './team/teamBG';
import teamRS from './team/teamRS'
import teamComplete from "./team/teamComplete";

import MailHome from '../mailBox/home';

// 네비게이터 스택 선언, 인덱스에서 선언해주어야 함. 여기 써지는 스크린들이 navigation에 등록됨. 그래서 다른 곳에서 불러다 쓸 수 있음
const Stack = createStackNavigator();
// 카테고리 스크린이라는 함수로 부름
export default function CategoryScreen({ navigation }) {
    return (
        <Stack.Navigator>
            {/*가장 첫 스크린. 맨처음 화면에 뜨게 됨. 제일 처음으로 있는 스크린이 제일 먼저 뜸.
             이름은 Home이고 컴퍼넌트로는 위에서 import 한 걸 보면 아는데 home.js가 CategoryHome이라는 이름으로 import되어 여기서 사용됨. 그 아래 옵션은 상단 바에 대한 것.
             왼쪽의 드로워를 넣어 누르면 openDrawer로 드로워를 나타나게 해 줌, 그 외에는 왼쪽의 이미지, 가운데 이미지, 오른쪽 이미지도 설정해 준 것*/}
            <Stack.Screen
                name="CategoryHome"
                component={CategoryHome}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../../../image/menu_1.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            {/*여기부터는 각각 스크린에 대한 선언들. component들은 다 import되어 있음*/}
            <Stack.Screen
                name="tiersLOL"
                component={tiersLOL}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('CategoryHome')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="tiersOW"
                component={tiersOW}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('CategoryHome')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="tiersBG"
                component={tiersBG}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('CategoryHome')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="tiersRS"
                component={tiersRS}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('CategoryHome')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="roomsLOL"
                component={roomsLOL}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('tiersLOL')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="joinedLOL"
                component={joinedLOL}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('roomsLOL')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="teamLOL"
                component={teamLOL}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('roomsLOL')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />

            <Stack.Screen
                name="roomsOW"
                component={roomsOW}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('tiersOW')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="joinedOW"
                component={joinedOW}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('roomsOW')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="teamOW"
                component={teamOW}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('roomsOW')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />

            <Stack.Screen
                name="roomsBG"
                component={roomsBG}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('tiersBG')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="joinedBG"
                component={joinedBG}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('roomsBG')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="teamBG"
                component={teamBG}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('roomsBG')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />


            <Stack.Screen
                name="roomsRS"
                component={roomsRS}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('tiersRS')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="joinedRS"
                component={joinedRS}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('roomsRS')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="teamRS"
                component={teamRS}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('roomsRS')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />

            <Stack.Screen
                name="teamComplete"
                component={teamComplete}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image
                                source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                            />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
            <Stack.Screen
                name="MailHome"
                component={MailHome}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../../../image/menu_1.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}/>
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    ,
                }}
            />
        </Stack.Navigator>
    );
}
