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
  StatusBar
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
    data: Array.from(Array(40), (_, index) => {
      colorMap[index] = getRandomColor()
      return index;
    })
  }

  panResponder;
  flatList = createRef() // Ref to the flatlist component
  point = new Animated.ValueXY() // Current finger position
  currentY = -1 // Y coordinate of cursor movement
  flatListOffset = 0 // Vertical offset of the flatlist (list top coordinate, updated on component render)
  scrollOffset = 0 // Scroll offset updated as scroll happens
  rowHeight = 0
  currentIndex = -1 // Index of the currently dragged item
  active = false
  flatListHeight = -1
  autoScrollThreshold = 45 // Units away from the top/bottom edge that allow auto-scrolling while dragging an item
  autoScrollSpeed = 25 // Units to scroll each frame the auto scroll is enabled
  handlerHeight = 0
  tabBarHeight = 0
  containerHeight = 0

  totalOffset = () => StatusBar.currentHeight + this.tabBarHeight + this.handlerHeight

  constructor(props) {
    super(props);

    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onShouldBlockNativeResponder: (evt, gestureState) => true,


      onPanResponderGrant: (evt, gestureState) => {
        this.active = true
        // Send first event
        Animated.event(
            [{y: this.point.y}],
            {useNativeDriver: false}
        )({y: gestureState.y0 - this.totalOffset() - this.rowHeight / 2})
        // The gesture has started, compute select item index
        this.currentIndex = this.getIndexFromY(gestureState.y0)
        // Update y position of the move
        this.currentY = gestureState.y0
        // Update state and start to animate the list
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
        )({y: gestureState.moveY - this.totalOffset() - this.rowHeight / 2})

      },
      onPanResponderRelease: (evt, gestureState) => this.reset(),
      onPanResponderTerminate: (evt, gestureState) => this.reset(),
    });
  }

  animateList = () => {
    if (!this.active) return

    requestAnimationFrame(() => {
      if (this.currentY !== -1 && this.flatListHeight !== -1) {
        // DOWN
        if (this.currentY + this.autoScrollThreshold > this.flatListHeight) {
          const diff = this.currentY + this.autoScrollThreshold - this.flatListHeight
          this.flatList.current.scrollToOffset({
            offset: this.scrollOffset + Math.min(this.autoScrollSpeed, diff),
            animated: false
          });
        }
        // UP
        else if (this.currentY < this.autoScrollThreshold) {
          const diff = this.autoScrollThreshold - this.currentY
          this.flatList.current.scrollToOffset({
            offset: this.scrollOffset - Math.min(this.autoScrollSpeed, diff),
            animated: false
          });
        }

        const newIndex = this.getIndexFromY(this.currentY);
        if (this.currentIndex !== newIndex) {
          const data = reorderArray(this.state.data, this.currentIndex, newIndex);
          this.setState({
            draggingIndex: newIndex,
            data
          });
          this.currentIndex = newIndex;
        }
      }

      this.animateList();
    });
  }

  getIndexFromY = (y) => {
    const value = Math.floor((this.scrollOffset + y - this.flatListOffset
            - StatusBar.currentHeight // Status bar
            - this.tabBarHeight // TabBar
            - this.handlerHeight // Handler icon
        )
        / this.rowHeight)

    if (value <= 0) return 1 // Can't place items above top element
    if (value >= this.state.data.length) return this.state.data.length - 1

    return value
  }

  reset = () => {
    this.active = false

    this.setState({
      dragging: false,
      draggingIndex: -1
    })

    this.currentY = -1
  }

  render() {
    const {data, dragging, draggingIndex} = this.state

    const renderItem = ({ item, index }, noPanResponder) => (
        <View
            onLayout={ e => {
              this.rowHeight = e.nativeEvent.layout.height
            }}
            style={{
              ...styles.listRow,
              opacity: draggingIndex === index ? 0 : 1, // hide selected item while dragging
              backgroundColor: colorMap[item],
              // First
              borderTopLeftRadius: index === 0 ? 40 : 0,
              borderTopRightRadius: index === 0 ? 40 : 0,
              // Last item
              marginBottom: index === data.length - 1 ? 120 : 0,
              borderBottomLeftRadius: index === data.length - 1 ? 40 : 0,
              borderBottomRightRadius: index === data.length - 1 ? 40 : 0,
            }}>
          <Text style={styles.rowText}>{item}</Text>

          { // Simulate headers
            <View
                style={styles.rowHandler}
                {...(noPanResponder ? {} : this.panResponder.panHandlers)}
                onLayout={ e => this.handlerHeight === 0 && (this.handlerHeight = e.nativeEvent.layout.height)}
            >
              {index % 10 !== 0 && <MaterialIcon name="drag-handle" size={45} color="white"/>}
            </View>
          }
        </View>
    )


    return(
        <React.Fragment>
          <SafeAreaView
              style={styles.container}
              onLayout={ e => {
                this.containerHeight = e.nativeEvent.layout.height;
                this.tabBarHeight = Dimensions.get("window").height - this.containerHeight
              }}
          >
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
                renderItem={ renderItem }
                keyExtractor={ item => item.toString() }
                onScroll={ e => this.scrollOffset = e.nativeEvent.contentOffset.y }
                onLayout={ e => {
                  this.flatListHeight = e.nativeEvent.layout.height
                  this.flatListOffset = e.nativeEvent.layout.y
                }}
                scrollEventThrottle={16}
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
    backgroundColor: '#fe930155',
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
