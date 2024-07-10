import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import styles from './ContactUs.styles';
import { FontAwesome } from '@expo/vector-icons';
import callToAction from '../../../assets/img/call-to-action.jpg';

const ContactUs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bgLight}>
        <View style={styles.bgWhite}>
          <View style={styles.imageContainer}>
            <Image source={callToAction} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.textWrapper}>
              <Text style={styles.title}>Contact With Our Certified Agent</Text>
              <Text style={styles.description}>
                Eirmod sed ipsum dolor sit rebum magna erat. Tempor lorem kasd vero ipsum sit sit diam justo sed vero dolor duo.
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => Linking.openURL('skype:Makaan_Properties?call')}>
              <FontAwesome name="phone" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.buttonText}>Make A Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDark} onPress={() => Linking.openURL('https://calendar.google.com/calendar/render?action=TEMPLATE')} target="_blank">
              <FontAwesome name="calendar" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.buttonText}>Get Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContactUs;
