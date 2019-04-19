import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Text, View, TouchableOpacity, StyleSheet } from 'react-native'

class Item extends React.Component {

  render() {
    const {stringItem} = this.props;
    return(
        <TouchableOpacity
          style={style.itemContainer}
          onPress={() => this.props.navCallback(stringItem)}
        >
        <View style={style.listTextContainer}>
          <Text style={style.itemNameText}>{this.props.name}</Text>
          <Text style={style.itemServingText}>Serving Size: 1 serving</Text>
        </View>
        <Text style={style.itemCaloriesText}>{this.props.cals} cal</Text>
        <View style={style.bottomBorder}/>
        </TouchableOpacity>
    )
  }
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  cals: PropTypes.string.isRequired,
  stringItem: PropTypes.string.isRequired,
  navCallback: PropTypes.func.isRequired
}

const style = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width,
    height: 75
  },
  listTextContainer: {
    flex: 1,
    marginLeft: 16,
    marginTop: 16,
  },
  itemNameText: {
    fontSize: 17,
    fontFamily: 'Montserrat',
  },
  itemServingText: {
    fontSize: 13,
    fontFamily: 'Montserrat',
    marginTop: 2,
    color: '#969494',
  },
  itemCaloriesText : {
    textAlign: 'right',
    fontFamily: 'Montserrat',
    fontSize: 13,
    marginRight: 16,
    marginBottom: 4,
    color: '#f4511e'
  },
  itemCaloriesContainer : {
    marginTop: 25,
    marginLeft : 16,
  },
  bottomBorder : {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginRight: 16,
  }
})

export default Item;