import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';  // Import the Location API from Expo
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const [currentRegion, setCurrentRegion] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Request location permission and get the user's current location
  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        setLoading(false);
        return;
      }

      // Get the current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error(error);
      alert('Failed to get location');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      {currentRegion && (
        <MapView
          style={styles.map}
          initialRegion={currentRegion}
          showsUserLocation={true}
        >
          <Marker coordinate={currentRegion} title="Your Location" />
        </MapView>
      )}

      {/* Location Icon Button */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={getCurrentLocation} // Call getCurrentLocation when the icon is pressed
      >
        <Ionicons name="location-sharp" size={40} color="white" />
      </TouchableOpacity>

      {/* "In Your Area" Button */}
      <TouchableOpacity
        style={styles.areaButton}
        onPress={() => navigation.navigate('NearbyRestaurants', { userLocation: currentRegion })}
      >
        <Text style={styles.areaButtonText}>In Your Area</Text>
      </TouchableOpacity>

      {loading && <View style={styles.loadingContainer}><Text>Loading...</Text></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  locationButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 50,
    elevation: 5, // Add some shadow for better visibility
  },
  areaButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  areaButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default MapScreen;
