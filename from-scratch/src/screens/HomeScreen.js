import React, { useState, useEffect} from 'react';
import { Button, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from "../components/Header/Header";
import Listing from '../components/Listing/Listing';
import Categories from '../components/Categories/Categories';
import About from '../components/About/About';
import ContactUs from '../components/ContactUs/ContactUs';
import AboutTeam from '../components/AboutTeam/AboutTeam';
import Testimonials from '../components/Testimonials/Testimonials';
import Footer from '../components/Footer/Footer';
import AboutDev from '../components/AboutDev/AboutDev';

const HomeScreen = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const { logout, user } = useAuth();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('/api/listings');
      setListings(response.data);
      setFilteredListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Error fetching listings.');
    }
  };
  const handleDelete = async (id, postedBy) => {
    if ((user.role !== 'admin' || user.role !== 'agent') && postedBy !== user.id) {
      console.log('Can\'t delete other user\'s listing');
      return;
    }

    try {
      await axios.delete(`/api/listings/${id}`);
      fetchListings();
      toast.success('Listing deleted successfully.');
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Error deleting listing.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Button title="Logout" onPress={logout} />
      <Header />
      <Listing
        listings={filteredListings}
        handleDelete={handleDelete}
        userId={user?.id}
      />
      <Categories />
      <About />
      <ContactUs />
      <AboutTeam />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Testimonials />
      </GestureHandlerRootView>
      <Footer />
      <AboutDev />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});