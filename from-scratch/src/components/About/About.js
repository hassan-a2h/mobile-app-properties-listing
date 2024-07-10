import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import aboutImg from '../../../assets/img/about.jpg';
import styles from './About.styles';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.imageContainer}>
          <Image source={aboutImg} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>#1 Place To Find The Perfect Property</Text>
          <Text style={styles.description}>
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
          </Text>
          <Text style={styles.listItem}><Text style={styles.checkIcon}>✔️</Text> Tempor erat elitr rebum at clita</Text>
          <Text style={styles.listItem}><Text style={styles.checkIcon}>✔️</Text> Aliqu diam amet diam et eos</Text>
          <Text style={styles.listItem}><Text style={styles.checkIcon}>✔️</Text> Clita duo justo magna dolore erat amet</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;
