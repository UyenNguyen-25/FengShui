import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const BlogDetail = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Wood</Text>

        {/* <TouchableOpacity style={styles.bookmarkButton}>
          <FontAwesome name="bookmark-o" size={24} color="#000" />
        </TouchableOpacity> */}
      </View>

      <ScrollView style={styles.content}>
        {/* Main Image */}
        {/* <Image
          source={{
            uri: "https://sanvuonadong.vn/wp-content/uploads/2020/10/tong-quan-ve-ca-koi-01-san-vuon-a-dong.jpgg",
          }}
          style={styles.mainImage}
        /> */}
          <Image
              source={require("@/assets/images/BlogPond.jpg")}
              style={styles.mainImage}
              resizeMode="contain"
            />

        {/* Author Info */}
        <View style={styles.authorContainer}>
          <Text style={styles.byText}>Người viết:</Text>
          <Text style={styles.authorName}>Nguyễn Văn An</Text>
        </View>

        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>Phong Thủy</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Bí quyết thiết kế hồ cá koi phong thủy</Text>

        {/* Blog Content */}
        <Text style={styles.contentText}>
          Hồ cá koi không chỉ là một điểm nhấn thẩm mỹ cho ngôi nhà mà còn mang
          lại sự thịnh vượng và may mắn theo phong thủy.
        </Text>

        <Text style={styles.contentText}>
          Dưới đây là 5 nguyên tắc quan trọng khi thiết kế hồ cá koi phong thủy:
          chọn vị trí phù hợp, hình dáng hồ, số lượng và màu sắc cá, cây cảnh
          xung quanh, và hệ thống lọc nước.
        </Text>

        <Text style={styles.contentText}>
          Một hồ cá koi được thiết kế đúng cách sẽ giúp cân bằng năng lượng, tạo
          ra không gian sống hài hòa và thu hút tài lộc.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  bookmarkButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  mainImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  byText: {
    color: "#666",
    marginRight: 4,
  },
  authorName: {
    color: "#000",
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    paddingTop: 0,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    padding: 16,
    paddingTop: 8,
  },
  tagContainer: {
    backgroundColor: "#000",
    alignSelf: "flex-start",
    borderRadius: 4,
    padding: 8,
    paddingHorizontal: 12,
    margin: 16,
  },
  tagText: {
    color: "#fff",
    fontSize: 14,
  },
  headerText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
});

export default BlogDetail;
