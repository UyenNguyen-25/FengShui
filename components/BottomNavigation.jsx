import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <FontAwesomeIcon icon={faHouse} size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("SocialScreen")}
        >
          <Image
            source={require("../assets/images/more.png")}
            style={[styles.menuImage]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require("../assets/images/koi-fish.png")}
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
