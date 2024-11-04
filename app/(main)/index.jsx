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
import MenuIcons from "@/components/MenuIcons";

const Home = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar style="dark" /> */}
            {/* Blog Posts */}
            <ScrollView style={styles.blogContainer}>
                {/* Menu Icons */}
                <MenuIcons navigation={navigation} />
                <BlogPost
                    title="Cá Koi đem lại may mắn"
                    subtitle="Tìm hiểu về ý nghĩa phong thủy của từng loại cá Koi"
                    category="Phong thủy"
                />
                <BlogPost
                    title="Cách bố trí hồ cá hợp phong thủy"
                    subtitle="Hướng dẫn chi tiết cách đặt hồ cá trong nhà và sân vườn"
                    category="Hồ cá"
                />
                <BlogPost
                    title="Top 10 giống cá Koi đẹp nhất"
                    subtitle="Khám phá những giống cá Koi được ưa chuộng nhất"
                    category="Giống cá"
                />
                <BlogPost
                    title="Chăm sóc cá Koi hiệu quả"
                    subtitle="Những mẹo chăm sóc cá Koi để chúng luôn khỏe mạnh"
                    category="Chăm sóc"
                />
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