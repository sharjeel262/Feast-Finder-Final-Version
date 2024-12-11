import { useState, useEffect } from 'react';
import { supabase } from '../components/supabaseClient';  // Import your Supabase client
import AsyncStorage from '@react-native-async-storage/async-storage';  // For persistent storage

export const useAuth = () => {
  const [user, setUser] = useState<any>(null); // Store the authenticated user
  const [loading, setLoading] = useState<boolean>(true); // Loading state for initial session check
  const [error, setError] = useState<string | null>(null); // Store errors

  // Initialize auth state and check for a saved session from AsyncStorage
  useEffect(() => {
    const loadUserFromSession = async () => {
      // Check if the user session is saved in AsyncStorage
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));  // Set user from AsyncStorage if available
      } else {
        // Check if Supabase session exists
        const session = await supabase.auth.getSession();
        if (session.data.session) {
          setUser(session.data.session.user);  // Set user from session if available
        }
      }
      setLoading(false); // Stop loading once session is checked
    };

    loadUserFromSession();

    // Set up a listener to handle auth state changes (real-time)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);  // Update the user state when a session is found
          // Optionally, store the session in AsyncStorage for persistence
          AsyncStorage.setItem('user', JSON.stringify(session.user));
        } else {
          setUser(null);  // Clear user when session is lost
          AsyncStorage.removeItem('user');  // Optionally clear user data from AsyncStorage
        }
      }
    );

    // Cleanup listener when the component is unmounted
    return () => {
      // Check if listener has a valid unsubscribe method
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe(); // Unsubscribe if the unsubscribe method exists
      }
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null); // Reset errors on each new attempt

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setUser(data?.user); // Set the authenticated user
      // Persist user data in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(data?.user));
    } catch (err: any) {
      setError(err.message); // Handle errors
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      setUser(data?.user); // Set the user after successful signup
      // Persist user data in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(data?.user));
    } catch (err: any) {
      setError(err.message); // Handle errors
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Clear the user after logging out
    await AsyncStorage.removeItem('user'); // Optionally remove user data from AsyncStorage
  };

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
  };
};
