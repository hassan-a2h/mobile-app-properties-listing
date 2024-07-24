import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
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

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Listing 
        initialLimit={4}
      />
      <Categories />
      <About />
      <ContactUs />
      <AboutTeam />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Testimonials />
      </GestureHandlerRootView>
      <Footer />
    </ScrollView>
  );  
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});