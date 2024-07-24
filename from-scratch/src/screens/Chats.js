// Chats.js

import { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, View, StyleSheet } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getSocket } from '../sockets/socketService';
import CustomTopbar from '../components/CustomDrawerTopbar';
import { useUnreadMessages } from '../context/UnreadMessagesContext';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';

function Chats({ route, navigation }) {
  const { user } = useAuth();
  const userId = user?.id;
  const [chats, setChats] = useState(null);
  const [loadingChats, setLoadingChats] = useState(true);
  const [chatsError, setChatsError] = useState(null);
  const { unreadMessages } = useUnreadMessages();
  const { unreadChats } = unreadMessages;
  const { chatLastMessage } = unreadMessages;
  const { newChat, setNewChat } = useChat();

  console.log('unread Messages:', unreadMessages);
  console.log('Chats component, last Message: ', chatLastMessage);

  useFocusEffect(
    useCallback(() => {
      if (newChat) {
        navigation.navigate('ChatMessages', { 
          currentChat: newChat, 
          userId: userId, 
          name: newChat.recipientName 
        });
        setNewChat(null);
      } else if (userId) {
        getChats();
      }
    }, [newChat, userId, navigation])
  );

  //  for getting current user's id
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('newChatCreated', async (data) => {
      console.log('Chats screen... inside new chat created', data);
      console.log('Chats screen... user ID', userId);

      const newChat = data?.chat[0];
      if (newChat.agentId === userId) {
        const recipient = newChat.userId === userId ? newChat.agentId : newChat.userId;
        const recipientData = await axios.get(`/api/users/${recipient}`);
        const chat = { ...newChat, recipientName: recipientData.data.name };
        console.log('Chats Screen, complete chat:', chat);
        setChats(prevChats => [chat, ...prevChats]);  
      }
    })

    return () => {
      socket.off('newChatCreated');
    }
  }, []);

  async function getChats() {
    if (!userId) return;

    setLoadingChats(true);
    console.log('logged in userId:', userId);
    try {
      const response = await axios.get(`/api/c/chats/${userId}`);
      const chatsWithNames = await Promise.all(
        response.data.map(async (chat) => {
          const recipient = chat.userId === userId ? chat.agentId : chat.userId;
          const recipientData = await axios.get(`/api/users/${recipient}`);
          return { ...chat, recipientName: recipientData.data.name };
        })
      );
      setChats(chatsWithNames);
      setLoadingChats(false);
      setChatsError(false);
      console.log('chats received from server:', response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
      setChatsError('Error fetching chats');
      setLoadingChats(false);
    }
  }

  return (
    <View style={styles.topContainer}>
      <ScrollView style={styles.container}>
      <CustomTopbar title='Chats' value={unreadMessages} />
      { loadingChats && <Text>Loading chats...</Text> }
      { chatsError && <Text>{chatsError}</Text> }

      { chats && chats.map((chat) => (
        <TouchableOpacity key={chat._id} style={styles.chat} onPress={() => navigation.navigate('ChatMessages', { currentChat: chat, userId: userId, name: chat.recipientName })}>
          <View>
            <Text style={{ fontWeight: 'bold', display: 'block' }}>{chat.recipientName}</Text>
            { chatLastMessage && chatLastMessage[chat._id] ? <Text>{chatLastMessage[chat._id]}</Text> : chat?.lastMessage?.isPropertyTitle ? <Text>Property Details...</Text> : <Text>{chat?.lastMessage?.message}</Text> }
          </View>
          
          { unreadChats && unreadChats[chat._id] && <View style={styles.value}><Text style={styles.messageNotification}>{unreadChats[chat._id]}</Text></View> }
        </TouchableOpacity>
      )) }
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chat: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    marginRight: 10,
    fontSize: 16,
    color: '#ffffff',
    // borderWidth: 1,
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 12,
    // borderColor: 'gray',
    backgroundColor: '#00BE8E',
  },
  messageNotification: {
    color: '#ffffff',
  },
});

export default Chats;
