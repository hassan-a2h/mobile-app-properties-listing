// AppStack.js

import React, { useEffect, useState, useCallback } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../navigation/CustomDrawer/CustomDrawer';
import CustomDrawerTopbar from '../components/CustomDrawerTopbar';
import Sidebar from '../utils/sidebarOptions';
import fetchUnreadMessages from '../utils/fetchUnreadMessages';
import { useAuth } from '../context/AuthContext';
import { initSocket, getSocket } from '../sockets/socketService';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  const { user } = useAuth();
  const [unreadMessages, setUnreadMessages] = useState(0);

  const updateUnreadMessages = useCallback(async () => {
    console.log('!!!! Updating unread messages...');
    try {
      const unread = await fetchUnreadMessages(user?.id);
      setUnreadMessages(unread);
      console.log('unread messages updated...', unread);
    } catch (error) {
      console.error('Error updating unread messages:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      initSocket(user.id, updateUnreadMessages);
    }

    const socket = getSocket();

    // Initial fetch of unread messages
    updateUnreadMessages();

    return () => {
      if (socket) {
        socket.off('receiveMessage');
        socket.off('unreadCountUpdated');
      }
    };
  }, [user, updateUnreadMessages]);

  console.log('Current unread messages:', unreadMessages);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent unreadMessagesCount={unreadMessages?.unreadCount} {...props} />}
      screenOptions={({ route }) => ({ 
        headerShown: true,
        header: () => <CustomDrawerTopbar title={route.name} value={unreadMessages?.unreadCount} />
      })}
    >
      {Sidebar(user?.role)}
    </Drawer.Navigator>
  );
};

export default AppStack;