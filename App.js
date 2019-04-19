import React from 'react';
import {Font} from 'expo';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import FoodLogScreen from './src/Screens/FoodLogScreen';
import CalendarScreen from './src/Screens/CalendarScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import EditPlateScreen from './src/Screens/EditPlateScreen';
import SearchItemScreen from './src/Screens/SearchItemScreen';
import AddItemScreen from './src/Screens/AddItemScreen';
import AddPlateScreen from './src/Screens/AddPlateScreen'
import LocationScreen from './src/Screens/LocationSelectScreen'
import TakePhotoScreen from './src/Screens/TakePhotoScreen'
import ItemDetailScreen from './src/Screens/ItemDetailScreen';

export default class App extends React.Component {

  async componentDidMount() {
    await Font.loadAsync({
      'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    });
    // other stuff
  }

  render() {
    return <AppContainer />;
  }
}


// Stack Navigators, form [ScreenName] - 'Screen' + 'Nav'
const FoodLogStack = createStackNavigator({
  FoodLogNav: FoodLogScreen,
  EditPlateNav: EditPlateScreen,
  SearchItemNav: SearchItemScreen,
  AddItemNav: AddItemScreen,
  AddPlateNav: AddPlateScreen,
  LocationNav: LocationScreen,
  TakePhotoNav : TakePhotoScreen,
  ItemDetailNav: ItemDetailScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  cardStyle: { backgroundColor: '#FCFAF4' },
})

// Tab Navigator, form [ScreenName] - ('Screen' | 'Stack') + 'Tab'
const TabNavigator = createBottomTabNavigator({
  CalendarTab: CalendarScreen,
  FoodLogTab: {
    screen: FoodLogStack,
    navigationOptions: {
      title: 'Food Log'
    },
  },
  SettingsTab: SettingsScreen
  },
  {
    initialRouteName: 'FoodLogTab',
    style: {
      backgroundColor: '#F44336',
    },
    tabBarOptions: {
      style: {
        height: 60
      },
      labelStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
    }
  });

  FoodLogStack.navigationOptions = ({ navigation }) => {

    // since we're not using the tab bar, leave this as false
    let tabBarVisible = false;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'AddPlateNav' || routeName == 'SearchItemNav' ) {
      tabBarVisible = false
    }

    return {
     tabBarVisible,
    }
}

const AppContainer = createAppContainer(TabNavigator);