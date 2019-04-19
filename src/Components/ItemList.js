import React from 'react'
import {Text, ScrollView, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'
import scottFoodList from '../../assets/scott.json'
import Item from './Item.js';
import FOOD_DATA from '../../data/FoodData.js'

let items = []

class ItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {search: "", itemSet: "", isMenuLoaded : false}
  }

  loadItems = async (navCallback) => {
    scottFoodList.map((item, i) => 
    items.push(
    <Item
    key={item[FOOD_DATA.NAME]}
    name={item[FOOD_DATA.NAME]}
    cals={item[FOOD_DATA.CALS]}
    stringItem={JSON.stringify(item)}
    navCallback = {navCallback}
    />))    
  }

  async componentDidMount() {
    console.log(items.length)
    if(items.length == 0) {
      await this.loadItems(this.props.navCallback, this.onItemsLoaded.bind(this)).then(() => {this.onItemsLoaded()})
    } else {
      this.onItemsLoaded()
    }
  }

  onItemsLoaded() {
    this.setState({isMenuLoaded : true})
  }

  updateSearch = search => {
    this.setState({ search });
  };


  renderList() {
    const {isMenuLoaded} = this.state
    let content = ''
    if (isMenuLoaded) {
      content = items
    } else {
      content = <Text>Loading Items...</Text>
    }
    return content
  }

  render() {
    const search = this.state.search;

    
    return(
      <ScrollView style={style.scrollView}>
        <SearchBar
          placeholder="Type here..."
          onChangeText={this.updateSearch}
          value={search}
          platform={"default"}
          lightTheme={true}
        />
        {this.renderList()}
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  scrollView: {
    alignSelf: "stretch"
  }
})

export default ItemList;