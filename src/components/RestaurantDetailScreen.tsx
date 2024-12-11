import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

type RestaurantDetailRouteProp = RouteProp<RootStackParamList, 'Restaurant'>;
type RestaurantDetailNavigationProp = StackNavigationProp<RootStackParamList, 'Restaurant'>;

const RestaurantDetail = () => {
  const route = useRoute<RestaurantDetailRouteProp>();
  const { restaurant } = route.params; // Get the restaurant data passed from the previous screen

  const handleAddressPress = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;
    Linking.openURL(url);
  };

  const handlePhonePress = () => {
    const url = `tel:${restaurant.phone_number}`;
    Linking.openURL(url);
  };

  const handleWebsitePress = () => {
    const url = `https://${restaurant.website}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/images/rest.webp')} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>

        {/* Clickable Address */}
        <TouchableOpacity onPress={handleAddressPress}>
          <Text style={[styles.location, styles.clickable]}>📍 {restaurant.address}</Text>
        </TouchableOpacity>

        {/* Display City and State */}
        <Text style={styles.city}>City: {restaurant.city}</Text>
        <Text style={styles.state}>State: {restaurant.state}</Text>

        {/* Clickable Phone Number */}
        <TouchableOpacity onPress={handlePhonePress}>
          <Text style={[styles.phone, styles.clickable]}>📞 {restaurant.phone_number}</Text>
        </TouchableOpacity>

        {/* Clickable Website */}
        <TouchableOpacity onPress={handleWebsitePress}>
          <Text style={[styles.website, styles.clickable]}>🌐 {restaurant.website}</Text>
        </TouchableOpacity>

        {/* Clickable URL */}
        <TouchableOpacity onPress={() => Linking.openURL(restaurant.url)}>
          <Text style={[styles.url, styles.clickable]}>🔗 Open on Google Maps</Text>
        </TouchableOpacity>

        {/* Cuisine and Description */}
        <Text style={styles.cuisine}>Cuisine: {restaurant.cuisine || "Not specified"}</Text>
        <Text style={styles.description}>{restaurant.description || "No description available."}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF3E0', // Light cream background
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FF8400', // Orange border for the image
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#FFCC80', // Light orange-yellow for card background
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#FF8400', // Orange border
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D85A00', // Darker orange for name
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#D85A00', // Darker orange for location
    marginBottom: 8,
  },
  city: {
    fontSize: 16,
    color: '#D85A00', // Darker orange for city
    marginBottom: 8,
  },
  state: {
    fontSize: 16,
    color: '#D85A00', // Darker orange for state
    marginBottom: 8,
  },
  phone: {
    fontSize: 14,
    color: '#D85A00', // Darker orange for phone
    marginBottom: 8,
  },
  website: {
    fontSize: 14,
    color: '#FF8400', // Main orange color for website
    marginBottom: 8,
  },
  url: {
    fontSize: 14,
    color: '#FF8400', // Main orange color for URL
    marginBottom: 8,
  },
  cuisine: {
    fontSize: 14,
    color: '#D85A00', // Darker orange for cuisine
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#D85A00', // Darker orange for description
    marginBottom: 8,
  },
  clickable: {
    textDecorationLine: 'underline',
    color: '#FF8400', // Underlined text color in main orange
  },
});

export default RestaurantDetail;
