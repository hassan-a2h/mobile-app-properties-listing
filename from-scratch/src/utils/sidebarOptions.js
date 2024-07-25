import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ChatNavigator from '../navigation/CustomNavigators/ChatNavigator';
import Listing from '../components/Listing/Listing';
import ListingForm from '../screens/ListingForm';
import Register from '../screens/RegisterScreen';
import Socials from '../screens/Socials';

const Drawer = createDrawerNavigator();

function sidebarOptions(role, unreadMessages) {
  if (role === 'admin') {
    return (
      <>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Chats" component={ChatNavigator} options={{ headerShown: false }} />
        <Drawer.Screen name="All Listings" component={Listing} initialParams={{ limit: 20 }} options={({ route }) => ({ title: route.params.name || 'All Listings' })} />
        <Drawer.Screen name="My Listings" component={Listing} initialParams={{ fromUser: true, limit: 10 }} />
        <Drawer.Screen name="Create Listing" component={ListingForm} />
        <Drawer.Screen name="Add User" component={Register} />
      </>
    );
  }

  if (role === 'agent') {
    return (
      <>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Chats" component={ChatNavigator} options={{ headerShown: false }} />
        <Drawer.Screen name="All Listings" component={Listing} initialParams={{ limit: 20 }} options={({ route }) => ({ title: route.params.name || 'All Listings' })} />
        <Drawer.Screen name="My Listings" component={Listing} initialParams={{ fromUser: true, limit: 10 }} />
        <Drawer.Screen name="Create Listing" component={ListingForm} />
        <Drawer.Screen name="Socials" component={Socials} />
      </>
    );
  }

  return (
    <>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="All Listings" component={Listing} initialParams={{ limit: 20 }} options={({ route }) => ({ title: route.params.name || 'All Listings' })} />
      <Drawer.Screen name="Chats" component={ChatNavigator} options={{ headerShown: false }} />
    </>
  );
}

export default sidebarOptions;