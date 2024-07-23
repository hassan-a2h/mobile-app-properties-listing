import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '../../context/AuthContext';

const CustomDrawer = ({ unreadMessagesCount, ...props }) => {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        {/* Custom DrawerItemList to add special design for "Chat" */}
        {props.state.routes.map((route, index) => {
          const focused = index === props.state.index;
          if (route.name === 'Chat') {
            return (
              <View key={route.key} style={styles.chatItemContainer}>
                <DrawerItem
                  label={`Chats ${ unreadMessagesCount > 0 && (unreadMessagesCount > 9 ? '(9+ new)' : '(' + unreadMessagesCount + ' new)') }`}
                  onPress={() => props.navigation.navigate(route.name)}
                  labelStyle={[styles.itemText, focused && styles.itemTextFocused]}
                  style={[styles.chatItem, focused && styles.chatSelected]}
                />
              </View>
            );
          } else {
            return (
              <DrawerItem
                key={route.key}
                label={route.name}
                onPress={() => props.navigation.navigate(route.name)}
                labelStyle={[styles.itemText, focused && styles.itemTextFocused]}
                style={[styles.item, focused && styles.itemFocused]}
              />
            );
          }
        })}
        <DrawerItem
          label="Logout"
          onPress={logout}
          labelStyle={styles.itemText}
          style={styles.logout}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  chatItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  value: {
    marginLeft: 10,
    fontSize: 16,
    color: '#ffffff',
    // borderWidth: 1,
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 12,
    // borderColor: 'gray',
    backgroundColor: '#FFFFFF',
  },
  messageNotification: {
    color: '#ffffff',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
  },
  chatItem: {
    flex: 1,
  },
  itemFocused: {
    backgroundColor: '#00BE8E',
  },
  chatSelected: {
    backgroundColor: '#00BE8E',
  },
  itemText: {
    color: 'black',
    textAlign: 'center',
  },
  itemTextFocused: {
    color: 'white',
  },
  additionalData: {
    marginLeft: 10,
    fontSize: 14,
    color: 'gray',
  },
  logout: {
    backgroundColor: '#FFCCCB',
  },
});

export default CustomDrawer;
