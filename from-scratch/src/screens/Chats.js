import { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { socket } from '../../App';
import ChatNavigator from '../navigation/CustomNavigators/ChatNavigator';

function Chats() {
  const [ userId, setUserId ] = useState(null);
  const [chats, setChats] = useState(null);
  const [loadingChats, setLoadingChats] = useState(true);
  const [chatsError, setChatsError] = useState(null);

  const navigation = useNavigation();

  //  for getting current user's id
  useEffect(() => {
    async function getId() {
      const id = await AsyncStorage.getItem('userId');
      setUserId(prevId => id);
    }
    
    getId();

    // for socket connection
    socket.on('connect', () => {
      console.log('socket connected');
    });

    return () => {
      socket.off('connect');
      socket.disconnect();
    }
  }, []);

  // for fetching chats of current user from backend
  useEffect(() => {
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
    
    getChats();
  }, [userId]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      { loadingChats && <Text>Loading chats...</Text> }
      { chatsError && <Text>{chatsError}</Text> }

      { chats && chats.map((chat) => (
        <TouchableOpacity key={chat._id} style={styles.chat} onPress={() => navigation.navigate('ChatMessages', { currentChat: chat, userId: userId, name: chat.recipientName })}>
          <Text style={{ fontWeight: 'bold', display: 'block' }}>{chat.recipientName}</Text>
          <Text>{chat.lastMessage.message}</Text>
        </TouchableOpacity>
      )) }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
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
  }
});

export default Chats;