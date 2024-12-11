// PizzaBurger.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types'; // Import your navigation types

type MenuItem = {
  id: string;
  name: string;
  price: string;
  image: any;
  favorite: boolean;
};

const PizzaBurger = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Use the typed navigation

  const [menuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Spicy Noodles', price: '$1,500', image: require('./assets/images/spicy.png'), favorite: true },
    { id: '2', name: 'Shrimp Pasta', price: '$1,800', image: require('./assets/images/pasta.jpg'), favorite: false },
    { id: '3', name: 'Vegetable Curry', price: '₦1,200', image: require('./assets/images/veg.jpg'), favorite: false },
    { id: '4', name: 'Mixed Salad', price: '₦1,500', image: require('./assets/images/salad.jpg'), favorite: false },
    { id: '5', name: 'Chicken Pasta Salad', price: '₦1,500', image: require('./assets/images/spicy.png'), favorite: false },
    { id: '6', name: 'Beef Salad', price: '₦1,200', image: require('./assets/images/spicy.png'), favorite: true },
  ]);

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={() => navigation.navigate('NewPage', { item })} // Pass the item to NewPage
    >
      <Image source={item.image} style={styles.menuImage} />
      <View style={styles.menuInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Ionicons name={item.favorite ? 'heart' : 'heart-outline'} size={20} color="orange" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
      />
    </SafeAreaView>
  );
};

export default PizzaBurger;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  menuItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  menuImage: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  menuInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 12,
    color: '#888',
    marginVertical: 5,
  },
});
