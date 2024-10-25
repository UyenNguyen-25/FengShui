import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const MenuIcons = ({ navigation }) => {
    console.log(navigation); 
  return (
    <View>
      <Text style={styles.welcome}>Chào bạn, Nguyen Van An</Text>
      <Text style={styles.subWelcome}>Hôm nay bạn muốn xem gì?</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Home')} 
        >
          <View style={styles.menuIcon}>
            <Image
              source={require("../assets/images/layout.png")}
              style={[styles.menuImage, { width: 30, height: 30 }]}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>Tổng quan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Pond')}
        >
          <View style={styles.menuIcon}>
            <Image
              source={require("../assets/images/pond.png")}
              style={styles.menuImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>Hồ cá</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("PhongThuy")}
        >
          <View style={styles.menuIcon}>
            <Image
              source={require("../assets/images/fengshui.png")}
              style={styles.menuImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>Phong Thủy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("ChamSoc")}
        >
          <View style={styles.menuIcon}>
            <Image
              source={require("../assets/images/sea-life.png")}
              style={styles.menuImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>Chăm sóc</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    color: "#2C3542",
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  subWelcome: {
    color: "#8B95A1",
    paddingHorizontal: 16,
    marginTop: 4,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 24,
  },
  menuItem: {
    alignItems: "center",
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "red",
  },
  menuText: {
    color: "#2C3542",
    fontSize: 12,
  },
  menuImage: {
    width: 40,
    height: 40,
  },
});

export default MenuIcons;
