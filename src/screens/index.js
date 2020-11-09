import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { View, Text, StyleSheet, Image } from 'react-native';
import LoginHome from './login/home';
import MyTabs from '../screens/Tabs/index';
import CategoryScreen from '../screens/Tabs/index'

// import {TouchableOpacity} from "react-native-gesture-handler";
import {createStackNavigator} from '@react-navigation/stack';
import join from './login/join/join';
import {TouchableOpacity} from "react-native-gesture-handler";
import join_final from './login/join/join_final';
import find_id from './login/find_id/find_id';
import find_id_final from './login/find_id/find_id_final';
import find_pw from './login/find_pw/find_pw';
import find_pw_new from './login/find_pw/find_pw_new';
import find_pw_final from './login/find_pw/find_pw_final';
// import MemoryScreen from '../screens/Tabs/friend/home';

const retrieveData = async () => {
    try {
        console.log("이것은 uID입니다..." + JSON.stringify(await AsyncStorage.getItem('uID')))
        console.log("이것은 userID입니다..." + JSON.stringify(await AsyncStorage.getItem('userID')))
        console.log("이것은 userName입니다..." + JSON.stringify(await AsyncStorage.getItem('userName')))
        console.log("이것은 good입니다..." + JSON.stringify(await AsyncStorage.getItem('good')))
        console.log("이것은 bad입니다..." + JSON.stringify(await AsyncStorage.getItem('bad')))
        console.log("이것은 intro입니다..." + JSON.stringify(await AsyncStorage.getItem('intro')))
    } catch (error) {
      // Error retrieving data
    }
  };

  retrieveData
// 아래쪽의 탭 네비게이터를 쓰겠다는 선언
const Stack = createStackNavigator();
// 탭들에 대한 구현 함수로 선언

// 10월21일부
function MyScreens() {
    return (// 탭 네비게이터로 안에 있는 4개의 아이콘에 대한 옵션 설정. 그 아래로는 각각의 아이콘에 대해 누르면 이동할 스크린, 그리고 아이콘에 대한 이미지 설정
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={LoginHome}
                options={{
                    headerShown: false,
                }}

            />

            {/*여기부터는 각각 스크린에 대한 선언들. component들은 다 import되어 있음*/}

            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
            />

            <Stack.Screen options={
                {
                    headerShown : false,
                }}

                name="MyTabs"
                component={MyTabs}
            />
            <Stack.Screen
                name="join"
                component={join}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                회원가입
                            </Text>
                        </View>
                    ,
                }}
            />

            <Stack.Screen
                name="join_final"
                component={join_final}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                회원가입
                            </Text>
                        </View>
                    ,
                }}
            />
            <Stack.Screen
                name="find_id"
                component={find_id}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                아이디 찾기
                            </Text>
                        </View>
                    ,
                }}
            />
            <Stack.Screen
                name="find_id_final"
                component={find_id_final}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                아이디 찾기
                            </Text>
                        </View>
                    ,
                }}
            />
            <Stack.Screen
                name="find_pw"
                component={find_pw}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                비밀번호 찾기
                            </Text>
                        </View>
                    ,
                }}
            />
            <Stack.Screen
                name="find_pw_new"
                component={find_pw_new}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                비밀번호 찾기
                            </Text>
                        </View>
                    ,
                }}
            />
            <Stack.Screen
                name="find_pw_final"
                component={find_pw_final}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                비밀번호 찾기
                            </Text>
                        </View>
                    ,
                    headerRight: () => <Image source={require('../image/mail_g.png')} style={{ height:80, width:80, resizeMode: 'contain' }}/>,
                }}
            />
        </Stack.Navigator>
    );
}

export default MyScreens;
