import React, {Component} from 'react';
import {ITEM_user} from './category/ITEM_user';
import {ITEM_tier} from './category/ITEM_tier';
import {ScrollView, View, StyleSheet, Image} from 'react-native';

const datas = [
  {id: 'iron'},
  {id: 'bronze'},
  {id: 'silver'},
  {id: 'gold'},
  {id: 'platinum'},
  {id: 'diamond'},
  {id: 'master'},
];
class CMP_tier extends Component {
  constructor(props) {
    super(props);
    this.state = {datas: datas};
  }

  link(idx) {
    const newDatas = [...this.state.datas];

    this.setState({datas: newDatas});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.gameImage}>
          <ITEM_user />
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 200,
              width: '100%',
              resizeMode: 'cover',
            }}
            source={require('./image/img_lol_bg.png')}
          />
        </View>
        <ScrollView style={styles.sView}>
          {this.state.datas.map((data, index) => {
            return (
              <View>
                <ITEM_tier
                  key={data.id}
                  title={data.id}
                  link={this.link.bind(this, index)}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  gameImage: {
    height: 270,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 140,
  },
  sView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 0,
    elevation: 0,
    paddingHorizontal: 30,
  },
});
export default CMP_tier;
