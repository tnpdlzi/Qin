import React from 'react';
import {Image, Text, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginHome from './home'
import join from './join/join'
import join_final from './join/join_final';
import find_id from './find_id/find_id';
import find_id_final from './find_id/find_id_final';
import find_pw from './find_pw/find_pw';
import find_pw_new from './find_pw/find_pw_new';
import find_pw_final from './find_pw/find_pw_final';

import { TouchableOpacity } from 'react-native-gesture-handler';



const Stack = createStackNavigator();

export default function LoginScreen({ navigation }) {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Loginhome"
                component={LoginHome}
                options={{
                headerShown: false,
            }}
            />

            {/*여기부터는 각각 스크린에 대한 선언들. component들은 다 import되어 있음*/}

            <Stack.Screen
                name="join"
                component={join}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate(LoginHome)}>
                        <Image
                            source={require('../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                회원가입
                            </Text>
                        </View>
                    ,
                    headerRight: () => <View style={{ alignItems: "center", flex:1 }}>
                        <Text>

                        </Text>
                    </View>
                    ,
                }}
            />

            <Stack.Screen
                name="join_final"
                component={join_final}
                options={{ headerLeft: () => <View style={{ alignItems: "center", flex:1 }}>
                        <Text>

                        </Text>
                    </View>
                    ,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                회원가입
                            </Text>
                        </View>
                    ,
                    headerRight: () => <View style={{ alignItems: "center", flex:1 }}>
                        <Text>

                        </Text>
                    </View>
                    ,
                }}
            />
            <Stack.Screen
                name="find_id"
                component={find_id}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate(LoginHome)}>
                        <Image
                            source={require('../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                아이디 찾기
                            </Text>
                        </View>
                    ,
                    headerRight: () => <View style={{ alignItems: "center", flex:1 }}>
                        <Text>

                        </Text>
                    </View>
                    ,
                }}
            />
            <Stack.Screen
                name="find_id_final"
                component={find_id_final}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate(find_id)}>
                        <Image
                            source={require('../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                아이디 찾기
                            </Text>
                        </View>
                    ,
                    headerRight: () => <View style={{ alignItems: "center", flex:1 }}>
                        <Text>

                        </Text>
                    </View>
                    ,
                }}
            />
            <Stack.Screen
                name="find_pw"
                component={find_pw}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate(LoginHome)}>
                        <Image
                            source={require('../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                비밀번호 찾기
                            </Text>
                        </View>
                    ,
                    headerRight: () => <View style={{ alignItems: "center", flex:1 }}>
                        <Text>

                        </Text>
                    </View>
                    ,
                }}
            />
            <Stack.Screen
                name="find_pw_new"
                component={find_pw_new}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate(find_pw)}>
                        <Image
                            source={require('../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                비밀번호 찾기
                            </Text>
                        </View>
                    ,
                    headerRight: () => <View style={{ alignItems: "center", flex:1 }}>
                        <Text>

                        </Text>
                    </View>
                    ,
                }}
            />
            <Stack.Screen
                name="find_pw_final"
                component={find_pw_final}
                options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate(find_pw_new)}>
                        <Image
                            source={require('../../image/back.png')} style={{ height: 50, width: 50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>,
                    headerTitle: () =>
                        <View style={{ alignItems: "center", flex:1 }}>
                            <Text>
                                비밀번호 찾기
                            </Text>
                        </View>
                    ,
                    headerRight: () => <View style={{ alignItems: "center", flex:1 }}>
                        <Text>

                        </Text>
                    </View>
                    ,
                }}
            />
        </Stack.Navigator>
    );
}
