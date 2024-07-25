import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Header.styles';
import carousal1 from '../../../assets/img/carousel-1.jpg';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Find A <Text style={styles.textPrimary}>Perfect Home</Text> To Live With Your Family
          </Text>
          <Text style={styles.description}>
            Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('All Listings')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={carousal1} style={styles.image} />
        </View>
      </View>
    </View>
  );
};

export default Header;
