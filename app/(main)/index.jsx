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
import MenuIcons from "@/components/MenuIcons";
import { getAll } from '@/services/elements/koiFishService';

const Home = ({ navigation }) => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const result = await getAll();
                if (result.success) {
                    setBlogPosts(result.data.map(item => ({
                        title: item.name,
                        subtitle: item.origin,
                        category: item.suit_element
                    })));
                } else {
                    console.error("Error fetching blog posts: ", result.msg);
                }
            } catch (error) {
                console.error("Error fetching blog posts: ", error);
            }
        };

        fetchBlogPosts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView style={styles.blogContainer}>
                <MenuIcons navigation={navigation} />
                {blogPosts.map((post, index) => (
                    <BlogPost
                        key={index}
                        title={post.title}
                        subtitle={post.subtitle}
                        category={post.category}
                    />
                ))}
            </ScrollView>
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
    menuContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
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
    blogContainer: {
        paddingHorizontal: 16,
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
    menuImage: {
        width: 40,
        height: 40,
    },
});

export default Home;