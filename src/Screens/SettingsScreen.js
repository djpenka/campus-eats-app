import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import containerStyle from '../Styles/containerStyle';

export default class SettingsScreen extends React.Component {

  static navigationOptions = {
    title: 'Settings'
  }

  render() {
    return (
      <View style={containerStyle.center}>
        <Text>The Settings Screen</Text>
      </View>
    )
  }
}