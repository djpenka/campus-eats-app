import React from 'react';
import { Image, Button, Text, View, TouchableHighlight } from 'react-native';
import containerStyle from '../Styles/containerStyle';

export default class EditPlateScreen extends React.Component {

  static navigationOptions = {
    title: 'Edit Plate'
  }

  state = {
    imageLoaded : false,
    imageUri : ''
  }

  onImageLoaded(imageUri) {
    this.setState ({
      imageLoaded : true,
      imageUri, imageUri
    })
  }

  render() {
    return (
    <View style={containerStyle.container}>
      <View style={containerStyle.button}>
        <TouchableHighlight  onPress={() => this.props.navigation.navigate('TakePhotoNav', {callback: this.onImageLoaded.bind(this)})}>
        <Text style={containerStyle.buttonText}>Take Picture</Text>
        </TouchableHighlight>
      </View>
      
      
      
      
       {
         this.state.imageLoaded && <Image
         style={{width: 100, height: 100}}
         source={{uri: this.state.imageUri
       }}/>
       }
      <View style={containerStyle.button}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('AddItemNav')}>
          <Text style={containerStyle.buttonText}>Add Item</Text>
        </TouchableHighlight>
      </View>
       
      </View>);
  }
}
