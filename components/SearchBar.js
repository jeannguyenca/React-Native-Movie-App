import React from 'react';
import { Item, Input } from 'native-base';
import { StyleSheet } from 'react-native';

const SearchBar = (props) => {
  return (
    <Item>
      <Input 
      style={styles.input} 
      placeholder="Type your search query here" 
      onChangeText={(text) => props.handleInput(text)}
      />
    </Item>
  )
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center'
  }
});


export default SearchBar