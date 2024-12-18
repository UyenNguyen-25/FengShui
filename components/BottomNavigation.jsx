import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SCREEN } from "@/constants/screen";

const BottomNavigation = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(SCREEN.HOME)}
        >
          <FontAwesome name="home" size={26} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(SCREEN.SOCIAL_SCREEN)}
        >
          <MaterialCommunityIcons name="post-outline" size={26} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(SCREEN.NOTIFICATION_SCREEN)}
        >
          <FontAwesome name="bell" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(SCREEN.FENGSHUI_SCREEN)}
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
