import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();
axios.defaults.baseURL = 'http://localhost:3000';

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/auth/check-auth', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser({ id: response.data.id, role: response.data.role });
        } catch (error) {
          setUser(null);
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('role', data.role);
      await AsyncStorage.setItem('userId', data._id);
      setUser({ id: data._id, role: data.role });
      Alert.alert('Login successful');
    } catch (error) {
      Alert.alert('Invalid credentials');
    }
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('id');
    setUser(null);
    navigation.navigate('Login');
    Alert.alert('Logged out successfully');
  };

  const register = async (name, email, password, role) => {
    try {
      await axios.post('/api/users/register', { name, email, password, role });
      Alert.alert('Registration successful');
    } catch (error) {
      Alert.alert('Registration failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
