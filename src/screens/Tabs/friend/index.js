import React from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MemoryHome from './home'
import Styles from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function MemoryScreen({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={MemoryHome}
                options={{
                    title: 'Home', headerLeft: () => (
                        <TouchableOpacity
                            style={Styles.headerButton}
                            onPress={() => navigation.openDrawer()}
                        >
                            <Text>Menu</Text>
                        </TouchableOpacity>
                    ),
                }}
            />

        </Stack.Navigator>
    );
}