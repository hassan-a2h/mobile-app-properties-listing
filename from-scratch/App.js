import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import MainNavigator from './src/navigation/MainNavigator';
import Toast from 'react-native-toast-message';
import { initSocket, disconnectSocket } from './src/sockets/socketService';

const AppContent = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      initSocket(user.id);
    }
    return () => {
      disconnectSocket();
    };
  }, [user]);

  return <MainNavigator />;
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
      <Toast position='bottom' />
    </NavigationContainer>
  );
}