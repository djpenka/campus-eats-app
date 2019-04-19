import PropTypes from 'prop-types';
import * as React from 'react';
import { Font } from 'expo';
import { StyleSheet, TouchableOpacity, Image, Text, View, Dimensions } from 'react-native';

// An array of the images
var images = [
  require('../../../assets/img/scott.jpg'),
  require('../../../assets/img/cg.jpg'),
  require('../../../assets/img/curl.jpg'),
  require('../../../assets/img/tbcafe.jpg'),
  require('../../../assets/img/thepad.png'),
];


/**
 * Location Item component to display the nearby dining locations
 */
class LocationItem extends React.Component {
  
    state = {
      // Boolean variable to determine whether the font has loaded successfully
      fontLoaded: false,
    };

    //Define the array of PropTypes(https://www.npmjs.com/package/prop-types)
    static propTypes = {
        // The name of the dining location
        locationName: PropTypes.string.isRequired,
        // The description of the dining locations
        locationDesc: PropTypes.string.isRequired,
        // The distance of the dining location from the user
        locationDistance: PropTypes.string.isRequired,
        // The uri of the dining location's preview image
        imageUri: PropTypes.string.isRequired,
        onPress : PropTypes.func.isRequired
      }

      /*
      * Initialized once the component is mounted (or inserted into React's 'tree' for components)
      * Defined as async so we use promises and thus use the 'await' keyword
      */
      async componentDidMount() {
        // Load the font using Expo's libarary. await ensures the function waits upon completion of the load function before continuing
        await Font.loadAsync({
          'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
        });
        // Since the font has now been loaded, set fontLoaded to true
        this.setState({ fontLoaded: true });
      }

    render() {
        /* Define constant variables for the proptypes
         * The brackets allow us to directly access vraible from the right hand side, this.props.
         * Thus, rather than call this.props.locationName, etc., we can call and assign each variable directly 
         */
        const { locationName, locationDesc, locationDistance, imageUri } = this.props;
        /* React requires a single parent component to be returned for the render() function
         * Whatever you return is how the component will be rendered
         */
        return (
          /*
           * TouchableOpacity is essentially a wrapper for <View/> that allows user touch and shows touch feedback
           * images[parseInt(imageUri)] essentially just calls the index of the image array to decide which image to use (we'll change this, it's just for the prototype)
           * this.state.fontLoaded ? {} : {} is the ternary operator to decide what we do in cases of fontLoaded = true and fontLoaded = false
           * Each element has it's own CSS styling guide, set by applying the style attribute to each component
           * The style attribute can take an array of styles to apply multiple styling classes, as seen in the locationDistance Text component
           * The text for each <Text/> component is wrapped in { } as we are calling JS variables. The { } denotes we're using JS
           * The last view is the border that seperates each Location Item
           */
          <TouchableOpacity style={styles.listItem} onPress={this.props.onPress}>
            <Image source={images[parseInt(imageUri)] } style={[styles.imageContainer, styles.image]} />
          {
            this.state.fontLoaded ? (
              <View style={styles.listTextContainer}>
                <Text style={[styles.listText, styles.locationTitle]}>{locationName}</Text>
                <Text numberOfLines={2} style={[styles.listText, styles.locationDesc]}>{locationDesc}</Text>
                <Text style={[styles.listText, styles.locationDistance]}>{locationDistance}</Text>
            </View>
            ) : null
          }
            <View style={styles.bottomBorder}/>
          </TouchableOpacity>
    );
  }
}

//Styling guide
const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width,
    height: 150
  },
  listTextContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '33%',
    marginRight: 16
  },
  listText: {
    textAlign: 'left',
    color: '#ff3235',
    fontFamily: 'Montserrat',
    lineHeight: 18
  },
  locationTitle: {
    fontSize: 18,
    color: '#000000',
    paddingBottom: 8
  },
  locationDesc: {
    fontSize: 14,
    color: '#333333',
    paddingBottom: 8
  },
  locationDistance: {
    fontSize: 14,
    color: '#888888'
  },
  image : {
    position: 'absolute',
    height : 105,
    width : 105,
    borderRadius: 53,
  },
  imageContainer : {
    marginTop: 25,
    marginLeft : 16,
  },
  bottomBorder : {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginLeft: 16,
    marginRight: 16,
  }
});

export default LocationItem;