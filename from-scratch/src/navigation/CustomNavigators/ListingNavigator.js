import ListingForm from '../../screens/ListingForm';
import Listing from '../../components/Listing/Listing';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ListingStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="ListingList" component={Listing} />
    <Stack.Screen name="ListingForm" component={ListingForm} />
  </Stack.Navigator>
);

export default ListingStackScreen;