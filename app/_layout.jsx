import AuthProvider from "@/hooks/useAuth";
import { Stack } from "expo-router";
import 'react-native-gesture-handler'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index" />
        <Stack.Screen name="(main)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(admin)" />
      </Stack>
    </AuthProvider>
  );
}
