import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

type props = {};
export class ITEM_LOL extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.gamecard} onPress={() => navigation.navigate('Detail')}>
        <View style={styles.triangleCorner} />
        <View style={styles.triangleCorner1} />
        <Text style={styles.title}>LEAGUE OF</Text>
        <Text style={styles.title1}>LEGENDS</Text>
        <View style={styles.gameImage}>
          <Image
            style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            source={require('../../../image/img_LOL.png')}
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
    backgroundColor: 'green',
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
    borderTopColor: 'green',
  },
  gameImage: {
    width: 300,
    justifyContent: 'center',
    paddingBottom: 126,
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
