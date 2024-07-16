import { useState, useEffect } from 'react';
import { Text, ScrollView, View } from 'react-native';
import axios from 'axios';

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
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      } catch(error) {
        console.log('Error fetching messages:', error);
      }
    }

    getMessages();
  }, []);
  return (
    <View>
      <Text>Messages of each Chat {chatId}</Text>

      <ScrollView>
      { messages && 
          messages.map((message) => (
          <View key={message._id}>
            <Text>{message.text}</Text>
          </View>
        ))
      }

      { !messages && <Text>No messages found</Text> }
      </ScrollView>
    </View>
  );
}

export default ChatMessages;