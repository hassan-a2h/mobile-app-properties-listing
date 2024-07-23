// socketService.js

import io from 'socket.io-client';
import getBackendAddress from '../utils/getBackendAddress';

const address = getBackendAddress();
let socket = null;

export const initSocket = (userId, updateUnreadMessages) => {
  if (!socket) {
    console.log('Initializing socket connection...');
    socket = io(address, { 
      transports: ['websocket'],
      query: { userId }
    });

    socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // Add event listeners here
    socket.on('receiveMessage', () => {
      console.log('Received message, updating unread count');
      updateUnreadMessages();
    });

    socket.on('unreadCountUpdated', (data) => {
      console.log('Unread count updated from server:', data);
      if (data?.userId === userId) {
        console.log('local userId,', userId, 'remote userId:', data.userId);
        updateUnreadMessages();
      }
    });

    // Debug all incoming events
    socket.onAny((eventName, ...args) => {
      console.log('Received event:', eventName, 'with data:', args);
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.warn('Attempted to get socket before initialization');
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log('Disconnecting socket');
    socket.disconnect();
    socket = null;
  }
};