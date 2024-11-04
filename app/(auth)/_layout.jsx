import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/hooks/useAuth";

const AuthLayout = () => {
  const { session } = useAuth()

  return (
    <>
      <StatusBar style="dark" />
      {!session ? <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="signUp" />
        <Stack.Screen name="forgot_pass" />
        <Stack.Screen name="congratulation" />
      </Stack> : <Redirect href={'/'} />}
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
