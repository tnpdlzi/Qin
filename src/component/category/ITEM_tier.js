import React, {Component} from 'react';

import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';

export class ITEM_tier extends Component {
  render() {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={{
            paddingStart: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
          onPress={this.props.link}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text style={{paddingEnd: 20, fontSize: 40, fontWeight: 'bold'}}>
              ·
            </Text>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>
              {this.props.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <Image
              style={{height: 80, width: 80, resizeMode: 'cover'}}
              source={require('../image/img_go.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 80,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
});

export default ITEM_tier;
