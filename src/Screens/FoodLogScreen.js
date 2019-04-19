import React from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import GoalTracker from '../Components/GoalTracker';
import PlateDB from '../../data/PlateDB';
import PlateItem from '../Components/Lists/PlateItem';

var screenHeight = Dimensions.get('window').height;

export default class FoodLogScreen extends React.Component {
  db = new PlateDB()
  itemsList = JSON.stringify({})

  
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Food Log'
  }

  state = {
    listLoaded: false,
  };

  componentDidMount() {
    this.db.getAllPlates(this.onListLoaded.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    reload =  nextProps.navigation.getParam('reload', false)
    if (reload) {
      this.db.getAllPlates(this.onListLoaded.bind(this))
    }
  }

  loadList() {
    this.db.getAllPlates(this.onListLoaded.bind(this))
  }

  onListLoaded(values) {
    console.log(values)
    this.itemsList = JSON.parse(values)
    console.log(this.itemsList)
    this.setState({
      listLoaded : true
    })
  }

  testDatabase() {
    this.db.addPlate("plate " + Math.random() * (1000), "scott", "43e")
    let val = this.db.getAllPlates((value) => {alert(value)})
  }

  goToItemDetailScreen(stringItem) {
    this.props.navigation.navigate("ItemDetailNav", {stringItem: stringItem, addItem: () => {}})
  }

  renderPlatesList() {
    let content = []
    if (this.state.listLoaded) {
      this.itemsList._array.map((plate, i) => {
        let val = JSON.stringify(plate.food_items)
        content.push(
        <PlateItem
               key = {i}
               plateId={plate.id.toString()}
               plateName={plate.name}
               plateItems={val}
               timeStamp={plate.Timestamp}
               imageUri={plate.image_uri}
               onPress={this.goToItemDetailScreen.bind(this)}
           />)
      }
      )
    }
    return content
  }

  deleteAndRefreshPlates() {
    this.db.deleteAllPlates();
    this.db.getAllPlates(this.onListLoaded.bind(this))
  }

  render() {
    
    return (
      <View style={style.container}>
      <ScrollView>
        <View>
          <GoalTracker calsGoal={2600} consumedCals={620}/>
          <View style={style.platesHeaderContainer}>
            <Text style={style.platesHeader}>Today's Plates</Text>
          </View>
          {this.renderPlatesList()}
         </View>
     </ScrollView>
    <Button
      title="Delete Plates"
      borderRadius={0}
      containerViewStyle={{borderRadius:0, backgroundColor: '#f4511e'}}
      buttonStyle={{borderRadius:0, backgroundColor: '#f4511e'}}
      onPress={() => this.deleteAndRefreshPlates()}
    />
    <Button
      title="Add Plate"
      borderRadius={0}
      containerViewStyle={{borderRadius:0, backgroundColor: '#f4511e'}}
      buttonStyle={{borderRadius:0, backgroundColor: '#f4511e'}}
      onPress={() => this.props.navigation.navigate('AddPlateNav')}
    />
    </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
  flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    height: 100
  },
  platesHeaderContainer : {
    alignItems: 'center',
    height: 50,
    backgroundColor: '#ffffff',
  },
  platesHeader: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    marginTop: 8,
    marginLeft: 8,
  },
})

/*
 <Button
        title="Delete Plates"
        onPress={() => this.db.deleteAllPlates()}/>
*/