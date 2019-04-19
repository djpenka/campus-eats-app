import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Text, View, TouchableOpacity, StyleSheet } from 'react-native'

var screenWidth = Dimensions.get('window').width;

class GoalTracker extends React.Component {

    
static propTypes = {
  calsGoal: PropTypes.number.isRequired,
  consumedCals: PropTypes.number.isRequired,
}

  render() {
    const {calsGoal, consumedCals} = this.props;
    let calsToGo = calsGoal - consumedCals;
    return(
        <View style={style.main}>
          <View style={style.goalsContainer}>
            <View style={style.textContainer}><View style={style.rowContainer}><Text style={style.rowCalInfo} numberOfLines={1}>{calsGoal} cal</Text><Text style={style.rowText}>Goal</Text></View></View>
            <View style={style.textContainer}><View style={style.rowContainer}><Text style={style.rowCalInfo}>{consumedCals} cal</Text><Text style={style.rowText}>Food</Text></View></View>
            <View style={style.textContainer}><View style={style.rowContainer}><Text style={style.rowCalInfo}>{calsToGo} cals</Text><Text style={style.rowText}>Remaining</Text></View></View>
          </View>
          <View style={style.bottomBorder}/>
        </View>
    )
  }
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  goalsContainer: {
    flex: 1,
    flexDirection: 'row',
    color: '#ffffff',
    height: 100,
    justifyContent:'center',
    width: screenWidth,
  },
  textContainer : {
    marginTop: 30,
    flex: 0.33,
    alignItems: "center"
  },
  rowContainer: {
      flexDirection: 'column',
  },
  rowText: {
      textAlign: 'center',
      fontFamily: 'Montserrat',
      marginTop: 2,
      color: '#969494',
  },
  rowCalInfo: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  bottomBorder : {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 2,
  }
})

export default GoalTracker;