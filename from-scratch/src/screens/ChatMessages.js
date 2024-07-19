import { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, ScrollView, View, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { socket } from '../../App';
import localTime from '../utils/localDateTime.js';

function ChatMessages({ route }) {
  const { chatId, userId } = route.params;
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    async function getMessages(lastMessageDate = null) {
      try {
        const response = await axios.get(`/api/c/chats/${chatId}/messages`, {
          params: {
            userId,
            lastMessageDate,
            limit: 20
          },
        });
        const newMessages = response.data;
        console.log('messages received:', newMessages);
        setMessages((prevMessages) => [...newMessages, ...prevMessages]);
      } catch (error) {
        console.log('Error fetching messages:', error);
      }
    }

    getMessages();

    // Socket connection
    socket.on('connect', () => {
      console.log('socket connected');
    });

    socket.on('newMessage', (data) => {
      console.log('received message:', data);
      setMessages((prevMessages) => [data, ...prevMessages]);
    });

    return () => {
      socket.off('connect');
      socket.off('newMessage');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('messages in state:', messages);
  }, [messages]);

  function pushTempMessage() {
    const tempMessage = {
      message: userMessage,
      userId: userId,
      timestamp: new Date().toISOString()
    };
    setMessages((prevMessages) => [tempMessage, ...prevMessages]);
    setUserMessage('');
    socket.emit('tempMessage', tempMessage);
  }

  const sendMessage = (message) => {
    const receiverId = currentChat.userId === userId ? currentChat.agentId : currentChat.userId;
    const newMessage = {
      chatId: currentChat._id,
      senderId: userId,
      receiverId,
      message,
    };
    socket.emit('sendMessage', newMessage);
    setMessages(prev => [newMessage, ...prev]);
  };

  return (
    <View style={styles.container}>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
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
          ))
        ) : (
          <Text>No messages found</Text>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userMessage}
          onChangeText={setUserMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={pushTempMessage} style={styles.sendButton}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    transform: [{ rotate: '180deg'}],
    paddingBottom: 10,
    paddingTop: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '70%',
    alignSelf: 'flex-start',
    transform: [{ rotate: '180deg'}],
  },
  messageSent: {
    backgroundColor: '#D0FDF5',
    alignSelf: 'flex-start',
  },
  messageReceived: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#0b141d',
  },
  messageTimestamp: {
    fontSize: 8,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
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
    justifyContent: 'center',
    padding: 10,
  },
});

export default ChatMessages;
