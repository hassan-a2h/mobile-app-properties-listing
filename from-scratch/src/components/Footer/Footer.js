import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import styles from './Footer.styles';
import property1 from '../../../assets/img/property-1.jpg';
import property2 from '../../../assets/img/property-2.jpg';
import property3 from '../../../assets/img/property-3.jpg';
import property4 from '../../../assets/img/property-4.jpg';
import property5 from '../../../assets/img/property-5.jpg';
import property6 from '../../../assets/img/property-6.jpg';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.title}>Get In Touch</Text>
            <Text style={styles.text}><FontAwesome name='map-marker' size={20} color='#26C49F'/>  123 Street, New York, USA</Text>
            <Text style={styles.text}><FontAwesome name='phone' size={20} color='#26C49F'/>   +012 345 67890</Text>
            <Text style={styles.text}><FontAwesome name='envelope' size={20} color='#26C49F'/>   info@example.com</Text>
            <View style={styles.socialContainer}>
              <FontAwesome name="twitter" size={20} color="#26C49F" />
              <FontAwesome name="facebook" size={20} color="#26C49F" />
              <FontAwesome name="youtube" size={20} color="#26C49F" />
              <FontAwesome name="linkedin" size={20} color="#26C49F" />
            </View>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Quick Links</Text>
            <Text style={styles.link}>About Us</Text>
            <Text style={styles.link}>Contact Us</Text>
            <Text style={styles.link}>Our Services</Text>
            <Text style={styles.link}>Privacy Policy</Text>
            <Text style={styles.link}>Terms & Condition</Text>
          </View>
          <View>
            <Text style={styles.title}>Photo Gallery</Text>
            <View style={styles.photoGallery}>
              <Image source={property1} style={styles.photo} />
              <Image source={property2} style={styles.photo} />
              <Image source={property3} style={styles.photo} />
              <Image source={property4} style={styles.photo} />
              <Image source={property5} style={styles.photo} />
              <Image source={property6} style={styles.photo} />
            </View>
          </View>
          <View>
            <Text style={styles.title}>Newsletter</Text>
            <Text style={styles.text}>Dolor amet sit justo amet elitr clita ipsum elitr est.</Text>
            <View style={styles.newsletterContainer}>
              <TextInput
                style={styles.newsletterInput}
                placeholder="Your email"
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity style={styles.newsletterButton}>
                <Text style={styles.newsletterButtonText}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.copyright}>
        <View style={styles.row}>
          <Text style={styles.copyrightText}>
            &copy; <Text style={styles.link}>Makaan</Text>, All Right Reserved.
          </Text>
        </View>
      </View>
    </View>
  );
};



export default Footer;
