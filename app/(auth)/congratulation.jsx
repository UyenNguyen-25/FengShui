import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "@/constants/theme";

const Congratulation = () => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate("home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.congratsText}>Đăng ký thành công!</Text>
      <Text style={styles.messageText}>
        Chúc mừng! Bạn đã đăng ký tài khoản thành công.
      </Text>

      <Pressable style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Về Trang Chủ</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: theme.colors.textLight,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Congratulation;
