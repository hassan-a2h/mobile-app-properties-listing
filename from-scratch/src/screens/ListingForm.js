import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Define Yup schema
const ListingSchema = Yup.object().shape({
  title: Yup.string().min(8).max(64).required('Title is required'),
  description: Yup.string().min(4).max(512).required('Description is required'),
  price: Yup.number().min(1000).max(50000000).required('Price is required'),
  location: Yup.string().min(8).max(128).required('Location is required'),
  status: Yup.string().required('Status is required'),
  category: Yup.string().required('Category is required'),
});

const ListingForm = ({ editing }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  const initialListing = {
    title: '',
    description: '',
    price: '',
    location: '',
    images: '',
    status: '',
    postedBy: user?.id,
    category: 'home',
  };

  useEffect(() => {
    if (editing && id) {
      fetchListing(id);
    }
  }, [editing, id]);

  const fetchListing = async (id) => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      console.log('listing received from server:', response.data, '\nuserId:', user);
      if (response.data.postedBy !== user.id) {
        navigation.navigate('Home');
        return;
      }
      setListing(response.data);
    } catch (error) {
      console.error('Error fetching listing:', error);
      Toast.show({ type: 'error', text1: 'Error fetching listing.' });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={initialListing}
        validationSchema={ListingSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            if (editing) {
              await axios.put(`/api/listings/${id}`, values);
              Toast.show({ type: 'success', text1: 'Listing updated successfully.' });
              navigation.navigate('ListingsAgent', { user });
            } else {
              await axios.post('/api/listings', values);
              Toast.show({ type: 'success', text1: 'Listing created successfully.' });
            }
            navigation.navigate('Home');
          } catch (error) {
            console.error('Error saving listing:', error);
            const errors = error?.response?.data?.errors;
            if (errors) {
              setErrors(errors);
              Object.values(errors).forEach((errorMessage) => {
                Toast.show({ type: 'error', text1: errorMessage });
              });
            }
            Toast.show({ type: 'error', text1: 'Error saving listing.' });
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.heading}>{editing ? 'Edit Listing' : 'Add Listing'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Title"
              minLength={8}
              maxLength={64}
              required
            />
            {errors.title && touched.title ? <Text style={styles.error}>{errors.title}</Text> : null}
            <TextInput
              style={[styles.input, styles.textArea]}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              placeholder="Description & Contact details"
              minLength={4}
              maxLength={512}
              required
              multiline
            />
            {errors.description && touched.description ? <Text style={styles.error}>{errors.description}</Text> : null}
            <TextInput
              style={styles.input}
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
              placeholder="Price"
              keyboardType="numeric"
              min={1000}
              max={50000000}
              required
            />
            {errors.price && touched.price ? <Text style={styles.error}>{errors.price}</Text> : null}
            <TextInput
              style={styles.input}
              onChangeText={handleChange('location')}
              onBlur={handleBlur('location')}
              value={values.location}
              placeholder="Location"
              minLength={8}
              maxLength={128}
              required
            />
            {errors.location && touched.location ? <Text style={styles.error}>{errors.location}</Text> : null}
            <Picker
              selectedValue={values.status}
              style={[styles.input, styles.picker]}
              onValueChange={handleChange('status')}
              required
            >
              <Picker.Item label="Select Status" value="" />
              <Picker.Item label="Available" value="available" />
              <Picker.Item label="Sold" value="sold" />
            </Picker>
            {errors.status && touched.status ? <Text style={styles.error}>{errors.status}</Text> : null}
            <Picker
              selectedValue={values.category}
              style={styles.input}
              onValueChange={handleChange('category')}
              mode='dropdown'
              required
            >
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Villa" value="villa" />
              <Picker.Item label="Apartment" value="apartment" />
              <Picker.Item label="Building" value="building" />
              <Picker.Item label="Office" value="office" />
              <Picker.Item label="Townhouse" value="townhouse" />
              <Picker.Item label="Shop" value="shop" />
              <Picker.Item label="Garage" value="garage" />
            </Picker>
            {errors.category && touched.category ? <Text style={styles.error}>{errors.category}</Text> : null}
            <Button onPress={handleSubmit} title={editing ? 'Update Listing' : 'Add Listing'} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
  picker: {
    // height: 100,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ListingForm;
