import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useAuth } from "../../context/AuthContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const iconMapping = {
  Home: "home",
  Chats: "chat",
  "All Listings": "view-list",
  "My Listings": "clipboard-list",
  "Create Listing": "plus-box",
  "Add User": "account-plus",
  Socials: "account-group",
  Logout: "logout",
};

const CustomDrawer = ({ unreadMessagesCount, ...props }) => {
  const { logout } = useAuth();

  const renderIcon = (name, focused) => {
    return (
      <Icon
        name={iconMapping[name] || "circle"}
        size={20}
        color={focused ? "#007053" : "#4F4F4F"}
      />
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        {props.state.routes.map((route, index) => {
          const focused = index === props.state.index;

          if (route.name === "Chats") {
            return (
              <View key={route.key} style={styles.chatItemContainer}>
                <DrawerItem
                  icon={() => renderIcon(route.name, focused)}
                  label={() => ChatDrawerItem(unreadMessagesCount, focused)}
                  onPress={() => props.navigation.navigate(route.name)}
                  labelStyle={[
                    styles.itemText,
                    focused && styles.itemTextFocused,
                  ]}
                  style={[styles.chatItem, focused && styles.chatSelected]}
                />
              </View>
            );
          } else {
            return (
              <DrawerItem
                key={route.key}
                icon={() => renderIcon(route.name, focused)}
                label={route.name}
                onPress={() => props.navigation.navigate(route.name)}
                labelStyle={[
                  styles.itemText,
                  focused && styles.itemTextFocused,
                ]}
                style={[styles.chatItem, focused && styles.chatSelected]}
              />
            );
          }
        })}
        <DrawerItem
          icon={({ focused }) => renderIcon("Logout", focused)}
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
      <Text style={[styles.itemText, focused && styles.itemTextFocused]}>
        {"Chats"}
      </Text>
      {unreadMessagesCount > 0 && (
        <View style={styles.value}>
          <Text style={styles.messageNotification}>
            {unreadMessagesCount > 9 ? "9+" : unreadMessagesCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  chatDrawerItem: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  chatItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageNotification: {
    color: "#ffffff",
  },
  item: {
    flex: 1,
    justifyContent: "center",
  },
  chatItem: {
    flex: 1,
  },
  itemText: {
    color: "#4F4F4F",
    fontWeight: "normal",
    marginLeft: -20, // Adjust text position to accommodate icon
  },
  itemFocused: {
    backgroundColor: "#00BE8E",
  },
  chatSelected: {
    backgroundColor: "#d2fff4",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#00BE8E",
  },
  value: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 6,
    backgroundColor: "#00BE8E",
    justifyContent: "center",
    alignItems: "center",
  },
  messageNotification: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  itemTextFocused: {
    color: "#007053",
  },
  logout: {
    backgroundColor: "#FFDFDF",
    borderWidth: 1,
    borderColor: "#ffcccb",
  },
});

export default CustomDrawer;
