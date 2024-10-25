import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../app/(main)/home';
import PondScreen from '../app/screen/pond';
import PhongThuyScreen from '../app/(main)/PhongThuyScreen';
import ChamSocScreen from '../app/(main)/ChamSocScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name="Pond" component={PondScreen} />
        <Stack.Screen name="PhongThuy" component={PhongThuyScreen} />
        <Stack.Screen name="ChamSoc" component={ChamSocScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
