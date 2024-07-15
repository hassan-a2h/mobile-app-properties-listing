import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './Listing.styles';
import { useAuth } from '../../context/AuthContext';
import propertyImg from '../../../assets/img/property-1.jpg';

const Listing = ({ route }) => {
  let limit = 4;
  let fromUser = false;

  console.log('route:', route?.params);

  if (route?.params) {
    limit = route?.params?.limit;
    fromUser = route?.params?.fromUser;
  }

  const defaultLimit = limit;
  const navigation = useNavigation();
  const { user } = useAuth();
  const userId = user?.id;
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const requestParams = {};

    requestParams.limit = defaultLimit;
    if (fromUser) requestParams.agentId = userId;

    console.log('requestParams:', requestParams);

    try {
      const response = await axios.get('/api/listings', {
        params: requestParams,
      });
      setListings(response.data);
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

  const handleContact = async (listing) => {
    try {
      const response = await axios.post('/api/c/chat', {
        userId,
        agentId: listing.postedBy,
        listingId: listing._id,
        propertyTitle: listing.title,
      });
      const chat = response.data;
      navigation.navigate('Chat', { userId, chatFromListing: chat });
    } catch (error) {
      console.error('Error creating or fetching chat:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {listings.length > 0 ? (
        <View>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Property Listing</Text>
            <Text style={styles.headerSubtitle}>
              Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit diam justo sed rebum.
            </Text>
          </View>
          <View style={styles.filterContainer}>
            <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
              <Text style={styles.filterButtonText}>Featured</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>For Sell</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>For Rent</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.noListings}>
          <Text style={styles.noListingsText}>No Properties Listed</Text>
        </View>
      )}
      <View style={styles.listingsContainer}>
        {listings.map((listing) => (
          <View style={styles.listingItem} key={listing._id}>
            <View style={styles.imageContainer}>
              <Image source={propertyImg} style={styles.image} />
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>For Sale</Text>
              </View>
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{listing.status}</Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.priceText}>${listing.price}</Text>
              <Text style={styles.titleText}>{listing.title.slice(0, 22)}</Text>
              <Text style={styles.descriptionText}>{listing.description}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <Text style={styles.actionText}>1000 Sqft</Text>
              {listing.postedBy === userId && (
                <>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditListing', { listingId: listing._id })}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(listing._id, listing.postedBy)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
              {listing.postedBy !== userId && (
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => handleContact(listing)}
                >
                  <Text style={styles.contactButtonText}>Contact</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Listing;
