import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

const FishCare = ({ navigation }) => {
  const careGuides = [
    {
      id: 1,
      title: 'Môi trường nước',
      icon: 'water',
      content: 'Nhiệt độ nước: 15-25°C\nĐộ pH: 6.8-8.0\nĐộ cứng: 8-25 dKH\nKiểm tra chất lượng nước hàng tuần',
    },
    {
      id: 2,
      title: 'Cho ăn',
      icon: 'fish',
      content: '2-4 lần/ngày\nThức ăn chuyên dụng cho Koi\nViên nổi chất lượng cao\nKhông cho ăn quá nhiều',
    },
    {
      id: 3,
      title: 'Bệnh thường gặp',
      icon: 'heartbeat',
      content: 'Nấm trắng\nKý sinh trùng\nBệnh đốm trắng\nViêm mang',
    },
    {
      id: 4,
      title: 'Bảo dưỡng hồ',
      icon: 'tools',
      content: 'Vệ sinh bộ lọc định kỳ\nThay 15-20% nước/tuần\nKiểm tra máy bơm, sục khí\nLoại bỏ cặn bẩn đáy hồ',
    }
  ];

  const renderCareCard = (item) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <FontAwesome5 name={item.icon} size={24} color="red" />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <Text style={styles.cardContent}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hướng dẫn chăm sóc Koi</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Banner Image */}
        {/* <Image
          source={{ uri: 'https://example.com/koi-image.jpg' }}
          style={styles.bannerImage}
        /> */}
          <Image
              source={require("../../../assets/images/KoiCare.jpg")}
              style={styles.bannerImage}
            resizeMode="contain"
        />

        {/* Introduction */}
        <Text style={styles.introduction}>
          Cá Koi là loài cá cảnh quý hiếm, đòi hỏi sự chăm sóc đặc biệt để phát triển khỏe mạnh và có màu sắc đẹp. Dưới đây là những hướng dẫn cơ bản để chăm sóc cá Koi.
        </Text>

        {/* Care Guide Cards */}
        {careGuides.map(renderCareCard)}

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>
            <FontAwesome5 name="lightbulb" size={20} color="#FFA000" /> Lời khuyên
          </Text>
          <Text style={styles.tipsContent}>
            • Quan sát cá thường xuyên để phát hiện bất thường{'\n'}
            • Không để cá quá đông trong hồ{'\n'}
            • Cần có hệ thống lọc nước tốt{'\n'}
            • Tránh thay đổi nhiệt độ nước đột ngột
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    textAlign: "center",
    color:"red"
  },
  scrollView: {
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  introduction: {
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  cardContent: {
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
  },
  tipsSection: {
    backgroundColor: '#FFF3E0',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#F57C00',
  },
  tipsContent: {
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
  },
});

export default FishCare;