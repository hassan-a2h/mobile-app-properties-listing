import { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import axios from 'axios';
import { socket } from '../../App';
import MessageList from '../components/Chat/MessageList';
import MessageForm from '../components/Chat/MessageForm';
import handleReceiveMessage from '../utils/handleReceiveMessage';

function ChatMessages({ route }) {
  const { currentChat, userId } = route.params;
  const [ messages, setMessages ] = useState([]);

  useEffect(() => {
    async function getMessages(lastMessageDate = null) {
      try {
        const response = await axios.get(`/api/c/chats/${currentChat._id}/messages`, {
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
    socket.on('receiveMessage', (data) => handleReceiveMessage(socket, currentChat, userId, setMessages, data));

    return () => {
      socket.off('receiveMessage', (data) => handleReceiveMessage(socket, currentChat, userId, setMessages, data));
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {messages.length > 0 ? (
          <MessageList messages={messages} userId={userId} />
        ) : (
          <Text>No messages found</Text>
        )}
      </ScrollView>

      <MessageForm socket={socket} userId={userId} currentChat={currentChat} setMessages={setMessages} />
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
});

export default ChatMessages;
