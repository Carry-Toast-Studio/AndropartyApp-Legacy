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
  PlatformColor,
  TouchableOpacity,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DraggableFlatList from "react-native-draggable-flatlist";
import {RowItem} from '../../components/FlatListComponents/RowItem';

// This function is called whenever you tap the floating action button
const TappedFAB = () => (
  alert('Not yet implemented!')
);

// Data for DraggableFlatList

const exampleData = [...Array(200)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));


// First view controlled by the tab bar / segmented control
function FirstTab(){

  const [listData, setListData] = useState(exampleData);

  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <RowItem
        item={item}
        index={index}
        drag={drag}
        isActive={isActive}
      />
    );
  };

  return(
    <React.Fragment>

      <DraggableFlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        onDragEnd={({ data }) => setListData(data)}
        activationDistance={20} // To be able to switch tabs without gesture recognizer interfering
        style={{
          paddingTop: 20,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 10,  
        }}
      />

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
}

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      ios: {
        color: PlatformColor('label')
      },
      android: {
        color: 'black',
      },
      default: {
        color: 'black',
      }
    })
  },
  FloatingButtonStyle: { 
    width: 50,
    height: 50,
    bottom: 25,                                                    
    right: 10, 
    position: 'absolute',
  }

});


export default FirstTab;
