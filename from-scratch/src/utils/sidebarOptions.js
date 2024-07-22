import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ChatNavigator from '../navigation/CustomNavigators/ChatNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import ListingStackScreen from '../navigation/CustomNavigators/ListingNavigator';
import Listing from '../components/Listing/Listing';
import ListingForm from '../screens/ListingForm';

const Drawer = createDrawerNavigator();

function sidebarOptions(role) {
  if (role === 'admin') {
    return (
      <>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Chat" component={ChatNavigator} options={{ headerShown: false }} />
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
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Chat" component={ChatNavigator} options={{ headerShown: false }} />
        <Drawer.Screen name="All Listings" component={Listing} initialParams={{ limit: 20 }} />
        <Drawer.Screen name="My Listings" component={Listing} initialParams={{ fromUser: true, limit: 10 }} />
        <Drawer.Screen name="Create Listing" component={ListingForm} />
        <Drawer.Screen name="Socials" component={ProfileScreen} />
      </>
    );
  }

  return (
    <>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Listings" component={ProfileScreen} />
      <Drawer.Screen name="Chat" component={ChatNavigator} options={{ headerShown: false }} />
    </>
  );
}

export default sidebarOptions;