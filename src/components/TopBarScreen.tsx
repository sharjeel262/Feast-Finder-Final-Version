import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function TopBarScreen() {

  return 
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
