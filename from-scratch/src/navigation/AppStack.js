import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawerContent from '../navigation/CustomDrawer/CustomDrawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListingForm from '../screens/ListingForm';
import Listing from '../components/Listing/Listing';
import ChatNavigator from './CustomNavigators/ChatNavigator';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ListingStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="ListingList" component={Listing} />
    <Stack.Screen name="ListingForm" component={ListingForm} />
  </Stack.Navigator>
);

function Sidebar(role) {
  if (role === 'admin') {
    return (
      <>
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Chat" component={ChatNavigator} />
        <Drawer.Screen name="All Listings" component={ListingStackScreen} initialParams={{ limit: 20 }} />
        <Drawer.Screen name="My Listings" component={ListingStackScreen} initialParams={{ fromUser: true, limit: 10 }} />
        <Drawer.Screen name="Create Listing" component={ListingForm} />
        <Drawer.Screen name="Add User" component={ProfileScreen} />
      </>
    );
  } 

  if (role === 'agent') {
    return (
      <>
        <Drawer.Screen name="Home" component={HomeStack} options={{ headerTitle: 'Home' }} />
        <Drawer.Screen name="Chat" component={ChatNavigator} />
        <Drawer.Screen name="All Listings" component={Listing} initialParams={{ limit: 20 }} />
        <Drawer.Screen name="My Listings" component={Listing} initialParams={{ fromUser: true, limit: 10 }} />
        <Drawer.Screen name="Create Listing" component={ListingForm} />
        <Drawer.Screen name="Socials" component={ProfileScreen} />
      </>
    );
  }

  return (
    <>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Listings" component={ProfileScreen} />
      <Drawer.Screen name="Chat" component={ChatNavigator} />
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