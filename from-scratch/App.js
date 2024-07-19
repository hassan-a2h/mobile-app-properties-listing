import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import MainNavigator from './src/navigation/MainNavigator';
import Toast from 'react-native-toast-message';
import io from 'socket.io-client';
import getBackendAddress from './src/utils/getBackendAddress';

export const socket = io(getBackendAddress(), { transports: ['websocket'] });

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
      <Toast position='bottom' />
    </NavigationContainer>
  );
}
