import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import MainNavigator from './src/navigation/MainNavigator';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { initSocket, disconnectSocket } from './src/sockets/socketService';
import ErrorBoundary from './src/screens/ErrorBoundary';

const AppContent = () => {
  const { user } = useAuth();
  LogBox.ignoreAllLogs();

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
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </AuthProvider>
      <Toast position='bottom' />
    </NavigationContainer>
  );
}