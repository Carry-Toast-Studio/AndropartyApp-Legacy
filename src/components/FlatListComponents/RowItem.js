import 'react-native-gesture-handler';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';



// Register app view
export const RowItem = ({item, index, drag, isActive, data}) => {

  return(
    <View
      style={{
        ...styles.rowContainer,
        backgroundColor: item.header ? "blue" : "red",
        opacity: isActive ? 0.8 : 1.0,
        // marginBottom: (index === data.length - 1 && !active) ? 100 : 0,
        borderTopLeftRadius: (index === 0) ? 40 : 0, //Rounded corners for the first item
        borderTopRightRadius: (index === 0) ? 40 : 0,
        borderBottomLeftRadius: (index === data.length - 1) ? 40 : 0, //Rounded corners for the last item
        borderBottomRightRadius: (index === data.length - 1) ? 40 : 0,
      }}
    >

      <Text
        style={{
          fontWeight: "bold",
          color: "white",
          fontSize: 32
        }}
      >
        {item.label}
      </Text>


      {/* Display drag button only if the rowItem is NOT a header */}
      {!item.header ?
        <TouchableOpacity
          onPressIn={drag}
        >
          <View style={styles.handlerContainer}>
            <MaterialIcon name="drag-handle" size={25} color="white" />
          </View>
        </TouchableOpacity>
        :null
      }
    </View>

  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#fb2b2c',
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingRight: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  handlerContainer: {
    backgroundColor: 'blue',
    padding: 15
  }
});
