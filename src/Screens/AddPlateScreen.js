import React from 'react';
import {TouchableOpacity, ScrollView, Text, View, Image, Button, StyleSheet, Dimensions, TextInput } from 'react-native';
import FoodItem from '../Components/Item.js'
import PlateDB from '../../data/PlateDB.js'
import FOOD_DATA from '../../data/FoodData.js'

var screenWidth = Dimensions.get('window').width;

export default class AddPlateScreen extends React.Component {

  itemList = []

  constructor(props) {
    super(props);
    this.db = new PlateDB()
    this.plateItems = JSON.parse("[]")
  }

  state = {
    location : '',
    imageLoaded : false,
    locationSet : false,
    imageUri : '',
    plateName : 'plate1',
    itemsLoaded : false,
    totalCalories: 0,
  }

  componentWillMount() {
    this.loadItemList();
  }

  loadItemList() {
    this.itemList = []
    calories = 0
      this.plateItems.forEach((foodItem, i) => {
        let cals = foodItem[FOOD_DATA.CALS]
        calories += parseInt(cals, 10)
        let stringItem = JSON.stringify(foodItem)
        this.itemList.push(<FoodItem
          name={foodItem[FOOD_DATA.NAME]}
          cals={cals}
          stringItem={stringItem}
          navCallback = {this.onFoodItemPressed.bind(this)}
          />)})
    this.setState({totalCalories: calories})
  }

  onImageLoaded(imageUri) {
    this.setState ({
      imageLoaded : true,
      imageUri: imageUri
    })
  }

  onLocationSet(location) {
    this.props.navigation.navigate('SearchItemNav', {itemListCallback : this.onItemListAdded.bind(this), fromAddPlate : true})
    this.setState ({
      location : location,
      locationSet: true
    })
  }

  onFoodItemPressed(stringItem) {
    this.props.navigation.navigate("ItemDetailNav", {stringItem: stringItem, addItem: () => {}})
  }

  onItemListAdded(itemsList) {
    this.props.navigation.navigate('AddPlateNav')
    plateString = JSON.stringify(this.plateItems).toString()
    plateString = plateString.substring(0, plateString.length - 1)
    if (plateString != "[") {
      plateString += ","
    }
    plateString += itemsList.substring(1)
    this.plateItems = JSON.parse(plateString)
    this.loadItemList();
  }

  static navigationOptions = {
    title: 'Add Plate',
    style: {
      backgroundColor: '#ff2562'
    },
    tabBarVisible:false
  }

  onAddPicturePress = () => {
    this.props.navigation.navigate('TakePhotoNav', {callback: this.onImageLoaded.bind(this), navTo : 'AddPlateNav'})
  }

  onAddItemsPress = () => {
    this.props.navigation.navigate('LocationNav', {callback: this.onLocationSet.bind(this)})
  }

  onSavePlatePress = (foodItems, imageUri) => {
    this.db.addPlate(this.refs.plateName._lastNativeText, foodItems, imageUri)
    this.plateItems = JSON.parse("[]")
    this.props.navigation.navigate('FoodLogNav', {reload : true})
  }

  renderImageView() {
    let content = <View>Error</View>
    if (this.state.imageLoaded) {
      content = 
      <Image
        style={stylesheet.imageView}
        source={{uri: this.state.imageUri}}
      />
    } else {
      content =
      <TouchableOpacity
        onPress={this.onAddPicturePress.bind(this)}>
      <Image
        style={stylesheet.imageView}
        source={require('../../assets/img/plate.png')}
      />
      
      </TouchableOpacity>
    }

    return content
  }

  renderItemsView() {
    let content = <View style={{flex : 1}}>{this.itemList}<Button
    title = "Add Item"
    onPress={this.onAddItemsPress.bind(this)}
  /></View>
   return content
  }

  render() {
    const { plateName, totalCalories, imageUri} = this.state;
    let foodItems = JSON.stringify(this.plateItems)
    return (
      <ScrollView style={stylesheet.body}>
        <View style={[stylesheet.imageViewHolder, stylesheet.bottomShadow]}>
          {this.renderImageView()}
        </View>
        <View style={stylesheet.textAreaContainer} >
      <TextInput
        ref="plateName"
        style={stylesheet.textArea}
        underlineColorAndroid="transparent"
        placeholder="Plate 1"
        placeholderTextColor="grey"
        numberOfLines={10}
        multiline={true}
      />
      </View>
          <View style={[stylesheet.listViewContainer]}>
          <View style={stylesheet.listViewContent}>
      
            <View style={{flexDirection: 'row'}}>
            <Text style={stylesheet.header}>ITEMS</Text>
            <View style={[stylesheet.right]}>
            <Text style={stylesheet.totalCalText}>{totalCalories} cal</Text>
            </View>
            </View>
            {this.renderItemsView()}
          </View>
        </View>

        <Button
         title="Save Plate"
         onPress={() => this.onSavePlatePress(foodItems, imageUri)}
         />
      </ScrollView>
    )
  }
}

const stylesheet = StyleSheet.create({
  body: {
    marginTop: 0
  },
  listViewContainer: {
    height: 'auto',
    flex: 0,
    marginTop: 8,
    width: screenWidth,
    backgroundColor: "#ffffff"
  },
  listViewContent: {
    marginTop:16
  },
  imageViewHolder: {
    width: screenWidth,
    height: screenWidth,
    backgroundColor: '#ffffff'
  },
  imageView: {
    width: screenWidth,
    height: screenWidth,
  },
  header: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    marginLeft: 16
  },
  totalCalText: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: '#f4511e',
    marginRight: 16,
  },
  bottomShadow: {
    shadowRadius: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: -5 },
    elevation: 1
  },
  right : {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    textAreaContainer: {
      backgroundColor: '#ffffff',
      borderColor: '#E0E0E0',
      borderWidth: 2,
      padding: 5
    },
    textArea: {
      height: 45,
      justifyContent: "flex-start"
    }
});