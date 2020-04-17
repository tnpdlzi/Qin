import React, {Component} from 'react';
import {ITEM_BG} from './category/ITEM_BG';
import {ITEM_OW} from './category/ITEM_OW';
import {ITEM_R6} from './category/ITEM_R6';
import {ITEM_LOL} from './category/ITEM_LOL';

import {ScrollView, View, StyleSheet} from 'react-native';

export class CMP_category extends Component {
  render() {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        onMomentumScrollEnd={() => {
          console.log('Scrolling is End');
        }}>
        <View style={styles.item}>
          <ITEM_LOL />
        </View>
        <View style={styles.item}>
          <ITEM_OW />
        </View>
        <View style={styles.item}>
          <ITEM_BG />
        </View>
        <View style={styles.item}>
          <ITEM_R6 />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
});

export default CMP_category;

// 이동건입니다
// 류대현입니다