import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { AuthContext, useAuth } from '../context/AuthContext';
import Toast from 'react-native-toast-message';

const Register = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ newUserRole, setNewUserRole ] = useState('agent');
  const { user } = useAuth();
  const { register } = useContext(AuthContext);
  const role = user?.role;
  const navigation = useNavigation();

  useEffect(() => {
    if (user && role !== 'admin') {
      navigation.navigate('Home');
    }

    setName('');
    setEmail('');
    setPassword('');
    setNewUserRole('agent');
  }, [user, navigation]);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateName = (name) => {
    return name.length >= 3;
  };

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are required',
      });
      return;
    }

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

    try {
      if (role === 'admin') {
        await register(name, email.toLowerCase(), password, newUserRole);
        Toast.show({
          type: 'success',
          text1: `New ${newUserRole} added`,
        });
        
        navigation.navigate('Home');
        setName('');
        setEmail('');
        setPassword('');
        setNewUserRole('agent');

        return;
      }
      await register(name, email.toLowerCase(), password);
      navigation.navigate('Login', { state: { fromRegister: true } });
    } catch (error) {
      console.log('Request failed, full error - ' + error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {role !== 'admin' && <Text style={styles.title}>Register</Text>}
        <View style={styles.inputContainer}>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            placeholder='John Doe'
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder='user@example.com'
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder='********'
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {role === 'admin' && (
          <View style={styles.inputContainer}>
            <Text>Role</Text>
            <Picker
              selectedValue={newUserRole}
              style={styles.input}
              onValueChange={(itemValue) => setNewUserRole(itemValue)}
            >
              <Picker.Item label="Agent" value="agent" />
              <Picker.Item label="User" value="user" />
            </Picker>
          </View>
        )}
        <Button title="Register" color="#00B98E" onPress={handleSubmit} />
        {role !== 'admin' && (
          <Text style={styles.loginText}>
            Have an account?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00B98E',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
  },
  link: {
    color: '#00B98E',
    fontWeight: 'bold',
  },
});

export default Register;
