import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawerContent from '../navigation/CustomDrawer/CustomDrawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListingForm from '../screens/ListingForm';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

function Sidebar(role) {
  if (role === 'admin') {
    return (
      <>
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Chat" component={ProfileScreen} />
        <Drawer.Screen name="All Listings" component={ProfileScreen} />
        <Drawer.Screen name="My Listings" component={ProfileScreen} />
        <Drawer.Screen name="Create Listing" component={ListingForm} />
        <Drawer.Screen name="Add User" component={ProfileScreen} />
      </>
    );
  } 

  if (role === 'agent') {
    return (
      <>
        <Drawer.Screen name="Home" component={HomeStack} options={{ headerTitle: 'Home' }} />
        <Drawer.Screen name="Chat" component={ProfileScreen} />
        <Drawer.Screen name="All Listings" component={ProfileScreen} />
        <Drawer.Screen name="My Listings" component={ProfileScreen} />
        <Drawer.Screen name="Create Listing" component={ListingForm} />
        <Drawer.Screen name="Socials" component={ProfileScreen} />
      </>
    );
  }

  return (
    <>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Listings" component={ProfileScreen} />
      <Drawer.Screen name="Chat" component={ProfileScreen} />
    </>
  );
}

const AppStack = () => {
  const [ userRole, setUserRole ] = useState(null);

  useEffect(() => {
    async function getRole() {
      const role = await AsyncStorage.getItem('role');
      setUserRole(prevRole => role);
    }
    
    getRole();
  }, []);

  console.log('role:', userRole);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      
      {Sidebar(userRole)}
    </Drawer.Navigator>
  );
};

export default AppStack;