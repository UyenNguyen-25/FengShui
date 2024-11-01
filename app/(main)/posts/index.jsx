import React, { useState, useEffect } from "react";
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
import { postService } from "../../../services/post/postService";
import { userService } from "../../../services/users/userService";

const SocialScreen = () => {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await postService.getAll();
      console.log('post', response.data);
      if (response.success) {
        setPosts(response.data);
        const userPromises = response.data.map(post =>
          userService.getUserById(post.userId)
        );
        const userResults = await Promise.all(userPromises);
        const userMap = userResults.reduce((acc, result, index) => {
          if (result.success) {
            acc[response.data[index].userId] = result.user.name;
          }
          return acc;
        }, {});
        setUsers(userMap);
      } else {
        console.log("Failed to fetch posts:", response.msg);
      }
    };

    fetchPosts();
  }, []);

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
          <Image source={{ uri: item.file[0] }} style={styles.userAvatar} />
          <Text style={styles.username}>{users[item.userId] || item.userId}</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="ellipsis-h" size={20} color="#262626" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: item.file[0] }} style={styles.postImage} />
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
        <Text style={styles.likes}>0 likes</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.title}> {item.title}</Text>
          <Text style={styles.caption}> {item.description}</Text>
        </View>
        <Text style={styles.comments}>View all comments</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CreatePostHeader />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
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
    flexDirection: "column",
    marginBottom: 6,
  },
  caption: {
    color: "#262626",
  },
  title: {
    fontWeight: '600',
    fontStyle: 'italic'
  },
  comments: {
    color: "#8e8e8e",
    marginBottom: 12,
  },
});

export default SocialScreen;
