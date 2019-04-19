import React from 'react';
import { Button, View } from 'react-native';
import containerStyle from '../Styles/containerStyle';
import ItemList from '../Components/ItemList';

/*
This screen should no longer be used, all activity should be handled by SearchItemScreen
*/

class AddItemScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {itemSet: "["}
  }

  static navigationOptions = {
    title: 'Add Item'
  }

  addItem(stringItem) {
    console.log("adding")
    if (this.state.itemSet != '[') {
      this.state.itemSet = this.state.itemSet.slice(0, -1)
      this.state.itemSet += ","
    }
    this.state.itemSet += (stringItem + "]");
    this.props.navigation.navigate("AddItemNav")
  }

  goToItemDetailScreen(stringItem) {
    this.props.navigation.navigate("ItemDetailNav", {stringItem: stringItem, addItem: this.addItem.bind(this)})
  }

  onAddPressed() {
    itemListCallback = this.props.navigation.getParam('itemListCallback')
    itemListCallback(this.state.itemSet)
  }

  render() {
    return (
      <View style={containerStyle.center}>
      <Button
        title="done" onPress={() => this.onAddPressed()}/>
        <ItemList
        navCallback = {this.goToItemDetailScreen.bind(this)}
        />
      </View>
    )
  }
}

export default AddItemScreen;