import React, { useState } from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Image, View, TouchableOpacity, Text } from 'react-native';

import friendList from './home';
import myProf from '../sidebar/myProfile/myProf';

import MailHome from '../mailBox/home';

// 네비게이터 스택 선언, 인덱스에서 선언해주어야 함. 여기 써지는 스크린들이 navigation에 등록됨. 그래서 다른 곳에서 불러다 쓸 수 있음
const Stack = createStackNavigator();

// 카테고리 스크린이라는 함수로 부름
export default function MemoryScreen({ navigation }) {
    const [isEditing, setProfileEdit] = useState(false);

    return (
        <Stack.Navigator>
        
        {/*여기서 스크린을 하나씩 등록한다. 이 스크린은 맨 처음 화면에 뜨게 되는 가장 첫 스크린.(Home 스크린이다.)
        component는 MemoryHome, 즉 ./home이므로 같은 경로에 있는 home.js를 말한다. 이는 나타낼 화면이다.
        그 아래 options은 상단 바에 대한 것. 위에 있는 3개의 아이콘을 headerLeft, headerTitle, headerRight로 나타내어 작성
        headerLeft에는 navigation.openDrawer가 있는 것을 볼 수 있다. 이는 Stack.Navigator의 좌측 탭 기능(드로워)를 나타낸 것이다.*/}
            <Stack.Screen 
             
                name="FriendHome"
                component={friendList}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../../../image/menu_1.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex: 1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height: 80, width: 80, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    ,
                }}
            />

            <Stack.Screen
                name="myProf"
                component={myProf}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate("FriendHome")}>
                        <Image
                            source={require('../../../image/back.png')} style={{height:50, width:50, resizeMode:'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex: 1 }}>
                            <Text style={{fontSize:16}}>프로필 관리</Text>
                        </View>
                    ,
                    headerRight: () => 
                        <TouchableOpacity onPress={() => setProfileEdit(!isEditing)} >
                            {isEditing?
                                <View style={{height:50, width:50, justifyContent:'center'}}>
                                    <Text style={{fontSize:16, fontWeight: 'bold'}}>수정</Text>
                                </View>
                            :
                                <View style={{ height: 50, width: 50, justifyContent: 'center'}}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>완료</Text>
                                </View>
                            }
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
                            source={require('../../../image/menu_1.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex: 1 }}>
                            <Image source={require('../../../image/logo_mini_02.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
                        </View>
                    ,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('MailHome')}>
                        <Image source={require('../../../image/mail_y.png')} style={{ height: 80, width: 80, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    ,
                }}
            />

        </Stack.Navigator>
    );
}