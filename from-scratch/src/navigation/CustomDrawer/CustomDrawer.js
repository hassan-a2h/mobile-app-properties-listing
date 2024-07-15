import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '../../context/AuthContext';

const CustomDrawer = (props) => {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItemList {...props} />
        <DrawerItem style={styles.logout} label="Logout" onPress={logout} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  logout: {
    backgroundColor: '#FFCCCB',
    color: 'red',
  }
});

export default CustomDrawer;