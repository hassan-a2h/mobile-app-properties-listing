import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawerContent from '../navigation/CustomDrawer/CustomDrawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawerTopbar from '../components/CustomDrawerTopbar';
import Sidebar from '../utils/sidebarOptions';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



const AppStack = () => {
  const [ userRole, setUserRole ] = useState(null);

  useEffect(() => {
    async function getRole() {
      const role = await AsyncStorage.getItem('role');
      setUserRole(prevRole => role);
    }
    
    getRole();
  }, []);

  console.log('role:', userRole);

  return (
    <Drawer.Navigator
      drawerContent={ (props) => <CustomDrawerContent {...props} />}
      screenOptions={ ({ route }) => ({ 
        headerShown: true,
        header: () => <CustomDrawerTopbar title={route.name} value={2} />
       })}
    >
      
      {Sidebar(userRole)}
    </Drawer.Navigator>
  );
};

export default AppStack;