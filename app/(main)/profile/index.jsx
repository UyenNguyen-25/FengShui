import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const Profile = () => {
  const navigation = useNavigation(); // Sử dụng hook để lấy đối tượng navigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/profile-avatar.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>Nguyễn Văn An</Text>
        <Text style={styles.email}>an.nguyen@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tên:</Text>
          <Text style={styles.value}>Nguyễn Văn An</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.value}>0988900330</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Địa chỉ:</Text>
          <Text style={styles.value}>
            12B2 Đường Lê Quang Định, Phường 9, Thành Phố Vũng Tàu
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tùy chọn</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate("EditProfile")} // Điều hướng tới EditProfile
        >
          <Text style={styles.optionText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Cài đặt tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.optionButton, styles.logoutButton]}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

// Các style không thay đổi
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F7FA",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3542",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#8B95A1",
  },
  section: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3542",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E8ECF0",
  },
  label: {
    fontSize: 14,
    color: "#8B95A1",
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2C3542",
    flex: 2,
    textAlign: "right",
  },
  optionButton: {
    backgroundColor: "#2C3542",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  optionText: {
    color: "white",
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: "#E53E3E",
  },
  logoutText: {
    color: "white",
    fontSize: 14,
  },
});
