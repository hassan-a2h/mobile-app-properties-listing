import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import sendMessage from '../../utils/sendMessage';
import { Ionicons } from '@expo/vector-icons';

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
        <Ionicons name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    paddingBottom: 10,
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
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
  }
});

export default MessageForm;