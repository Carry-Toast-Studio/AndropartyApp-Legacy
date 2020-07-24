import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';


// Register app view
export const RowItem = ({item, index, drag, isActive}) => {
  return(
    <View
      style={{
        ...style=styles.rowContainer,
        //backgroundColor: isActive ? "blue" : item.backgroundColor,
        opacity: isActive ? 0.8 : 1.0,
        borderTopLeftRadius: (index == 0) ? 40 : 0, //Rounded corners for the first item
        borderTopRightRadius: (index == 0) ? 40 : 0 //Rounded corners for the first item
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
          <Text style={{color: 'white'}}>Drag me!</Text>
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
});
