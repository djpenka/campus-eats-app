import { StyleSheet } from 'react-native';

// https://github.com/vhpoet/react-native-styling-cheat-sheet
// Styling Cheat Sheet

const containerStyle = StyleSheet.create({
  center: {
  alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    marginBottom: 0,
    width: 125,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonText: {
    padding: 5,
    color: 'white',
    alignItems: 'center',
  },
  columns: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  }
});

export default containerStyle;