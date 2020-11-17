import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';

import MailHome from './home';
import FriendHome from './../friend';
import MySide from '../sidebar';
import MyTabs from '../index';
// 네비게이터 스택 선언, 인덱스에서 선언해주어야 함. 여기 써지는 스크린들이 navigation에 등록됨. 그래서 다른 곳에서 불러다 쓸 수 있음
const Stack = createStackNavigator();
// 카테고리 스크린이라는 함수로 부름
function MailScreen({ navigation }) {
    return (
        <Stack.Navigator>
            {/*가장 첫 스크린. 맨처음 화면에 뜨게 됨. 제일 처음으로 있는 스크린이 제일 먼저 뜸.
             이름은 Home이고 컴퍼넌트로는 위에서 import 한 걸 보면 아는데 home.js가 CategoryHome이라는 이름으로 import되어 여기서 사용됨. 그 아래 옵션은 상단 바에 대한 것.
             왼쪽의 드로워를 넣어 누르면 openDrawer로 드로워를 나타나게 해 줌, 그 외에는 왼쪽의 이미지, 가운데 이미지, 오른쪽 이미지도 설정해 준 것*/}
            <Stack.Screen
                name="MailHome"
                component={MailHome}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate("MyTabs")}>
                        <Image
                            source={require('../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex: 1 }}>
                            <Text style={{ fontSize: 16 }}>메시지</Text>
                        </View>
                    ,
                    headerRight: () =>
                        <View />
                    ,
                }}
            />
            <Stack.Screen options={
                {
                    headerShown : false,
                }}

                          name="MyTabs"
                          component={MyTabs}
            />

        </Stack.Navigator>
    );
}
export default MailScreen;
