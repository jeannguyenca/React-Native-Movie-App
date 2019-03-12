import React from 'react';

import { Button, Segment, Text } from 'native-base';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

const win = Dimensions.get('window')


const SearchSingleElement = (props) => {
  const { img, name, overview } = props
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: img }}
        style={styles.image}
      />
      <View style={styles.text}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.para}>{overview}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    width: win - 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  }, 
  text: {
    flex: 1,
    maxWidth: win - 210,
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',

  },
  para: {
    fontSize: 14,
    marginTop: 10
  }
});

export default SearchSingleElement