import { Text } from 'react-native';

function ChatMessages({ route }) {
  const { chatId } = route.params;

  return (
    <Text>Messages of each Chat {chatId}</Text>
  );
}

export default ChatMessages;