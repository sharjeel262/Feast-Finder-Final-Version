import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PizzaBurger from "@/src/components/PizzaBurger";
import Restaurant from "@/src/components/Restaurant";
import NewPage from "../../components/NewPage";
import RestaurantDetail from "../../components/RestaurantDetailScreen";
import SplashScreens from "../../components/SplashScreens";
import JsonPage from "../../components/json";
import { RootStackParamList } from "../../types";
import LoginScreen from "../../components/LoginScreen";
import SignupScreen from "../../components/Signup";
import { useAuth } from "../../components/useAuth";
import MapScreen from "../../components/MapScreen"; // Import the MapScreen component
import NearbyRestaurantsScreen from "../../components/NearbyRestaurantsScreen"; // Import the NearbyRestaurantsScreen component

const Stack = createStackNavigator<RootStackParamList>();

const TabOneScreen = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const { user, loading } = useAuth(); // Get user authentication state
  const [appLoading, setAppLoading] = useState(true); // Track the loading state for app

  // Check if it's the first launch or if the user has seen the splash screen before
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasSeenSplash = await AsyncStorage.getItem("hasSeenSplash");
      setIsFirstLaunch(!hasSeenSplash); // If no splash screen seen, it's the first launch
    };

    checkFirstLaunch();
  }, []);

  // Once the first launch status and authentication status are determined, stop the loading state
  useEffect(() => {
    if (isFirstLaunch !== null && loading === false) {
      setAppLoading(false); // Set app loading to false once session check and auth are done
    }
  }, [isFirstLaunch, loading]);

  // If still loading, show nothing
  if (appLoading) {
    return null; // You can also show a loading indicator here if needed
  }

  // Determine the initial route based on authentication and splash screen status
  const initialRouteName = user ? "PizzaBurger" : isFirstLaunch ? "Splash" : "Login";

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {/* Splash Screen for first launch */}
        {isFirstLaunch && (
          <Stack.Screen
            name="Splash"
            component={SplashScreens}
            options={{ headerShown: false }}
          />
        )}

        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* Sign Up Screen */}
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        {/* Main App Screens */}
        <Stack.Screen
          name="PizzaBurger"
          component={PizzaBurger}
          options={{
            title: "Foodie Moodie",
            headerTitleAlign: "center",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Restaurant"
          component={Restaurant}
          options={{
            title: "Foodie Moodie",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="RestaurantDetail"
          component={RestaurantDetail}
          options={{
            title: "Restaurant Details",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="NewPage"
          component={NewPage}
          options={{
            title: "Details",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="JsonPage"
          component={JsonPage}
          options={{
            title: "Restaurant's Data",
            headerTitleAlign: "center",
          }}
        />

        {/* Add the Map Screen */}
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            title: "Map",
            headerTitleAlign: "center",
          }}
        />

        {/* Add the Nearby Restaurants Screen */}
        <Stack.Screen
          name="NearbyRestaurants"
          component={NearbyRestaurantsScreen}
          options={{
            title: "Nearby Restaurants",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TabOneScreen;
