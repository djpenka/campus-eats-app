import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import LocationItem from './LocationItem'
import listData from '../../../assets/locationlist'

/**
 * Location List component to display the list of nearby dining locations
 */
class LocationList extends React.Component {

   //Define the array of PropTypes(https://www.npmjs.com/package/prop-types)
   static propTypes = {
     callback : PropTypes.func,
   }

  onLocationPress = (locationName) => {
    this.props.callback(locationName)
  }

    render() {
        /* Define constant variables for the proptypes
         * The brackets allow us to directly access vraible from the right hand side, this.props.
         * Thus, rather than call this.props.locationName, etc., we can call and assign each variable directly 
         */
        //const { locationName, locationDesc, locationDistance, imageUri } = this.props;

        // Define list, which will be an array of LocationItem elements
        list =
            /* listData is loaded from a .json file
             * the map function will essentially loop throughout each direct child of listData
             * Then we just need to set the attribute of LocationItem to the value the corresponding value from the child (location)
             */
            listData.locations.map((location, i) =>
             <LocationItem
               key = {i}
               locationName={location.locationName}
               locationDesc={location.locationDesc}
               locationDistance={location.locationDistance}
               imageUri={location.imageUri}
               onPress={() => this.onLocationPress(location.locationName)}
           />
            )

        // Render the list within a plain View
        return (
          <ScrollView>
           {list}
          </ScrollView>
    );
  }
}

// Styling guide
const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#ff9251',
    width: Dimensions.get('window').width,
    height: 100,
    top: 0,
      left: 0
  },
  listText: {
      color: '#ff3235',
  }
});

export default LocationList;