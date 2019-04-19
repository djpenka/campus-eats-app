import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import containerStyle from '../Styles/containerStyle';
import MacroPieChart from '../Components/MacroPieChart';

export default class ItemDetailScreen extends React.Component {
   
  getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
 }
 
 static navigationOptions = {
    title: 'Add Item'
  }

  stringItem = this.props.navigation.getParam("stringItem")

  render() {
    console.log(this.props)
    
    const pro = this.stringItem.substring(this.getPosition(this.stringItem,":",18) + 2,this.getPosition(this.stringItem,",",18)-1);
    const carb = this.stringItem.substring(this.getPosition(this.stringItem,":",13) + 2,this.getPosition(this.stringItem,",",13)-1);
    const cal = this.stringItem.substring(this.getPosition(this.stringItem,":",2) + 2,this.getPosition(this.stringItem,",",2)-1);
    const fat = this.stringItem.substring(this.getPosition(this.stringItem,":",4) + 2,this.getPosition(this.stringItem,",",4)-1);
    return (
      <View style={containerStyle.columns}>
        
        <Text style={style.bold}>{this.stringItem.substring(this.stringItem.indexOf(":") + 2,this.stringItem.indexOf(",") - 1)}</Text>
        <Text style={style.pad}>Calories : {cal}</Text>
        <MacroPieChart style={{height: 150, width: 150}} protein={parseInt(pro)} fat={parseInt(fat)} carbs={parseInt(carb)} />
        <View style={containerStyle.columns}>
          
          <Text style={style.blue}>Carbs (g) : {carb}</Text>
          <Text style={style.red}>Fat (g) : {fat}</Text>
          <Text style={style.green}>Protein (g) : {pro}</Text>
        </View>
        <Button
          title="Confirm Addition"
          onPress={() => this.props.navigation.getParam("addItem")(this.stringItem)}
        />
    </View>
    )
  }
}

const style = StyleSheet.create({
    blue:{
      color:'blue'
    },
    red:{
      color:'red'
    },
    green:{
      color:'green'
    },
    bold:{
      fontWeight: 'bold',
      fontSize: 20,
      padding: 15
    },
    pad:{
      padding:15
    }
});

