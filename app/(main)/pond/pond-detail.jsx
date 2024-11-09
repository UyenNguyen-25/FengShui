import React, { useEffect, useState } from "react";
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
import { getById } from "@/services/blog/blogService";

const PondDetail = ({ navigation, route }) => {
  const [blogDetail, setBlogDetail] = useState(null);
  const pondId = route?.params?.pondId; // Sử dụng optional chaining để tránh lỗi

  useEffect(() => {
    if (pondId) {
      const fetchBlogDetail = async () => {
        const response = await getById(pondId);
        console.log("API Response:", response);
        if (response.success) {
          setBlogDetail(response.data);
        } else {
          console.log("Failed to fetch blog details: ", response.msg);
        }
      };

      fetchBlogDetail();
    }
  }, [pondId]);

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

        <Text style={styles.headerText}>{blogDetail ? blogDetail.suit_element : "Loading..."}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Main Image */}
        <Image
          source={require("@/assets/images/BlogPond.jpg")}
          style={styles.mainImage}
          resizeMode="contain"
        />

        {/* Author Info */}
        <View style={styles.authorContainer}>
          <Text style={styles.byText}>Ngày:</Text>
          <Text style={styles.authorName}>{blogDetail ? blogDetail.created_at : "Loading..."}</Text>
        </View>

        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{blogDetail ? blogDetail.suit_element : "Loading..."}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{blogDetail ? blogDetail.title : "Loading..."}</Text>

        {/* Blog Content */}
        <Text style={styles.contentText}>
          {blogDetail ? blogDetail.description : "Loading..."}
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
    position: "absolute",
    top: "50%",
    zIndex: 50
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

export default PondDetail;
