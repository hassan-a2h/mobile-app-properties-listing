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
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
            {/* { value > 0 && <Text style={styles.value}>{value}</Text> } */}
            { value > 0 && <View style={styles.value}><Text style={styles.messageNotification}>{value > 9 ? '9+' : value}</Text></View> }
        </View>
        <Text style={styles.title}>{title}</Text>
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
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 10,
    fontSize: 16,
    color: '#ffffff',
    // borderWidth: 1,
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 12,
    // borderColor: 'gray',
    backgroundColor: '#00BE8E',
  },
  messageNotification: {
    color: '#ffffff',
  },
  leftIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default CustomDrawerTopbar;
