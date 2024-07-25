import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const Socials = () => {
  const { user } = useAuth();
  const [socials, setSocials] = useState({
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSocials() {
      try {
        const socialsData = await axios.get(`/api/socials/${user?.id}`);
        if (socialsData.data) {
          setSocials(socialsData.data);
        }
      } catch (error) {
        console.error('Error fetching socials:', error);
      }
    }

    fetchSocials();
  }, [user]);

  const validate = () => {
    const twitterPattern = /^https:\/\/(www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15})$/;
    const facebookPattern = /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9\.]{5,}$/;
    const instagramPattern = /^https:\/\/(www\.)?instagram\.com\/([a-zA-Z0-9_\.]{1,30})$/;

    let valid = true;
    let errors = {};

    if (!twitterPattern.test(socials.twitterUrl)) {
      valid = false;
      errors.twitterUrl = 'Invalid Twitter URL';
    }

    if (!facebookPattern.test(socials.facebookUrl)) {
      valid = false;
      errors.facebookUrl = 'Invalid Facebook URL';
    }

    if (!instagramPattern.test(socials.instagramUrl)) {
      valid = false;
      errors.instagramUrl = 'Invalid Instagram URL';
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (name, value) => {
    setSocials({
      ...socials,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      try {
        const response = await axios.post('/api/socials', { ...socials, userId: user.id });
        if (response.status === 200) {
          Alert.alert('Success', 'Socials updated successfully');
        } else {
          Alert.alert('Error', 'Could not save socials. Please try again.');
        }
      } catch (error) {
        console.error('Error updating socials:', error);
        Alert.alert('Error', 'Could not save socials. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.parentContainer}>
      {/* Container showing buttons to current socials */}
      {socials && (
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(socials.facebookUrl)} style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color="#2F2F2F" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(socials.twitterUrl)} style={styles.socialButton}>
            <Ionicons name="logo-twitter" size={24} color="#2F2F2F" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(socials.instagramUrl)} style={styles.socialButton}>
            <Ionicons name="logo-instagram" size={24} color="@2F2F2F" />
          </TouchableOpacity>
        </View>
      )}
      {/* Form container for updating the socials */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Twitter URL</Text>
        <TextInput
          style={[styles.input, errors.twitterUrl && styles.errorInput]}
          placeholder="Enter Twitter URL"
          value={socials.twitterUrl}
          onChangeText={(value) => handleChange('twitterUrl', value)}
        />
        {errors.twitterUrl && <Text style={styles.errorText}>{errors.twitterUrl}</Text>}

        <Text style={styles.label}>Facebook URL</Text>
        <TextInput
          style={[styles.input, errors.facebookUrl && styles.errorInput]}
          placeholder="Enter Facebook URL"
          value={socials.facebookUrl}
          onChangeText={(value) => handleChange('facebookUrl', value)}
        />
        {errors.facebookUrl && <Text style={styles.errorText}>{errors.facebookUrl}</Text>}

        <Text style={styles.label}>Instagram URL</Text>
        <TextInput
          style={[styles.input, errors.instagramUrl && styles.errorInput]}
          placeholder="Enter Instagram URL"
          value={socials.instagramUrl}
          onChangeText={(value) => handleChange('instagramUrl', value)}
        />
        {errors.instagramUrl && <Text style={styles.errorText}>{errors.instagramUrl}</Text>}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.submitButtonText}>{loading ? 'Loading...' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  socialButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  formContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#00BE8E',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Socials;
