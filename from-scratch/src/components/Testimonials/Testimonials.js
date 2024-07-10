import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import styles from './Testimonials.styles';

import testimonial1 from '../../../assets/img/testimonial-1.jpg';
import testimonial2 from '../../../assets/img/testimonial-2.jpg';
import testimonial3 from '../../../assets/img/testimonial-3.jpg';

const { width: viewportWidth } = Dimensions.get('window');

const data = [
  {
    text: 'Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos',
    img: testimonial1,
    name: 'Client Name',
    profession: 'Profession',
  },
  {
    text: 'Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos',
    img: testimonial2,
    name: 'Client Name',
    profession: 'Profession',
  },
  {
    text: 'Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos',
    img: testimonial3,
    name: 'Client Name',
    profession: 'Profession',
  },
];

const renderItem = ({ item }) => (
  <View style={styles.testimonialItem}>
    <View style={styles.testimonialContent}>
      <Text>{item.text}</Text>
      <View style={styles.clientInfo}>
        <Image source={item.img} style={styles.clientImage} />
        <View style={styles.clientText}>
          <Text style={styles.clientName}>{item.name}</Text>
          <Text style={styles.clientProfession}>{item.profession}</Text>
        </View>
      </View>
    </View>
  </View>
);

const Testimonials = () => {
  return (
    <View style={styles.container} id='testimonials'>
      <View style={styles.header}>
        <Text style={styles.title}>Our Clients Say!</Text>
        <Text style={styles.subtitle}>
          Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.
        </Text>
      </View>
      <Carousel
        width={viewportWidth}
        height={250}
        data={data}
        renderItem={renderItem}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
};

export default Testimonials;
