import React, { useState } from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Image, View, TouchableOpacity, Text } from 'react-native';

import myGame from './myGame';

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
                name="myGame"
                component={myGame}
                options={{
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate("FriendHome")}>
                        <Image
                            source={require('../../../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex: 1 }}>
                            <Text style={{ fontSize: 16 }}>내 게임 정보</Text>
                        </View>
                    ,
                    headerRight: () =>
                        <View/>
                    ,
                }}
            />

        </Stack.Navigator>
    );
}