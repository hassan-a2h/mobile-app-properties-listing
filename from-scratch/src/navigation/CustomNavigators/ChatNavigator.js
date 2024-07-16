import { createStackNavigator } from "@react-navigation/stack";
import Chats from "../../screens/Chats";
import ChatMessages from "../../screens/ChatMessages";

const { Navigator, Screen } = createStackNavigator();

function ChatNavigator() {
  return (
    <Navigator initialRouteName="Chats" screenOptions={{ headerShown: true }} >
      <Screen name='Chats' component={Chats} />
      <Screen name='ChatMessages' component={ChatMessages} />
    </Navigator>
  );
}

export default ChatNavigator;