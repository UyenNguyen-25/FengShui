import * as React from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { hp } from "@/helper/common";

const { width: viewportWidth } = Dimensions.get("window");

const images = [
  require("@/assets/images/carousel_1.jpg"),
  require("@/assets/images/carousel_2.jpg"),
  require("@/assets/images/carousel_3.jpg"),
  require("@/assets/images/carousel_4.jpg"),
  require("@/assets/images/carousel_5.jpg"),
];

const MenuIcons = ({ navigation }) => {

  const goToPond = () => navigation.navigate("pond-screen")
  return (
    <View>
      <Text style={styles.welcome}>Chào bạn, Nguyen Van An</Text>
      <Text style={styles.subWelcome}>Hôm nay bạn muốn xem gì?</Text>

      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={viewportWidth}
          height={viewportWidth / 2}
          autoPlay={true}
          data={images}
          scrollAnimationDuration={1000}
          // onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item }) => (
            <View style={styles.articleItem}>
              <Image
                source={item}
                style={styles.articleImage}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>

      {/* Các nút điều hướng */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("home")}
        >
          <View style={styles.menuIcon}>
            <Image
              source={require("@/assets/images/layout.png")}
              style={[styles.menuImage, { width: 30, height: 30 }]}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>Tổng quan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={goToPond}
        >
          <View style={styles.menuIcon}>
            <Image
              source={require("@/assets/images/pond.png")}
              style={styles.menuImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>Hồ cá</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("lookup")}
        >
          <View style={styles.menuIcon}>
            <Image
              source={require("@/assets/images/fengshui.png")}
              style={styles.menuImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>Phong Thủy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("home")}
        >
          <View style={styles.menuIcon}>
            <Image
              source={require("@/assets/images/sea-life.png")}
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
    marginTop: 20,
  },
  subWelcome: {
    color: "#8B95A1",
    paddingHorizontal: 16,
    marginTop: 4,
  },
  carouselContainer: {
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  articleItem: {
    width: viewportWidth * 0.8,
    marginHorizontal: viewportWidth * 0.1,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  articleImage: {
    width: "100%",
    height: hp(25),
    borderRadius: 8,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
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
