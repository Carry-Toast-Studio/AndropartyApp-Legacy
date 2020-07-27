import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default RowItem = ({parent, style, item, index, draggingIndex, data, noPanResponder, }) => {

  return (
    <View
      style={{...style}}
      onLayout={ e => parent.rowHeight = e.nativeEvent.layout.height }
    >
      {draggingIndex !== index && // Hide text in dragged item
      <Text style={styles.rowText}>
        {item}
      </Text>}

      <View
        style={styles.rowHandler}
        {...(!noPanResponder ? parent.panResponder.panHandlers : {})}
        onLayout={ e => parent.handlerHeight === 0 && (parent.handlerHeight = e.nativeEvent.layout.height)}
      >
        {

          draggingIndex !== index && // Hide icon in dragged item
          index % 10 !== 0 && // Simulate headers
          <MaterialIcon name="drag-handle" size={45} color="white"/>
        }
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  rowText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
  },
  rowHandler: {
    padding: 10
  },
});

