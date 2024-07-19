import { View, Text, StyleSheet } from 'react-native';
import localTime from '../../utils/localDateTime';

function MessageList({ messages, userId }) {
  return (
    <>
      { messages.map((message, index) => {
        return (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.senderId === userId ? styles.messageSent : styles.messageReceived
            ]}
          >
            <Text style={styles.messageText}>{message.message}</Text>
            <Text style={styles.messageTimestamp}>{localTime(message.createdAt)}</Text>
          </View>
        );
      }) }
    </>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '70%',
    alignSelf: 'flex-start',
    transform: [{ rotate: '180deg'}],
  },
  messageSent: {
    backgroundColor: '#DFFFED',
    alignSelf: 'flex-start',
    borderBottomRightRadius: 0,
  },
  messageReceived: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    color: '#0b141d',
  },
  messageTimestamp: {
    fontSize: 8,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
});

export default MessageList;