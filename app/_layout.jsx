import AuthProvider from "@/hooks/useAuth";
import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler'
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </AuthProvider>
    </PaperProvider>
  );
}
