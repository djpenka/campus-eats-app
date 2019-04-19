import PropTypes from 'prop-types';
import * as React from 'react';
import { Font } from 'expo';
import { StyleSheet, TouchableOpacity, Image, Text, View, Dimensions } from 'react-native';
import FoodItem from '../Item.js'
import PlateDB from '../../../data/PlateDB.js'
import FOOD_DATA from '../../../data/FoodData.js'

/**
 * Plate Item component to display the plates
 */

class PlateItem extends React.Component {

  items = []
  calories = 0

  constructor(props) {
    super(props)
    this.loadPlateData()
  }
  
    state = {
      // Boolean variable to determine whether the font has loaded successfully
      showItems: false,
    };

    //Define the array of PropTypes(https://www.npmjs.com/package/prop-types)
    static propTypes = {
        // The name of the dining location
        plateName: PropTypes.string.isRequired,
        plateId : PropTypes.string.isRequired,
        plateItems : PropTypes.string.isRequired,
        timeStamp: PropTypes.string.isRequired,
        // The description of the dining location
        imageUri: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
      }

      loadPlateData() {
        const {plateItems, onPress} = this.props;
        console.log(this.props.onPress)
        let fixedJSON = JSON.parse(plateItems)
        let array = JSON.parse(fixedJSON)

        array.map((plateItem, i) => {
          let cals = plateItem[FOOD_DATA.CALS]
          this.calories += parseInt(cals, 10)
          this.items.push(
            <FoodItem
              name={plateItem[FOOD_DATA.NAME]}
              cals={cals}
              stringItem={JSON.stringify(plateItem)}
              navCallback = {onPress}
              />)
        })
      }

    renderFoodItems() {
      let content = <View style={{flex : 1}}>{this.items}</View>
      if (!this.state.showItems) {
        content = <View/>
      }

      return content
    }

    onPlatePressed() {
      this.setState({showItems : !this.state.showItems})
    }

    render() {
        /* Define constant variables for the proptypes
         * The brackets allow us to directly access vraible from the right hand side, this.props.
         * Thus, rather than call this.props.locationName, etc., we can call and assign each variable directly 
         */
        const { plateName, imageUri, timeStamp } = this.props;
        dateTime = Date.parse(timeStamp.replace(' ', 'T') + 'Z')
        let imageSrc = ""
        if(imageUri == "") {
          imageSrc = require('../../../assets/img/plate.png')
        } else {
          imageSrc = {uri: imageUri}
        }

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

<View style={{flex: 1}}>
          <TouchableOpacity style={styles.listItem} onPress={() => this.onPlatePressed()}>
            <Image source={imageSrc} style={[styles.imageContainer, styles.image]} />
              <View style={styles.listTextContainer}>
                <Text style={[styles.listText, styles.plateTitle]}>{plateName}</Text>
                <Text style={styles.timeStampText}>{timeStamp}</Text>
                <Text style={styles.caloriesText}>{this.calories} calories</Text>
            </View>
            <View style={styles.bottomBorder}/>

          </TouchableOpacity>
          {this.renderFoodItems()}

          </View>
    );
  }
}

//Styling guide
const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width,
    height: 100
  },
  listTextContainer: {
    flex: 1,
    marginLeft: 108,
    marginTop: 16,
    marginRight: 16
  },
  listText: {
    textAlign: 'left',
    color: '#ff3235',
    fontFamily: 'Montserrat',
    lineHeight: 18
  },
  plateTitle: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: '#000000',
    paddingBottom: 8
  },
  timeStampText: {
    fontFamily: 'Montserrat',
    paddingBottom: 8
  },
  caloriesText: {
    textAlign: 'right',
    color: "#f4511e"
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
    height : 100,
    width : 100,
  },
  imageContainer : {
  },
  bottomBorder : {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginLeft: 100,
  }
});

export default PlateItem;