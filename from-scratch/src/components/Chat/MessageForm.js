import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import sendMessage from '../../utils/sendMessage';

function MessageForm({ socket, userId, currentChat, setMessages }) {
  const [ userMessage, setUserMessage ] = useState('');

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={userMessage}
        onChangeText={setUserMessage}
        placeholder="Type a message..."
      />
      <TouchableOpacity disabled={ userMessage.trim() === '' } onPress={() => sendMessage(socket, userId, currentChat, userMessage, setMessages, setUserMessage)} style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#26C49F',
    marginLeft: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
  }
});

export default MessageForm;