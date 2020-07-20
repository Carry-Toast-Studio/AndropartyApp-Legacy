import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {translate, setI18nConfig} from '../../translations/i18-helper';
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// This function is called whenever you tap the floating action button
const TappedFAB = () => (
  alert('Not yet implemented!')
);

// First view controlled by the tab bar / segmented control
const FirstTab = () => (

  <React.Fragment>

    <Text>This is tab A</Text>

    {
      // Enable floating android button only on Android
      Platform.OS === 'android' ?
        <View style={styles.FloatingButtonStyle}>
          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={TappedFAB} 
            style={styles.TouchableOpacityStyle} >
              <Image 
                source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
                style={styles.FloatingButtonStyle} />
          </TouchableOpacity>
        </View> :
        null
    }

  </React.Fragment>
);

const styles = StyleSheet.create({

  FloatingButtonStyle: { 
    width: 50,
    height: 50,
    bottom: 25,                                                    
    right: 10, 
    position: 'absolute',
  }

});


export default FirstTab;
