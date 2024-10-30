import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomNavigation from "../../components/BottomNavigation";
import MenuIcons from "../../components/MenuIcons";

const PondScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Menu Icons - đã bao gồm Carousel và các nút */}
      {/* <MenuIcons navigation={navigation} /> */}

      {/* <Text style={styles.blogHeader}>Blog Posts</Text> */}
      <ScrollView style={styles.blogContainer}>
        <BlogPost
          title="Cách bố trí hồ cá hợp phong thủy"
          subtitle="Hướng dẫn chi tiết cách đặt hồ cá trong nhà và sân vườn"
          category="Hồ cá"
        />
        <BlogPost
          title="Ý nghĩa phong thủy của hồ cá"
          subtitle="Tìm hiểu về ý nghĩa phong thủy khi đặt hồ cá trong nhà"
          category="Hồ cá"
        />
        <BlogPost
          title="Hướng dẫn chọn cá phong thủy"
          subtitle="Những loại cá mang lại may mắn và tài lộc"
          category="Hồ cá"
        />
        <BlogPost
          title="Vị trí đặt hồ cá theo phong thủy"
          subtitle="Các vị trí tốt nhất để đặt hồ cá trong nhà"
          category="Hồ cá"
        />
        <BlogPost
          title="Phong thủy nước trong hồ cá"
          subtitle="Tầm quan trọng của nước trong phong thủy hồ cá"
          category="Hồ cá"
        />
      </ScrollView>
      <BottomNavigation />
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
    backgroundColor: "white",
  },
  blogContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F5F7FA",
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
  blogHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
});

export default PondScreen;
