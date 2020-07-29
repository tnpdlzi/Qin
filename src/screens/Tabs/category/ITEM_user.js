import React, {Component} from 'react';

import {View, StyleSheet, Image, Text} from 'react-native';

export class ITEM_user extends Component {
  render() {
    return (
      <View style={styles.item}>
        <Image
          style={{height: 50, width: 50, resizeMode: 'contain'}}
          source={require('../../../image/img_user.png')}
        />
        <Text style={{padding: 20}}>등록이 필요합니다.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default ITEM_user;
