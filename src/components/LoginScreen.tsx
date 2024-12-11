import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../components/useAuth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, error, loading, user } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    await login(email, password);
  };

  // Use useEffect to navigate after component has rendered
  useEffect(() => {
    if (user) {
      navigation.navigate('PizzaBurger');
    }
  }, [user, navigation]); // Trigger the effect when the user state changes

  // Navigate to Sign Up screen
  const goToSignUp = () => {
    console.log("Navigating to SignUp screen"); // Debugging
    navigation.navigate('SignUp');  // Ensure this matches the name in the navigator
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B0B0B0" // Lighter placeholder text
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#B0B0B0" // Lighter placeholder text
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
        color="#FF8400" // Change button color to orange
      />
      {/* Sign Up navigation */}
      <TouchableOpacity onPress={goToSignUp} style={styles.signupLink}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFF4E0', // Soft background color to complement the orange
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF8400', // Header color in orange
  },
  input: {
    height: 50,
    borderColor: '#FF8400', // Orange border for input fields
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#FFF', // White background for inputs
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#FF8400', // Link color in orange
    textDecorationLine: 'underline',
  },
});
export default LoginScreen;
