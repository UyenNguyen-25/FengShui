import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFish,
  faHandHoldingMedical,
  faHouse,
  faCommentMedical,
  faMagnifyingGlass,
  faBlogger,
} from "@fortawesome/free-solid-svg-icons";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.points}>20</Text>
          <Text style={styles.nap}>Nạp</Text>
        </View>
        <View style={styles.userIcon}>
          <FontAwesomeIcon icon={faUser} />
        </View>
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcome}>Chào bạn, Nguyen Van An</Text>
      <Text style={styles.subWelcome}>Hôm nay bạn muốn xem gì?</Text>

      {/* Menu Icons */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <FontAwesomeIcon icon={faFish} style={styles.menuImage} />
          </View>
          <Text style={styles.menuText}>Tổng quan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <Image
              source={require("../../assets/images/hồ-cá.png")}
              style={styles.menuImage}
            />
          </View>
          <Text style={styles.menuText}>Hồ cá</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <Image
              source={require("../../assets/images/PhongThuy.png")}
              style={styles.menuImage}
            />
          </View>
          <Text style={styles.menuText}>Phong thủy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <FontAwesomeIcon
              icon={faHandHoldingMedical}
              style={styles.menuImage}
            />
          </View>
          <Text style={styles.menuText}>Chăm sóc</Text>
        </TouchableOpacity>
      </View>

      {/* Blog Posts */}
      <View style={styles.blogContainer}>
        <BlogPost
          title="Cá Koi đem lại may mắn"
          subtitle="Tìm hiểu về ý nghĩa phong thủy của từng loại cá Koi"
          category="Phong thủy"
        />
        <BlogPost
          title="Cách bố trí hồ cá hợp phong thủy"
          subtitle="Hướng dẫn chi tiết cách đặt hồ cá trong nhà và sân vườn"
          category="Thiết kế"
        />
        <BlogPost
          title="Top 10 giống cá Koi đẹp nhất"
          subtitle="Khám phá những giống cá Koi được ưa chuộng nhất"
          category="Giống cá"
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesomeIcon icon={faHouse} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesomeIcon icon={faBlogger} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesomeIcon icon={faCommentMedical} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const BlogPost = ({ title, subtitle, category }) => (
  <View style={styles.blogPost}>
    <View style={styles.blogContent}>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{category}</Text>
      </View>
      <Text style={styles.blogTitle}>{title}</Text>
      <Text style={styles.blogSubtitle}>{subtitle}</Text>
      <TouchableOpacity style={styles.readButton}>
        <Text style={styles.readButtonText}>Đọc thêm</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.blogImage}>
      <Image
        source={require("../../assets/images/koi-thumbnail.png")}
        style={styles.thumbnail}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA", // Đổi màu nền sáng hơn
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  points: {
    color: "#2C3542",
    fontSize: 18,
    fontWeight: "bold",
  },
  nap: {
    color: "#8B95A1",
    marginLeft: 4,
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8ECF0",
    justifyContent: "center",
    alignItems: "center",
  },
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
    backgroundColor: "#E8ECF0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  menuText: {
    color: "#2C3542",
    fontSize: 12,
  },
  blogContainer: {
    paddingHorizontal: 16,
  },
  blogPost: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blogContent: {
    flex: 1,
    marginRight: 16,
  },
  categoryBadge: {
    backgroundColor: "#E8ECF0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  categoryText: {
    color: "#2C3542",
    fontSize: 12,
    fontWeight: "500",
  },
  blogTitle: {
    color: "#2C3542",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  blogSubtitle: {
    color: "#8B95A1",
    fontSize: 14,
    marginBottom: 16,
  },
  readButton: {
    backgroundColor: "#2C3542",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  readButtonText: {
    color: "white",
    fontSize: 14,
  },
  blogImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8ECF0",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    padding: 8,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: "#8B95A1",
  },
});

export default HomeScreen;
