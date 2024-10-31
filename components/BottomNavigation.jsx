import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const BottomNavigation = ({ state, descriptors, navigation }) => {

  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("home")}
        >
          <FontAwesome name="home" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("social-screen")}
        >
          <Image
            source={require("@/assets/images/more.png")}
            style={[styles.menuImage]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}
        >
          <Image
            source={require("@/assets/images/koi-fish.png")}
            style={[styles.menuImage, { width: 30, height: 24 }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavContainer: {
    zIndex: 1,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E8ECF0",
    backgroundColor: "white",
  },
  navItem: {
    padding: 8,
  },
  menuImage: {
    width: 24,
    height: 24,
  },
});

export default BottomNavigation;
