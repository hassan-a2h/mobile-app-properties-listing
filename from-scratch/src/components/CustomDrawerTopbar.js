import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CustomDrawerTopbar = ({ title, value }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.leftIconContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.drawerButton}>
            <Ionicons name="menu" size={24} color="black" />
            {value > 0 && (
              <View style={styles.value}>
                <Text style={styles.messageNotification}>{value > 9 ? '9+' : value}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightPlaceholder} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  leftIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightPlaceholder: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerButton: {
    position: 'relative',
  },
  value: {
    position: 'absolute',
    top: -5,
    right: -5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: '#00BE8E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageNotification: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CustomDrawerTopbar;
