import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Expo, { Constants, Permissions, Camera, MediaLibrary } from 'expo';
import containerStyle from '../Styles/containerStyle';

export default class TakePhotoScreen extends React.Component {

  state = {
    rollGranted: false,
    cameraGranted: false,
  };

  async componentDidMount() {
    this.getCameraPermissions();
  }

  async getCameraPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ cameraGranted: status === 'granted' });
    this.getCameraRollPermissions();
  }

  async getCameraRollPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.setState({ rollGranted: true });
    } else {
      console.log('The user has not granted us permission.');
      this.setState({ rollGranted: false });
    }
  }

  static navigationOptions = {
    title: 'Take Photo'
  }

  takePictureAndCreateAlbum = async () => {
    const { uri } = await this.camera.takePictureAsync();
    console.log('uri', uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    console.log('asset', asset);
    album = await MediaLibrary.getAlbumAsync('campuseats');
    if(album !== null) {
      MediaLibrary.addAssetsToAlbumAsync(asset, album, true)
    } else {
      MediaLibrary.createAlbumAsync('campuseats', asset)
        .then(() => {
          Alert.alert('Album created!')
        })
        .catch(error => {
          Alert.alert('An Error Occurred!')
        });
    }

    navTo = this.props.navigation.getParam('navTo', 'FoodLogNav')
    this.props.navigation.getParam('callback')(asset.uri)
    this.props.navigation.navigate(navTo)
  };

  render() {
    return (
      <View style={styles.container}>
        <Camera
          type={Camera.Constants.Type.back}
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
        />
        <TouchableOpacity
          onPress={() =>
            this.state.rollGranted && this.state.cameraGranted
              ? this.takePictureAndCreateAlbum()
              : Alert.alert('Permissions not granted')
          }
          style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Snap
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});