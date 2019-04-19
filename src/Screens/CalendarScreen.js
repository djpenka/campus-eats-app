import React from 'react';
import { View, Text } from 'react-native';
import containerStyle from '../Styles/containerStyle';

export default class CalendarScreen extends React.Component {

  static navigationOptions = {
    title: 'Calendar'
  }

  render() {
    return (
      <View style={containerStyle.center}>
        <Text>The Calendar Screen</Text>
      </View>
    )
  }
}