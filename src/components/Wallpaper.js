import React, {Component} from 'react';
import {StyleSheet, Image, Dimensions, Text} from 'react-native';

import bgImage from '../assets/images/wallpaper.png';

const Wallpaper = (props) => {
    return (
      <Image style={styles.picture} source={props.image || bgImage}>
      </Image>
    );
}

const styles = StyleSheet.create({
  picture: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    position: 'absolute'
  },
});

export default Wallpaper;
