import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        {/* Màn hình Home */}
        <Stack.Screen 
          name='home' 
          options={{ 
            headerShown: true, 
            headerTitle: 'Home' 
          }} 
        />
        
        {/* Màn hình Main */}
        <Stack.Screen 
          name='(main)' 
          options={{ 
            headerShown: true, 
            headerTitle: 'Back' 
          }} 
        />

        {/* Màn hình Pond */}
        <Stack.Screen 
          name='pond' 
          options={{ 
            headerShown: true, 
            headerTitle: 'Hồ cá',
            headerTitleStyle: {
              color: '#000', 
            }
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
