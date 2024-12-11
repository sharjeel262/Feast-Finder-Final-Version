import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

const NewPage = () => {
  const route = useRoute();
  const { item } = route.params;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const suggestedItems = [
    { id: '1', name: 'Spicy', price: 'N500', image: require('./assets/images/spicy.png') },
    { id: '2', name: 'Vegetables', price: 'N1,000', image: require('./assets/images/veg.jpg') },
    { id: '3', name: 'Pasta', price: 'N700', image: require('./assets/images/pasta.jpg') },
    { id: '4', name: 'Coke', price: 'N200', image: require('./assets/images/spicy.png') },
  ];

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const total = quantity * parseInt(item.price.replace(/[^0-9]/g, ''));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('./assets/icon.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./assets/cart.jpg')} style={styles.icon} />
          <Text style={styles.cartBadge}>3</Text>
        </TouchableOpacity>
      </View>

      <Image source={item.image} style={styles.itemImage} />
      <TouchableOpacity style={styles.favoriteIcon}>
        <Image source={require('./assets/icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.priceAndRating}>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.rating}>★★★★★ (59 ratings)</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(-1)}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityNumber}>{quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(1)}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.suggestedItemsLabel}>Recommended sides:</Text>
      <FlatList
        data={suggestedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.suggestedItem}>
            <Image source={item.image} style={styles.suggestedItemImage} />
            <View style={styles.suggestedItemInfo}>
              <Text style={styles.suggestedItemName}>{item.name}</Text>
              <Text style={styles.suggestedItemPrice}>{item.price}</Text>
            </View>
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suggestedItemsList}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: N{total}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  cartBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 8,
    padding: 2,
    fontSize: 12,
  },
  itemImage: {
    width: 200,
    height: 200,
    borderRadius: 125,
    alignSelf: 'center',
    marginBottom: -20,
    marginTop: -30,
  },
  favoriteIcon: {
    position: 'absolute',
    right: 20,
    top: 220,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  priceAndRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    marginBottom: -40,
  },
  itemPrice: {
    fontSize: 20,
    color: '#888',
  },
  rating: {
    fontSize: 16,
    color: '#FFA500',
    
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: -0,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityNumber: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  suggestedItemsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  suggestedItemsList: {
    paddingVertical: 10,
  },
  suggestedItem: {
    marginRight: 15,
  },
  suggestedItemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  suggestedItemInfo: {
    alignItems: 'center',
  },
  suggestedItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestedItemPrice: {
    fontSize: 14,
    color: '#888',
  },
  totalContainer: {
    marginVertical: 10,
    marginTop: -10,
    marginBottom: -10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
