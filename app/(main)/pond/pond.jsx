import React, { useEffect, useState } from "react";
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
import { pondsService } from "@/services/elements/pondsService";
import { useNavigation } from "@react-navigation/native";
import { SCREEN } from "@/constants/screen";

const PondScreen = () => {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation()

  useEffect(() => {
    const fetchPonds = async () => {
      const response = await pondsService.getAll();
      if (response.success) {
        setPonds(response.data);
      } else {
        console.log("Error fetching ponds: ", response.msg);
      }
      setLoading(false);
    };

    fetchPonds();
  }, []);

  console.log(navigation);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView style={styles.blogContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          ponds.map((pond) => (
            <BlogPost
              key={pond.id}
              title={pond.pond_shape}
              subtitle={pond.pond_location}
              category={pond.suit_element}
              navigation={navigation}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const BlogPost = ({ title, subtitle, category, navigation }) => (
  <View style={styles.blogPost}>
    <View style={styles.blogContent}>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{category}</Text>
      </View>
      <Text style={styles.blogTitle}>{title}</Text>
      <Text style={styles.blogSubtitle}>{subtitle}</Text>
      <TouchableOpacity style={styles.readButton} onPress={() => navigation.navigate(SCREEN.POND_DETAIL)}>
        <Text style={styles.readButtonText}>Đọc thêm</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.blogImage}>
      <Image
        source={require("@/assets/images/koi-thumbnail.png")}
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
