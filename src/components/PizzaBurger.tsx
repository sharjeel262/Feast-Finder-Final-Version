import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Supabase Image Links
const categories = [
  { id: '1', title: 'Food delivery', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/res.png' },
  { id: '2', title: 'Take Away', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/takeaway.jpeg' },
  { id: '3', title: 'Mart', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/groc.webp' },
  { id: '4', title: 'Discounts', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/discount.webp' },
];

const cuisine = [
  { id: '1', title: 'Fast Food', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/fast.jpg' },
  { id: '2', title: 'Paratha', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/pratha.jpg' },
  { id: '3', title: 'Sweets', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/sweets.jpeg' },
  { id: '4', title: 'Pakistani', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/paki.jpg' },
];

const restaurants = [
  { id: '1', name: 'Cheezious', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/cheezious.jpeg', deliveryTime: '30 min' },
  { id: '2', name: 'Savour Foods', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/svvv.webp', deliveryTime: '30 min' },
  { id: '3', name: 'Subway - Lahore', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/sub.png', deliveryTime: '30 min' },
  { id: '4', name: 'Cheezious', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/cheezious.jpeg', deliveryTime: '30 min' },
  { id: '5', name: 'Savour Foods', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/svvv.webp', deliveryTime: '30 min' },
  { id: '6', name: 'Subway - Lahore', image: 'https://tmspexvczupwnvsvxoze.supabase.co/storage/v1/object/public/assets/sub.png', deliveryTime: '30 min' },
];

export default function HomePage() {
  const navigation = useNavigation();

  const handleNavigateToJsonPage = () => {
    navigation.navigate('JsonPage'); // Navigate to JsonPage
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
    style={styles.categoryItem}
    onPress={() => navigation.navigate('Restaurant', { restaurantId: item.id })}
    >
    <View style={styles.categoryItem}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.title}</Text>
    </View>
    </TouchableOpacity>
  );

  const renderCuisineItem = ({ item }) => (
    <TouchableOpacity
    style={styles.cuisineItem}
    onPress={() => navigation.navigate('Restaurant', { restaurantId: item.id })}
    >
    <View style={styles.cuisineItem}>
      <Image source={{ uri: item.image }} style={styles.cuisineImage} />
      <Text style={styles.cuisineText}>{item.title}</Text>
    </View>
    </TouchableOpacity>
  );

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.restaurantItem}
      onPress={() => navigation.navigate('Restaurant', { restaurantId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{ marginTop: 28 }}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Ionicons name="menu" size={30} color="#fff" />
          <Text style={styles.topBarText}>Home</Text>
          <View style={styles.topBarIcons}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
            <Ionicons name="cart-outline" size={24} color="#fff" style={styles.cartIcon} />
          </View>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>Good Evening, Sharjeel</Text>
        <Text style={styles.restaurantCount}>What's for dinner? There are 567 restaurants in your area</Text>
        <Button title="All Restaurants" onPress={handleNavigateToJsonPage} color="#FFB74D" />

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={24} color="#6A4F28" />
          <TextInput placeholder="Search for shops & restaurants" style={styles.searchInput} />
        </View>

        {/* Category List */}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />

        {/* Cuisine List */}
        <Text style={styles.sectionTitle}>Cuisine</Text>
        <FlatList
          data={cuisine}
          renderItem={renderCuisineItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cuisineList}
        />

        {/* Restaurant List */}
        <FlatList
          data={restaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<Text style={styles.sectionTitle}>Your Restaurants</Text>}
          style={styles.restaurantList}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: '#FFF3E0', // Light cream color for background
  },
  topBar: {
    backgroundColor: '#FF8400',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -31,
    marginBottom: 16,
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  topBarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  topBarIcons: {
    flexDirection: 'row',
  },
  cartIcon: {
    marginLeft: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D84315',
  },
  restaurantCount: {
    color: 'gray',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB74D',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FF8400',
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: '#6A4F28',
  },
  categoryList: {
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF8400',
  },
  cuisineList: {},
  cuisineItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  cuisineImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  cuisineText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF8400',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#FF8400',
  },
  restaurantList: {},
  restaurantItem: {
    flexDirection: 'column',
    marginBottom: 16,
    backgroundColor: '#FFE0B2',
    borderRadius: 8,
    padding: 8,
  },
  restaurantImage: {
    flex: 1,
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8400',
  },
  deliveryTime: {
    color: 'gray',
  },
});