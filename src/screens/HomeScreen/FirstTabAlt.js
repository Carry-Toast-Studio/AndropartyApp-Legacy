import 'react-native-gesture-handler';
import React, {createRef} from 'react';
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
  Animated,
  Dimensions,
  Button
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

function reorderArray(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

const colorMap = {}


// First view controlled by the tab bar / segmented control
export default class FirstTab extends React.Component {

  state={
    dragging: false,
    draggingIndex: -1,
    data: Array.from(Array(50), (_, index) => {
      colorMap[index] = getRandomColor()
      return index;
    })
  }

  flatList = createRef() // Ref to the flatlist component
  point = new Animated.ValueXY() // Current finger position
  currentY = 0 // Y coordinate of cursor movement
  flatListOffset = 0 // Vertical offset of the flatlist (list top coordinate, updated on component render)
  scrollOffset = 0 // Scroll offset updated as scroll happens
  rowHeight = 0
  currentIndex = -1 // Index of the currently dragged item
  active = false
  flatListHeight = 0
  autoScrollThreshold = 40 // Units away from the top/bottom edge that allow auto-scrolling while dragging an item
  autoScrollSpeed = 25 // Units to scroll each frame the auto scroll is enabled

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
        // The gesture has started, compute select item index
        this.currentIndex = this.getIndexFromY(gestureState.y0)
        // Update y position of the move
        this.currentY = gestureState.y0
        // Send first event
        Animated.event(
          [{y: this.point.y}],
          {useNativeDriver: false}
        )({y: gestureState.y0 - this.rowHeight / 2})
        // Update state and start to animate the list
        this.active = true
        this.setState({
          dragging: true,
          draggingIndex: this.currentIndex
        }, () => this.animateList())
      },
      onPanResponderMove: (evt, gestureState) => {
        // Update y position of the move
        this.currentY = gestureState.moveY
        // Send move event
        Animated.event(
          [{y: this.point.y}],
          {useNativeDriver: false}
        )({y: gestureState.moveY})
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.reset()
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this.reset()
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true
      }
    });
  }

  animateList = () => {
    // Check if we are near the bottom or top of the list
    if (this.currentY + this.autoScrollThreshold > this.flatListHeight){
      const diff = this.currentY + this.autoScrollThreshold - this.flatListHeight
      this.flatList.current.scrollToOffset({
        offset: this.scrollOffset + Math.min(this.autoScrollSpeed, diff),
        animated: false
      })
    }
    else if (this.currentY < this.autoScrollThreshold){
      const diff = this.currentY < this.autoScrollThreshold
      this.flatList.current.scrollToOffset({
        offset: this.scrollOffset - Math.min(this.autoScrollSpeed, diff),
        animated: false
      })
    }


    if (!this.active) return

    // Recursively animate list each frame
    requestAnimationFrame( () => {
      // Check Y value to see  if we need to reorder the list
      const newIndex = this.getIndexFromY(this.currentY)
      if (this.currentIndex !== newIndex) {
        this.setState({
          // Reorder the list
          data: reorderArray(this.state.data, this.currentIndex, newIndex),
          draggingIndex: newIndex
        })

        this.currentIndex = newIndex
      }

      this.animateList()
    })
  }

  getIndexFromY = (y) => {
    const value = Math.floor((this.scrollOffset + y - this.flatListOffset) / this.rowHeight)

    if (value < 0) return 0
    if (value >= this.state.data.length) return this.state.data.length - 1

    return value
  }

  reset = () => {
    this.active = false

    this.setState({
      dragging: false,
      draggingIndex: -1
    })
  }

  render() {
    const {data, dragging, draggingIndex} = this.state

    const renderItem = ({ item, index }, noPanResponder) => (
        <SafeAreaView
          onLayout={ e => {
            this.rowHeight = e.nativeEvent.layout.height
          }}
          style={{
          ...styles.listRow,
          borderTopLeftRadius: index === 0 ? 40 : 0,
          borderTopRightRadius: index === 0 ? 40 : 0,
          opacity: draggingIndex === index ? 0 : 1, // hide selected item ehile dragging
          backgroundColor: colorMap[item]
        }}>
          <Text style={styles.rowText}>{item}</Text>

          { // Simulate headers
            index % 10 !== 0 &&
            <View
            style={styles.rowHandler}
            {...(noPanResponder ? {} : this.panResponder.panHandlers)}
            >
              <MaterialIcon name="drag-handle" size={35} color="white"/>
            </View>
          }
        </SafeAreaView>
    )


    return(
      <React.Fragment>
        <View style={styles.container}>
          {/*Floating Item being dragged*/}
          { dragging &&
            <Animated.View
            style={{
              position: 'absolute',
              zIndex: 2,
              width: '100%', height: this.rowHeight,
              marginLeft: 20,
              marginRight: 20,
              top: this.point.getLayout().top,
            }}
          >
            {renderItem({item: data[draggingIndex], index: -1}, true)}
          </Animated.View>}

          {/*Flatlist with all items*/}
          <FlatList
            ref={this.flatList}
            style={styles.flatList}
            data={data}
            scrollEnabled={!dragging}
            renderItem={renderItem}
            keyExtractor={ item => item.toString() }
            onScroll={ e => {
              this.scrollOffset = e.nativeEvent.contentOffset.y
            }}
            onLayout={ e => {
              this.flatListOffset = e.nativeEvent.layout.y
              this.flatListHeight = e.nativeEvent.layout.height
            }}
            scrollEventThrottle={16}
          />
        </View>


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
    width: '100%',
  },
  listRow: {
    paddingLeft: 40,
    paddingRight: 40,
    marginLeft: 20,
    marginRight: 20,
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
