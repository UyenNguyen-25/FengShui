import AuthProvider from "@/hooks/useAuth";
import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler'
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLockOrientation } from "@/hooks/useLockOrientation";

export default function RootLayout() {
  useLockOrientation(ScreenOrientation.OrientationLock.DEFAULT);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <AuthProvider>
          <StatusBar style="dark" />
          <Stack initialRouteName="index" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </AuthProvider>
      </PaperProvider>

    </GestureHandlerRootView>
  );
}
