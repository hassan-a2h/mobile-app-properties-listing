import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigation = useNavigation();

  const validateEmail = (email) => {
    // Simple email validation using regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    // Validate minimum password length
    return password.length >= 6;
  };

  const validateName = (name) => {
    // Validate minimum name length
    return name.length >= 2;
  };

  const handleRegisterPress = async () => {
    // Validate inputs
    if (!validateName(name)) {
      Toast.show({ type: 'error', text1: 'Name must be at least 2 characters long.' });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({ type: 'error', text1: 'Please enter a valid email address.' });
      return;
    }
    if (!validatePassword(password)) {
      Toast.show({ type: 'error', text1: 'Password must be at least 6 characters long.' });
      return;
    }

    // Proceed with registration
    setLoading(true);
    try {
      await register(name, email.toLowerCase(), password);
      navigation.popToTop();
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#00B98E" />
      ) : (
        <Button title="Register" onPress={handleRegisterPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegisterScreen;
