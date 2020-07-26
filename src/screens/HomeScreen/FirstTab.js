import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  PlatformColor,
  TouchableOpacity,
} from 'react-native';
import DraggableFlatList from '../../components/DraggableList/index';
import {RowItem} from '../../components/FlatListComponents/RowItem';

// This function is called whenever you tap the floating action button
const TappedFAB = () => (
  alert('Not yet implemented!')
);

// Data for DraggableFlatList

const exampleData = [...Array(10)].map((d, index, arr) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  header: (index % 10 === 0),
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));


// First view controlled by the tab bar / segmented control
function FirstTab(){

  const [listData, setListData] = useState(exampleData);

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <RowItem
        item={item}
        index={index}
        drag={drag}
        isActive={isActive}
        data={listData}
      />
    );
  };

  return(
    <React.Fragment>

      {
        listData && listData.length >= 1 &&
        <SafeAreaView style={{flex: 1, flexGrow: 1, backgroundColor: 'yellow'}}>
          <DraggableFlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            onDragEnd={({ data }) => setListData(data)}
            activationDistance={5} // To be able to switch tabs without gesture recognizer interfering
            style={{
              // paddingVertical: 20,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.25,
              shadowRadius: 10,
            }}
          />
        </SafeAreaView>
      }

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
