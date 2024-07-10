import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './Categories.styles';
import { useNavigation } from '@react-navigation/native';
import apartmentIcon from '../../../assets/img/icon-apartment.png';
import villaIcon from '../../../assets/img/icon-villa.png';
import houseIcon from '../../../assets/img/icon-house.png';
import housingIcon from '../../../assets/img/icon-housing.png';
import buildingIcon from '../../../assets/img/icon-building.png';
import neighborhoodIcon from '../../../assets/img/icon-neighborhood.png';
import condoIcon from '../../../assets/img/icon-condominium.png';
import luxuryIcon from '../../../assets/img/icon-luxury.png';

const Categories = () => {
  const navigation = useNavigation();

  function handleClick(category) {
    navigation.navigate('Listings', { category });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Property Types</Text>
        <Text style={styles.headerSubtitle}>
          Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.
        </Text>
      </View>
      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleClick('apartment')}>
          <View style={styles.categoryContent}>
            <Image source={apartmentIcon} style={styles.icon} />
            <Text style={styles.categoryText}>Apartment</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleClick('villa')}>
          <View style={styles.categoryContent}>
            <Image source={villaIcon} style={styles.icon} />
            <Text style={styles.categoryText}>Villa</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleClick('home')}>
          <View style={styles.categoryContent}>
            <Image source={houseIcon} style={styles.icon} />
            <Text style={styles.categoryText}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleClick('office')}>
          <View style={styles.categoryContent}>
            <Image source={housingIcon} style={styles.icon} />
            <Text style={styles.categoryText}>Office</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleClick('building')}>
          <View style={styles.categoryContent}>
            <Image source={buildingIcon} style={styles.icon} />
            <Text style={styles.categoryText}>Building</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleClick('townhouse')}>
          <View style={styles.categoryContent}>
            <Image source={neighborhoodIcon} style={styles.icon} />
            <Text style={styles.categoryText}>Townhouse</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleClick('shop')}>
          <View style={styles.categoryContent}>
            <Image source={condoIcon} style={styles.icon} />
            <Text style={styles.categoryText}>Shop</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleClick('garage')}>
          <View style={styles.categoryContent}>
            <Image source={luxuryIcon} style={styles.icon} />
            <Text style={styles.categoryText}>Garage</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Categories;
