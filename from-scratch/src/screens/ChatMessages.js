import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import localTime from '../utils/localDateTime';
import handleReceiveMessage from '../utils/handleReceiveMessage';
import { getSocket } from '../sockets/socketService';
import MessageForm from '../components/Chat/MessageForm';

function ChatMessages({ route }) {
  const { currentChat, userId } = route.params;
  const [messages, setMessages] = useState([]);
  const [titleMessages, setTitleMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const flatListRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = getSocket();
    if (!socket.current) return;

    getMessages();

    const appendMessage = (data) => handleReceiveMessage(socket.current, currentChat, userId, setMessages, data);
    socket.current.on('receiveMessage', appendMessage);

    return () => {
      socket.current.off('receiveMessage', appendMessage);
    };
  }, []);

  const getMessages = useCallback(async (lastMessageDate = null) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/api/c/chats/${currentChat._id}/messages`, {
        params: {
          userId,
          lastMessageDate,
          limit: 20
        },
      });
      const newMessages = response.data;
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      setHasMore(newMessages.length === 20);
      socket.current.emit('messagesRead', { userId });
    } catch (error) {
      console.log('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentChat._id, userId, isLoading, hasMore]);

  const loadMoreMessages = useCallback(() => {
    if (messages.length > 0) {
      const oldestMessage = messages[messages.length - 1];
      getMessages(oldestMessage.createdAt);
    }
  }, [messages, getMessages]);

  const fetchTitleMessages = useCallback(async (id) => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      setTitleMessages(prev => ({ ...prev, [id]: response.data }));
    } catch (error) {
      console.error('Error fetching title messages:', error);
    }
  }, []);

  const renderItem = useCallback(({ item: message }) => 
    renderMessage(message, userId, titleMessages, fetchTitleMessages),
  [userId, titleMessages, fetchTitleMessages]);

  const keyExtractor = useCallback((item) => item._id, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
        inverted
        ListFooterComponent={isLoading ? <Text style={styles.loadingText}>Loading...</Text> : null}
        contentContainerStyle={styles.contentContainer}
      />

      <MessageForm socket={socket.current} userId={userId} currentChat={currentChat} setMessages={setMessages} />
    </View>
  );
}

const renderMessage = (msg, userId, titleMessages, fetchTitleMessages) => {
  if (msg.isPropertyTitle) {
    if (!titleMessages?.[msg.message]) {
      fetchTitleMessages(msg.message);
    }

    return (
      <View style={styles.propertyDetails} key={msg._id}>
        {titleMessages[msg.message] ? (
          <>
            <Text style={styles.propertyTitle}>{titleMessages[msg.message].title}</Text>
            <Text style={styles.propertyDescription}>{titleMessages[msg.message].description}</Text>
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyPrice}>{titleMessages[msg.message].price}</Text>
              <Text> - </Text>
              <Text style={styles.propertyLocation}>{titleMessages[msg.message].location}</Text>
            </View>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }

  return (
    <View style={[
      styles.messageContainer,
      msg.senderId === userId ? styles.messageSent : styles.messageReceived
    ]}>
      <Text style={styles.messageText}>{msg.message}</Text>
      <Text style={styles.messageTimestamp}>{localTime(msg.createdAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  loadingText: {
    textAlign: 'center',
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '70%',
  },
  messageSent: {
    backgroundColor: '#DFFFED',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  messageReceived: {
    backgroundColor: '#f5f5f5',
    alignSelf: 'flex-start',
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
  propertyDetails: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 5,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  propertyDescription: {
    marginTop: 5,
  },
  propertyInfo: {
    flexDirection: 'row',
    marginTop: 5,
  },
  propertyPrice: {
    fontWeight: 'bold',
  },
  propertyLocation: {
    fontStyle: 'italic',
  },
});

export default ChatMessages;