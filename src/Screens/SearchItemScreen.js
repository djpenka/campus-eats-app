import React from 'react';
import { Button, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import containerStyle from '../Styles/containerStyle';
import ItemList from '../Components/ItemList';

let itemSet = '['
class SearchItemScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = ({navigation}) => {

    _onAddPressed = (itemSet) => {
      itemListCallback = navigation.getParam('itemListCallback')
      itemListCallback(itemSet)
    }
  
    return {
      title: 'Add Item',
      headerRight:
      <Button 
        title="Done" 
        color="#fff"
        onPress={() => this._onAddPressed(itemSet)}
      />
    }
  }

  componentDidMount() {
    //reset the itemSet
    itemSet = '['
  }

  addItem(stringItem) {
    console.log("adding")
    if (itemSet != '[') {
      itemSet = itemSet.slice(0, -1)
      itemSet += ","
    }
    itemSet += (stringItem + "]");
    console.log(itemSet)
    this.props.navigation.navigate("SearchItemNav")
  }

  goToItemDetailScreen(stringItem) {
    this.props.navigation.navigate("ItemDetailNav", {stringItem: stringItem, addItem: this.addItem.bind(this)})
  }

    _onAddPressed = (itemSet) => {
    console.log(itemSet)
    itemListCallback = this.props.navigation.getParam('itemListCallback')
    itemListCallback(itemSet)
  }


  render() {
    return (
      <View style={containerStyle.center}>
        <ItemList
        navCallback = {this.goToItemDetailScreen.bind(this)}
        />
      </View>
    )
  }
}

export default SearchItemScreen;