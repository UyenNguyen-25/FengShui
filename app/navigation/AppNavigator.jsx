import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../(main)/home";
import PondScreen from "../screen/pond";
// ... import các màn hình khác nếu cần ...

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pond" component={PondScreen} />
      {/* Định nghĩa các màn hình khác nếu cần */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
