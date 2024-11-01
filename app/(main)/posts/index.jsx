import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SCREEN } from "@/constants/screen";

const SocialScreen = () => {
  const [text, setText] = useState("");
  const navigation = useNavigation();

  const posts = [
    {
      id: 1,
      username: "kohaku_lover",
      userAvatar: require("@/assets/images/social_1.jpeg"),
      image: require("@/assets/images/social_1.jpeg"),
      likes: "1,234",
      caption: "Beautiful Kohaku Koi #koi #japan",
      comments: "123",
    },
    {
      id: 2,
      username: "showa_master",
      userAvatar: require("@/assets/images/social_2.png"),
      image: require("@/assets/images/social_2.png"),
      likes: "2,567",
      caption: "Showa Koi in perfect condition",
      comments: "234",
    },
    {
      id: 3,
      username: "taisho_sanke",
      userAvatar: require("@/assets/images/social_3.png"),
      image: require("@/assets/images/social_3.png"),
      likes: "3,891",
      caption: "Taisho Sanke showing great pattern",
      comments: "345",
    },
  ];

  const CreatePostHeader = () => (
    <View style={styles.createPostHeader}>
      <View style={styles.createPostLeft}>
        <Image
          source={require("@/assets/images/social_1.jpeg")}
          style={styles.userProfilePic}
        />
        <TextInput
          style={styles.createPostInput}
          placeholder="Bạn đang nghĩ gì?"
          placeholderTextColor="#666"
          value={text}
          onChangeText={setText}
        />
      </View>
      <TouchableOpacity
        style={styles.imageUploadButton}
        onPress={() => navigation.navigate(SCREEN.POST_SCREEN)}
      >
        <AntDesign name="pluscircleo" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const renderPost = ({ item }) => (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={item.userAvatar} style={styles.userAvatar} />
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="ellipsis-h" size={20} color="#262626" />
        </TouchableOpacity>
      </View>
      <Image source={item.image} style={styles.postImage} />
      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="heart-o" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="comment-o" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postDetails}>
        <Text style={styles.likes}>{item.likes} likes</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.caption}> {item.caption}</Text>
        </View>
        <Text style={styles.comments}>View all {item.comments} comments</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CreatePostHeader />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  createPostHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#ffffff",
  },
  createPostLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  createPostInput: {
    flex: 1,
    fontSize: 16,
    color: "#262626",
  },
  imageUploadButton: {
    marginLeft: 15,
    padding: 5,
  },
  post: {
    marginBottom: 15,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: "600",
    color: "#262626",
  },
  postImage: {
    width: "100%",
    height: 400,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  leftActions: {
    flexDirection: "row",
  },
  actionButton: {
    marginRight: 16,
  },
  postDetails: {
    paddingHorizontal: 12,
  },
  likes: {
    fontWeight: "600",
    marginBottom: 6,
  },
  captionContainer: {
    flexDirection: "row",
    marginBottom: 6,
  },
  caption: {
    color: "#262626",
  },
  comments: {
    color: "#8e8e8e",
    marginBottom: 12,
  },
});

export default SocialScreen;
