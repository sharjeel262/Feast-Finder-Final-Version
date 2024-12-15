import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getDistance } from 'geolib';  // Import geolib to calculate the distance
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker
import * as Location from 'expo-location';  // To get the user's location
import restaurantData from '../../assets/restaurants.json';  // Assuming this is your restaurant data

const NearbyRestaurantsScreen = () => {
  const route = useRoute();
  const { userLocation } = route.params; // Get the user location passed from MapScreen
  const [nearbyRestaurants, setNearbyRestaurants] = useState<any[]>([]);
  const [userCurrentLocation, setUserCurrentLocation] = useState<any>(null); // Store user current location
  const [radius, setRadius] = useState<string>('5'); // Default to 5 km
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Function to filter restaurants within the user-defined radius
  const filterRestaurants = (radius: number) => {
    const nearby = restaurantData.filter((restaurant) => {
      const restaurantLocation = {
        latitude: parseFloat(restaurant.latitude),
        longitude: parseFloat(restaurant.longitude),
      };

      // Calculate distance between user and restaurant
      const distance = getDistance(userLocation, restaurantLocation);

      // Return true if distance is less than or equal to the user-defined radius (converted to meters)
      return distance <= radius * 1000;
    });

    setNearbyRestaurants(nearby);
  };

  // Function to get the user's current location using Expo Location API
  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    
    // Get the current location
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    setUserCurrentLocation({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    // Trigger the restaurant filter function on location change
    filterRestaurants(parseFloat(radius));
  };

  useEffect(() => {
    // Fetch user's location on mount
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      filterRestaurants(parseFloat(radius));
    }
  }, [radius, userLocation]);

  const handleFilterButtonPress = () => {
    if (isNaN(parseFloat(radius)) || parseFloat(radius) <= 0) {
      Alert.alert('Invalid Range', 'Please enter a valid distance greater than 0.');
      return;
    }

    filterRestaurants(parseFloat(radius));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Restaurants in Your Area</Text>

      {/* Input for distance range */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={radius}
          onChangeText={setRadius}
          keyboardType="numeric"
          placeholder="Enter range in km"
        />
        <Button title="Filter" onPress={handleFilterButtonPress} />
      </View>

      {userCurrentLocation && (
        <MapView
          style={styles.map}
          initialRegion={userCurrentLocation}
          showsUserLocation={true} // Show user's location
          showsMyLocationButton={true} // Show location button
        >
          {/* Marker for User's Current Location */}
          <Marker
            coordinate={{
              latitude: userCurrentLocation.latitude,
              longitude: userCurrentLocation.longitude,
            }}
            title="Your Location"
            description="This is your current location"
          />

          {/* Add markers for each nearby restaurant */}
          {nearbyRestaurants.map((restaurant) => {
            const restaurantLocation = {
              latitude: parseFloat(restaurant.latitude),
              longitude: parseFloat(restaurant.longitude),
            };

            // Create a unique key based on name, latitude, and longitude
            const markerKey = `${restaurant.name}-${restaurantLocation.latitude}-${restaurantLocation.longitude}`;

            return (
              <Marker
                key={markerKey} // Ensure unique keys
                coordinate={restaurantLocation}
                title={restaurant.name}
                description={restaurant.address}
              />
            );
          })}
        </MapView>
      )}

      {/* Show message if no nearby restaurants are found */}
      {nearbyRestaurants.length === 0 && (
        <Text>No restaurants found within {radius} km</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default NearbyRestaurantsScreen;
