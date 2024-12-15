import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from './useAuth';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signup, error, loading } = useAuth();

  const handleSignup = async () => {
    await signup(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        title={loading ? 'Signing Up...' : 'Sign Up'}
        onPress={handleSignup}
        disabled={loading}
        color="#ff8400" 
      />
      <TouchableOpacity onPress={() => console.log('Navigate to Login screen')} style={styles.loginLink}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ff8400', 
  },
  input: {
    height: 40,
    borderColor: '#ff8400', 
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 5, 
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#ff8400',
    textDecorationLine: 'underline',
  },
});

export default Signup;
