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
  FlatList,
  Text,
  PanResponder,
  Animated, Dimensions,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// This function is called whenever you tap the floating action button
const TappedFAB = () => (
  alert('Not yet implemented!')
);

// Aux
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const colorMap = {}


// First view controlled by the tab bar / segmented control
export default class FirstTab extends React.Component {

  state={
    dragging: false,
    data: Array.from(Array(20), (_, index) => {
      colorMap[index] = getRandomColor()
      return index;
    })
  }

  point = new Animated.ValueXY() // Current finger position

  constructor(props) {
    super(props);

    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started.
        this.setState({dragging: true})
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        Animated.event([{y: this.point.y}], {useNativeDriver: false})({y: gestureState.moveY})
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.setState({dragging: false})
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this.setState({dragging: false})
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
  }

  render() {
    const {data, dragging} = this.state

    const renderItem = ({ item }) => (
        <View style={{
          ...styles.listRow,
          borderTopLeftRadius: item === 0 ? 40 : 0,
          borderTopRightRadius: item === 0 ? 40 : 0,
          backgroundColor: colorMap[item]
        }}>
          <Text style={styles.rowText}>{item}</Text>

          <View
            style={styles.rowHandler}
            {...this.panResponder.panHandlers}
          >
            <MaterialIcon name="drag-handle" size={35} color="white"/>
          </View>
        </View>
    )


    return(
      <React.Fragment>
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={{
              position: 'absolute',
              backgroundColor: 'black', zIndex: 2,
              width: rowWidth, height: rowHeight,
              borderStyle: 'solid',
              borderWidth: 5,
              borderColor: 'blue',
              top: this.point.getLayout().top
            }}
          >
            {renderItem( {item: 3} )}
          </Animated.View>
          <FlatList
            style={styles.flatList}
            data={data}
            scrollEnabled={!dragging}
            renderItem={renderItem}
            keyExtractor={ item => item.toString() }
          />
        </SafeAreaView>


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

}

const rowHeight = Dimensions.get("window").height / 10
const rowWidth = Dimensions.get("window").width * 0.9

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fe930155'

  },
  flatList: {
    paddingVertical: 20,
    width: rowWidth,
  },
  listRow: {
    padding: 18,
    height: rowHeight,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
  },
  rowHandler: {
    padding: 10
  },
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
