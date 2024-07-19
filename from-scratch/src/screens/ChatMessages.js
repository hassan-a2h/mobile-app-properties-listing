import { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { socket } from '../../App';

function ChatMessages({ route }) {
  const { chatId, userId } = route.params;
  const [messages, setMessages] = useState([]);

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
      } catch(error) {
        console.log('Error fetching messages:', error);
      }
    }

    getMessages();

    // for socket connection
    socket.on('connect', () => {
      console.log('socket connected');
    });

    socket.on('newMessage', (data) => {
      console.log('received message:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
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
      message: 'temp message',
      userId: userId, // Assuming messages have a userId field
      timestamp: new Date().toISOString() // Add a timestamp or other fields as necessary
    };
    setMessages((prevMessages) => [...prevMessages, tempMessage]);
    // Simulate receiving the message via socket
    socket.emit('tempMessage', tempMessage);
  }

  return (
    <View style={styles.container}>
      <Text>Messages of each Chat {chatId}</Text>

      <ScrollView style={styles.scrollView}>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <View key={index} style={styles.messageContainer}>
              <Text style={styles.messageText}>{message.message}</Text>
            </View>
          ))
        ) : (
          <Text>No messages found</Text>
        )}
      </ScrollView>

      <Button onPress={pushTempMessage} title="Add a temp message" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
  messageContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'blue',
    marginVertical: 5,
  },
  messageText: {
    color: '#333',
  },
});

export default ChatMessages;
