import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '../../context/AuthContext';

const CustomDrawer = ({ unreadMessagesCount, ...props }) => {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        {/* Custom DrawerItemList to add special design for "Chat" */}
        { props.state.routes.map((route, index) => {

          const focused = index === props.state.index;

          if (route.name === 'Chats') {
            return (
              <View key={route.key} style={styles.chatItemContainer}>
                <DrawerItem
                  label={ () => ChatDrawerItem(unreadMessagesCount, focused) }
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

const ChatDrawerItem = (unreadMessagesCount, focused) => {
  return (
    <View style={styles.chatDrawerItem}>
      <Text style={[styles.itemText, focused && styles.itemTextFocused]}>{'Chats'}</Text>
      { unreadMessagesCount > 0 && 
        <View style={styles.value}>
          <Text style={styles.messageNotification}>{unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}</Text>
        </View> 
      }
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  chatDrawerItem: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  chatItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  itemText: {
    color: 'red',
    fontWeight: 'normal',
    color: '#4F4F4F',
  },
  itemFocused: {
    backgroundColor: '#00BE8E',
  },
  chatSelected: {
    backgroundColor: '#00BE8E',
  },
  value: {
    marginLeft: 8,
    fontSize: 1,
    color: '#ffffff',
    // borderWidth: 1,
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 12,
    // borderColor: 'gray',
    backgroundColor: '#6F6F6F',
  },
  messageNotification: {
    color: '#ffffff',
  },
  itemTextFocused: {
    color: 'white',
  },
  logout: {
    backgroundColor: '#FFCCCB',
  },
});

export default CustomDrawer;
