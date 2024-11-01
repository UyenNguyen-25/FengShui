import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signUp" />
      <Stack.Screen name="forgot_pass" />
      <Stack.Screen name="congratulation" />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
