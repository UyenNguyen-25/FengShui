import AuthProvider from "@/hooks/useAuth";
import { Stack } from "expo-router";
import 'react-native-gesture-handler'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index" />
        <Stack.Screen name="not-found" />
      </Stack>
    </AuthProvider>
  );
}
