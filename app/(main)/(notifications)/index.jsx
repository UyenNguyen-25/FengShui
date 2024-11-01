import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

const NotificationScreen = () => {
  const notifications = [
    {
      id: 1,
      avatar: "/api/placeholder/48/48",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "1m ago",
      unread: true
    },
    {
      id: 2,
      avatar: "/api/placeholder/48/48",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "1m ago",
      unread: true
    },
    {
      id: 3,
      avatar: "/api/placeholder/48/48",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "1m ago",
      unread: true
    },
    {
      id: 4,
      avatar: "/api/placeholder/48/48",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "1m ago",
      unread: true
    },
    {
      id: 5,
      avatar: "/api/placeholder/48/48",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "1m ago",
      unread: true
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Notification</Text>
      </View>

      {/* Notifications List */}
      <View style={styles.notificationsList}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            {/* Avatar */}
            <Image
              source={{ uri: notification.avatar }}
              style={styles.avatar}
            />

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.message}>
                {notification.message}
              </Text>
              <Text style={styles.time}>
                {notification.time}
              </Text>
            </View>

            {/* Unread Indicator */}
            {notification.unread && (
              <View style={styles.unreadIndicator}>
                <Text style={styles.unreadText}>2</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  button: {
    padding: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: 'red',
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  unreadIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
  },
});

export default NotificationScreen;