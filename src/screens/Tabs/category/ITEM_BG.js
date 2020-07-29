import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

type props = {};
export class ITEM_BG extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.gamecard}>
        <View style={styles.triangleCorner} />
        <View style={styles.triangleCorner1} />
        <Text style={styles.title}>BATTLE</Text>
        <Text style={styles.title1}>GROUNDS</Text>
        <View style={styles.gameImage}>
          <Image
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'contain',
              borderBottomRightRadius: 20,
            }}
            source={require('../../../image/img_BG.png')}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  triangleCorner: {
    position: 'absolute',
    width: 300,
    height: 50,
    backgroundColor: 'blue',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  triangleCorner1: {
    position: 'absolute',
    width: 300,
    height: 300,
    top: 50,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 300,
    borderTopWidth: 300,
    borderRightColor: 'white',
    borderTopColor: 'blue',
  },
  gameImage: {
    width: 300,
    justifyContent: 'center',
    paddingBottom: 24,
    borderBottomRightRadius: 20,
  },
  gamecard: {
    width: 300,
    height: 450,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 30,
    flexDirection: 'column',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 20,
    paddingLeft: 25,
  },
  title1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 25,
  },
});
