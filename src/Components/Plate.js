import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MacroPieChart from './MacroPieChart';
import containerStyle from '../Styles/containerStyle'
import { StyleSheet } from 'react-native';

class Plate extends React.PureComponent {


  render() {
    return (
      <View style={containerStyle.center}>
        <MacroPieChart style={{height: 100, width: 100}} protein={20} fat={20} carbs={20}/>
        <Text>This is a plate example</Text>
      </View>
    )
  }

  
}

const plateStyle = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    }
});

export default Plate;
