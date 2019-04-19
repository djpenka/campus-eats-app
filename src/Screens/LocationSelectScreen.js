import React from 'react';
import { StyleSheet, Text, View, Alert, Button, Dimensions } from 'react-native';
import LocationList from '../Components/Lists/LocationList'


/**
 * Nearby component to display the starting screen of the app
 */
export default class LocationSelectScreen extends React.Component {

    static navigationOptions = {
      title: 'Select Location'
    }

  // Render the SearchBar and the LocationList. That's all this screen contains
  render() {
    return (
    <View style={[styles.scene, { backgroundColor: 'white' }]}>
      <LocationList
        callback={this.props.navigation.getParam('callback')}
      />
    </View>
    );
  }
}

// Styling guide
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: '#F44336'
  },
  scene: {
    flex: 1,
  }
});