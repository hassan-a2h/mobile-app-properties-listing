import { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, View, StyleSheet, ActivityIndicator } from "react-native";
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getSocket } from '../sockets/socketService';
import CustomTopbar from '../components/CustomDrawerTopbar';
import { useUnreadMessages } from '../context/UnreadMessagesContext';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';

function Chats({ navigation }) {
  const { user } = useAuth();
  const userId = user?.id;
  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [chatsError, setChatsError] = useState(null);
  const { unreadMessages } = useUnreadMessages();
  const { unreadChats } = unreadMessages;
  const { chatLastMessage } = unreadMessages;
  const { newChat, setNewChat } = useChat();

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

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('newChatCreated', async (data) => {
      const newChat = data?.chat[0];
      if (newChat.agentId === userId) {
        const recipient = newChat.userId === userId ? newChat.agentId : newChat.userId;
        const recipientData = await axios.get(`/api/users/${recipient}`);
        const chat = { ...newChat, recipientName: recipientData.data.name };
        setChats(prevChats => [chat, ...prevChats]);  
      }
    });

    return () => {
      socket.off('newChatCreated');
    };
  }, [userId]);

  async function getChats() {
    if (!userId) return;

    setLoadingChats(true);
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
      setChatsError(null);
    } catch (error) {
      setChatsError('Error fetching chats');
      setLoadingChats(false);
    }
  }

  return (
    <View style={styles.topContainer}>
      <CustomTopbar title='Chats' value={unreadMessages} />
      <ScrollView style={styles.container}>
        {loadingChats ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00BE8E" />
            <Text style={styles.loadingText}>Loading chats...</Text>
          </View>
        ) : chatsError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{chatsError}</Text>
          </View>
        ) : chats.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Chats Available</Text>
          </View>
        ) : (
          chats.map((chat) => (
            <TouchableOpacity
              key={chat._id}
              style={styles.chat}
              onPress={() => navigation.navigate('ChatMessages', { currentChat: chat, userId: userId, name: chat.recipientName })}
            >
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{chat.recipientName}</Text>
                <Text style={styles.chatMessage}>
                  {chatLastMessage && chatLastMessage[chat._id] ? chatLastMessage[chat._id] :
                    chat?.lastMessage?.isPropertyTitle ? 'Property Details...' : chat?.lastMessage?.message}
                </Text>
              </View>
              {unreadChats && unreadChats[chat._id] && (
                <View style={styles.value}>
                  <Text style={styles.messageNotification}>{unreadChats[chat._id]}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#00BE8E',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#aaa',
  },
  chat: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatMessage: {
    color: '#555',
    fontSize: 14,
  },
  value: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#00BE8E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageNotification: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Chats;
