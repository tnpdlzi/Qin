import React from 'react';
import { Text, KeyboardAvoidingView } from 'react-native'
import { TouchableOpacity, View, Image, TextInput, StyleSheet } from 'react-native';

function chatRoom({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.chatMessage}>
                <Text>chatRoom</Text>
            </View>
            <View style={styles.inputText}>
                <TextInput
                    style={{ height: 50, width: '80%', fontSize: 20 }}
                />
                <TouchableOpacity>
                    <Image
                        source={require('../../../image/chat_send.png')} style={{ height: 80, width: 80, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    inputText: {
        height: 55,
        width: '90%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 30,
        borderRadius: 20,
        elevation: 5,
    },
    chatMessage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "85%",
        width: "100%",
    },
});

export default chatRoom;