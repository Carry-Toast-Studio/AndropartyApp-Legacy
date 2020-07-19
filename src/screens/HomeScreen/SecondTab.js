import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {translate, setI18nConfig} from '../../translations/i18-helper';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Second view controlled by the tab bar / segmented control

const SecondTab = () => (
  <React.Fragment>
    <Text>This is tab 2</Text>
  </React.Fragment>
);

const styles = StyleSheet.create({


});


export default SecondTab;
